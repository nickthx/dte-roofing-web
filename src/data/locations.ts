export interface LocationConfig {
  slug: string;
  cityName: string;
  stateAbbr: string;
  neighbors: string[];
}

export const LOCATIONS: LocationConfig[] = [
  {
    slug: 'columbus',
    cityName: 'Columbus',
    stateAbbr: 'OH',
    neighbors: ['hilliard', 'dublin', 'upper-arlington', 'westerville', 'gahanna', 'reynoldsburg', 'grove-city', 'worthington'],
  },
  {
    slug: 'hilliard',
    cityName: 'Hilliard',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'dublin', 'upper-arlington', 'grove-city'],
  },
  {
    slug: 'dublin',
    cityName: 'Dublin',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'hilliard', 'powell', 'worthington', 'upper-arlington'],
  },
  {
    slug: 'new-albany',
    cityName: 'New Albany',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'westerville', 'gahanna'],
  },
  {
    slug: 'upper-arlington',
    cityName: 'Upper Arlington',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'hilliard', 'dublin', 'worthington', 'grove-city'],
  },
  {
    slug: 'westerville',
    cityName: 'Westerville',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'powell', 'gahanna', 'worthington', 'new-albany'],
  },
  {
    slug: 'gahanna',
    cityName: 'Gahanna',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'westerville', 'new-albany', 'reynoldsburg'],
  },
  {
    slug: 'reynoldsburg',
    cityName: 'Reynoldsburg',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'gahanna', 'pickerington'],
  },
  {
    slug: 'grove-city',
    cityName: 'Grove City',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'hilliard', 'pickerington'],
  },
  {
    slug: 'pickerington',
    cityName: 'Pickerington',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'reynoldsburg', 'grove-city', 'gahanna'],
  },
  {
    slug: 'worthington',
    cityName: 'Worthington',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'dublin', 'powell', 'westerville', 'upper-arlington'],
  },
  {
    slug: 'delaware',
    cityName: 'Delaware',
    stateAbbr: 'OH',
    neighbors: ['powell', 'westerville', 'worthington'],
  },
  {
    slug: 'powell',
    cityName: 'Powell',
    stateAbbr: 'OH',
    neighbors: ['dublin', 'westerville', 'delaware', 'worthington'],
  },
];

export const getLocationBySlug = (slug: string): LocationConfig | undefined =>
  LOCATIONS.find((loc) => loc.slug === slug);

export const getAreaServedForLocation = (slug: string): LocationConfig[] => {
  const primary = LOCATIONS.find((loc) => loc.slug === slug);
  if (!primary) return [];
  const neighborConfigs = primary.neighbors
    .map((neighborSlug) => LOCATIONS.find((loc) => loc.slug === neighborSlug))
    .filter((loc): loc is LocationConfig => loc !== undefined);
  return [primary, ...neighborConfigs];
};

export const getAllLocationSlugs = (): string[] =>
  LOCATIONS.map((loc) => loc.slug);
