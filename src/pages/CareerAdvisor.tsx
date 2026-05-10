import { useState, useRef, useEffect } from "react";
import { Bot, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

const CHAT_STORAGE_KEY = "careerpath_advisor_chat";

const OPENING_MESSAGE: ChatMessage = {
  role: "ai",
  content:
    "Hi! I'm your AI career advisor 👋 Tell me — what subjects or activities do you genuinely enjoy? Don't think about jobs yet, just what feels natural to you.",
};

const STARTER_QUESTIONS = [
  "I enjoy helping people but don't know what career suits me",
  "I like technology and problem-solving — where do I start?",
  "I'm creative but unsure if creative careers pay well",
  "What careers are in demand in Malaysia right now?",
];

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Bot className="h-4 w-4 text-primary" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0ms" }} />
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "150ms" }} />
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

const CareerAdvisor = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore parse errors
    }
    return [OPENING_MESSAGE];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Persist chat to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore write errors
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleClearChat = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY);
    setMessages([OPENING_MESSAGE]);
  };

  const sendMessage = async (messageText?: string) => {
    const trimmed = (messageText ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = updatedMessages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content,
      }));

      const { data, error } = await supabase.functions.invoke("career-advisor", {
        body: { message: trimmed, history },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });

      if (error) throw error;

      const aiContent =
        data?.reply ??
        (data?.advice
          ? typeof data.advice === "string"
            ? data.advice
            : formatAdvice(data.advice)
          : "I couldn't generate a response. Please try again.");

      setMessages((prev) => [...prev, { role: "ai", content: aiContent }]);
    } catch {
      toast({
        title: "Connection issue — please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isFirstMessage = messages.length === 1;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="relative border-b border-border bg-card px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              AI Career Advisor
            </h1>
            <p className="text-sm text-muted-foreground">
              Describe your interests and I'll help you find the right career path
            </p>
          </div>
        </div>
        <div className="absolute right-6 top-5 flex items-center gap-2">
          {!isFirstMessage && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
              onClick={handleClearChat}
            >
              <Trash2 className="h-3 w-3" />
              Clear chat
            </Button>
          )}
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/15 to-teal-500/15 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-500/20">
            <span className="mr-1">💼</span> SDG 8 Aligned
          </span>
        </div>
      </div>

      {/* Chat messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.role === "ai" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-muted text-foreground"
                }`}
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider opacity-60">
                  {msg.role === "user" ? "You" : "Advisor"}
                </p>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && <TypingIndicator />}

          {/* Starter questions — only shown before first user message */}
          {isFirstMessage && !isLoading && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-center text-muted-foreground">
                Not sure where to start? Try one of these:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-card px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
            AI guidance only. Always research careers thoroughly before making decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

function formatAdvice(advice: Record<string, unknown>): string {
  const parts: string[] = [];
  if (Array.isArray(advice.strengths) && advice.strengths.length > 0) {
    parts.push("**Strengths to Leverage:**\n" + (advice.strengths as string[]).map((s) => `- ${s}`).join("\n"));
  }
  if (Array.isArray(advice.improvements) && advice.improvements.length > 0) {
    parts.push("**Areas to Improve:**\n" + (advice.improvements as string[]).map((s) => `- ${s}`).join("\n"));
  }
  if (Array.isArray(advice.nextSteps) && advice.nextSteps.length > 0) {
    parts.push("**Recommended Next Steps:**\n" + (advice.nextSteps as string[]).map((s) => `- ${s}`).join("\n"));
  }
  if (typeof advice.encouragement === "string" && advice.encouragement) {
    parts.push(advice.encouragement);
  }
  return parts.join("\n\n") || JSON.stringify(advice, null, 2);
}

export default CareerAdvisor;