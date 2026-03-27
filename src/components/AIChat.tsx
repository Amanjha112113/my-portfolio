import { useState, useRef, useEffect } from "react";
import "./styles/AIChat.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "SYSTEM_ONLINE. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Initial empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n\n");
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.replace("data: ", "");
              if (data === "[DONE]") {
                setIsTyping(false);
                break;
              }
              // Update last message
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastIdx = newMessages.length - 1;
                newMessages[lastIdx] = {
                  ...newMessages[lastIdx],
                  content: newMessages[lastIdx].content + data
                };
                return newMessages;
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIdx = newMessages.length - 1;
        newMessages[lastIdx] = {
          role: "assistant",
          content: "ERROR: Connection refused or backend offline."
        };
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`ai-chat-wrapper ${isOpen ? "open" : ""}`}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button className="ai-chat-toggle stitch-glass-panel stitch-bloom-glow" onClick={() => setIsOpen(true)}>
           <span className="stitch-status-dot"></span>
           <span className="stitch-tech-font">AI_AGENT</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window stitch-glass-panel">
          
          {/* Header */}
          <div className="ai-chat-header border-bottom-glass">
            <div className="flex-align">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="var(--primary)"><path d="M320-240v-80h-80l-80-80v-160l80-80h80v-80h320v80h80l80 80v160l-80 80h-80v80H320Zm80-160h160v-80h80v-80h-80v-80H400v80h-80v80h80v80Z"/></svg>
              <h3 className="stitch-display-font">SYSTEM_ARCHITECT <span className="slash">//</span></h3>
            </div>
            <button className="ai-chat-close" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="ai-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.role}`}>
                <div className="ai-message-bubble">
                  <span className="ai-message-role stitch-tech-font">
                    {msg.role === "assistant" ? "AGENT_OUTPUT >" : "USER_INPUT >"}
                  </span>
                  <p className="stitch-tech-font typing-content">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message assistant">
                <div className="ai-message-bubble">
                   <span className="ai-message-role stitch-tech-font">AGENT_OUTPUT &gt;</span>
                   <span className="stitch-cursor-blink"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form className="ai-chat-input-area border-top-glass" onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="ai-chat-input stitch-tech-font" 
              placeholder="ENTER_COMMAND..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className="ai-chat-submit" disabled={!input.trim() || isTyping}>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </button>
          </form>
          
          <div className="scanning-line-subtle"></div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
