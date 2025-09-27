import { user } from "@/app/types/chat";
import React from "react";

const ServerMessage = ({ user }: { user: user }) => {
  return <div className="text-xs text-gray-200 mb-1">{user.name}</div>;
};

export default ServerMessage;
