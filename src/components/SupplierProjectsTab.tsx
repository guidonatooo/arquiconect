
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, MessageSquare, Search, MapPin, Ruler, DollarSign } from "lucide-react";
import ProjectDetailsDialog from "@/components/ProjectDetailsDialog";

interface Project {
  id: string;
  name: string;
  description: string;
  area: string;
  budget: string;
  status: string;
  createdAt: string;
  architect: string;
  location: string;
  category: string;
  materials: string[];
}

const DEMO_PROJECTS: Project[] = [
  {
    id: "demo-1",
    name: "Casa Moderna - Centro",
    description: "Projeto residencial com 3 quartos, sala ampla, cozinha americana e 2 banheiros. Design contemporâneo com ênfase em iluminação natural.",
    area: "120",
    budget: "300000",
    status: "Recebendo propostas",
    createdAt: "2024-01-15T00:00:00.000Z",
    architect: "Ana Costa",
    location: "São Paulo, SP",
    category: "residencial",
    materials: ["Tijolos", "Cimento", "Pisos", "Esquadrias"]
  },
  {
    id: "demo-2",
    name: "Escritório Comercial - Vila Madalena",
    description: "Reforma de escritório com 5 salas, recepção moderna e copa. Foco em ergonomia e produtividade.",
    area: "200",
    budget: "150000",
    status: "Recebendo propostas",
    createdAt: "2024-01-18T00:00:00.000Z",
    architect: "Roberto Lima",
    location: "São Paulo, SP",
    category: "comercial",
    materials: ["Divisórias", "Pisos", "Iluminação"]
  }
];

const CATEGORY_LABELS: Record<string, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
  industrial: "Industrial",
  institucional: "Institucional",
  reforma: "Reforma",
  outro: "Outro",
};

const formatBudget = (value: string) => {
  const num = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
  if (isNaN(num)) return value;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const SupplierProjectsTab = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [allProjects, setAllProjects] = useState<Project[]>(DEMO_PROJECTS);

  // Load all projects from all users in localStorage
  useEffect(() => {
    const projectKeys = Object.keys(localStorage).filter(k => k.startsWith('projects_'));
    const loaded: Project[] = [];
    projectKeys.forEach(key => {
      const stored = localStorage.getItem(key);
      if (stored) {
        const projects = JSON.parse(stored);
        // Only include open projects
        projects
          .filter((p: Project) => p.status === "Recebendo propostas" || p.status === "Em negociação")
          .forEach((p: Project) => {
            if (!loaded.find(existing => existing.id === p.id)) {
              loaded.push({ ...p, architect: "Arquiteto" });
            }
          });
      }
    });

    if (loaded.length > 0) {
      // Merge with demos, avoiding duplicates
      const demoIds = new Set(DEMO_PROJECTS.map(d => d.id));
      const uniqueLoaded = loaded.filter(p => !demoIds.has(p.id));
      setAllProjects([...DEMO_PROJECTS, ...uniqueLoaded]);
    }
  }, []);

  const filtered = allProjects.filter(p => {
    const matchesSearch = !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Buscar por nome, descrição ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as categorias</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum projeto encontrado.</p>
          <p className="text-sm text-gray-400 mt-2">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">{filtered.length} projeto{filtered.length !== 1 ? 's' : ''} disponível{filtered.length !== 1 ? 'is' : ''}</p>
          {filtered.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 shrink-0 text-xs">
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Ruler className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{project.area} m²</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <DollarSign className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{formatBudget(project.budget)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Categoria: </span>
                    <span className="text-gray-600">{CATEGORY_LABELS[project.category] || project.category}</span>
                  </div>
                </div>

                {project.materials.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.materials.map((mat, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{mat}</Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewProject(project)}
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    Ver Detalhes
                  </Button>
                  <Button size="sm">
                    <MessageSquare className="w-4 h-4 mr-1.5" />
                    Enviar Proposta
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ProjectDetailsDialog
        project={selectedProject}
        open={showProjectDetails}
        onClose={() => setShowProjectDetails(false)}
      />
    </>
  );
};

export default SupplierProjectsTab;
