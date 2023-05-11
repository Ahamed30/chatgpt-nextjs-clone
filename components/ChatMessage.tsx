import React from "react";
import Image from "next/image";

interface MessageProps {
  text: string;
  from: string;
  key: number;
}

const ChatMessage = ({ text, from }: MessageProps) => {
  if (from === "self") {
    return (
      <div className="bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
        <Image src="/user-icon.png" width={20} height={20} alt="User" />
        <p className="text-gray-700">{text}</p>
      </div>
    );
  }

  return (
    <div className="h-auto bg-gray-100 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
      <Image src="/chatgpt-logo.jpg" width={20} height={60} alt="Bot" />
      <p className="text-gray-700 overflow-x-auto">{text}</p>
    </div>
  );
};

export default ChatMessage;
