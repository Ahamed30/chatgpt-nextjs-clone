import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { saveApiKey } from "@/config/firebase-api-key";
import { checkApiKey } from "@/utils/check-api-key";

interface FormProps {
  setShowModal: (input: boolean) => void;
}

const GetApiForm = ({ setShowModal }: FormProps) => {
  const user = auth?.currentUser;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const createOneLink = `https://platform.openai.com/account/api-keys`;
  const buttonClassNames =
    "button-primary h-[35px] flex w-auto mt-10 mx-auto justify-center items-center rounded-md px-10 py-2 text-sm font-semibold leading-6";
  const linkClassNames =
    "font-semibold leading-6 text-indigo-600 hover:text-indigo-500";

  const handleSubmit = async () => {
    setIsLoading(true);
    const isKeyValid = await checkApiKey(apiKey);
    if (!isKeyValid) {
      setShowModal(true);
      setIsLoading(false);
      return;
    }
    if (user) {
      await saveApiKey(user?.uid, apiKey);
      localStorage?.setItem("isApiKeyRecieved", "true");
      router?.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="m-auto px-6 py-12 lg:px-8">
      <h2 className="text-center text-2xl font-bold leading-9">
        Please provide your OpenAI api key
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-2">
          <input
            id="apiKey"
            name="apiKey"
            type="name"
            required
            onChange={(event) => setApiKey(event?.target?.value)}
            autoComplete="off"
            className="textBox w-full rounded-md px-1 py-1.5 text-gray-900 focus:outline-none sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className={buttonClassNames}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Image
                src="/three-dot-loader.gif"
                width={35}
                height={35}
                alt="Loading"
              />
            ) : (
              `Proceed`
            )}
          </button>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          {`Don't have an api key? Please `}
          <a href={createOneLink} className={linkClassNames}>
            create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default GetApiForm;
