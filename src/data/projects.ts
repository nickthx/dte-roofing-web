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
    image: '/images/IMG_20240614_162239.jpg',
    alt: 'Completed residential roof with dark architectural shingles, aerial view'
  },
  {
    id: 2,
    title: 'Premium Asphalt Shingles',
    category: 'installations',
    location: 'Dublin, OH',
    image: '/images/PXL_20240910_193642307.jpg',
    alt: 'Close-up view of high-quality dark architectural shingle installation'
  },
  {
    id: 3,
    title: 'Ridge Cap Installation',
    category: 'installations',
    location: 'Westerville, OH',
    image: '/images/PXL_20240223_174412521.jpg',
    alt: 'Professional ridge cap and flashing work on residential roof'
  },
  {
    id: 4,
    title: 'Architectural Shingle Design',
    category: 'installations',
    location: 'Powell, OH',
    image: '/images/PXL_20241117_184811431.jpg',
    alt: 'Multi-tone architectural shingles showing dimensional pattern'
  },
  {
    id: 5,
    title: 'Roof Repair & Maintenance',
    category: 'repairs',
    location: 'New Albany, OH',
    image: '/images/PXL_20241123_193437816.jpg',
    alt: 'Professional roof inspection and repair services'
  },
  {
    id: 6,
    title: 'Premium Designer Shingles',
    category: 'installations',
    location: 'Gahanna, OH',
    image: '/images/PXL_20241126_192222147.jpg',
    alt: 'High-end blue-tinted architectural shingle installation'
  },
  {
    id: 7,
    title: 'Full Roof Replacement',
    category: 'installations',
    location: 'Hilliard, OH',
    image: '/images/imgi_29_AF1QipOuPz8UVysxJDgW3Yup2-QjoJB02OgbbnW5hB9J=s762-k-no.jpg',
    alt: 'Full roof replacement completed on residential home in Hilliard OH'
  },
  {
    id: 8,
    title: 'Architectural Shingle Install',
    category: 'installations',
    location: 'Dublin, OH',
    image: '/images/imgi_45_AF1QipPlwkiPGm-cFsOsqtz3YT7akGFgyYuDsODsrkKB=s762-k-no.jpg',
    alt: 'Architectural shingle installation on Dublin OH home'
  },
  {
    id: 9,
    title: 'Storm Damage Repair',
    category: 'repairs',
    location: 'Westerville, OH',
    image: '/images/imgi_63_AF1QipOZAlwajZgcY4UxTJrwNOP9joiu6s1br3F6YHGJ=s762-k-no.jpg',
    alt: 'Storm damage roof repair in Westerville OH'
  },
  {
    id: 10,
    title: 'Ridge Cap & Flashing',
    category: 'installations',
    location: 'Grove City, OH',
    image: '/images/imgi_79_AF1QipOkCOVWNg1COWEAcKLnx2UsnNTKZldm8O5acnK9=s572-k-no.jpg',
    alt: 'Ridge cap and flashing installation in Grove City OH'
  },
  {
    id: 11,
    title: 'Premium Shingle Upgrade',
    category: 'installations',
    location: 'Upper Arlington, OH',
    image: '/images/imgi_95_AF1QipPfbx2bLtEjeIu168TbuOGorOcSmN0Mk6J-DAS9=s762-k-no.jpg',
    alt: 'Premium shingle upgrade on Upper Arlington OH residence'
  },
  {
    id: 12,
    title: 'Emergency Roof Repair',
    category: 'repairs',
    location: 'Columbus, OH',
    image: '/images/imgi_113_AF1QipOI0dc8G7qFtN0xn2vOw-7bEl2l2RRQY06zGvtC=s762-k-no.jpg',
    alt: 'Emergency roof repair completed in Columbus OH'
  },
  {
    id: 13,
    title: 'Residential Re-Roof',
    category: 'installations',
    location: 'Worthington, OH',
    image: '/images/imgi_129_AF1QipPLoerWYAehP08JHS41YC1wd6DzptFDVbCFMc3o=s572-k-no.jpg',
    alt: 'Residential re-roofing project in Worthington OH'
  },
  {
    id: 14,
    title: 'Shingle & Deck Replacement',
    category: 'installations',
    location: 'Pickerington, OH',
    image: '/images/imgi_145_AF1QipMaFMPJY-n_UjIB2Bq3xB9ePKCuha9Lx1BVXnC4=s762-k-no.jpg',
    alt: 'Shingle and deck replacement in Pickerington OH'
  },
  {
    id: 15,
    title: 'Leak Repair & Waterproofing',
    category: 'repairs',
    location: 'New Albany, OH',
    image: '/images/imgi_163_AF1QipN-wdiBwS5L6ZtoIvDHp4b3Ii8p4ltaIclhsqPu=s762-k-no.jpg',
    alt: 'Leak repair and waterproofing on New Albany OH home'
  },
  {
    id: 16,
    title: 'Complete Roof Overhaul',
    category: 'installations',
    location: 'Powell, OH',
    image: '/images/imgi_185_AF1QipM6lMrOJSQwMB9J3TWHWRMHvkFnpMElSf-SQ9Pi=s762-k-no.jpg',
    alt: 'Complete roof overhaul on Powell OH residence'
  },
  {
    id: 17,
    title: 'Designer Shingle Install',
    category: 'installations',
    location: 'Gahanna, OH',
    image: '/images/imgi_203_AF1QipMe0TbnuXMZSS7uuTo2wTtpZtTluo2SHG7Q30jd=s762-k-no.jpg',
    alt: 'Designer shingle installation in Gahanna OH'
  },
  {
    id: 18,
    title: 'Hail Damage Restoration',
    category: 'repairs',
    location: 'Reynoldsburg, OH',
    image: '/images/imgi_221_AF1QipMn1VbhvHMehsFmQ5M4O_cZD7hxwPC0NixfhkTh=s762-k-no.jpg',
    alt: 'Hail damage roof restoration in Reynoldsburg OH'
  },
  {
    id: 19,
    title: 'Flat Roof Installation',
    category: 'installations',
    location: 'Columbus, OH',
    image: '/images/imgi_237_AF1QipPrkB9l1jq9RS6iBOq8E8UBsV0s3uD0r2wSwfGL=s762-k-no.jpg',
    alt: 'Flat roof installation in Columbus OH'
  },
  {
    id: 20,
    title: 'Multi-Layer Tear-Off',
    category: 'repairs',
    location: 'Lewis Center, OH',
    image: '/images/imgi_253_AF1QipPNX2ylcoXLisOBmeztQnPnCNtU8Lt46lZW2RUA=s762-k-no.jpg',
    alt: 'Multi-layer tear-off and roof replacement in Lewis Center OH'
  },
  {
    id: 21,
    title: 'GAF Timberline Install',
    category: 'installations',
    location: 'Plain City, OH',
    image: '/images/imgi_271_AF1QipNp0Zl7qHVp1bY1HvG1w2h6sja-X1iROTh95lpR=s762-k-no.jpg',
    alt: 'GAF Timberline shingle installation in Plain City OH'
  },
  {
    id: 22,
    title: 'Ventilation & Shingle Job',
    category: 'installations',
    location: 'Hilliard, OH',
    image: '/images/imgi_289_AF1QipMHhHxRkRbW5f-q8gEXi1EFWj3iJsySsCOyIeZi=s762-k-no.jpg',
    alt: 'Roof ventilation and shingle installation in Hilliard OH'
  },
  {
    id: 23,
    title: 'Wind Damage Repair',
    category: 'repairs',
    location: 'Westerville, OH',
    image: '/images/imgi_307_AF1QipN7OYvL0WlceMnxsa8XDtZN_cXQAR2mDTb2abhk=s762-k-no.jpg',
    alt: 'Wind damage roof repair in Westerville OH'
  },
  {
    id: 24,
    title: 'Steep Slope Re-Roof',
    category: 'installations',
    location: 'Grandview Heights, OH',
    image: '/images/imgi_326_AF1QipPufUZ8UNOQ0WI09vQtUlR7FQUTECMVe83zy_ih=s762-k-no.jpg',
    alt: 'Steep slope re-roofing project in Grandview Heights OH'
  },
  {
    id: 25,
    title: 'Storm Shingle Replacement',
    category: 'repairs',
    location: 'Dublin, OH',
    image: '/images/imgi_344_AF1QipNM45Gj7ySJLBOLNFUEcouhC31hW6fipQnFDARI=s762-k-no.jpg',
    alt: 'Storm damaged shingle replacement in Dublin OH'
  },
  {
    id: 26,
    title: 'New Construction Roof',
    category: 'installations',
    location: 'Grove City, OH',
    image: '/images/imgi_365_AF1QipOs4nsAVYw5t3YWkWR5SxZ1k6HCqywKzrvFExyT=s762-k-no.jpg',
    alt: 'New construction roofing project in Grove City OH'
  }
];

export const carouselProjects = projects.slice(0, 12);
