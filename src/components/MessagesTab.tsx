
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import ChatModal from "./ChatModal";

interface MessageItem {
  id: number;
  sender: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  projectName: string;
  status: string;
}

const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 1,
    sender: "João Silva - Materiais de Construção",
    subject: "Proposta para Casa Moderna - Centro",
    message: "Olá! Tenho interesse em fornecer os materiais para seu projeto. Posso oferecer um desconto de 15% em tijolos e cimento.",
    date: "2024-01-20",
    isRead: false,
    projectName: "Casa Moderna - Centro",
    status: "Nova proposta"
  },
  {
    id: 2,
    sender: "Maria Santos - Pisos e Revestimentos",
    subject: "Orçamento Porcelanato Premium",
    message: "Boa tarde! Elaborei um orçamento completo para os pisos do seu projeto. Tenho algumas opções interessantes em porcelanato.",
    date: "2024-01-19",
    isRead: true,
    projectName: "Casa Moderna - Centro",
    status: "Em andamento"
  },
  {
    id: 3,
    sender: "Carlos Ferreira - Esquadrias",
    subject: "Janelas e Portas de Alumínio",
    message: "Prezado arquiteto, gostaria de apresentar nossa linha premium de esquadrias de alumínio. Temos ótimos preços para projetos residenciais.",
    date: "2024-01-18",
    isRead: true,
    projectName: "Geral",
    status: "Completo"
  }
];

const INITIAL_HISTORY: Record<string, Array<{ id: string; sender: string; message: string; timestamp: string; isFromUser: boolean }>> = {
  "1": [
    { id: "1", sender: "João Silva", message: "Olá! Vi seu projeto Casa Moderna e gostaria de fazer uma proposta para os materiais básicos.", timestamp: "20/01/2024 09:00", isFromUser: false },
    { id: "2", sender: "Você", message: "Olá João! Obrigado pelo interesse. Qual seria sua proposta?", timestamp: "20/01/2024 09:15", isFromUser: true },
    { id: "3", sender: "João Silva", message: "Posso fornecer todos os tijolos e cimento com 15% de desconto. Entrega incluída.", timestamp: "20/01/2024 10:30", isFromUser: false }
  ],
  "2": [
    { id: "1", sender: "Maria Santos", message: "Boa tarde! Tenho interesse no seu projeto. Trabalho com pisos e revestimentos de alta qualidade.", timestamp: "19/01/2024 14:00", isFromUser: false }
  ]
};

const STATUS_COLORS: Record<string, string> = {
  "Completo": "bg-green-100 text-green-800",
  "Em andamento": "bg-yellow-100 text-yellow-800",
  "Nova proposta": "bg-blue-100 text-blue-800",
};

const MessagesTab = () => {
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [showChat, setShowChat] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleOpenChat = (message: MessageItem) => {
    // Mark as read when opening
    if (!message.isRead) {
      setMessages(prev =>
        prev.map(m => m.id === message.id ? { ...m, isRead: true } : m)
      );
    }
    setSelectedMessage(message);
    setShowChat(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Mensagens dos Fornecedores
              {unreadCount > 0 && (
                <Badge className="bg-primary text-white text-xs">
                  {unreadCount} nova{unreadCount > 1 ? 's' : ''}
                </Badge>
              )}
            </CardTitle>
          </div>
          <p className="text-sm text-gray-600">
            Visualize propostas e mensagens dos fornecedores interessados nos seus projetos
          </p>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma mensagem ainda.</p>
              <p className="text-sm text-gray-400 mt-2">
                As mensagens dos fornecedores aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card
                  key={message.id}
                  className={`border-l-4 transition-colors ${
                    !message.isRead
                      ? 'border-l-primary bg-primary/5'
                      : 'border-l-gray-200'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold shrink-0">
                          {message.sender.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{message.sender}</h4>
                          <p className="text-xs text-gray-500">{message.subject}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-gray-500">
                          {new Date(message.date).toLocaleDateString('pt-BR')}
                        </p>
                        {!message.isRead && (
                          <Badge className="mt-1 text-xs">Nova</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{message.message}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          Projeto: {message.projectName}
                        </Badge>
                        <Badge className={`text-xs ${STATUS_COLORS[message.status] || 'bg-gray-100 text-gray-800'}`}>
                          {message.status}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenChat(message)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1.5" />
                        Responder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedMessage && (
        <ChatModal
          open={showChat}
          onClose={() => setShowChat(false)}
          contactName={selectedMessage.sender}
          projectName={selectedMessage.projectName}
          status={selectedMessage.status}
          initialMessages={INITIAL_HISTORY[selectedMessage.id.toString()] || []}
          storageKey={`architect_msg_${selectedMessage.id}`}
        />
      )}
    </div>
  );
};

export default MessagesTab;
