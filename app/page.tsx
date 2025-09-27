"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Signup from "./components/Signup";
import Input from "./components/Input";
import Chat from "./components/Chat";
import { ChatMessage } from "./types/chat";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState<
    { name: string; isTyping: boolean }[]
  >([]);
  const user = useRef<{ name: string; id: string }>({ name: "", id: "" });
  useEffect(() => {
    console.log("Socket connecting...");

    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
    });

    socket.on("chat_message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    socket.on("add_user", (user) => {
      setChat((prev) => [
        ...prev,
        {
          content: `${user.name} joined the chat`,
          user,
          type: "server",
        },
      ]);
    });
    socket.on("is_typing", (data) => {
      if (!data.name) return;
      setIsTyping((prev) => {
        const filtered = prev.filter((u) => u.name !== data.name);
        return data.isTyping 
          ? [...filtered, { name: data.name, isTyping: true }]
          : filtered;
      });
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
      socket.off("add_user");
      socket.off("is_typing");
    };
  }, []);

  const setUser = (name: string, id: string) => {
    user.current = { name, id };
  };

  return (
    <div className="h-screen max-h-screen max-w-screen mx-auto md:container md:p-20 md:pt-4">
      {user.current.name ? (
        <>
          <Chat chat={chat} user={user.current} isTyping={isTyping} />
          <Input setChat={setChat} user={user.current} socket={socket} />
        </>
      ) : (
        <Signup
          input={input}
          setInput={setInput}
          setUser={setUser}
          socket={socket}
        />
      )}
    </div>
  );
}
