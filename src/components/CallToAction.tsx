
import { Link } from 'react-router-dom';

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const CallToAction = ({ title, subtitle, buttonText, buttonLink }: CallToActionProps) => {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">{title}</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">{subtitle}</p>
        <Link to={buttonLink} className="btn-accent inline-block">
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
