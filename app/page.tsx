"use client";
import React, { useContext, useEffect } from "react";
import useState from "react-usestateref";
import { useRouter } from "next/navigation";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import { AuthContext } from "@/context/Auth";
import { auth } from "@/config/firebase";
import SignOutModal from "@/components/SignOutModal";
import SignOut from "@/components/SignOut";
import { IUser } from "@/types/User";
import ChatLoader from "@/components/ChatLoader";

interface IMessage {
  text: string;
  from: string;
  key: number;
}

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext) as IUser;
  const [messages, setMessages, messagesRef] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const router = useRouter();
  const user = auth?.currentUser;
  const userName = user?.displayName ?? `there`;

  const callApi = async (input: string) => {
    setLoading(true);

    const myMessage: IMessage = {
      text: input,
      from: "self",
      key: new Date().getTime(),
    };

    setMessages([...messagesRef?.current, myMessage]);

    const response = await fetch("/api/generate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: myMessage?.text,
        userId: user?.uid,
      }),
    }).then((response) => {
      return response.json();
    });
    setLoading(false);

    if (response.text) {
      const botMessage: IMessage = {
        text: response?.text,
        from: "bot",
        key: new Date().getTime(),
      };
      setMessages([...messagesRef?.current, botMessage]);
    } else {
      console.error("Unable to get response text");
    }
  };

  useEffect(() => {
    if (!isLoggedIn && !showSignOutModal) {
      router?.push("/auth/login");
    }
  }, [isLoggedIn, router]);

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
