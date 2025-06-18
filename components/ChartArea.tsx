import { Session } from "@/types";
import MessageBubble from "./MessageBubble";

type ChatAreaProps = {
  activeSession: Session | undefined;
  isLoading: boolean;
};

export default function ChatArea({ activeSession, isLoading }: ChatAreaProps) {
  return (
    <div
      className="w-full max-w-3xl flex-1 overflow-y-auto space-y-6 h-32 overflow-y-scroll"
      style={{ maxHeight: "60vh" }}
    >
      {activeSession?.messages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} />
      ))}

      {isLoading && (
        <div className="bg-gray-700 text-sm px-4 py-2 rounded-lg text-gray-400 italic max-w-2xl mx-auto">
          Thinking...
        </div>
      )}
    </div>
  );
}
