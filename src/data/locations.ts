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
    neighbors: ['hilliard', 'dublin', 'upper-arlington', 'westerville', 'gahanna', 'reynoldsburg', 'grove-city', 'worthington'],
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
    neighbors: ['columbus', 'hilliard', 'powell', 'worthington', 'upper-arlington'],
    description: 'Northwest Columbus suburbs',
    highlight: 'Premier Neighborhoods',
  },
  {
    slug: 'new-albany',
    cityName: 'New Albany',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'westerville', 'gahanna'],
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
    neighbors: ['columbus', 'powell', 'gahanna', 'worthington', 'new-albany'],
    description: 'Northeastern Columbus area',
    highlight: 'Tree-Lined Communities',
  },
  {
    slug: 'gahanna',
    cityName: 'Gahanna',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'westerville', 'new-albany', 'reynoldsburg'],
    description: 'City of Character',
    highlight: 'Creek Corridor Specialists',
  },
  {
    slug: 'reynoldsburg',
    cityName: 'Reynoldsburg',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'gahanna', 'pickerington'],
    description: 'Eastern Franklin County',
    highlight: 'Storm Protection Experts',
  },
  {
    slug: 'grove-city',
    cityName: 'Grove City',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'hilliard', 'pickerington'],
    description: 'Southwest Columbus suburbs',
    highlight: 'Rapid Growth Area',
  },
  {
    slug: 'pickerington',
    cityName: 'Pickerington',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'reynoldsburg', 'grove-city', 'gahanna'],
    description: 'Southeast suburbs',
    highlight: 'Dual-County Service',
  },
  {
    slug: 'worthington',
    cityName: 'Worthington',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'dublin', 'powell', 'westerville', 'upper-arlington'],
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
    neighbors: ['dublin', 'westerville', 'delaware', 'worthington'],
    description: 'Growing northern community',
    highlight: 'Premium Developments',
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
