import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  path: string;
  emoji: string;
}

export default function FeatureCard({ title, description, path, emoji }: CardProps) {
  return (
    <Link to={path} className="bg-slate-700 hover:bg-slate-600 transition-all duration-300 p-6 rounded-2xl shadow-lg hover:shadow-xl shadow-slate-900 transform hover:scale-105">
      <div className="text-4xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </Link>
  );
}