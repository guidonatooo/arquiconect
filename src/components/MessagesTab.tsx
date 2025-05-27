
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

const MessagesTab = () => {
  const [messages] = useState([
    {
      id: 1,
      sender: "João Silva - Materiais de Construção",
      subject: "Proposta para Casa Moderna - Centro",
      message: "Olá! Tenho interesse em fornecer os materiais para seu projeto. Posso oferecer um desconto de 15% em tijolos e cimento.",
      date: "2024-01-20",
      isRead: false,
      projectName: "Casa Moderna - Centro"
    },
    {
      id: 2,
      sender: "Maria Santos - Pisos e Revestimentos",
      subject: "Orçamento Porcelanato Premium",
      message: "Boa tarde! Elaborei um orçamento completo para os pisos do seu projeto. Tenho algumas opções interessantes em porcelanato.",
      date: "2024-01-19",
      isRead: true,
      projectName: "Casa Moderna - Centro"
    },
    {
      id: 3,
      sender: "Carlos Ferreira - Esquadrias",
      subject: "Janelas e Portas de Alumínio",
      message: "Prezado arquiteto, gostaria de apresentar nossa linha premium de esquadrias de alumínio. Temos ótimos preços para projetos residenciais.",
      date: "2024-01-18",
      isRead: true,
      projectName: "Geral"
    }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mensagens dos Fornecedores</CardTitle>
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
                <Card key={message.id} className={`border-l-4 ${!message.isRead ? 'border-l-primary bg-primary/5' : 'border-l-gray-300'}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 bg-primary text-white flex items-center justify-center">
                          {message.sender.charAt(0)}
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{message.sender}</h4>
                          <p className="text-sm text-gray-600">{message.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(message.date).toLocaleDateString('pt-BR')}
                        </p>
                        {!message.isRead && (
                          <Badge variant="default" className="mt-1">Nova</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{message.message}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Projeto: {message.projectName}</Badge>
                      <Button variant="outline" size="sm">
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
    </div>
  );
};

export default MessagesTab;
