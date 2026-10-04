# 🐼 Panda AI

Panda Man's personal AI chat web app.

## Features
- Purple/neon responsive UI
- Local browser chat history
- Secure server-side OpenAI calls
- Mobile-friendly design
- Coding-focused assistant personality
- Health/status endpoint
- 🎙️ Browser microphone voice input (Web Speech API)
- 🔊 AI response read-aloud with play/stop controls (Speech Synthesis API)

## Run locally
1. Install Node.js 20+.
2. Run npm install.
3. Copy .env.example to .env.
4. Set OPENAI_API_KEY in .env.
5. Run npm start.
6. Open http://localhost:3000.

## Deployment
Deploy this Node/Express app on a host that supports a Node server. Add OPENAI_API_KEY as a server environment variable. Never commit .env or an API key.

The app uses the OpenAI Responses API. Voice input is handled locally by the browser's Web Speech API; microphone permission is required. Chrome and Edge generally provide the best support. AI response read-aloud uses the browser's built-in Speech Synthesis API and requires no additional API key.
