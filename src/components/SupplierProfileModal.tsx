
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SupplierProfileModalProps {
  open: boolean;
  onClose: () => void;
  supplier: {
    name: string;
    company: string;
    category: string;
    phone: string;
    email: string;
    whatsapp?: string;
    location: string;
    rating: number;
    description: string;
    products: string[];
    experience: string;
  };
}

const SupplierProfileModal = ({ open, onClose, supplier }: SupplierProfileModalProps) => {
  const handleWhatsAppContact = () => {
    if (supplier.whatsapp) {
      const message = encodeURIComponent(`Olá ${supplier.name}, vi seu perfil na ArquiConnect e gostaria de conversar sobre uma possível parceria.`);
      window.open(`https://wa.me/${supplier.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{supplier.name}</DialogTitle>
          <p className="text-sm text-gray-600">{supplier.company}</p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-700">Categoria</h4>
                <Badge variant="secondary">{supplier.category}</Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Localização</h4>
                <p className="text-gray-600">{supplier.location}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Avaliação</h4>
                <p className="text-gray-600">⭐ {supplier.rating}/5</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Experiência</h4>
                <p className="text-gray-600">{supplier.experience}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-700">Contato</h4>
                <div className="space-y-2">
                  {supplier.whatsapp ? (
                    <Button 
                      onClick={handleWhatsAppContact}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  ) : (
                    <Card className="p-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{supplier.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{supplier.email}</span>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Sobre a Empresa</h4>
            <p className="text-gray-600">{supplier.description}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Produtos e Serviços</h4>
            <div className="flex flex-wrap gap-2">
              {supplier.products.map((product, index) => (
                <Badge key={index} variant="outline">{product}</Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierProfileModal;
