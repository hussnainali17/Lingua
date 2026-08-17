---
name: Agent
description: Use when building real-time voice and video AI agents, deploying conversational assistants, integrating phone calls, adding computer vision to agents, or connecting to external tools and knowledge bases. Agents handle call lifecycle, audio/video routing, turn-taking, and deployment automatically.
metadata:
    mintlify-proj: agent
    version: "1.0"
---

# Vision Agents Skill

## Product Summary

Vision Agents is an open-source Python framework for building real-time voice and video AI agents. Agents join video calls, connect to AI providers (LLMs, STT, TTS, vision models) through swappable plugins, and respond in real time. The framework handles call lifecycle, audio/video routing, turn-taking, and deployment. You write an `Agent` class, define instructions, pick providers, and connect to knowledge bases or tools.

**Key files and commands:**
- `agent.py` — Your agent definition with `create_agent()` and `join_call()` functions
- `pyproject.toml` — Dependencies and project config
- `.env` — API keys for providers (auto-loaded by plugins)
- `uv run agent.py run` — Console mode (single agent, browser demo)
- `uv run agent.py serve` — HTTP server mode (production, multi-session)
- `uvx vision-agents init my-agent` — Scaffold a new project

**Primary docs:** https://visionagents.ai

---

## When to Use

Reach for Vision Agents when:

- **Building voice agents** — STT → LLM → TTS pipelines or realtime speech models (OpenAI, Gemini, Qwen)
- **Adding video understanding** — VLMs, YOLO pose detection, object detection, or realtime video analysis
- **Phone integration** — Inbound/outbound calls via Twilio or Telnyx
- **Function calling & tools** — Agents that call Python functions or MCP servers during conversations
- **RAG (knowledge bases)** — Agents backed by Gemini FileSearch or TurboPuffer
- **Production deployment** — Docker, Kubernetes, horizontal scaling with Redis, OpenTelemetry metrics
- **Testing agents** — Text-only testing without audio/video infrastructure

Do NOT use for: static chatbots, batch processing, or non-real-time applications.

---

## Quick Reference

### Project Structure

```
my-agent/
├── agent.py              # Agent definition
├── pyproject.toml        # Dependencies
├── .env                  # API keys (STREAM_API_KEY, GOOGLE_API_KEY, etc.)
├── .env.example          # Template
├── Dockerfile            # CPU deployment
├── Dockerfile.gpu        # GPU deployment (local models only)
└── tests/                # pytest tests
```

### Essential Commands

| Command | Purpose |
|---------|---------|
| `uvx vision-agents init my-agent` | Scaffold new project |
| `uv add "vision-agents[deepgram,elevenlabs]"` | Add plugins |
| `uv run agent.py run` | Console mode (dev) |
| `uv run agent.py serve --host 0.0.0.0 --port 8080` | HTTP server (prod) |
| `uv run pytest tests/` | Run tests |
| `docker buildx build --platform linux/amd64 -t agent .` | Build for cloud |

### Agent Constructor Parameters

```python
Agent(
    edge=getstream.Edge(),                    # Transport layer
    agent_user=User(name="...", id="agent"),  # Agent identity
    instructions="...",                       # System prompt
    llm=gemini.Realtime(),                    # LLM (realtime or text)
    stt=deepgram.STT(),                       # Speech-to-text (optional in realtime)
    tts=elevenlabs.TTS(),                     # Text-to-speech (optional in realtime)
    turn_detection=smart_turn.TurnDetection(), # Interruption handling
    processors=[ultralytics.YOLOPoseProcessor()], # Video processors
    mcp_servers=[...],                        # External tools
)
```

### Core Methods

| Method | Purpose |
|--------|---------|
| `await agent.create_call(call_type, call_id)` | Create a call |
| `async with agent.join(call):` | Join and manage call lifecycle |
| `await agent.simple_response("text")` | Send text to LLM, speak response |
| `await agent.say("text")` | Speak text directly (bypass LLM) |
| `await agent.finish()` | Wait for call to end |
| `await agent.close()` | Clean up resources |

### Provider Selection

| Need | Realtime | Custom Pipeline |
|------|----------|-----------------|
| **Fastest setup** | `gemini.Realtime()` | — |
| **Full control** | — | `gemini.LLM()` + `deepgram.STT()` + `elevenlabs.TTS()` |
| **Phone calls** | — | Custom pipeline required |
| **Function calling** | Limited | Full support with `@llm.register_function()` |
| **Video + voice** | `openai.Realtime(fps=3)` | `nvidia.VLM()` + STT + TTS |

### HTTP Server Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/calls/{call_id}/sessions` | Start agent session |
| DELETE | `/calls/{call_id}/sessions/{session_id}` | Close session |
| GET | `/calls/{call_id}/sessions/{session_id}/metrics` | Get performance metrics |
| GET | `/health` | Liveness check |
| GET | `/ready` | Readiness check |

---

## Decision Guidance

### Realtime vs Custom Pipeline

| Factor | Realtime | Custom Pipeline |
|--------|----------|-----------------|
| **Setup time** | 5 min | 15 min |
| **Latency** | Lowest (100-200ms) | Higher (300-500ms) |
| **Function calling** | Limited | Full support |
| **STT/TTS control** | None | Complete |
| **Phone calls** | No | Yes |
| **Best for** | Web/mobile demos | Production, phone, tools |

### STT/TTS Provider Pairs

