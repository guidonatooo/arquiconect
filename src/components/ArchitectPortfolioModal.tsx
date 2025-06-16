
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: number;
  name: string;
  description: string;
  area: string;
  completedDate: string;
  category: string;
  location: string;
}

interface ArchitectPortfolioModalProps {
  open: boolean;
  onClose: () => void;
  architect: {
    name: string;
    specialty: string;
    projects: Project[];
    totalProjects: number;
  };
}

const ArchitectPortfolioModal = ({ open, onClose, architect }: ArchitectPortfolioModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Portfólio - {architect.name}</DialogTitle>
          <p className="text-sm text-gray-600">{architect.specialty}</p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Projetos Realizados</h3>
            <p className="text-gray-600">{architect.totalProjects} projetos concluídos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {architect.projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{project.category}</Badge>
                    <Badge variant="outline">{project.area}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Localização:</span> {project.location}</p>
                    <p><span className="font-medium">Concluído em:</span> {new Date(project.completedDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArchitectPortfolioModal;
