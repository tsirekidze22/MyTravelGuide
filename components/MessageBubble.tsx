import { formatMessage } from "@/lib/formatMessage";
import { Message } from "@/types";

export default function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div
      className={`px-6 py-4 rounded-2xl whitespace-pre-line max-w-2xl mx-auto ${
        msg.role === "user"
          ? "bg-blue-600 text-white self-end"
          : "bg-[#2a2a2a] text-white"
      }`}
    >
      {formatMessage(msg.content)}
    </div>
  );
}
