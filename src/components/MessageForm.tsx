
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const messageSchema = z.object({
  project: z.string().min(1, "Selecione um projeto"),
  subject: z.string().min(1, "Assunto é obrigatório"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  budget: z.string().optional(),
  delivery: z.string().optional(),
});

type MessageFormValues = z.infer<typeof messageSchema>;

interface MessageFormProps {
  onCancel: () => void;
}

const MessageForm = ({ onCancel }: MessageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      project: "",
      subject: "",
      message: "",
      budget: "",
      delivery: "",
    },
  });

  const handleSubmit = async (values: MessageFormValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Mensagem enviada:", values);
      onCancel();
    } finally {
      setIsLoading(false);
    }
  };

  const projects = [
    { id: "1", name: "Casa Moderna - Centro" },
    { id: "2", name: "Escritório Comercial - Vila Madalena" },
    { id: "3", name: "Residência Familiar - Morumbi" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Enviar Proposta ou Promoção</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Projeto de Referência</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um projeto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="promocao">Promoção Geral</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assunto</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Proposta para fornecimento de materiais" 
                    disabled={isLoading}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva sua proposta, materiais disponíveis, condições de pagamento..."
                    className="min-h-[120px]"
                    disabled={isLoading}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da Proposta (Opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: R$ 25.000" 
                      disabled={isLoading}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delivery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prazo de Entrega (Opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: 15 dias úteis" 
                      disabled={isLoading}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Proposta"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MessageForm;
