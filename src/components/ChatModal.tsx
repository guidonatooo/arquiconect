
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";

interface Message {
  id: number;
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
}

const ChatModal = ({ open, onClose, contactName, projectName, status, initialMessages }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Você",
        message: newMessage,
        timestamp: new Date().toLocaleString('pt-BR'),
        isFromUser: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovada":
        return "bg-green-100 text-green-800";
      case "Em negociação":
        return "bg-yellow-100 text-yellow-800";
      case "Aguardando resposta":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{contactName}</DialogTitle>
              <p className="text-sm text-gray-600">{projectName}</p>
            </div>
            <Badge className={getStatusColor(status)}>
              {status}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-md bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isFromUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.isFromUser 
                  ? 'bg-primary text-white' 
                  : 'bg-white border shadow-sm'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar className="w-6 h-6 bg-gray-400 text-white flex items-center justify-center text-xs">
                    {msg.sender.charAt(0)}
                  </Avatar>
                  <span className={`text-xs font-medium ${msg.isFromUser ? 'text-white' : 'text-gray-600'}`}>
                    {msg.sender}
                  </span>
                </div>
                <p className={`text-sm ${msg.isFromUser ? 'text-white' : 'text-gray-800'}`}>
                  {msg.message}
                </p>
                <p className={`text-xs mt-1 ${msg.isFromUser ? 'text-white/80' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 mt-4">
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
