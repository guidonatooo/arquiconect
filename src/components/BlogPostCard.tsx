
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

const BlogPostCard = ({ title, excerpt, image, category, date, slug }: BlogPostCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/5 rounded-full">
            {category}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <h3 className="text-xl font-montserrat font-semibold mb-2 hover:text-primary transition-colors">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>
        <Link 
          to={`/blog/${slug}`} 
          className="text-primary font-medium hover:text-accent transition-colors inline-flex items-center"
        >
          Ler mais
          <svg 
            className="w-4 h-4 ml-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M5 12h14m-4-4l4 4-4 4" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
