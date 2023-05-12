"use client";
import React, { useEffect } from "react";
import useState from "react-usestateref";
import { useRouter } from "next/navigation";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import { auth } from "@/config/firebase";
import SignOutModal from "@/components/SignOutModal";
import SignOut from "@/components/SignOut";
import ChatLoader from "@/components/ChatLoader";
import { getResponseData } from "@/utils/get-response-data";

interface IMessage {
  text: string;
  from: string;
  key: number;
}

interface InputProps {
  inputText: string;
  creator: string;
}

const Home = () => {
  const [messages, setMessages, messagesRef] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const router = useRouter();
  const user = auth?.currentUser;
  const userName = user?.displayName ?? `there`;

  const getMessage = ({ inputText, creator }: InputProps) => {
    const currentMessage: IMessage = {
      text: inputText,
      from: creator,
      key: new Date().getTime(),
    };
    return currentMessage;
  };

  const callApi = async (input: string) => {
    setLoading(true);

    setMessages([
      ...messagesRef?.current,
      getMessage({ inputText: input, creator: "self" }),
    ]);

    try {
      const userId = user?.uid ?? "";
      const response = await getResponseData(input, userId);
      setLoading(false);
      setMessages([
        ...messagesRef?.current,
        getMessage({ inputText: response, creator: `bot` }),
      ]);
    } catch (error) {
      console.error("Failed to fetch answer", error);
      setLoading(false);
      setMessages([
        ...messagesRef?.current,
        getMessage({
          inputText: `Unable to get response text`,
          creator: "bot",
        }),
      ]);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage?.getItem("isLoggedIn");
    if (!isLoggedIn && !showSignOutModal) {
      router?.replace("/auth/login");
    }
  }, [router, showSignOutModal]);

  return (
    <>
      <SignOut setShowSignOutModal={setShowSignOutModal} />
      <div className="mainContainer">
        <div className="sticky top-0 w-full pt-10 px-4 bg-white">
          <ChatInput onSend={callApi} isSend={loading} />
        </div>
        <div className="mt-10 px-4">
          {messages?.map((msg: IMessage) => (
            <ChatMessage key={msg?.key} text={msg?.text} from={msg?.from} />
          ))}
          {loading && <ChatLoader />}
          {messages?.length === 0 && (
            <p className="text-center text-gray-400">{`Hello ${userName}! How can we assist you today?`}</p>
          )}
        </div>
      </div>
      <SignOutModal isVisible={showSignOutModal} />
    </>
  );
};

export default Home;
