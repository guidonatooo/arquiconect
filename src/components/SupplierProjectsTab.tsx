
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import ProjectDetailsDialog from "@/components/ProjectDetailsDialog";

const SupplierProjectsTab = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const [projects] = useState([
    {
      id: 1,
      name: "Casa Moderna - Centro",
      description: "Projeto residencial com 3 quartos, sala ampla, cozinha americana e 2 banheiros",
      area: "120m²",
      budget: "R$ 300.000",
      status: "Recebendo propostas",
      createdAt: "2024-01-15",
      architect: "Ana Costa",
      location: "São Paulo, SP",
      category: "Residencial",
      materials: ["Tijolos", "Cimento", "Pisos", "Esquadrias"]
    },
    {
      id: 2,
      name: "Escritório Comercial - Vila Madalena",
      description: "Reforma de escritório com 5 salas, recepção e copa",
      area: "200m²",
      budget: "R$ 150.000",
      status: "Recebendo propostas",
      createdAt: "2024-01-18",
      architect: "Roberto Lima",
      location: "São Paulo, SP",
      category: "Comercial",
      materials: ["Divisórias", "Pisos", "Iluminação", "Móveis"]
    }
  ]);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  return (
    <>
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <span className="font-medium text-gray-700">Área:</span>
                  <p className="text-gray-600">{project.area}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Orçamento:</span>
                  <p className="text-gray-600">{project.budget}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Arquiteto:</span>
                  <p className="text-gray-600">{project.architect}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Localização:</span>
                  <p className="text-gray-600">{project.location}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewProject(project)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Detalhes
                </Button>
                <Button size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enviar Proposta
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProjectDetailsDialog
        project={selectedProject}
        open={showProjectDetails}
        onClose={() => setShowProjectDetails(false)}
      />
    </>
  );
};

export default SupplierProjectsTab;
