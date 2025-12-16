# Deaf Assistant (Local Live Captions)

A lightweight, professional **local-host web app** that turns **spoken words (microphone audio)** into **large on-screen text** for deaf/hard-of-hearing users.

## Requirements

- Python 3.10+
- A browser with Web Speech API support (recommended: Chrome or Microsoft Edge)

## Run locally (localhost)

1. Create + activate a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the server:

   ```bash
   python main.py
   ```

4. Open the app:

- `http://127.0.0.1:5000/`

Press **Start** and allow microphone permissions.

## Configuration

You can override host/port with environment variables:

```bash
HOST=0.0.0.0 PORT=5000 DEBUG=1 python main.py
```

## Tests

```bash
pytest
```
