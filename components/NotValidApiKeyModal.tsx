import React from "react";

interface ModalProps {
  isVisible: boolean;
  setShowModal: (input: boolean) => void;
}

const NotValidApiKeyModal = ({ isVisible, setShowModal }: ModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex justify-center items-center">
      <div className="w-[450px]">
        <div className="bg-white p-5 rounded-lg">
          Your API key is invalid. Please provide a valid one!
          <button
            onClick={() => setShowModal(false)}
            className=" button-primary flex w-auto my-4 mx-auto justify-center rounded-md px-10 py-1.5 text-sm font-semibold leading-6"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotValidApiKeyModal;
