
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare } from "lucide-react";
import ChatModal from "./ChatModal";

const SupplierMessagesTab = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [projects] = useState([
    { id: "1", name: "Casa Moderna - Centro" },
    { id: "2", name: "Escritório Comercial - Vila Madalena" },
    { id: "3", name: "Residência Familiar - Morumbi" }
  ]);

  const [conversations] = useState([
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
  ]);

  const [messageHistory] = useState({
    "1": [
      {
        id: 1,
        sender: "Ana Costa",
        message: "Olá! Vi sua proposta para o projeto Casa Moderna. Estou interessada nos materiais que você oferece.",
        timestamp: "2024-01-20 09:00",
        isFromUser: false
      },
      {
        id: 2,
        sender: "Você",
        message: "Oi Ana! Obrigado pelo interesse. Posso oferecer todos os materiais listados com 15% de desconto.",
        timestamp: "2024-01-20 09:15",
        isFromUser: true
      },
      {
        id: 3,
        sender: "Ana Costa",
        message: "Perfeito! Gostaria de agendar uma reunião para discutir os detalhes.",
        timestamp: "2024-01-20 10:30",
        isFromUser: false
      }
    ],
    "2": [
      {
        id: 1,
        sender: "Roberto Lima",
        message: "Sua proposta foi a melhor! Quando podemos iniciar a entrega?",
        timestamp: "2024-01-19 14:00",
        isFromUser: false
      }
    ]
  });

  const getStatusColor = (status) => {
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

  const filteredConversations = selectedProject 
    ? conversations.filter(conv => conv.projectName === projects.find(p => p.id === selectedProject)?.name)
    : conversations;

  const handleOpenChat = (conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversas com Arquitetos</CardTitle>
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
                {projects.map((project) => (
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
                  : "Nenhuma conversa ainda."
                }
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Envie propostas para começar a conversar com arquitetos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredConversations.map((conversation) => (
                <Card key={conversation.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 bg-primary text-white flex items-center justify-center">
                          {conversation.architect.charAt(0)}
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{conversation.architect}</h4>
                          <p className="text-sm text-gray-600">{conversation.projectName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(conversation.date).toLocaleDateString('pt-BR')}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="mt-1">
                            {conversation.unreadCount} nova{conversation.unreadCount > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(conversation.status)}>
                        {conversation.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenChat(conversation)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
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
          initialMessages={messageHistory[selectedConversation.id.toString()] || []}
        />
      )}
    </div>
  );
};

export default SupplierMessagesTab;
