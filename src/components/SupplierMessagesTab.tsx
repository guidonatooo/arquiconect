
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare } from "lucide-react";
import ChatModal from "./ChatModal";

interface Conversation {
  id: number;
  architect: string;
  projectName: string;
  lastMessage: string;
  date: string;
  unreadCount: number;
  status: string;
}

const ALL_PROJECTS = [
  { id: "1", name: "Casa Moderna - Centro" },
  { id: "2", name: "Escritório Comercial - Vila Madalena" },
  { id: "3", name: "Residência Familiar - Morumbi" },
];

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    architect: "Ana Costa",
    projectName: "Casa Moderna - Centro",
    lastMessage: "Obrigada pela proposta. Gostaria de discutir alguns detalhes sobre os materiais.",
    date: "2024-01-20",
    unreadCount: 2,
    status: "Em negociação"
  },
  {
    id: 2,
    architect: "Roberto Lima",
    projectName: "Escritório Comercial - Vila Madalena",
    lastMessage: "Sua proposta foi aceita! Quando podemos começar?",
    date: "2024-01-19",
    unreadCount: 0,
    status: "Aprovada"
  },
  {
    id: 3,
    architect: "Carlos Silva",
    projectName: "Residência Familiar - Morumbi",
    lastMessage: "Preciso de um orçamento mais detalhado para os acabamentos.",
    date: "2024-01-18",
    unreadCount: 1,
    status: "Aguardando resposta"
  }
];

const INITIAL_HISTORY: Record<string, Array<{ id: string; sender: string; message: string; timestamp: string; isFromUser: boolean }>> = {
  "1": [
    { id: "1", sender: "Ana Costa", message: "Olá! Vi sua proposta para o projeto Casa Moderna. Estou interessada nos materiais que você oferece.", timestamp: "20/01/2024 09:00", isFromUser: false },
    { id: "2", sender: "Você", message: "Oi Ana! Obrigado pelo interesse. Posso oferecer todos os materiais listados com 15% de desconto.", timestamp: "20/01/2024 09:15", isFromUser: true },
    { id: "3", sender: "Ana Costa", message: "Perfeito! Gostaria de agendar uma reunião para discutir os detalhes.", timestamp: "20/01/2024 10:30", isFromUser: false }
  ],
  "2": [
    { id: "1", sender: "Roberto Lima", message: "Sua proposta foi a melhor! Quando podemos iniciar a entrega?", timestamp: "19/01/2024 14:00", isFromUser: false }
  ]
};

const STATUS_COLORS: Record<string, string> = {
  "Aprovada": "bg-green-100 text-green-800",
  "Em negociação": "bg-yellow-100 text-yellow-800",
  "Aguardando resposta": "bg-blue-100 text-blue-800",
};

const SupplierMessagesTab = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [showChat, setShowChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const filteredConversations = selectedProject
    ? conversations.filter(c => c.projectName === ALL_PROJECTS.find(p => p.id === selectedProject)?.name)
    : conversations;

  const handleOpenChat = (conversation: Conversation) => {
    // Mark as read
    if (conversation.unreadCount > 0) {
      setConversations(prev =>
        prev.map(c => c.id === conversation.id ? { ...c, unreadCount: 0 } : c)
      );
    }
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2">
              Conversas com Arquitetos
              {totalUnread > 0 && (
                <Badge className="bg-primary text-white text-xs">
                  {totalUnread} nova{totalUnread > 1 ? 's' : ''}
                </Badge>
              )}
            </CardTitle>
          </div>
          <p className="text-sm text-gray-600">
            Acompanhe suas conversas e propostas com os arquitetos
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Filtrar por Projeto</label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="max-w-md">
                <SelectValue placeholder="Todos os projetos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os projetos</SelectItem>
                {ALL_PROJECTS.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredConversations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {selectedProject
                  ? "Nenhuma conversa encontrada para este projeto."
                  : "Nenhuma conversa ainda."}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Envie propostas para começar a conversar com arquitetos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`hover:shadow-md transition-shadow ${
                    conversation.unreadCount > 0 ? 'border-primary/30 bg-primary/5' : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold shrink-0">
                          {conversation.architect.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{conversation.architect}</h4>
                          <p className="text-xs text-gray-500">{conversation.projectName}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-gray-500">
                          {new Date(conversation.date).toLocaleDateString('pt-BR')}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="mt-1 text-xs">
                            {conversation.unreadCount} nova{conversation.unreadCount > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${STATUS_COLORS[conversation.status] || 'bg-gray-100 text-gray-800'}`}>
                        {conversation.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenChat(conversation)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1.5" />
                        Abrir Conversa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedConversation && (
        <ChatModal
          open={showChat}
          onClose={() => setShowChat(false)}
          contactName={selectedConversation.architect}
          projectName={selectedConversation.projectName}
          status={selectedConversation.status}
          initialMessages={INITIAL_HISTORY[selectedConversation.id.toString()] || []}
          storageKey={`supplier_msg_${selectedConversation.id}`}
        />
      )}
    </div>
  );
};

export default SupplierMessagesTab;
