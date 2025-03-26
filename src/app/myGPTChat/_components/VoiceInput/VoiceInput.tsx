"use client";
import { useRef } from "react";

type SpeechRecognitionType = {
  new (): SpeechRecognitionInstance;
};

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

type SpeechRecognitionEvent = Event & {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
};

const VoiceInput = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (
        window as unknown as {
          SpeechRecognition: SpeechRecognitionType;
          webkitSpeechRecognition: SpeechRecognitionType;
        }
      ).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: SpeechRecognitionType })
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("此瀏覽器不支援語音辨識，請使用 Chrome");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "zh-TW"; // 語言設定為繁體中文
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      if (textRef.current) {
        textRef.current.value += transcript;
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("語音辨識錯誤:", event.error);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col items-start gap-4 p-4">
      <textarea
        ref={textRef}
        className="w-full p-3 border rounded-lg resize-none min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="請開始語音輸入..."
      />
      <button
        onClick={handleVoiceInput}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        🎤 開始語音輸入
      </button>
    </div>
  );
};

export default VoiceInput;
