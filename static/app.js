(() => {
  const btnStart = document.getElementById("btnStart");
  const btnStop = document.getElementById("btnStop");
  const btnClear = document.getElementById("btnClear");
  const statusEl = document.getElementById("status");
  const hintEl = document.getElementById("hint");
  const finalEl = document.getElementById("finalText");
  const interimEl = document.getElementById("interimText");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = null;
  let running = false;
  let finalText = "";

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function setButtons(isRunning) {
    btnStart.disabled = isRunning;
    btnStop.disabled = !isRunning;
  }

  function appendFinal(text) {
    const cleaned = (text || "").trim();
    if (!cleaned) return;
    finalText = finalText ? `${finalText} ${cleaned}` : cleaned;
    finalEl.textContent = finalText;
  }

  function clearText() {
    finalText = "";
    finalEl.textContent = "Cleared. Press Start to begin live captions.";
    interimEl.textContent = "";
  }

  function stopRecognition() {
    running = false;
    setButtons(false);
    if (recognition) {
      try {
        recognition.stop();
      } catch (_) {
        // ignore
      }
    }
    setStatus("Idle");
    interimEl.textContent = "";
  }

  function startRecognition() {
    if (!SpeechRecognition) {
      setStatus("Unsupported");
      hintEl.textContent =
        "This browser doesn't support the Web Speech API. Try Chrome or Microsoft Edge.";
      return;
    }

    if (running) return;
    running = true;
    setButtons(true);
    setStatus("Listening…");

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language || "en-US";

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const txt = res[0]?.transcript ?? "";
        if (res.isFinal) {
          appendFinal(txt);
        } else {
          interim += txt;
        }
      }
      interimEl.textContent = interim.trim();
    };

    recognition.onerror = (e) => {
      setStatus("Error");
      const msg =
        e && e.error
          ? `Speech recognition error: ${e.error}.`
          : "Speech recognition error.";
      hintEl.textContent = `${msg} Make sure microphone permissions are allowed.`;
      stopRecognition();
    };

    recognition.onend = () => {
      // Some browsers stop after pauses; auto-restart while "running".
      if (!running) return;
      try {
        recognition.start();
        setStatus("Listening…");
      } catch (_) {
        // If restart fails, fall back to idle.
        stopRecognition();
      }
    };

    try {
      recognition.start();
    } catch (_) {
      setStatus("Error");
      hintEl.textContent =
        "Could not start speech recognition. Please refresh and allow microphone access.";
      stopRecognition();
    }
  }

  btnStart.addEventListener("click", startRecognition);
  btnStop.addEventListener("click", stopRecognition);
  btnClear.addEventListener("click", clearText);

  // Initial state
  setButtons(false);
  if (!SpeechRecognition) {
    setStatus("Unsupported");
    hintEl.textContent =
      "This browser doesn't support the Web Speech API. Try Chrome or Microsoft Edge.";
  }
})();


