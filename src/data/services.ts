export interface ServiceConfig {
  slug: string;
  name: string;
  path: string;
}

export const SERVICES: ServiceConfig[] = [
  { slug: 'roof-installation', name: 'Roof Installation', path: '/services/roof-installation' },
  { slug: 'roof-repair', name: 'Roof Repair', path: '/services/roof-repair' },
  { slug: 'roof-replacement', name: 'Roof Replacement', path: '/services/roof-replacement' },
  { slug: 'roof-inspection', name: 'Roof Inspection', path: '/services/roof-inspection' },
  { slug: 'gutters', name: 'Gutter Services', path: '/services/gutters' },
  { slug: 'emergency-services', name: 'Emergency Roofing Services', path: '/services/emergency-services' },
  { slug: 'storm-damage', name: 'Storm Damage Repair', path: '/services/storm-damage' },
  { slug: 'preventative-maintenance', name: 'Preventative Maintenance', path: '/services/preventative-maintenance' },
  { slug: 'siding', name: 'Siding', path: '/services/siding' },
  { slug: 'commercial-roofing', name: 'Commercial Roofing', path: '/services/commercial-roofing' },
];
