import React from "react";
import { ChatMessage } from "../types/chat";
import Message from "./Messages/Message";

interface ChatProps {
  chat: ChatMessage[];
  user: { name: string; id: string };
  isTyping: { name: string; isTyping: boolean }[];
}

const Chat = ({ chat, user, isTyping }: ChatProps) => {
  return (
    <div className="h-full pb-12">
      <div className="w-full h-[85vh] max-h-screen rounded-md overflow-y-auto gradient p-4 md:p-6 bg-gray-700 flex flex-col gap-4">
        {chat.map((msg, index) => {
          const message = { ...msg, own: msg.user.id === user.id };
          return <Message key={index} {...message} />;
        })}
        {isTyping.length > 0 && (
          <div className="text-white text-sm">
            {isTyping
              .filter((u) => u.name !== user.name)
              .map((u) => u.name)
              .join(", ")}{" "}
            is typing...
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
