#!/usr/bin/env python3
"""
Test script to verify GEMINI_API_KEY and Gemini Live connection.
Run this to diagnose audio generation issues.
"""

import os
import asyncio
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_LIVE_MODEL = os.getenv("GEMINI_LIVE_MODEL", "gemini-3.6-flash")
GEMINI_LIVE_VOICE = os.getenv("GEMINI_LIVE_VOICE", "en-default")


async def test_gemini_api():
    """Test Gemini Live API with audio output."""
    
    print("=" * 60)
    print("GEMINI API TEST")
    print("=" * 60)
    
    # Check API key
    if not GEMINI_API_KEY:
        print("❌ ERROR: GEMINI_API_KEY not found in .env")
        print("   Add to .env: GEMINI_API_KEY=your_key_here")
        return False
    
    print(f"✅ API Key found: {GEMINI_API_KEY[:20]}...")
    print(f"   Model: {GEMINI_LIVE_MODEL}")
    print(f"   Voice: {GEMINI_LIVE_VOICE}")
    print()
    
    try:
        # Initialize Gemini client
        print("Connecting to Gemini API...")
        client = genai.Client(api_key=GEMINI_API_KEY)
        print("✅ Client created")
        
        # Create session config
        session_config = {
            "response_modalities": ["AUDIO", "TEXT"],
            "system_instruction": "You are a helpful assistant. Respond concisely.",
            "speech_config": {
                "voice_config": {
                    "prebuilt_voice_config": {"voice_name": GEMINI_LIVE_VOICE},
                },
                "language_code": "en-US",
            },
            "temperature": 0.7,
        }
        
        print("Connecting to Gemini Live session...")
        async with client.aio.live.connect(
            model=GEMINI_LIVE_MODEL,
            config=session_config,
        ) as session:
            print("✅ Live session connected!")
            
            # Send a test message
            test_message = "Say hello in a friendly way. Keep it to one sentence."
            print(f"\nSending test message: '{test_message}'")
            
            await session.send_client_content(
                turns=types.Content(
                    role="user",
                    parts=[types.Part(text=test_message)],
                ),
                turn_complete=True,
            )
            print("✅ Message sent")
            
            # Receive response
            print("\nWaiting for response (audio + text)...")
            response_text = ""
            audio_received = False
            
            async for event in session.receive():
                server_content = getattr(event, "server_content", None)
                
                if server_content is None:
                    continue
                
                # Check for text
                if getattr(server_content, "model_turn", None) is not None:
                    for part in getattr(server_content.model_turn, "parts", []) or []:
                        text = getattr(part, "text", None)
                        if text:
                            response_text += text
                            print(f"📝 Text: {text}")
                        
                        # Check for audio
                        inline_data = getattr(part, "inline_data", None)
                        if inline_data is not None:
                            audio_bytes = getattr(inline_data, "data", b"")
                            if audio_bytes:
                                audio_size = len(audio_bytes) if isinstance(audio_bytes, bytes) else len(audio_bytes.encode())
                                print(f"🔊 Audio received: {audio_size} bytes")
                                audio_received = True
                
                # Stop when turn is complete
                if getattr(server_content, "turn_complete", False):
                    break
            
            print()
            print("=" * 60)
            print("TEST RESULTS")
            print("=" * 60)
            
            if response_text:
                print(f"✅ Text Response: {response_text[:100]}...")
            else:
                print("❌ No text response received")
            
            if audio_received:
                print("✅ Audio: Generated successfully")
            else:
                print("⚠️  Audio: Not received (might be a voice model issue)")
            
            print()
            if response_text and audio_received:
                print("✅ GEMINI API TEST PASSED - Everything is working!")
                return True
            elif response_text:
                print("⚠️  GEMINI API TEST PARTIAL - Text works but audio missing")
                print("   Try changing GEMINI_LIVE_VOICE in .env")
                return True
            else:
                print("❌ GEMINI API TEST FAILED - No response received")
                return False
                
    except Exception as e:
        print()
        print("=" * 60)
        print("TEST FAILED WITH ERROR")
        print("=" * 60)
        print(f"❌ Error: {type(e).__name__}: {str(e)}")
        print()
        
        if "API key" in str(e).lower():
            print("💡 This looks like an API key issue:")
            print("   - Check your GEMINI_API_KEY in .env")
            print("   - Make sure it's a valid Google AI API key")
            print("   - Visit: https://aistudio.google.com/app/apikey")
        elif "permission" in str(e).lower():
            print("💡 This might be a permission issue:")
            print("   - Check your API quota at Google AI Studio")
            print("   - Ensure Gemini API is enabled")
        elif "model" in str(e).lower():
            print("💡 This might be a model issue:")
            print("   - Try changing GEMINI_LIVE_MODEL in .env")
            print("   - Valid models: gemini-3.6-flash")
        elif "voice" in str(e).lower():
            print("💡 This might be a voice configuration issue:")
            print("   - Try changing GEMINI_LIVE_VOICE in .env")
            print("   - Valid voices: en-default, en-AU-Neural2-A, en-US-Neural2-A")
        
        return False


if __name__ == "__main__":
    success = asyncio.run(test_gemini_api())
    exit(0 if success else 1)
