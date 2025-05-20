
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center">
      <div className="bg-primary/5 rounded-full p-4 mb-6">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-montserrat font-semibold mb-4 text-primary">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
