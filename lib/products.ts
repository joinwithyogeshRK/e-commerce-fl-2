export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  image: string;
  badge?: string;
  colors: { name: string; hex: string }[];
};

export const featured: Product[] = [
  {
    id: 'fc-01',
    name: 'Atelier Oversized Hoodie',
    category: 'Outerwear',
    price: 248,
    image: '/assets/hoodie-cream.png',
    badge: 'Signature',
    colors: [
      { name: 'Bone', hex: '#e8ddcb' },
      { name: 'Ash', hex: '#4c4a52' },
      { name: 'Ink', hex: '#121018' },
    ],
  },
  {
    id: 'fc-02',
    name: 'Nocturne Field Jacket',
    category: 'Outerwear',
    price: 460,
    compareAt: 540,
    image: '/assets/jacket-black.png',
    badge: 'Limited',
    colors: [
      { name: 'Ink', hex: '#0f0f14' },
      { name: 'Slate', hex: '#3a3f4a' },
    ],
  },
  {
    id: 'fc-03',
    name: 'Soirée Silk Gown',
    category: 'Womenswear',
    price: 690,
    image: '/assets/dress-purple.png',
    badge: 'Runway',
    colors: [
      { name: 'Orchid', hex: '#9b6fae' },
      { name: 'Noir', hex: '#17141c' },
    ],
  },
  {
    id: 'fc-04',
    name: 'Cobalt Poplin Shirt',
    category: 'Menswear',
    price: 185,
    image: '/assets/shirt-blue.png',
    colors: [
      { name: 'Cobalt', hex: '#2f4fc4' },
      { name: 'Bone', hex: '#e8ddcb' },
    ],
  },
  {
    id: 'fc-05',
    name: 'Studio Low Sneaker',
    category: 'Footwear',
    price: 320,
    image: '/assets/sneaker-white.png',
    badge: 'New',
    colors: [
      { name: 'Chalk', hex: '#f1efe9' },
      { name: 'Stone', hex: '#b9b2a6' },
    ],
  },
  {
    id: 'fc-06',
    name: 'Meridian Chronograph',
    category: 'Accessories',
    price: 1280,
    compareAt: 1480,
    image: '/assets/watch-silver.png',
    badge: 'Icon',
    colors: [
      { name: 'Steel', hex: '#b7bcc4' },
      { name: 'Graphite', hex: '#4a4d55' },
    ],
  },
];

export const trending: Product[] = [
  {
    id: 'tr-01',
    name: 'Ivory Heavyweight Hoodie',
    category: 'Unisex',
    price: 215,
    compareAt: 268,
    image: '/assets/hoodie-ivory.png',
    badge: '20% off',
    colors: [
      { name: 'Ivory', hex: '#efe6d6' },
      { name: 'Clay', hex: '#a98f74' },
      { name: 'Ink', hex: '#14121a' },
    ],
  },
  {
    id: 'tr-02',
    name: 'Nocturne Field Jacket',
    category: 'Menswear',
    price: 460,
    image: '/assets/jacket-black.png',
    colors: [
      { name: 'Ink', hex: '#0f0f14' },
      { name: 'Olive', hex: '#4b4f3c' },
    ],
  },
  {
    id: 'tr-03',
    name: 'Studio Low Sneaker',
    category: 'Footwear',
    price: 320,
    image: '/assets/sneaker-white.png',
    badge: 'Restock',
    colors: [
      { name: 'Chalk', hex: '#f1efe9' },
      { name: 'Mist', hex: '#cfd3d8' },
    ],
  },
  {
    id: 'tr-04',
    name: 'Meridian Chronograph',
    category: 'Accessories',
    price: 1280,
    image: '/assets/watch-silver.png',
    colors: [
      { name: 'Steel', hex: '#b7bcc4' },
      { name: 'Onyx', hex: '#22242a' },
    ],
  },
  {
    id: 'tr-05',
    name: 'Cobalt Poplin Shirt',
    category: 'Menswear',
    price: 185,
    compareAt: 230,
    image: '/assets/shirt-blue.png',
    badge: 'Sale',
    colors: [
      { name: 'Cobalt', hex: '#2f4fc4' },
      { name: 'Sand', hex: '#d8cbb8' },
    ],
  },
  {
    id: 'tr-06',
    name: 'Soirée Silk Gown',
    category: 'Womenswear',
    price: 690,
    image: '/assets/dress-purple.png',
    colors: [
      { name: 'Orchid', hex: '#9b6fae' },
      { name: 'Plum', hex: '#5b3a63' },
    ],
  },
  {
    id: 'tr-07',
    name: 'Atelier Oversized Hoodie',
    category: 'Unisex',
    price: 248,
    image: '/assets/hoodie-cream.png',
    colors: [
      { name: 'Bone', hex: '#e8ddcb' },
      { name: 'Smoke', hex: '#6b6873' },
    ],
  },
  {
    id: 'tr-08',
    name: 'Curated Capsule Rail',
    category: 'Collections',
    price: 1850,
    image: '/assets/rack.png',
    badge: 'Full set',
    colors: [
      { name: 'Neutral', hex: '#c9b9a3' },
      { name: 'Monochrome', hex: '#2a2a33' },
    ],
  },
];

export const categories = [
  {
    name: 'Men',
    count: '248 pieces',
    image: '/assets/model-man.png',
    blurb: 'Tailored volume, technical finishes.',
  },
  {
    name: 'Women',
    count: '312 pieces',
    image: '/assets/model-woman.png',
    blurb: 'Fluid silhouettes in motion.',
  },
  {
    name: 'Accessories',
    count: '96 pieces',
    image: '/assets/watch-silver.png',
    blurb: 'Hardware with intent.',
  },
  {
    name: 'Footwear',
    count: '74 pieces',
    image: '/assets/sneaker-white.png',
    blurb: 'Built for the long walk home.',
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
