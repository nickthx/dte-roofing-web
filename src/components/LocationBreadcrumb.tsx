import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface LocationBreadcrumbProps {
  cityName: string;
}

export default function LocationBreadcrumb({ cityName }: LocationBreadcrumbProps): JSX.Element {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          <Link
            to="/locations"
            className="text-primary-700 hover:text-primary-800 font-bold transition-colors"
          >
            All Service Areas
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-charcoal-700 font-normal">{cityName}</span>
        </nav>
      </div>
    </div>
  );
}
