"use client";

import React, { useState, KeyboardEvent } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface ChatModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
}

export function ChatModal({
  isOpen,
  onOpenChange,
  trigger,
  initialMessages = [],
  onSendMessage,
}: ChatModalProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: "1",
            content:
              "Hi there! I'm Sultan's AI assistant. What would you like to know about Sultan?",
            role: "assistant",
            timestamp: new Date(),
          },
        ]
  );

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (onSendMessage) {
      onSendMessage(input);
    }

    setInput("");

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for asking about Sultan. That's a great question about "${input}". Sultan is a developer with expertise in web development and AI.`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    >
      {/* Use trigger if provided, otherwise fallback to default */}
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className="w-full justify-center">Ask about me</Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] h-[600px] max-h-[80vh] flex flex-col fixed inset-0 z-[1000] w-full md:w-[425px] md:h-[600px] md:max-h-[80vh] md:rounded-lg [&>button]:hidden"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
          padding: 0,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="relative p-4 border-b">
          <DialogTitle>Chat with AI</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-2 hover:bg-red-600 hover:text-white"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-8 w-8" />
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center space-x-2 p-4 border-t">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
