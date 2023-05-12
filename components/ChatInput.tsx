import React, { useState } from "react";
import Image from "next/image";

interface InputProps {
  onSend: (input: string) => void;
  isSend: boolean;
}

const ChatInput = ({ onSend, isSend }: InputProps) => {
  const [textInput, setTextInput] = useState("");

  const sendInput = (event: any) => {
    if (!textInput || textInput?.trim()?.length === 0) return;
    event.preventDefault();
    onSend(textInput);
    setTextInput("");
  };

  const handleKeyDown = (event: any) => {
    if (event?.keyCode === 13 && !event?.shiftKey) {
      sendInput(event);
    }
  };

  const isSendContent = isSend && (
    <Image
      height={20}
      width={20}
      src="/icon-loader.gif"
      alt="sending message"
      className="textAreaIcon"
    />
  );

  const isLoadingContent = !isSend && (
    <button onClick={(event) => sendInput(event)}>
      <Image
        height={20}
        width={20}
        src="/message-arrow-icon.png"
        alt="send-message"
        className="textAreaIcon"
      />
    </button>
  );

  return (
    <div className="textArea w-full mt-2">
      <textarea
        value={textInput}
        onChange={(event: any) => setTextInput(event?.target?.value)}
        id="message"
        rows={3}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500"
        placeholder="Ask something..."
        onKeyDown={(event) => handleKeyDown(event)}
      ></textarea>
      {isSendContent}
      {isLoadingContent}
    </div>
  );
};

export default ChatInput;
