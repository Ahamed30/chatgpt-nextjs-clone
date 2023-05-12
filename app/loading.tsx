import React from "react";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Image src="/three-dot-loader.gif" width={35} height={35} alt="Loading" />
    </div>
  );
};

export default LoadingPage;
