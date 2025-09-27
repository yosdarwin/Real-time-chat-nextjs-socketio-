export interface ChatMessage {
  content: string;
  user: { name: string; id: string };  
  type: "text" | "image" | "server";
}

export interface user {
  name: string;
  id: string;
}