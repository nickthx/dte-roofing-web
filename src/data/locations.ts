export interface LocationConfig {
  slug: string;
  cityName: string;
  stateAbbr: string;
  neighbors: string[];
  description?: string;
  highlight?: string;
}

export const LOCATIONS: LocationConfig[] = [
  {
    slug: 'columbus',
    cityName: 'Columbus',
    stateAbbr: 'OH',
    neighbors: ['hilliard', 'upper-arlington', 'worthington', 'gahanna', 'grove-city'],
    description: "Central Ohio's capital city",
    highlight: 'Downtown & Surrounding Areas',
  },
  {
    slug: 'hilliard',
    cityName: 'Hilliard',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'dublin', 'upper-arlington', 'grove-city'],
    description: 'Our home base',
    highlight: 'Fast Local Response',
  },
  {
    slug: 'dublin',
    cityName: 'Dublin',
    stateAbbr: 'OH',
    neighbors: ['hilliard', 'powell', 'worthington', 'upper-arlington', 'columbus'],
    description: 'Northwest Columbus suburbs',
    highlight: 'Premier Neighborhoods',
  },
  {
    slug: 'new-albany',
    cityName: 'New Albany',
    stateAbbr: 'OH',
    neighbors: ['gahanna', 'westerville', 'columbus', 'reynoldsburg', 'pickerington'],
    description: 'Upscale eastern community',
    highlight: 'Luxury Home Specialists',
  },
  {
    slug: 'upper-arlington',
    cityName: 'Upper Arlington',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'hilliard', 'dublin', 'worthington', 'grove-city'],
    description: 'Prestigious western suburb',
    highlight: 'Historic Home Experts',
  },
  {
    slug: 'westerville',
    cityName: 'Westerville',
    stateAbbr: 'OH',
    neighbors: ['worthington', 'new-albany', 'gahanna', 'powell', 'delaware'],
    description: 'Northeastern Columbus area',
    highlight: 'Tree-Lined Communities',
  },
  {
    slug: 'gahanna',
    cityName: 'Gahanna',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'new-albany', 'westerville', 'reynoldsburg', 'pickerington'],
    description: 'City of Character',
    highlight: 'Creek Corridor Specialists',
  },
  {
    slug: 'reynoldsburg',
    cityName: 'Reynoldsburg',
    stateAbbr: 'OH',
    neighbors: ['gahanna', 'pickerington', 'columbus', 'new-albany'],
    description: 'Eastern Franklin County',
    highlight: 'Storm Protection Experts',
  },
  {
    slug: 'grove-city',
    cityName: 'Grove City',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'hilliard', 'upper-arlington'],
    description: 'Southwest Columbus suburbs',
    highlight: 'Rapid Growth Area',
  },
  {
    slug: 'pickerington',
    cityName: 'Pickerington',
    stateAbbr: 'OH',
    neighbors: ['reynoldsburg', 'gahanna', 'columbus', 'new-albany'],
    description: 'Southeast suburbs',
    highlight: 'Dual-County Service',
  },
  {
    slug: 'worthington',
    cityName: 'Worthington',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'dublin', 'westerville', 'powell', 'delaware'],
    description: 'Historic northern suburb',
    highlight: 'Preservation Specialists',
  },
  {
    slug: 'delaware',
    cityName: 'Delaware',
    stateAbbr: 'OH',
    neighbors: ['powell', 'westerville', 'worthington'],
    description: 'Delaware County seat',
    highlight: 'Northern Expansion',
  },
  {
    slug: 'powell',
    cityName: 'Powell',
    stateAbbr: 'OH',
    neighbors: ['dublin', 'worthington', 'delaware', 'westerville'],
    description: 'Growing northern community',
    highlight: 'Premium Developments',
  },
];

export const getLocationBySlug = (slug: string): LocationConfig | undefined =>
  LOCATIONS.find((loc) => loc.slug === slug);

// Project labels look like "Hilliard, OH"; drop the state suffix before matching the city name.
export const getLocationByCityLabel = (label: string): LocationConfig | undefined => {
  const city = label.replace(/,\s*[A-Za-z]{2}\s*$/, '').trim().toLowerCase();
  return LOCATIONS.find((loc) => loc.cityName.toLowerCase() === city);
};

export const getAreaServedForLocation = (slug: string): LocationConfig[] => {
  const primary = LOCATIONS.find((loc) => loc.slug === slug);
  if (!primary) return [];
  const neighborConfigs = primary.neighbors
    .map((neighborSlug) => LOCATIONS.find((loc) => loc.slug === neighborSlug))
    .filter((loc): loc is LocationConfig => loc !== undefined);
  return [primary, ...neighborConfigs];
};
