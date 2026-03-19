import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import { CheckCircle } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const schema = z.object({
  email: z.string().email("Digite um e-mail válido"),
});

type FormValues = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      });
      if (error) throw error;
      setSent(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao enviar e-mail. Tente novamente.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        <div className="flex-1 container max-w-md mx-auto px-4 py-16">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-3">E-mail enviado!</h1>
              <p className="text-muted-foreground mb-6">
                Enviamos um link para redefinir sua senha. Verifique sua caixa de entrada e a pasta de spam.
              </p>
              <Link to="/login" className="text-primary hover:underline text-sm">
                Voltar para o login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Esqueceu sua senha?</h1>
                <p className="text-muted-foreground">
                  Informe seu e-mail e enviaremos um link para criar uma nova senha.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar link de recuperação"}
                  </Button>

                  <div className="text-center">
                    <Link to="/login" className="text-sm text-primary hover:underline">
                      Voltar para o login
                    </Link>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;
