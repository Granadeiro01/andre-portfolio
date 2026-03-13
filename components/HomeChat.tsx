"use client";

import { useState, useRef, useEffect } from "react";
import { FadeIn } from "@/components/Animations";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function HomeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hey there! Ready to dive deeper into Andre&apos;s universe?",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message to chat
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: newMessages.slice(0, -1),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      // Handle navigation intent
      if (data.intent === "navigate" && data.action?.target) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
          },
        ]);
        // Navigate after a short delay
        setTimeout(() => {
          window.location.href = data.action.target;
        }, 500);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
          },
        ]);
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FadeIn>
      <div className="w-full bg-gray-800/30 border border-gray-700/50 rounded-lg overflow-hidden flex flex-col h-[500px] sm:h-[600px]">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500/20 border border-blue-500/30 text-blue-100"
                    : "bg-gray-700/30 border border-gray-600/30 text-gray-100"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700/30 border border-gray-600/30 px-4 py-3 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-500/10 border border-red-500/30 px-4 py-2 rounded text-red-300 text-sm">
                {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-700/30 p-4 bg-gray-900/50">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gray-700/30 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white placeholder-gray-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </FadeIn>
  );
}
