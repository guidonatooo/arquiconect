
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Eye } from "lucide-react";
import ArchitectPortfolioModal from "./ArchitectPortfolioModal";

const SupplierContactsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedArchitect, setSelectedArchitect] = useState(null);
  
  const [architects] = useState([
    {
      id: 1,
      name: "Ana Costa",
      specialty: "Arquitetura Residencial",
      phone: "(11) 88888-1111",
      email: "ana@arquitetura.com.br",
      whatsapp: "5511888881111",
      location: "São Paulo, SP",
      projects: 45,
      activeProjects: 3,
      portfolioProjects: [
        {
          id: 1,
          name: "Casa Moderna Alphaville",
          description: "Residência contemporânea com 300m² e design sustentável",
          area: "300m²",
          completedDate: "2023-12-15",
          category: "Residencial",
          location: "Alphaville, SP"
        },
        {
          id: 2,
          name: "Sobrado Vila Madalena",
          description: "Projeto de renovação completa com conceito minimalista",
          area: "250m²",
          completedDate: "2023-10-20",
          category: "Residencial",
          location: "Vila Madalena, SP"
        }
      ]
    },
    {
      id: 2,
      name: "Roberto Lima",
      specialty: "Arquitetura Comercial",
      phone: "(11) 88888-2222",
      email: "roberto@comercial.com.br",
      whatsapp: "5511888882222",
      location: "São Paulo, SP",
      projects: 32,
      activeProjects: 2,
      portfolioProjects: [
        {
          id: 1,
          name: "Escritório Corporate Plaza",
          description: "Design moderno para empresa de tecnologia",
          area: "800m²",
          completedDate: "2023-11-30",
          category: "Comercial",
          location: "Faria Lima, SP"
        }
      ]
    },
    {
      id: 3,
      name: "Carlos Silva",
      specialty: "Arquitetura Sustentável",
      phone: "(11) 88888-3333",
      email: "carlos@sustentavel.com.br",
      location: "São Paulo, SP",
      projects: 28,
      activeProjects: 4,
      portfolioProjects: [
        {
          id: 1,
          name: "Casa Eco-Friendly",
          description: "Residência 100% sustentável com energia solar",
          area: "180m²",
          completedDate: "2023-09-10",
          category: "Residencial",
          location: "Morumbi, SP"
        }
      ]
    },
    {
      id: 4,
      name: "Mariana Santos",
      specialty: "Design de Interiores",
      phone: "(11) 88888-4444",
      email: "mariana@interiores.com.br",
      whatsapp: "5511888884444",
      location: "São Paulo, SP",
      projects: 67,
      activeProjects: 1,
      portfolioProjects: [
        {
          id: 1,
          name: "Apartamento Jardins",
          description: "Design sofisticado com móveis planejados",
          area: "150m²",
          completedDate: "2023-08-25",
          category: "Residencial",
          location: "Jardins, SP"
        }
      ]
    }
  ]);

  const filteredArchitects = architects.filter(architect =>
    architect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    architect.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPortfolio = (architect) => {
    setSelectedArchitect({
      name: architect.name,
      specialty: architect.specialty,
      projects: architect.portfolioProjects,
      totalProjects: architect.projects
    });
    setShowPortfolio(true);
  };

  const handleContactWhatsApp = (architect) => {
    if (architect.whatsapp) {
      const message = encodeURIComponent(`Olá ${architect.name}, vi seu perfil na ArquiConnect e gostaria de conversar sobre possíveis parcerias em projetos.`);
      window.open(`https://wa.me/${architect.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contatos de Arquitetos</CardTitle>
          <p className="text-sm text-gray-600">
            Encontre arquitetos para estabelecer parcerias e oportunidades de negócio
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Buscar por nome ou especialidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

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
                      <p><span className="font-medium">Projetos concluídos:</span> {architect.projects}</p>
                      <p><span className="font-medium">Projetos ativos:</span> {architect.activeProjects}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {architect.whatsapp ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleContactWhatsApp(architect)}
                          className="bg-green-50 hover:bg-green-100 text-green-700"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contatar
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contatar
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewPortfolio(architect)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Portfólio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedArchitect && (
        <ArchitectPortfolioModal
          open={showPortfolio}
          onClose={() => setShowPortfolio(false)}
          architect={selectedArchitect}
        />
      )}
    </div>
  );
};

export default SupplierContactsTab;