| Use Case | STT | TTS |
|----------|-----|-----|
| **Lowest latency** | Deepgram (eager) | Cartesia |
| **Best quality** | Deepgram Nova-3 | ElevenLabs |
| **Built-in turn detection** | Deepgram, ElevenLabs | Any |
| **Cost-effective** | Fast-Whisper (local) | Kokoro (local) |
| **Phone-friendly** | Deepgram | Cartesia |

### Deployment Path

| Scale | Approach | Tools |
|-------|----------|-------|
| **Dev/test** | `uv run agent.py run` | Local machine |
| **Single container** | Docker + HTTP server | `uv run agent.py serve` |
| **Multiple replicas** | Horizontal scaling | Redis + HTTP server |
| **Production** | Kubernetes | Helm chart + Prometheus |

---

## Workflow

### 1. Scaffold and Configure

```bash
uvx vision-agents init my-agent && cd my-agent
cp .env.example .env
# Fill in: STREAM_API_KEY, STREAM_API_SECRET, GOOGLE_API_KEY
uv sync
```

### 2. Understand the Agent Structure

Open `agent.py`. It contains:
- **`create_agent()`** — Factory function that returns a configured `Agent`
- **`join_call()`** — Defines what happens when agent joins a call
- **`runner`** — Entry point for CLI (`run` and `serve` commands)

### 3. Choose Your Mode

**Realtime (fastest):**
```python
llm=gemini.Realtime()  # One line, handles STT/TTS
```

**Custom pipeline (full control):**
```python
llm=gemini.LLM()
stt=deepgram.STT(eager_turn_detection=True)
tts=elevenlabs.TTS()
```

### 4. Add Tools (Optional)

Register functions for the LLM to call:
```python
@llm.register_function(description="Get weather")
async def get_weather(location: str) -> dict:
    return {"temp": 72, "condition": "sunny"}
```

### 5. Test Locally

```bash
uv run agent.py run
# Opens browser demo, join and talk to agent
```

### 6. Deploy

**Docker:**
```bash
docker buildx build --platform linux/amd64 -t agent .
docker run -e STREAM_API_KEY=... agent
```

**HTTP server (multi-session):**
```bash
uv run agent.py serve --host 0.0.0.0 --port 8080
# POST /calls/{call_id}/sessions to start sessions
```

**Kubernetes:**
See `/guides/kubernetes-deployment` for Helm chart and Prometheus setup.

### 7. Verify and Monitor

- Check `/health` and `/ready` endpoints
- Query `/calls/{call_id}/sessions/{session_id}/metrics` for latency, token usage
- Enable OpenTelemetry for distributed tracing (see `/core/telemetry`)

---

## Common Gotchas

**Agent reuse:** Do NOT reuse an `Agent` instance. Create a new agent for each call. Calling `join()` twice raises `RuntimeError`.

**Realtime + STT/TTS conflict:** When using realtime models (AudioLLM), STT, TTS, and turn detection are automatically disabled. Don't configure them together.

**Turn detection with realtime:** Realtime APIs (OpenAI, Gemini, Qwen) handle interruptions natively. Don't add a separate turn detection plugin.

**Missing turn detection:** Custom pipelines need turn detection. If your STT doesn't include it (e.g., Deepgram with `eager_turn_detection=False`), add `turn_detection=smart_turn.TurnDetection()`.

**Async functions only:** `@llm.register_function()` requires async functions. Sync functions raise `ValueError`.

**Environment variables:** Plugins auto-load from `.env`. Missing keys cause silent failures at runtime. Always test with `uv run agent.py run` first.

**Session limits:** Set `max_concurrent_sessions` and `max_session_duration_seconds` in `AgentLauncher` to prevent runaway costs.

**Video override path:** Set `agent.set_video_track_override_path()` BEFORE calling `join()`, not after.

**Stale audio after interruption:** The framework automatically discards old audio after interruptions. Don't manually flush audio tracks.

**MCP server timeouts:** Remote MCP servers default to 10s timeout. Increase if needed: `MCPServerRemote(url=..., timeout=30.0)`.

**Docker build for cloud:** Always use `--platform linux/amd64` when building for cloud deployment, even on macOS.

---

## Verification Checklist

Before submitting agent code or deploying:

- [ ] **Environment variables set** — All required API keys in `.env` (test with `uv run agent.py run`)
- [ ] **Agent runs locally** — `uv run agent.py run` opens browser demo and accepts voice input
- [ ] **No agent reuse** — Each call creates a new `Agent` instance
- [ ] **Async functions** — All `@llm.register_function()` decorated functions are `async`
- [ ] **Turn detection configured** — Custom pipelines have turn detection (built-in or separate plugin)
- [ ] **Instructions set** — `instructions` parameter is not empty
- [ ] **Session limits set** — `max_concurrent_sessions` and `max_session_duration_seconds` configured for production
- [ ] **Health endpoints working** — `GET /health` and `GET /ready` return 200 when server is running
- [ ] **Metrics accessible** — `GET /calls/{call_id}/sessions/{session_id}/metrics` returns valid JSON
- [ ] **Docker builds** — `docker buildx build --platform linux/amd64` succeeds without errors
- [ ] **Tests pass** — `uv run pytest tests/` runs without failures
- [ ] **No hardcoded secrets** — All API keys in `.env`, not in code

---

## Resources

**Comprehensive navigation:** https://visionagents.ai/llms.txt — Full page-by-page listing for agent reference.

**Critical documentation:**
1. [Quickstart](/introduction/quickstart) — 5-minute setup guide
2. [Voice Agents](/introduction/voice-agents) — Realtime vs custom pipeline decision
3. [HTTP Server & Deployment](/guides/http-server) — Production setup and scaling

---

> For additional documentation and navigation, see: https://visionagents.ai/llms.txt