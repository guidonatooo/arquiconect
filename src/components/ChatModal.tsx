
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isFromUser: boolean;
}

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  contactName: string;
  projectName: string;
  status: string;
  initialMessages: Message[];
  storageKey?: string;
}

const STATUS_COLORS: Record<string, string> = {
  "Aprovada": "bg-green-100 text-green-800",
  "Em negociação": "bg-yellow-100 text-yellow-800",
  "Aguardando resposta": "bg-blue-100 text-blue-800",
  "Nova proposta": "bg-blue-100 text-blue-800",
  "Em andamento": "bg-yellow-100 text-yellow-800",
  "Completo": "bg-green-100 text-green-800",
};

const ChatModal = ({
  open,
  onClose,
  contactName,
  projectName,
  status,
  initialMessages,
  storageKey,
}: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage if storageKey provided, otherwise use initialMessages
  useEffect(() => {
    if (!open) return;
    if (storageKey) {
      const stored = localStorage.getItem(`chat_${storageKey}`);
      setMessages(stored ? JSON.parse(stored) : initialMessages);
    } else {
      setMessages(initialMessages);
    }
  }, [open, storageKey]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text) return;

    const msg: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      sender: "Você",
      message: text,
      timestamp: new Date().toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'America/Sao_Paulo',
      }),
      isFromUser: true,
    };

    const updated = [...messages, msg];
    setMessages(updated);
    setNewMessage("");

    if (storageKey) {
      localStorage.setItem(`chat_${storageKey}`, JSON.stringify(updated));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const statusColor = STATUS_COLORS[status] || "bg-gray-100 text-gray-800";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 pb-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-base">{contactName}</DialogTitle>
              <p className="text-sm text-gray-500 mt-0.5">{projectName}</p>
            </div>
            <Badge className={statusColor}>{status}</Badge>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50"
        >
          {messages.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-8">
              Nenhuma mensagem ainda. Inicie a conversa!
            </p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isFromUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl ${
                  msg.isFromUser
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-white border shadow-sm rounded-bl-sm"
                }`}
              >
                {!msg.isFromUser && (
                  <p className="text-xs font-semibold text-gray-600 mb-1">{msg.sender}</p>
                )}
                <p className={`text-sm ${msg.isFromUser ? "text-white" : "text-gray-800"}`}>
                  {msg.message}
                </p>
                <p className={`text-xs mt-1 ${msg.isFromUser ? "text-white/70" : "text-gray-400"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex space-x-2 p-4 border-t bg-white">
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
