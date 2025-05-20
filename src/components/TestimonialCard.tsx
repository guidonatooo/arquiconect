
interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  image: string;
}

const TestimonialCard = ({ content, author, role, image }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img 
            src={image} 
            alt={author} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-montserrat font-semibold">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <div className="relative">
        <svg 
          className="absolute -top-4 -left-2 w-8 h-8 text-primary opacity-10" 
          fill="currentColor" 
          viewBox="0 0 32 32"
        >
          <path d="M10 8c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM10 26c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zM24 8c-1.5 0-3 0.3-4.4 0.9l0.9 1.8c1.1-0.5 2.3-0.8 3.5-0.8 4.4 0 8 3.6 8 8s-3.6 8-8 8v2c5.5 0 10-4.5 10-10s-4.5-10-10-10z"></path>
        </svg>
        <p className="text-gray-600 italic pl-4">{content}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
