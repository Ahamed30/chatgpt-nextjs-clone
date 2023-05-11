import React from "react";
import Image from "next/image";

const ChatLoader = () => {
  return (
    <div className="h-auto bg-gray-100 p-4 rounded-lg flex justify-center items-center whitespace-pre-wrap">
      <Image src="/three-dot-loader.gif" width={35} height={35} alt="Loading" />
    </div>
  );
};

export default ChatLoader;
