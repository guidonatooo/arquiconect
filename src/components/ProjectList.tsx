
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, MapPin, Ruler, DollarSign, Tag } from "lucide-react";
import type { Project } from "@/pages/Projects";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onStatusChange: (projectId: string, status: string) => void;
}

const STATUS_OPTIONS = [
  "Recebendo propostas",
  "Em negociação",
  "Fechado",
  "Arquivado",
];

const STATUS_COLORS: Record<string, string> = {
  "Recebendo propostas": "bg-green-100 text-green-800 border-green-200",
  "Em negociação": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Fechado": "bg-blue-100 text-blue-800 border-blue-200",
  "Arquivado": "bg-gray-100 text-gray-600 border-gray-200",
};

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

const ProjectList = ({ projects, onEdit, onDelete, onStatusChange }: ProjectListProps) => {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum projeto encontrado.</p>
        <p className="text-sm text-gray-400 mt-2">
          Clique em "Novo Projeto" para começar ou ajuste o filtro de busca.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Criado em {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Select
                    value={project.status}
                    onValueChange={(v) => onStatusChange(project.id, v)}
                  >
                    <SelectTrigger className={`h-7 text-xs w-auto border ${STATUS_COLORS[project.status] || ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Ruler className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{project.area} m²</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <DollarSign className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{formatBudget(project.budget)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{CATEGORY_LABELS[project.category] || project.category}</span>
                </div>
              </div>

              {project.materials.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.materials.map((mat, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {mat}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(project)}
                >
                  <Pencil className="w-3.5 h-3.5 mr-1.5" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:bg-red-50 hover:border-red-300"
                  onClick={() => setDeleteTarget(project.id)}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Projeto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (deleteTarget) onDelete(deleteTarget);
                setDeleteTarget(null);
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProjectList;
