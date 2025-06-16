
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Eye } from "lucide-react";
import ArchitectPortfolioModal from "./ArchitectPortfolioModal";
import SupplierProfileModal from "./SupplierProfileModal";

const ContactsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchitectPortfolio, setShowArchitectPortfolio] = useState(false);
  const [showSupplierProfile, setShowSupplierProfile] = useState(false);
  const [selectedArchitect, setSelectedArchitect] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  
  const [suppliers] = useState([
    {
      id: 1,
      name: "João Silva",
      company: "Materiais de Construção Silva",
      category: "Materiais Básicos",
      phone: "(11) 99999-1111",
      email: "joao@silva.com.br",
      whatsapp: "5511999991111",
      location: "São Paulo, SP",
      rating: 4.8,
      description: "Empresa familiar com mais de 20 anos no mercado, especializada em materiais básicos de construção com qualidade e preços competitivos.",
      products: ["Tijolos", "Cimento", "Areia", "Brita", "Cal", "Argamassa"],
      experience: "20+ anos no mercado"
    },
    {
      id: 2,
      name: "Maria Santos",
      company: "Pisos e Revestimentos Santos",
      category: "Pisos e Revestimentos",
      phone: "(11) 99999-2222",
      email: "maria@santos.com.br",
      location: "São Paulo, SP",
      rating: 4.9,
      description: "Loja especializada em pisos e revestimentos de alta qualidade, com as melhores marcas do mercado nacional e importado.",
      products: ["Porcelanato", "Cerâmica", "Mármore", "Granito", "Madeira", "Laminado"],
      experience: "15+ anos no mercado"
    },
    {
      id: 3,
      name: "Carlos Ferreira",
      company: "Esquadrias Premium",
      category: "Esquadrias",
      phone: "(11) 99999-3333",
      email: "carlos@esquadrias.com.br",
      whatsapp: "5511999993333",
      location: "São Paulo, SP",
      rating: 4.7,
      description: "Fabricante de esquadrias de alumínio e PVC sob medida, com tecnologia avançada e acabamento impecável.",
      products: ["Janelas de Alumínio", "Portas de Alumínio", "Esquadrias PVC", "Box para Banheiro", "Coberturas"],
      experience: "25+ anos no mercado"
    }
  ]);

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
      portfolioProjects: [
        {
          id: 1,
          name: "Casa Moderna Alphaville",
          description: "Residência contemporânea com 300m² e design sustentável",
          area: "300m²",
          completedDate: "2023-12-15",
          category: "Residencial",
          location: "Alphaville, SP"
        }
      ]
    },
    {
      id: 2,
      name: "Roberto Lima",
      specialty: "Arquitetura Comercial",
      phone: "(11) 88888-2222",
      email: "roberto@comercial.com.br",
      location: "São Paulo, SP",
      projects: 32,
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

  const handleViewSupplierProfile = (supplier) => {
    setSelectedSupplier(supplier);
    setShowSupplierProfile(true);
  };

  const handleViewArchitectPortfolio = (architect) => {
    setSelectedArchitect({
      name: architect.name,
      specialty: architect.specialty,
      projects: architect.portfolioProjects,
      totalProjects: architect.projects
    });
    setShowArchitectPortfolio(true);
  };

  const handleContactArchitectWhatsApp = (architect) => {
    if (architect.whatsapp) {
      const message = encodeURIComponent(`Olá ${architect.name}, vi seu perfil na ArquiConnect e gostaria de conversar sobre possíveis colaborações em projetos.`);
      window.open(`https://wa.me/${architect.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

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
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewSupplierProfile(supplier)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
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
                          {architect.whatsapp ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleContactArchitectWhatsApp(architect)}
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
                            onClick={() => handleViewArchitectPortfolio(architect)}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedArchitect && (
        <ArchitectPortfolioModal
          open={showArchitectPortfolio}
          onClose={() => setShowArchitectPortfolio(false)}
          architect={selectedArchitect}
        />
      )}

      {selectedSupplier && (
        <SupplierProfileModal
          open={showSupplierProfile}
          onClose={() => setShowSupplierProfile(false)}
          supplier={selectedSupplier}
        />
      )}
    </div>
  );
};

export default ContactsTab;
