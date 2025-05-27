
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContactsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [suppliers] = useState([
    {
      id: 1,
      name: "João Silva",
      company: "Materiais de Construção Silva",
      category: "Materiais Básicos",
      phone: "(11) 99999-1111",
      email: "joao@silva.com.br",
      location: "São Paulo, SP",
      rating: 4.8
    },
    {
      id: 2,
      name: "Maria Santos",
      company: "Pisos e Revestimentos Santos",
      category: "Pisos e Revestimentos",
      phone: "(11) 99999-2222",
      email: "maria@santos.com.br",
      location: "São Paulo, SP",
      rating: 4.9
    },
    {
      id: 3,
      name: "Carlos Ferreira",
      company: "Esquadrias Premium",
      category: "Esquadrias",
      phone: "(11) 99999-3333",
      email: "carlos@esquadrias.com.br",
      location: "São Paulo, SP",
      rating: 4.7
    }
  ]);

  const [architects] = useState([
    {
      id: 1,
      name: "Ana Costa",
      specialty: "Arquitetura Residencial",
      phone: "(11) 88888-1111",
      email: "ana@arquitetura.com.br",
      location: "São Paulo, SP",
      projects: 45
    },
    {
      id: 2,
      name: "Roberto Lima",
      specialty: "Arquitetura Comercial",
      phone: "(11) 88888-2222",
      email: "roberto@comercial.com.br",
      location: "São Paulo, SP",
      projects: 32
    }
  ]);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArchitects = architects.filter(architect =>
    architect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    architect.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contatos</CardTitle>
          <p className="text-sm text-gray-600">
            Encontre fornecedores e outros arquitetos para seus projetos
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Buscar por nome, empresa ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <Tabs defaultValue="suppliers" className="space-y-6">
            <TabsList>
              <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
              <TabsTrigger value="architects">Arquitetos</TabsTrigger>
            </TabsList>

            <TabsContent value="suppliers" className="space-y-4">
              {filteredSuppliers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum fornecedor encontrado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSuppliers.map((supplier) => (
                    <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-12 h-12 bg-primary text-white flex items-center justify-center">
                            {supplier.name.charAt(0)}
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{supplier.name}</h4>
                            <p className="text-sm text-gray-600">{supplier.company}</p>
                            <Badge variant="secondary" className="mt-1">
                              {supplier.category}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Telefone:</span> {supplier.phone}</p>
                          <p><span className="font-medium">Email:</span> {supplier.email}</p>
                          <p><span className="font-medium">Localização:</span> {supplier.location}</p>
                          <p><span className="font-medium">Avaliação:</span> ⭐ {supplier.rating}/5</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            Contatar
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver Perfil
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="architects" className="space-y-4">
              {filteredArchitects.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum arquiteto encontrado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredArchitects.map((architect) => (
                    <Card key={architect.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-12 h-12 bg-accent text-white flex items-center justify-center">
                            {architect.name.charAt(0)}
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{architect.name}</h4>
                            <p className="text-sm text-gray-600">{architect.specialty}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Telefone:</span> {architect.phone}</p>
                          <p><span className="font-medium">Email:</span> {architect.email}</p>
                          <p><span className="font-medium">Localização:</span> {architect.location}</p>
                          <p><span className="font-medium">Projetos:</span> {architect.projects} concluídos</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            Contatar
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver Portfólio
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsTab;
