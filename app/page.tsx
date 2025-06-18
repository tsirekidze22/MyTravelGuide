"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import InputBox from "@/components/InputBox";
import { Message, Session } from "@/types";
import ChatArea from "@/components/ChartArea";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("travelSessions");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    let currentSessionId = activeSessionId;

    if (!currentSessionId) {
      currentSessionId = Date.now().toString();
      const newSession: Session = {
        id: currentSessionId,
        title: input,
        messages: [userMessage],
      };
      setSessions((prev) => [...prev, newSession]);
      setActiveSessionId(currentSessionId);
    } else {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? {
                ...s,
                messages: [...s.messages, userMessage],
                title: s.title === "New Chat" ? input : s.title,
              }
            : s
        )
      );
    }

    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiMessage: Message = {
        role: "ai",
        content: data.result || "No response.",
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? { ...s, messages: [...s.messages, aiMessage] }
            : s
        )
      );
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };
    setSessions((prev) => [...prev, newSession]);
    setActiveSessionId(newSession.id);
  };

  useEffect(() => {
    localStorage.setItem("travelSessions", JSON.stringify(sessions));
  }, [sessions]);

  return (
    <main className="flex flex-col md:flex-row h-screen w-screen bg-[#212121] text-white">
      <button
        className="md:hidden fixed top-4 text-xl left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        ☰
      </button>

      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        setActiveSessionId={setActiveSessionId}
        setSessions={setSessions}
        handleNewChat={handleNewChat}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <section className="flex-1 flex flex-col items-center justify-center px-6">
        <header className="mb-4 text-center max-w-3xl">
          <h1 className="text-5xl font-extrabold text-white">
            Your Travel Guide
          </h1>
          <p className="mt-3 text-xl text-gray-400">
            Ask me to plan your perfect day exploring cities around the world!
          </p>
        </header>

        <ChatArea activeSession={activeSession} isLoading={isLoading} />
        <InputBox
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
}
