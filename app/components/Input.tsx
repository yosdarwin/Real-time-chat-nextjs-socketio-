import React, { useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { ChatMessage } from "../types/chat";

interface InputProps {
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  user: { name: string; id: string };
  socket: Socket;
}

const Input = ({ setChat, user, socket }: InputProps) => {
  const [input, setInput] = useState("");
  const uploadInput = useRef<HTMLInputElement>(null);
  const userTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit("is_typing", {
      name: user.name,
      isTyping: e.target.value ? true : false,
    });
  };
  const sendMessage = () => {
    if (input.trim() === "") {
      uploadInput.current?.click();
    } else {
      const msg: ChatMessage = {
        content: input,
        user: { name: user.name, id: user.id },
        type: "text",
      };
      socket.emit("chat_message", msg);
      setChat((prev: ChatMessage[]) => [...prev, msg]);
      setInput("");
    }
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file?.type === "image/png" || file?.type === "image/jpeg") {
      const imgUrl = URL.createObjectURL(file);
      const msg: ChatMessage = {
        content: imgUrl,
        user: { name: user.name, id: user.id },
        type: "image",
      };
      setChat((prev: ChatMessage[]) => [...prev, msg]);
      socket.emit("chat_message", msg);
    }
  };
  return (
    <div className="rounded-md bg-gray-200 p-4 flex items-center gap-4">
      <input
        type="text"
        value={input}
        onChange={(e) => userTyping(e)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="w-full h-8 rounded-md px-4 outline-none focus:outline-0 text-black"
        placeholder="type message here"
      />
      <input
        type="file"
        className="hidden"
        ref={uploadInput}
        onChange={handleFileUpload}
      />
      <button
        onClick={sendMessage}
        className="py-2 px-8 cursor-pointer rounded-md bg-blue-800 text-white hover:bg-blue-900 transition-colors"
      >
        Send
      </button>
    </div>
  );
};

export default Input;
