
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import MessagesTab from "@/components/MessagesTab";
import ContactsTab from "@/components/ContactsTab";

const Projects = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Casa Moderna - Centro",
      description: "Projeto residencial com 3 quartos",
      area: "120m²",
      budget: "R$ 300.000",
      status: "Em andamento",
      createdAt: "2024-01-15"
    }
  ]);

  const handleAddProject = (projectData: any) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      status: "Em andamento",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects([...projects, newProject]);
    setShowProjectForm(false);
  };

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
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Seus Projetos</CardTitle>
                  <Button onClick={() => setShowProjectForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Projeto
                  </Button>
                </CardHeader>
                <CardContent>
                  {showProjectForm ? (
                    <ProjectForm 
                      onSubmit={handleAddProject}
                      onCancel={() => setShowProjectForm(false)}
                    />
                  ) : (
                    <ProjectList projects={projects} />
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
