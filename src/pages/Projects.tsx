
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import MessagesTab from "@/components/MessagesTab";
import ContactsTab from "@/components/ContactsTab";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export interface Project {
  id: string;
  name: string;
  description: string;
  area: string;
  budget: string;
  location: string;
  category: string;
  materials: string[];
  status: string;
  createdAt: string;
}

const Projects = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load projects from localStorage keyed by user id
  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`projects_${user.id}`);
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        // Seed with demo project for new users
        const demo: Project[] = [{
          id: `${Date.now()}-demo`,
          name: "Casa Moderna - Centro",
          description: "Projeto residencial com 3 quartos, sala ampla e cozinha americana",
          area: "120",
          budget: "300000",
          location: "São Paulo, SP",
          category: "residencial",
          materials: ["Tijolos", "Cimento", "Pisos", "Esquadrias"],
          status: "Recebendo propostas",
          createdAt: new Date().toISOString(),
        }];
        setProjects(demo);
        localStorage.setItem(`projects_${user.id}`, JSON.stringify(demo));
      }
    }
  }, [user?.id]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  const saveProjects = (updated: Project[]) => {
    setProjects(updated);
    if (user?.id) {
      localStorage.setItem(`projects_${user.id}`, JSON.stringify(updated));
    }
  };

  const handleAddProject = (projectData: Omit<Project, 'id' | 'status' | 'createdAt'>) => {
    const newProject: Project = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...projectData,
      status: "Recebendo propostas",
      createdAt: new Date().toISOString(),
    };
    saveProjects([newProject, ...projects]);
    setShowProjectForm(false);
  };

  const handleEditProject = (projectData: Omit<Project, 'id' | 'status' | 'createdAt'>) => {
    if (!editingProject) return;
    const updated = projects.map(p =>
      p.id === editingProject.id ? { ...p, ...projectData } : p
    );
    saveProjects(updated);
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const handleDeleteProject = (projectId: string) => {
    saveProjects(projects.filter(p => p.id !== projectId));
  };

  const handleUpdateStatus = (projectId: string, status: string) => {
    const updated = projects.map(p => p.id === projectId ? { ...p, status } : p);
    saveProjects(updated);
  };

  const handleStartEdit = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleCancelForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-8 bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Carregando...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Meus Projetos</h1>
            <p className="text-gray-600">Gerencie seus projetos, mensagens e contatos</p>
          </div>

          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projetos</TabsTrigger>
              <TabsTrigger value="messages">Mensagens</TabsTrigger>
              <TabsTrigger value="contacts">Contatos</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
                  <CardTitle>
                    Seus Projetos
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({filteredProjects.length})
                    </span>
                  </CardTitle>
                  {!showProjectForm && (
                    <Button onClick={() => setShowProjectForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Projeto
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {showProjectForm ? (
                    <ProjectForm
                      initialData={editingProject}
                      onSubmit={editingProject ? handleEditProject : handleAddProject}
                      onCancel={handleCancelForm}
                    />
                  ) : (
                    <>
                      <div className="relative mb-4 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          className="pl-9"
                          placeholder="Buscar projetos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <ProjectList
                        projects={filteredProjects}
                        onEdit={handleStartEdit}
                        onDelete={handleDeleteProject}
                        onStatusChange={handleUpdateStatus}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <MessagesTab />
            </TabsContent>

            <TabsContent value="contacts">
              <ContactsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
