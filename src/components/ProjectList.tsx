
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  name: string;
  description: string;
  area: string;
  budget: string;
  status: string;
  createdAt: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum projeto cadastrado ainda.</p>
        <p className="text-sm text-gray-400 mt-2">Clique em "Novo Projeto" para começar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <Badge variant="secondary">{project.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Área:</span>
                <p className="text-gray-600">{project.area}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Orçamento:</span>
                <p className="text-gray-600">{project.budget}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <p className="text-gray-600">{project.status}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Criado em:</span>
                <p className="text-gray-600">{new Date(project.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
