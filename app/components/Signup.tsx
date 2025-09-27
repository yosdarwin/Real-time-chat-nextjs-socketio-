import React from "react";
import { Socket } from "socket.io-client";
interface SignupProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setUser: (user: string, id: string) => void;
  socket: Socket;
}

const Signup = ({ input, setInput, setUser, socket }: SignupProps) => {
  const addUser = () => {
    const socketId = socket.id || "";
    setUser(input, socketId);
    socket.emit("add_user", { name: input, id: socketId });
    setInput("");
  };
  return (
    <div className="space-y-4 min-h-screen flex flex-col items-center justify-center md:container ">
      <div className="max-w-md space-y-4 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 p-6">
        <h1 className="text-4xl  font-bold text-center text-white">Signup</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
          placeholder="..."
          className="w-full py-2 px-4 rounded-md bg-white placeholder:text-gray-800 focus:outline-0 text-gray-800 text-center"
        />
        <button
          onClick={addUser}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Signup;
