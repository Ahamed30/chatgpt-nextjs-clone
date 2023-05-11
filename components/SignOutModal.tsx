import React from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  isVisible: boolean;
}

const SignOutModal = ({ isVisible }: ModalProps) => {
  if (!isVisible) return null;

  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex justify-center items-center">
      <div className="w-[450px]">
        <div className="bg-white p-5 rounded-lg text-md font-semibold text-gray-500">
          You have been successfully signed out. For security purposes, any API
          key that was provided has been deleted.
          <button
            onClick={() => router?.push("/auth/login")}
            className=" button-primary flex w-auto my-4 mx-auto justify-center rounded-md px-10 py-1.5 text-sm font-semibold leading-6"
          >
            Go to login page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
