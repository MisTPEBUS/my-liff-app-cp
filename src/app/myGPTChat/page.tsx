import ChatComponent from "./_components/ChatComponent/ChatComponent";
import VoiceInput from "./_components/VoiceInput/VoiceInput";

export const myGPTChat = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <ChatComponent />
      <VoiceInput></VoiceInput>
    </div>
  );
};

export default myGPTChat;
