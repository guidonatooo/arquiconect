
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "./FileUpload";

interface ProjectFormProps {
  onSubmit: (projectData: any) => void;
  onCancel: () => void;
}

const ProjectForm = ({ onSubmit, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    area: "",
    budget: "",
    location: "",
    category: "",
    materials: ""
  });
  const [projectFiles, setProjectFiles] = useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      materials: formData.materials.split(",").map(m => m.trim()),
      files: projectFiles
    };
    
    onSubmit(projectData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Projeto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Projeto</label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ex: Casa Moderna - Centro"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Categoria</label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residencial">Residencial</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="institucional">Institucional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Área (m²)</label>
              <Input
                value={formData.area}
                onChange={(e) => handleChange("area", e.target.value)}
                placeholder="Ex: 120m²"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Orçamento Estimado</label>
              <Input
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                placeholder="Ex: R$ 300.000"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Localização</label>
            <Input
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Ex: São Paulo, SP"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Descrição do Projeto</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Descreva detalhes do projeto, requisitos específicos, etc."
              rows={4}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Materiais Necessários</label>
            <Input
              value={formData.materials}
              onChange={(e) => handleChange("materials", e.target.value)}
              placeholder="Ex: Tijolos, Cimento, Pisos, Esquadrias (separados por vírgula)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Arquivos do Projeto</label>
            <FileUpload 
              onFilesChange={setProjectFiles}
              acceptedTypes=".pdf,.doc,.docx,.dwg,.jpg,.png,.zip"
              maxFiles={10}
            />
          </div>
          
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Criar Projeto
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
