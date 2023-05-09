"use client";
import React, { useCallback, useContext, useEffect } from "react";
import useState from "react-usestateref";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import { AuthContext } from "@/context/Auth";
import { auth } from "@/config/firebase";

interface MessageProps {
  text: string;
  from: string;
  key: number;
}

interface IUser {
  isLoggedIn: boolean;
}

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext) as IUser;
  const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const callApi = async (input: string) => {
    setLoading(true);

    const myMessage: MessageProps = {
      text: input,
      from: "self",
      key: new Date().getTime(),
    };

    setMessages([...messagesRef.current, myMessage]);

    const response = await fetch("/api/generate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: myMessage.text,
      }),
    }).then((response) => response.json());
    setLoading(false);

    if (response.text) {
      const botMessage: MessageProps = {
        text: response.text,
        from: "bot",
        key: new Date().getTime(),
      };
      setMessages([...messagesRef.current, botMessage]);
    } else {
      console.error("Unable to get response text");
    }
  };

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth).then(() => router.push("/auth/login"));
    } catch (err) {
      console.error("Login Failed", err);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <></>;

  return (
    <>
      <div className="flex justify-end pt-6 pr-10">
        <button onClick={handleSignOut}>Sign out</button>
      </div>
      <div className="mainContainer">
        <div className="sticky top-0 w-full pt-10 px-4 bg-white">
          <ChatInput onSend={callApi} isSend={loading} />
        </div>
        <div className="mt-10 px-4">
          {messages.map((msg: MessageProps) => (
            <ChatMessage key={msg.key} text={msg.text} from={msg.from} />
          ))}
          {messages.length === 0 && (
            <p className="text-center text-gray-400">I am at your service</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
