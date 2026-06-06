export interface Project {
  id: number;
  title: string;
  category: 'installations' | 'repairs';
  location: string;
  image: string;
  alt: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Residential Roof Replacement',
    category: 'installations',
    location: 'Columbus, OH',
    image: '/images/columbus-residential-roof-replacement.jpg',
    alt: 'Completed residential roof with dark architectural shingles, aerial view'
  },
  {
    id: 2,
    title: 'Premium Asphalt Shingles',
    category: 'installations',
    location: 'Dublin, OH',
    image: '/images/dublin-premium-asphalt-shingles.jpg',
    alt: 'Close-up view of high-quality dark architectural shingle installation'
  },
  {
    id: 3,
    title: 'Ridge Cap Installation',
    category: 'installations',
    location: 'Westerville, OH',
    image: '/images/westerville-ridge-cap-installation.jpg',
    alt: 'Professional ridge cap and flashing work on residential roof'
  },
  {
    id: 4,
    title: 'Architectural Shingle Design',
    category: 'installations',
    location: 'Powell, OH',
    image: '/images/powell-architectural-shingle-design.jpg',
    alt: 'Multi-tone architectural shingles showing dimensional pattern'
  },
  {
    id: 5,
    title: 'Roof Repair & Maintenance',
    category: 'repairs',
    location: 'New Albany, OH',
    image: '/images/new-albany-roof-repair-and-maintenance.jpg',
    alt: 'Professional roof inspection and repair services'
  },
  {
    id: 6,
    title: 'Premium Designer Shingles',
    category: 'installations',
    location: 'Gahanna, OH',
    image: '/images/gahanna-premium-designer-shingles.jpg',
    alt: 'High-end blue-tinted architectural shingle installation'
  },
  {
    id: 7,
    title: 'Full Roof Replacement',
    category: 'installations',
    location: 'Hilliard, OH',
    image: '/images/hilliard-full-roof-replacement.jpg',
    alt: 'Full roof replacement completed on residential home in Hilliard OH'
  },
  {
    id: 8,
    title: 'Architectural Shingle Install',
    category: 'installations',
    location: 'Dublin, OH',
    image: '/images/dublin-architectural-shingle-install.jpg',
    alt: 'Architectural shingle installation on Dublin OH home'
  },
  {
    id: 9,
    title: 'Storm Damage Repair',
    category: 'repairs',
    location: 'Westerville, OH',
    image: '/images/westerville-storm-damage-repair.jpg',
    alt: 'Storm damage roof repair in Westerville OH'
  },
  {
    id: 10,
    title: 'Ridge Cap & Flashing',
    category: 'installations',
    location: 'Grove City, OH',
    image: '/images/grove-city-ridge-cap-and-flashing.jpg',
    alt: 'Ridge cap and flashing installation in Grove City OH'
  },
  {
    id: 11,
    title: 'Premium Shingle Upgrade',
    category: 'installations',
    location: 'Upper Arlington, OH',
    image: '/images/upper-arlington-premium-shingle-upgrade.jpg',
    alt: 'Premium shingle upgrade on Upper Arlington OH residence'
  },
  {
    id: 12,
    title: 'Emergency Roof Repair',
    category: 'repairs',
    location: 'Columbus, OH',
    image: '/images/columbus-emergency-roof-repair.jpg',
    alt: 'Emergency roof repair completed in Columbus OH'
  },
  {
    id: 13,
    title: 'Residential Re-Roof',
    category: 'installations',
    location: 'Worthington, OH',
    image: '/images/worthington-residential-re-roof.jpg',
    alt: 'Residential re-roofing project in Worthington OH'
  },
  {
    id: 14,
    title: 'Shingle & Deck Replacement',
    category: 'installations',
    location: 'Pickerington, OH',
    image: '/images/pickerington-shingle-and-deck-replacement.jpg',
    alt: 'Shingle and deck replacement in Pickerington OH'
  },
  {
    id: 15,
    title: 'Leak Repair & Waterproofing',
    category: 'repairs',
    location: 'New Albany, OH',
    image: '/images/new-albany-leak-repair-and-waterproofing.jpg',
    alt: 'Leak repair and waterproofing on New Albany OH home'
  },
  {
    id: 16,
    title: 'Complete Roof Overhaul',
    category: 'installations',
    location: 'Powell, OH',
    image: '/images/powell-complete-roof-overhaul.jpg',
    alt: 'Complete roof overhaul on Powell OH residence'
  },
  {
    id: 17,
    title: 'Designer Shingle Install',
    category: 'installations',
    location: 'Gahanna, OH',
    image: '/images/gahanna-designer-shingle-install.jpg',
    alt: 'Designer shingle installation in Gahanna OH'
  },
  {
    id: 18,
    title: 'Hail Damage Restoration',
    category: 'repairs',
    location: 'Reynoldsburg, OH',
    image: '/images/reynoldsburg-hail-damage-restoration.jpg',
    alt: 'Hail damage roof restoration in Reynoldsburg OH'
  },
  {
    id: 19,
    title: 'Flat Roof Installation',
    category: 'installations',
    location: 'Columbus, OH',
    image: '/images/columbus-flat-roof-installation.jpg',
    alt: 'Flat roof installation in Columbus OH'
  },
  {
    id: 20,
    title: 'Multi-Layer Tear-Off',
    category: 'repairs',
    location: 'Lewis Center, OH',
    image: '/images/lewis-center-multi-layer-tear-off.jpg',
    alt: 'Multi-layer tear-off and roof replacement in Lewis Center OH'
  },
  {
    id: 21,
    title: 'GAF Timberline Install',
    category: 'installations',
    location: 'Plain City, OH',
    image: '/images/plain-city-gaf-timberline-install.jpg',
    alt: 'GAF Timberline shingle installation in Plain City OH'
  },
  {
    id: 22,
    title: 'Ventilation & Shingle Job',
    category: 'installations',
    location: 'Hilliard, OH',
    image: '/images/hilliard-ventilation-and-shingle-job.jpg',
    alt: 'Roof ventilation and shingle installation in Hilliard OH'
  },
  {
    id: 23,
    title: 'Wind Damage Repair',
    category: 'repairs',
    location: 'Westerville, OH',
    image: '/images/westerville-wind-damage-repair.jpg',
    alt: 'Wind damage roof repair in Westerville OH'
  },
  {
    id: 24,
    title: 'Steep Slope Re-Roof',
    category: 'installations',
    location: 'Grandview Heights, OH',
    image: '/images/grandview-heights-steep-slope-re-roof.jpg',
    alt: 'Steep slope re-roofing project in Grandview Heights OH'
  },
  {
    id: 25,
    title: 'Storm Shingle Replacement',
    category: 'repairs',
    location: 'Dublin, OH',
    image: '/images/dublin-storm-shingle-replacement.jpg',
    alt: 'Storm damaged shingle replacement in Dublin OH'
  },
  {
    id: 26,
    title: 'New Construction Roof',
    category: 'installations',
    location: 'Grove City, OH',
    image: '/images/grove-city-new-construction-roof.jpg',
    alt: 'New construction roofing project in Grove City OH'
  }
];

export const carouselProjects = projects.slice(0, 12);
