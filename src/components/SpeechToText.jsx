import React, { useState, useEffect } from "react";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if the Web Speech API is supported
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    const recognitionInstance = new webkitSpeechRecognition();
    recognitionInstance.lang = "en-US";
    recognitionInstance.interimResults = true;

    recognitionInstance.onresult = (event) => {
      let newTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        newTranscript += event.results[i][0].transcript;
      }
      setTranscript(newTranscript);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <div>
        <h2>Transcript:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
