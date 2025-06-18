export type Message = {
  role: "user" | "ai";
  content: string;
};

export type Session = {
  id: string;
  title: string;
  messages: Message[];
};
