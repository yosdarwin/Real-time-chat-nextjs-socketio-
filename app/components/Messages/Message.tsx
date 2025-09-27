import Image from "next/image";
import React from "react";
import ServerMessage from "./ServerMessage";
interface MessageProps {
  content: string;
  own: boolean;
  user: { name: string; id: string };
  type: "text" | "image" | "server";
}

const Message = ({ content, own, user, type }: MessageProps) => {
  return (
    <div
      className={` rounded-md ${
        type === "server" && "mx-auto bg-gray-800"
      }  max-w-xs ${
        own && type !== "server"
          ? "self-start bg-blue-500 w-auto p-4"
          : "self-end bg-gray-500"
      } ${type !== "server" && type === "text" ? " py-2 px-4" : " p-2"}`}
    >
      {type === "server" && <span className="text-white">{content}</span>}
      {type !== "server" && !own && <ServerMessage user={user} />}
      {type === "text" ? (
        <span className="text-white">{content}</span>
      ) : type === "image" ? (
        <Image
          src={content}
          alt={user.name}
          width={700}
          height={400}
          className="w-52 h-36 rounded-md object-cover"
        />
      ) : null}
    </div>
  );
};

export default Message;
