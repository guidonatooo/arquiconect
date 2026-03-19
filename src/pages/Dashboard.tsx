
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  FolderOpen,
  MessageSquare,
  Users,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading, logout, subscription } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Carregando...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const isArchitect = user.accountType === "architect";
  const typeLabel = isArchitect ? "Arquiteto(a)" : "Fornecedor(a)";

  const cards = isArchitect
    ? [
        {
          title: "Meus Projetos",
          description: "Crie e gerencie seus projetos arquitetônicos",
          icon: FolderOpen,
          route: "/projects",
          color: "text-blue-600 bg-blue-50",
        },
        {
          title: "Mensagens",
          description: "Veja propostas e mensagens de fornecedores",
          icon: MessageSquare,
          route: "/projects",
          tab: "messages",
          color: "text-green-600 bg-green-50",
        },
        {
          title: "Contatos",
          description: "Encontre e conecte-se com fornecedores",
          icon: Users,
          route: "/projects",
          tab: "contacts",
          color: "text-purple-600 bg-purple-50",
        },
      ]
    : [
        {
          title: "Projetos Disponíveis",
          description: "Encontre projetos e envie suas propostas",
          icon: FolderOpen,
          route: "/suppliers",
          color: "text-blue-600 bg-blue-50",
        },
        {
          title: "Mensagens",
          description: "Acompanhe conversas com arquitetos",
          icon: MessageSquare,
          route: "/suppliers",
          tab: "messages",
          color: "text-green-600 bg-green-50",
        },
        {
          title: "Contatos",
          description: "Sua rede de arquitetos parceiros",
          icon: Users,
          route: "/suppliers",
          tab: "contacts",
          color: "text-purple-600 bg-purple-50",
        },
      ];

  const projects: Array<{id: string; name: string; status: string; createdAt: string}> = user?.id
    ? JSON.parse(localStorage.getItem(`projects_${user.id}`) || '[]')
    : [];

  const recentProjects = projects.slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Welcome banner */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Olá, {user.name}!
                </h1>
                <p className="text-gray-500 mt-1">
                  {typeLabel} · {user.email}
                </p>
                {subscription.subscribed && (
                  <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Plano {subscription.subscription_tier} ativo
                  </Badge>
                )}
                {!subscription.subscribed && isArchitect === false && (
                  <Badge variant="outline" className="mt-2 text-gray-500">
                    Sem plano ativo
                  </Badge>
                )}
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">
                Sair
              </Button>
            </div>
          </div>

          {/* Quick access cards */}
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {cards.map((card) => {
              const Icon = card.icon;
              const destination = card.tab
                ? `${card.route}?tab=${card.tab}`
                : card.route;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-xl border hover:shadow-md transition-shadow cursor-pointer p-5 flex flex-col justify-between"
                  onClick={() => navigate(destination)}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{card.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                  </div>
                  <div className="flex items-center text-primary text-sm mt-4">
                    <span>Acessar</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subscription & Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">
                  {isArchitect ? "Projetos Recentes" : "Atividades Recentes"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary text-xs"
                  onClick={() => navigate(isArchitect ? "/projects" : "/suppliers")}
                >
                  Ver todos
                </Button>
              </CardHeader>
              <CardContent>
                {recentProjects.length > 0 ? (
                  <div className="space-y-3">
                    {recentProjects.map((p) => (
                      <div key={p.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="text-gray-700 truncate max-w-[160px]">{p.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {p.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 py-2">
                    {isArchitect
                      ? "Crie seu primeiro projeto para começar a receber propostas."
                      : "Explore os projetos disponíveis e envie suas primeiras propostas."}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Subscription info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Assinatura
                </CardTitle>
              </CardHeader>
              <CardContent>
                {subscription.subscribed ? (
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Plano:</span>{" "}
                      {subscription.subscription_tier}
                    </p>
                    {subscription.subscription_end && (
                      <p className="text-gray-700">
                        <span className="font-medium">Válido até:</span>{" "}
                        {new Date(subscription.subscription_end).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
                      <a href="/precos">Gerenciar plano</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      {isArchitect
                        ? "Arquitetos têm acesso gratuito. Publique projetos e receba propostas."
                        : "Assine um plano para enviar propostas para os projetos disponíveis."}
                    </p>
                    {!isArchitect && (
                      <Button size="sm" className="w-full" onClick={() => navigate("/precos")}>
                        Ver planos
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
