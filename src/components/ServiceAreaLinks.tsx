import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { LOCATIONS } from '../data/locations';

export default function ServiceAreaLinks(): JSX.Element {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
        We Serve These Areas
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {LOCATIONS.map((loc) => (
          <Link
            key={loc.slug}
            to={`/locations/${loc.slug}`}
            className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-lg group flex items-center justify-between"
          >
            <span className="font-semibold text-charcoal-900 group-hover:text-primary-700">
              {loc.cityName}
            </span>
            <ChevronRight className="w-5 h-5 text-primary-700 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
        <Link
          to="/locations"
          className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-lg group flex items-center justify-between"
        >
          <span className="font-semibold text-charcoal-900 group-hover:text-primary-700">
            All Service Areas
          </span>
          <ChevronRight className="w-5 h-5 text-primary-700 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
