import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { getLocationBySlug, LOCATIONS } from '../data/locations';
import type { LocationConfig } from '../data/locations';

interface NearbyAreasProps {
  locationSlug: string;
}

export default function NearbyAreas({ locationSlug }: NearbyAreasProps): JSX.Element | null {
  const location = getLocationBySlug(locationSlug);
  if (!location) return null;

  const neighbors = location.neighbors
    .slice(0, 5)
    .map((slug) => LOCATIONS.find((loc) => loc.slug === slug))
    .filter((loc): loc is LocationConfig => loc !== undefined);

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">
        Nearby Areas We Serve
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {neighbors.map((neighbor) => (
          <Link
            key={neighbor.slug}
            to={`/locations/${neighbor.slug}`}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all group text-center"
          >
            <MapPin className="w-6 h-6 text-primary-700 mx-auto mb-2" />
            <h3 className="font-bold text-charcoal-900 group-hover:text-primary-700 transition-colors">
              {neighbor.cityName}
            </h3>
            <span className="text-sm text-primary-700 mt-2 inline-flex items-center">
              View Services <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
