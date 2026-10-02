import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { getLocationBySlug } from '../data/locations';
import type { LocationConfig } from '../data/locations';

interface RelatedAreasProps {
  slugs: string[];
}

export default function RelatedAreas({ slugs }: RelatedAreasProps): JSX.Element | null {
  const areas = slugs
    .map((slug) => getLocationBySlug(slug))
    .filter((loc): loc is LocationConfig => loc !== undefined);

  if (areas.length === 0) return null;

  return (
    <section aria-labelledby="related-areas-heading">
      <h2 id="related-areas-heading" className="text-3xl font-bold text-charcoal-900 mb-8 text-center">
        Roofing Services Near You
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {areas.map((area) => (
          <Link
            key={area.slug}
            to={`/locations/${area.slug}`}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all group text-center"
          >
            <MapPin className="w-6 h-6 text-primary-700 mx-auto mb-2" />
            <h3 className="font-bold text-charcoal-900 group-hover:text-primary-700 transition-colors">
              {area.cityName}
            </h3>
            <span className="text-sm text-primary-700 mt-2 inline-flex items-center">
              View Services <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
