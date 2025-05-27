
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ProjectDetailsDialogProps {
  project: any;
  open: boolean;
  onClose: () => void;
}

const ProjectDetailsDialog = ({ project, open, onClose }: ProjectDetailsDialogProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Descrição do Projeto</h4>
            <p className="text-gray-600">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Informações Básicas</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Área:</span> {project.area}</p>
                <p><span className="font-medium">Orçamento:</span> {project.budget}</p>
                <p><span className="font-medium">Categoria:</span> {project.category}</p>
                <p><span className="font-medium">Localização:</span> {project.location}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Arquiteto Responsável</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Nome:</span> {project.architect}</p>
                <p><span className="font-medium">Data de Criação:</span> {new Date(project.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Materiais Necessários</h4>
            <div className="flex flex-wrap gap-2">
              {project.materials?.map((material, index) => (
                <Badge key={index} variant="secondary">{material}</Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Enviar Proposta
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
