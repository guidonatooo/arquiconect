
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

const SupplierMessagesTab = () => {
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
          {conversations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma conversa ainda.</p>
              <p className="text-sm text-gray-400 mt-2">
                Envie propostas para começar a conversar com arquitetos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conversation) => (
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
                      <Button variant="outline" size="sm">
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
    </div>
  );
};

export default SupplierMessagesTab;
