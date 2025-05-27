
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupplierProjectsTab from "@/components/SupplierProjectsTab";
import SupplierMessagesTab from "@/components/SupplierMessagesTab";
import SupplierContactsTab from "@/components/SupplierContactsTab";
import MessageForm from "@/components/MessageForm";

const Suppliers = () => {
  const [showMessageForm, setShowMessageForm] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel do Fornecedor</h1>
            <p className="text-gray-600">Gerencie suas propostas, mensagens e contatos com arquitetos</p>
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
                  <CardTitle>Projetos Disponíveis</CardTitle>
                  <Button onClick={() => setShowMessageForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Enviar Proposta
                  </Button>
                </CardHeader>
                <CardContent>
                  {showMessageForm ? (
                    <MessageForm 
                      onCancel={() => setShowMessageForm(false)}
                    />
                  ) : (
                    <SupplierProjectsTab />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <SupplierMessagesTab />
            </TabsContent>

            <TabsContent value="contacts">
              <SupplierContactsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Suppliers;
