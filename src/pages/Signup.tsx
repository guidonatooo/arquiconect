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
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
  confirmPassword: z.string().min(1, "Confirme sua senha"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(v.replace(/\s/g, '')),
      "Telefone inválido. Use o formato (00) 00000-0000"
    ),
  accountType: z.enum(["architect", "supplier"]),
  selectedPlan: z.enum(["basic", "professional", "premium"]).optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos para continuar"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const PLANS = [
  { id: "basic", name: "Básico", price: "R$ 199/mês", description: "Ideal para pequenos fornecedores — 10 propostas/mês" },
  { id: "professional", name: "Profissional", price: "R$ 399/mês", description: "Para fornecedores em crescimento — 30 propostas/mês" },
  { id: "premium", name: "Premium", price: "R$ 799/mês", description: "Para grandes fornecedores — propostas ilimitadas" }
] as const;

const getPasswordStrength = (password: string): { level: number; label: string; color: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: score, label: "Muito fraca", color: "bg-red-500" };
  if (score <= 2) return { level: score, label: "Fraca", color: "bg-orange-500" };
  if (score <= 3) return { level: score, label: "Média", color: "bg-yellow-500" };
  if (score <= 4) return { level: score, label: "Forte", color: "bg-green-500" };
  return { level: score, label: "Muito forte", color: "bg-green-600" };
};

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, createCheckout, user } = useAuth();

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

  // Already authenticated — redirect
  if (user) {
    navigate(user.accountType === "supplier" ? "/suppliers" : "/projects");
    return null;
  }

  const password = form.watch("password");
  const accountType = form.watch("accountType");
  const strength = password ? getPasswordStrength(password) : null;

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signup({
        name: values.name,
        email: values.email,
        accountType: values.accountType,
        phone: values.phone || undefined,
        password: values.password,
      });

      toast.success("Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.");

      // If a plan was selected, open checkout
      if (values.selectedPlan) {
        try {
          await createCheckout(values.selectedPlan);
        } catch {
          toast.error("Erro ao iniciar pagamento. Você pode assinar um plano no seu painel.");
        }
      }

      navigate(values.accountType === 'supplier' ? "/suppliers" : "/projects");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao criar conta. Tente novamente.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

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
                      <Input placeholder="Seu nome" disabled={isLoading} {...field} />
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
                    <FormLabel>Telefone <span className="text-gray-400 font-normal">(opcional)</span></FormLabel>
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

              {/* Plan selection only for suppliers */}
              {accountType === "supplier" && (
                <FormField
                  control={form.control}
                  name="selectedPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escolha seu plano <span className="text-gray-400 font-normal">(opcional)</span></FormLabel>
                      <div className="space-y-3 mt-2">
                        {PLANS.map((plan) => (
                          <button
                            key={plan.id}
                            type="button"
                            className={`w-full p-4 rounded-md border text-left transition-colors ${
                              field.value === plan.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => field.onChange(field.value === plan.id ? undefined : plan.id)}
                            disabled={isLoading}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{plan.name}</span>
                              <span className="text-sm text-primary font-semibold">{plan.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Você pode escolher ou alterar seu plano a qualquer momento no painel
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
                    {password && strength && (
                      <div className="mt-1">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                i <= strength.level ? strength.color : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">{strength.label}</p>
                      </div>
                    )}
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
                        e a{" "}
                        <Link to="/privacidade" className="text-primary hover:underline">
                          Política de Privacidade
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
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
