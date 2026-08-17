# Audio Lesson Troubleshooting Guide

If you're seeing errors or no audio from the AI teacher in the audio lesson, follow this guide to diagnose and fix the issues.

## Common Errors & Solutions

### ❌ Error: "Stream error code 4: GetOrCreateCall failed..."

**Cause**: The Stream call is missing the `created_by` field.

**Status**: ✅ **FIXED** - Update your code to the latest version.

---

### ❌ Error: "Network request failed" when clicking "Start Tutor"

**Causes**:

1. Vision Agent server is not running
2. `VISION_AGENT_URL` env var is not set
3. Network connectivity issues

**Solution**: See "Starting the Vision Agent Server" below.

---

### ❌ No Audio from AI Teacher

**Causes** (in order of likelihood):

1. Vision Agent server is **not running**
2. `GEMINI_API_KEY` is **not set**
3. Agent is starting but connection is failing silently
4. Audio permissions not granted

**Solution**: Follow the complete setup steps below.

---

## Complete Setup Steps

### Step 1: Install Python Requirements

```bash
cd vision-agent
pip install -r requirements.txt
```

If you don't have a `requirements.txt`, the following packages are required:

```bash
pip install python-dotenv google-genai getstream
```

### Step 2: Set Up Environment Variables

Create or update `.env` in the root of your project:

```env
# Stream API Credentials (required)
STREAM_API_KEY=your_stream_api_key_here
STREAM_API_SECRET=your_stream_api_secret_here

# Gemini API Key (required for audio)
GEMINI_API_KEY=your_gemini_api_key_here

# Vision Agent URL (should point to where your agent server is running)
VISION_AGENT_URL=http://localhost:8080

# Language Settings
TARGET_LANGUAGE=French
GEMINI_LIVE_MODEL=gemini-3.6-flash
GEMINI_LIVE_VOICE=en-default

# Clerk Authentication (for mobile app)
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

**Important**: Make sure you have valid values for:

- `STREAM_API_KEY` and `STREAM_API_SECRET` (from getstream.io dashboard)
- `GEMINI_API_KEY` (from Google AI Studio)

### Step 3: Start the Vision Agent Server

Open a **separate terminal** and run:

```bash
cd vision-agent
python agent.py serve --host 0.0.0.0 --port 8080
```

**Expected output**:

```
INFO:vision-agent:Starting server on 0.0.0.0:8080
```

**Do NOT close this terminal** - the agent server must stay running while you're testing.

### Step 4: Start the Mobile App

In your original terminal:

```bash
cd ..
npm start
```

Then run on Android/iOS.

### Step 5: Test the Audio Lesson

1. Open the app
2. Select a language and lesson
3. Go to the "Audio Lesson" tab
4. Click "Start Tutor"
5. **You should hear the AI teacher's voice**

---

## Diagnostic Checklist

Use this checklist to identify the problem:

- [ ] Vision Agent server is running (`python agent.py serve` is active)
- [ ] `.env` file has `GEMINI_API_KEY` set
- [ ] `.env` file has `STREAM_API_KEY` and `STREAM_API_SECRET`
- [ ] Mobile app can reach `VISION_AGENT_URL` (check your firewall if on a network)
- [ ] No errors in the Vision Agent terminal output
- [ ] No errors in the mobile app console

### Checking Agent Logs

In the **Vision Agent terminal**, look for:

```
[Stream] Creating call: ...
[Stream] Token generated
[Agent] Starting agent session
[Agent] Session started: ...
```

If you see errors with `[Agent]` prefix, that's where the problem is.

---

## Debugging: Step-by-Step

### Is the Vision Agent server running?

```bash
curl http://localhost:8080/health
```

If this fails, the server is not running. Go back to Step 3.

### Is the GEMINI_API_KEY set?

```bash
# Windows PowerShell
$env:GEMINI_API_KEY

# Mac/Linux
echo $GEMINI_API_KEY
```

If it's empty, add it to `.env` and restart the Vision Agent server.

### Is the mobile app reaching the agent?

Check the mobile app console for messages starting with `[Agent]` and `[Stream]`.

If you see:

- ✅ `[Stream] Token generated` - the call was created successfully
- ✅ `[Agent] Session started` - the agent connected to the call

Then the infrastructure is working. If no audio, check Gemini API key.

---

## Known Limitations

1. **Audio may be one-way**: The agent speaks, but the user's voice may not be heard by the agent (yet)
2. **Cold start delay**: First connection may take 3-5 seconds as Gemini loads
3. **Android networking**: If on Android emulator, use `10.0.2.2:8080` instead of `localhost:8080`

---

## Recovery Steps

If something breaks:

1. **Kill the Vision Agent server** (Ctrl+C)
2. **Kill the mobile app** (close it)
3. **Restart the Vision Agent server**: `python agent.py serve --host 0.0.0.0 --port 8080`
4. **Restart the mobile app**: `npm start`
5. **Try again**

---

## Still Having Issues?

Check:

1. **Agent terminal output**: Any error messages?
2. **Mobile app console**: Any `[Stream]` or `[Agent]` errors?
3. **Firewall**: Is port 8080 open?
4. **.env file**: Is it in the root directory (not nested)?
5. **API keys**: Are they valid? (Try in Google AI Studio or Stream dashboard)

If you're still stuck, check the logs in detail:

**Vision Agent**: Look for `[Agent]` and `[Stream]` prefixes
**Mobile App**: Open DevTools and check the console
