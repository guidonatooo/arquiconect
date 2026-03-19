
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "./FileUpload";
import type { Project } from "@/pages/Projects";

type ProjectFormData = Omit<Project, 'id' | 'status' | 'createdAt'>;

interface ProjectFormProps {
  initialData?: Project | null;
  onSubmit: (projectData: ProjectFormData) => void;
  onCancel: () => void;
}

interface FormErrors {
  name?: string;
  category?: string;
  area?: string;
  budget?: string;
  location?: string;
  description?: string;
  materials?: string;
}

const ProjectForm = ({ initialData, onSubmit, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    area: "",
    budget: "",
    location: "",
    category: "",
    materials: ""
  });
  const [projectFiles, setProjectFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        area: initialData.area,
        budget: initialData.budget,
        location: initialData.location,
        category: initialData.category,
        materials: initialData.materials.join(", "),
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    else if (formData.name.trim().length < 3) newErrors.name = "Nome deve ter pelo menos 3 caracteres";

    if (!formData.category) newErrors.category = "Selecione uma categoria";

    if (!formData.area.trim()) newErrors.area = "Área é obrigatória";
    else if (isNaN(Number(formData.area.replace(/[^\d.,]/g, '').replace(',', '.')))) {
      newErrors.area = "Informe um valor numérico (ex: 120)";
    }

    if (!formData.budget.trim()) newErrors.budget = "Orçamento é obrigatório";
    else if (isNaN(Number(formData.budget.replace(/[^\d.,]/g, '').replace(',', '.')))) {
      newErrors.budget = "Informe um valor numérico (ex: 300000)";
    }

    if (!formData.location.trim()) newErrors.location = "Localização é obrigatória";

    if (!formData.description.trim()) newErrors.description = "Descrição é obrigatória";
    else if (formData.description.trim().length < 20) {
      newErrors.description = "Descrição deve ter pelo menos 20 caracteres";
    }

    if (!formData.materials.trim()) newErrors.materials = "Informe pelo menos um material";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const materials = formData.materials
        .split(",")
        .map(m => m.trim())
        .filter(m => m.length > 0);

      onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim(),
        area: formData.area.trim(),
        budget: formData.budget.trim(),
        location: formData.location.trim(),
        category: formData.category,
        materials,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const fieldError = (field: keyof FormErrors) =>
    errors[field] ? <p className="text-xs text-red-500 mt-1">{errors[field]}</p> : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Editar Projeto" : "Novo Projeto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nome do Projeto <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ex: Casa Moderna - Centro"
                className={errors.name ? "border-red-400" : ""}
              />
              {fieldError("name")}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Categoria <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className={errors.category ? "border-red-400" : ""}>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residencial">Residencial</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="institucional">Institucional</SelectItem>
                  <SelectItem value="reforma">Reforma</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {fieldError("category")}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Área (m²) <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                min="1"
                value={formData.area}
                onChange={(e) => handleChange("area", e.target.value)}
                placeholder="Ex: 120"
                className={errors.area ? "border-red-400" : ""}
              />
              {fieldError("area")}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Orçamento Estimado (R$) <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                min="0"
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                placeholder="Ex: 300000"
                className={errors.budget ? "border-red-400" : ""}
              />
              {fieldError("budget")}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Localização <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Ex: São Paulo, SP"
              className={errors.location ? "border-red-400" : ""}
            />
            {fieldError("location")}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Descrição do Projeto <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Descreva detalhes do projeto, requisitos específicos, materiais desejados, prazo, etc."
              rows={4}
              className={errors.description ? "border-red-400" : ""}
            />
            <div className="flex justify-between mt-1">
              {fieldError("description")}
              <span className={`text-xs ml-auto ${formData.description.length < 20 ? 'text-gray-400' : 'text-green-600'}`}>
                {formData.description.length} caracteres
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Materiais Necessários <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.materials}
              onChange={(e) => handleChange("materials", e.target.value)}
              placeholder="Ex: Tijolos, Cimento, Pisos, Esquadrias (separados por vírgula)"
              className={errors.materials ? "border-red-400" : ""}
            />
            <p className="text-xs text-gray-400 mt-1">Separe cada material com vírgula</p>
            {fieldError("materials")}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Arquivos do Projeto</label>
            <FileUpload
              onFilesChange={setProjectFiles}
              acceptedTypes=".pdf,.doc,.docx,.dwg,.jpg,.jpeg,.png,.zip"
              maxFiles={10}
            />
            <p className="text-xs text-gray-400 mt-1">
              Formatos aceitos: PDF, DOC, DOCX, DWG, JPG, PNG, ZIP (máx. 10 arquivos)
            </p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : (initialData ? "Salvar Alterações" : "Criar Projeto")}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
