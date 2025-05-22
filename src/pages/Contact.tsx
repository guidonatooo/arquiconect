import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: 'arquiteto'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      userType: 'arquiteto'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
              Entre em Contato
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-700">
              Estamos aqui para ajudar! Envie sua mensagem ou dúvida e responderemos o mais breve possível.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Contact Information */}
              <div className="md:w-1/3">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">Informações de Contato</h2>
                  <p className="text-gray-600 mb-8">
                    Entre em contato conosco por qualquer um dos meios abaixo ou preencha o formulário e responderemos o mais breve possível.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/5 p-3 rounded-full mr-4">
                        <Phone className="text-primary w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Telefone</h3>
                        <p className="text-gray-600">(19) 99184-8687</p>
                        <p className="text-gray-600">(19) 99015-5156</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/5 p-3 rounded-full mr-4">
                        <Mail className="text-primary w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">E-mail</h3>
                        <p className="text-gray-600">contato@arquiconnect.com.br</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/5 p-3 rounded-full mr-4">
                        <MapPin className="text-primary w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Endereço</h3>
                        <p className="text-gray-600">
                          Av. Paulista, 1000, Bela Vista<br />
                          São Paulo - SP, 01310-100<br />
                          Brasil
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/5 p-3 rounded-full mr-4">
                        <MessageSquare className="text-primary w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Chat</h3>
                        <p className="text-gray-600">Disponível em horário comercial</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="font-semibold text-gray-800 mb-4">Redes Sociais</h3>
                    <div className="flex space-x-4">
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-primary/5 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-primary/5 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.08c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-primary/5 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:w-2/3">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-100">
                  <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">Envie sua Mensagem</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome Completo</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Seu nome"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="seu.email@exemplo.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="userType" className="block text-gray-700 font-medium mb-2">Você é</label>
                        <select
                          id="userType"
                          name="userType"
                          value={formData.userType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="arquiteto">Arquiteto</option>
                          <option value="fornecedor">Fornecedor</option>
                          <option value="cliente">Cliente Final</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Assunto</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Assunto da mensagem"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensagem</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Digite sua mensagem aqui..."
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="privacy" className="mr-2" required />
                      <label htmlFor="privacy" className="text-gray-600 text-sm">
                        Concordo com a <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a> e autorizo o tratamento dos meus dados.
                      </label>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                      >
                        <Send size={18} className="mr-2" />
                        Enviar Mensagem
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-montserrat font-bold text-center mb-12 text-primary">Nossa Localização</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-96">
              {/* Placeholder for the map */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-primary mx-auto mb-3" />
                  <p className="text-gray-600">Mapa será carregado aqui</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-montserrat font-bold text-center mb-12 text-primary">Perguntas Frequentes</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">Qual o tempo médio de resposta?</h3>
                  <p className="text-gray-600">
                    Respondemos a todas as mensagens em até 24 horas úteis, mas geralmente nosso tempo de resposta é muito menor, especialmente durante o horário comercial.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">Posso solicitar uma demonstração da plataforma?</h3>
                  <p className="text-gray-600">
                    Sim! Basta selecionar "Solicitar Demo" no assunto do formulário ou entrar em contato diretamente pelo telefone. Nossa equipe agendará uma demonstração personalizada.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">Como funciona o suporte técnico?</h3>
                  <p className="text-gray-600">
                    Oferecemos suporte técnico por e-mail, chat e telefone. Os horários e canais disponíveis variam conforme o plano contratado, com atendimento prioritário para assinantes dos planos mais avançados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
