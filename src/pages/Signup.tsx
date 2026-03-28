import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const signupSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos").optional(),
  accountType: z.enum(["architect", "supplier"]),
  selectedPlan: z.enum(["basic", "professional", "premium"]).optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, createCheckout } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      accountType: "architect",
      selectedPlan: undefined,
      acceptTerms: false,
    },
  });

  const plans = [
    { id: "basic", name: "Básico", price: "R$ 199/mês", description: "Ideal para pequenos fornecedores" },
    { id: "professional", name: "Profissional", price: "R$ 399/mês", description: "Para fornecedores em crescimento" },
    { id: "premium", name: "Premium", price: "R$ 799/mês", description: "Para grandes fornecedores" }
  ];

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      console.log("Signup values:", values);
      
      const userData = {
        name: values.name,
        email: values.email,
        accountType: values.accountType,
        phone: values.phone || undefined,
        password: values.password
      };
      
      await signup(userData);
      toast.success("Cadastro realizado com sucesso!");
      
      // Se um plano foi selecionado, redirecionar para o checkout
      if (values.selectedPlan) {
        try {
          await createCheckout(values.selectedPlan);
          toast.success("Redirecionando para o pagamento...");
        } catch (error) {
          console.error("Erro ao criar checkout:", error);
          toast.error("Erro ao processar pagamento. Você pode assinar um plano mais tarde.");
        }
      }
      
      // Redireciona baseado no tipo de usuário
      if (values.accountType === 'supplier') {
        navigate("/suppliers");
      } else {
        navigate("/projects");
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      toast.error("Falha ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const accountType = form.watch("accountType");

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        <div className="container max-w-md mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Crie sua conta</h1>
            <p className="text-muted-foreground">
              Preencha os dados para começar
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Seu nome" 
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="seu-email@exemplo.com" 
                        type="email"
                        autoComplete="email" 
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(00) 00000-0000" 
                        type="tel"
                        autoComplete="tel" 
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
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de conta</FormLabel>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        type="button"
                        variant={field.value === "architect" ? "default" : "outline"}
                        className="w-full"
                        onClick={() => field.onChange("architect")}
                        disabled={isLoading}
                      >
                        Arquiteto
                      </Button>
                      <Button
                        type="button"
                        variant={field.value === "supplier" ? "default" : "outline"}
                        className="w-full"
                        onClick={() => field.onChange("supplier")}
                        disabled={isLoading}
                      >
                        Fornecedor
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Show plan selection only for suppliers */}
              {accountType === "supplier" && (
                <FormField
                  control={form.control}
                  name="selectedPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escolha seu plano (opcional)</FormLabel>
                      <div className="space-y-3 mt-2">
                        {plans.map((plan) => (
                          <Button
                            key={plan.id}
                            type="button"
                            variant={field.value === plan.id ? "default" : "outline"}
                            className="w-full h-auto p-4 text-left flex flex-col items-start"
                            onClick={() => field.onChange(plan.id)}
                            disabled={isLoading}
                          >
                            <div className="flex justify-between w-full">
                              <span className="font-medium">{plan.name}</span>
                              <span className="text-sm text-primary">{plan.price}</span>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">{plan.description}</span>
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Você pode escolher um plano agora ou fazer isso mais tarde
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete="new-password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete="new-password"
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
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Aceito os{" "}
                        <Link to="/termos" className="text-primary hover:underline">
                          Termos de Uso
                        </Link>{" "}
                        e{" "}
                        <Link to="/privacidade" className="text-primary hover:underline">
                          Política de Privacidade
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full mt-6" 
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Faça login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
