"use client";
import { Session } from "@/types";

type SidebarProps = {
  sessions: Session[];
  activeSessionId: string | null;
  setActiveSessionId: (id: string | null) => void;
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  handleNewChat: () => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
};

export default function Sidebar({
  sessions,
  activeSessionId,
  setActiveSessionId,
  setSessions,
  handleNewChat,
  showSidebar,
  setShowSidebar,
}: SidebarProps) {
  return (
    <aside
      className={`
    fixed top-0 left-0 h-full z-40 w-64 bg-[#181818] border-r border-gray-700 p-4 flex-col transition-transform duration-300
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
    md:relative md:translate-x-0 md:flex
  `}
    >
      <button
        className="md:hidden mb-4 text-white self-end text-xl"
        onClick={() => setShowSidebar(false)}
      >
        ×
      </button>

      <h2 className="text-xl font-semibold mb-4 text-white">History</h2>

      <button
        onClick={handleNewChat}
        className="mb-4 px-4 py-2 rounded-lg border border-gray-500 text-white bg-transparent hover:bg-gray-700 transition duration-200 cursor-pointer"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto text-sm text-gray-300 space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`flex justify-between items-center p-2 rounded-lg transition duration-200 cursor-pointer ${
              session.id === activeSessionId
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveSessionId(session.id)}
          >
            <span className="truncate w-40">{session.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSessions((prev) => prev.filter((s) => s.id !== session.id));
                if (session.id === activeSessionId) {
                  setActiveSessionId(null);
                }
              }}
              className="text-white hover:text-red-500 transition duration-150 px-2 py-0.5 rounded-full hover:bg-gray-600"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
