"use client";
import { Button } from "@/app/components/ui/button";
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
    recognition.lang = "zh-TW";
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
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-4">
      <textarea
        ref={textRef}
        className="w-full p-4 border border-gray-300 rounded-xl resize-none min-h-[120px] text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="請開始語音輸入..."
      />
      <Button
        onClick={handleVoiceInput}
        className="w-full bg-green-500 text-white text-xl font-extrabold py-4 rounded-2xl hover:bg-green-600 transition-colors"
      >
        開始語音輸入
      </Button>
    </div>
  );
};

export default VoiceInput;
