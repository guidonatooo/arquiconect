
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Bem-vindo(a), {user.name}!</h1>
                <p className="text-gray-600 mt-1">
                  {user.accountType === "architect" ? "Arquiteto" : "Fornecedor"}
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Sair
              </Button>
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Painel de Controle</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  className="bg-primary/5 border border-primary/20 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(user.accountType === "architect" ? "/projects" : "/suppliers")}
                >
                  <h3 className="font-medium text-lg text-primary">Projetos</h3>
                  <p className="text-gray-600 mt-1">
                    {user.accountType === "architect" ? "Gerencie seus projetos" : "Veja projetos disponíveis"}
                  </p>
                </div>
                
                <div 
                  className="bg-primary/5 border border-primary/20 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(user.accountType === "architect" ? "/projects" : "/suppliers")}
                >
                  <h3 className="font-medium text-lg text-primary">Mensagens</h3>
                  <p className="text-gray-600 mt-1">Veja suas mensagens recentes</p>
                </div>
                
                <div 
                  className="bg-primary/5 border border-primary/20 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(user.accountType === "architect" ? "/projects" : "/suppliers")}
                >
                  <h3 className="font-medium text-lg text-primary">Contatos</h3>
                  <p className="text-gray-600 mt-1">Gerenciar seus contatos</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">Não há atividades recentes para mostrar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
