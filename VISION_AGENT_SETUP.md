# Vision Agent Setup Guide

The audio lesson with the AI teacher requires the Vision Agent to be running. Here's how to set it up:

## Prerequisites

- Python 3.9+
- Stream API credentials (STREAM_API_KEY, STREAM_API_SECRET)
- Google Gemini API key (GEMINI_API_KEY or GOOGLE_API_KEY)

## Local Development Setup

### 1. Start the Vision Agent Server

From the project root, run:

```bash
python vision-agent/agent.py serve --host 0.0.0.0 --port 8080
```

This starts the Vision Agent HTTP server on `http://localhost:8080`.

### 2. Configure Environment Variables

Add to your `.env` file (in project root):

```env
VISION_AGENT_URL=http://localhost:8080
GEMINI_API_KEY=your_gemini_key_here
TARGET_LANGUAGE=Spanish
```

### 3. Run the App

```bash
npm start
```

Then tap the audio lesson and click "Start Tutor" - the AI teacher should join and provide audio responses.

## Production Deployment

For production, deploy the Vision Agent to a public server and set:

```env
VISION_AGENT_URL=https://your-vision-agent-server.com
```

## Troubleshooting

### "Could not connect to the audio tutor" Error

1. **Vision Agent not running**: Check that `python vision-agent/agent.py serve` is running
2. **Wrong URL**: Verify `VISION_AGENT_URL` in `.env` is correct and accessible
3. **Network blocked**: Check firewall/CORS settings if the app can't reach the server

### No Audio Output

1. **Agent not joining**: Check server logs for errors: `python vision-agent/agent.py serve`
2. **Audio permissions**: Ensure your device has microphone/speaker permissions
3. **Stream call issue**: Verify STREAM_API_KEY and STREAM_API_SECRET are correct

### Audio Lesson Works But AI Teacher Doesn't Respond

This means:

- ✅ The Stream call is working (mock audio playback works)
- ❌ The Vision Agent isn't joining (check VISION_AGENT_URL and server logs)

## Notes

- The audio lesson will still work without the Vision Agent - you'll hear the mock audio playback
- The AI teacher requires a live Vision Agent server to provide audio responses
- Each lesson passes context (goals, vocabulary, phrases) to the agent for better teaching
