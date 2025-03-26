import ChatComponent from "./_components/ChatComponent/ChatComponent";
import VoiceInput from "./_components/VoiceInput/VoiceInput";

export const myGPTChat = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      {/*   <ChatComponent /> */}
      <VoiceInput></VoiceInput>
    </div>
  );
};

export default myGPTChat;
