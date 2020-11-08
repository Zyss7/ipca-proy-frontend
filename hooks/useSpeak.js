import { useEffect, useState } from "react";

export const useSpeak = ({ validarSpeaking = false } = {}) => {
  const [isSpeaking, setSpeaking] = useState(false);
  const [synth, setSynth] = useState(null);
  const _speak = (text) => {
    SpeechSynthesisUtterance.lang = "es-Es";
    console.log(synth.getVoices());
    const speakText = new SpeechSynthesisUtterance(text);

    synth.speak(speakText);
    speakText.onstart = (e) => setSpeaking(true);
    speakText.onend = (e) => setSpeaking(false);
  };
  /*
  const [window, setWindow] = useState(null);
*/
  useEffect(() => {
    setSynth(window?.speechSynthesis);
  }, []);

  const speak = (text) => {
    if (validarSpeaking) {
      if (!isSpeaking) {
        _speak(text);
      }
    } else {
      _speak(text);
    }
  };

  const stopSpeak = () => {
    synth.cancel();
  };

  return { speak, isSpeaking, stopSpeak };
};
