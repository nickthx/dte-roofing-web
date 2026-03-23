import { Link } from 'react-router-dom';
import { LOCATIONS } from '../data/locations';

const CITY_POSITIONS: Record<string, { x: number; y: number }> = {
  'delaware':        { x: 50, y: 10 },
  'powell':          { x: 45, y: 25 },
  'westerville':     { x: 60, y: 30 },
  'dublin':          { x: 30, y: 35 },
  'worthington':     { x: 50, y: 35 },
  'new-albany':      { x: 75, y: 40 },
  'upper-arlington': { x: 35, y: 45 },
  'gahanna':         { x: 65, y: 45 },
  'columbus':        { x: 50, y: 50 },
  'hilliard':        { x: 25, y: 50 },
  'reynoldsburg':    { x: 70, y: 55 },
  'grove-city':      { x: 35, y: 65 },
  'pickerington':    { x: 70, y: 65 },
};

export default function ServiceAreaMap(): JSX.Element {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <svg
        viewBox="0 0 100 80"
        role="img"
        aria-label="Map of DTE Roofing service areas across 13 Central Ohio cities"
        className="w-full max-w-2xl mx-auto"
      >
        <title>DTE Roofing Service Area Map</title>
        <ellipse
          cx="50"
          cy="40"
          rx="35"
          ry="30"
          className="fill-primary-50 stroke-primary-200"
          strokeWidth="0.5"
        />
        {LOCATIONS.map((loc) => {
          const pos = CITY_POSITIONS[loc.slug];
          if (!pos) return null;
          return (
            <Link key={loc.slug} to={`/locations/${loc.slug}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="1.5"
                className="fill-primary-700 hover:fill-primary-500 cursor-pointer transition-colors"
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                className="fill-charcoal-700 text-[2.5px] font-semibold"
              >
                {loc.cityName}
              </text>
            </Link>
          );
        })}
      </svg>
    </div>
  );
}
