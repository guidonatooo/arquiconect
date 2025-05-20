
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonLink: string;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  buttonText,
  buttonLink
}: PricingCardProps) => {
  return (
    <div className={`
      bg-white rounded-xl shadow-lg overflow-hidden border transition-all 
      ${isPopular 
        ? 'border-accent scale-105 md:scale-110 relative z-10' 
        : 'border-gray-200 hover:-translate-y-2'
      }
    `}>
      {isPopular && (
        <div className="bg-accent text-white text-center py-2 font-medium">
          Mais Popular
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-xl font-montserrat font-bold text-primary">{title}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold text-primary">{price}</span>
          {price !== "Grátis" && (
            <span className="ml-1 text-lg text-gray-500">/mês</span>
          )}
        </div>
        
        <p className="mt-4 text-gray-600">{description}</p>
        
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-accent" />
              </div>
              <span className="ml-3 text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <Link
            to={buttonLink}
            className={`
              w-full px-4 py-3 text-center font-medium rounded-lg transition-colors
              ${isPopular 
                ? 'bg-accent text-white hover:bg-accent-dark' 
                : 'bg-primary text-white hover:bg-primary-light'
              }
            `}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
