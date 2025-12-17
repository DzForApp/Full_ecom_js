// /data/homeData.ts

export const featuredProducts = [
  {
    id: 1,
    name: 'Kit Freins Premium (Disques + Plaquettes)',
    price: 129.99,
    rating: 4.5,
    reviews: 234,
    image: '/images/products/brake-kit.jpg',
    discount: 20,
    category: 'Freins'
  },
  {
    id: 2,
    name: 'Pneus Hiver 205/55R16 91H',
    price: 89.99,
    rating: 4.8,
    reviews: 156,
    image: '/images/products/winter-tires.jpg',
    discount: 15,
    category: 'Pneus'
  },
  {
    id: 3,
    name: 'Batterie 12V 70Ah AGM',
    price: 149.99,
    rating: 4.3,
    reviews: 89,
    image: '/images/products/battery.jpg',
    discount: 10,
    category: 'Électricité'
  },
  {
    id: 4,
    name: 'Huile Moteur 5W30 Synthétique 5L',
    price: 34.99,
    rating: 4.7,
    reviews: 312,
    image: '/images/products/motor-oil.jpg',
    discount: 25,
    category: 'Lubrifiants'
  },
  {
    id: 5,
    name: 'Kit Distribution Complète',
    price: 199.99,
    rating: 4.6,
    reviews: 127,
    image: '/images/products/timing-belt.jpg',
    discount: 18,
    category: 'Moteur'
  },
  {
    id: 6,
    name: 'Feux Avant LED Xenon',
    price: 179.99,
    rating: 4.4,
    reviews: 94,
    image: '/images/products/headlights.jpg',
    discount: 12,
    category: 'Éclairage'
  },
  {
    id: 7,
    name: 'Filtre à Air Sport',
    price: 29.99,
    rating: 4.2,
    reviews: 201,
    image: '/images/products/air-filter.jpg',
    discount: 20,
    category: 'Filtration'
  },
  {
    id: 8,
    name: 'Amortisseur Avant Droit',
    price: 79.99,
    rating: 4.5,
    reviews: 143,
    image: '/images/products/shock-absorber.jpg',
    discount: 15,
    category: 'Suspension'
  }
];

export const promotions = [
  {
    id: 1,
    title: 'Soldes d\'Hiver',
    subtitle: 'Jusqu\'à -40% sur les pneus',
    description: 'Profitez de réductions exceptionnelles sur notre gamme hiver',
    image: '/images/promos/winter-sale.jpg',
    badge: 'HOT',
    badgeColor: 'bg-red-500',
    link: '/promotions/hiver'
  },
  {
    id: 2,
    title: 'Pièces Premium',
    subtitle: 'Garantie 3 ans incluse',
    description: 'Toutes nos pièces premium avec garantie prolongée',
    image: '/images/promos/premium-parts.jpg',
    badge: 'NEW',
    badgeColor: 'bg-blue-500',
    link: '/categories/premium'
  },
  {
    id: 3,
    title: 'Livraison Express',
    subtitle: 'Offerte dès 150€ d\'achat',
    description: 'Recevez vos pièces en 24h avec notre service express',
    image: '/images/promos/fast-delivery.jpg',
    badge: 'FLASH',
    badgeColor: 'bg-green-500',
    link: '/livraison'
  },
  {
    id: 4,
    title: 'Kit Entretien',
    subtitle: 'Jusqu\'à -35% sur les packs',
    description: 'Économisez avec nos kits entretien complets',
    image: '/images/promos/maintenance-kit.jpg',
    badge: 'SAVE',
    badgeColor: 'bg-purple-500',
    link: '/kits-entretien'
  }
];

export const categories = [
  {
    id: 1,
    name: 'Freins',
    icon: '🛑',
    count: 45,
    color: 'bg-red-50',
    textColor: 'text-red-700',
    description: 'Disques, plaquettes, étriers'
  },
  {
    id: 2,
    name: 'Pneus',
    icon: '🛞',
    count: 78,
    color: 'bg-blue-50',
    textColor: 'text-blue-700',
    description: 'Toutes dimensions & marques'
  },
  {
    id: 3,
    name: 'Moteur',
    icon: '⚙️',
    count: 62,
    color: 'bg-orange-50',
    textColor: 'text-orange-700',
    description: 'Distribution, embrayage'
  },
  {
    id: 4,
    name: 'Électricité',
    icon: '🔋',
    count: 34,
    color: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    description: 'Batteries, alternateurs'
  },
  {
    id: 5,
    name: 'Carrosserie',
    icon: '🚗',
    count: 56,
    color: 'bg-green-50',
    textColor: 'text-green-700',
    description: 'Pare-chocs, rétroviseurs'
  },
  {
    id: 6,
    name: 'Intérieur',
    icon: '💺',
    count: 41,
    color: 'bg-purple-50',
    textColor: 'text-purple-700',
    description: 'Sièges, volants, tapis'
  },
  {
    id: 7,
    name: 'Éclairage',
    icon: '💡',
    count: 29,
    color: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    description: 'Phares, feux, ampoules'
  },
  {
    id: 8,
    name: 'Suspension',
    icon: '🔄',
    count: 38,
    color: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    description: 'Amortisseurs, rotules'
  },
  {
    id: 9,
    name: 'Filtration',
    icon: '🌫️',
    count: 27,
    color: 'bg-pink-50',
    textColor: 'text-pink-700',
    description: 'Filtres à air, huile, habitacle'
  },
  {
    id: 10,
    name: 'Lubrifiants',
    icon: '🛢️',
    count: 42,
    color: 'bg-amber-50',
    textColor: 'text-amber-700',
    description: 'Huiles, graisses, liquides'
  },
  {
    id: 11,
    name: 'Échappement',
    icon: '🗜️',
    count: 31,
    color: 'bg-gray-100',
    textColor: 'text-gray-700',
    description: 'Pots, catalyseurs, silencieux'
  },
  {
    id: 12,
    name: 'Accessoires',
    icon: '🔧',
    count: 85,
    color: 'bg-teal-50',
    textColor: 'text-teal-700',
    description: 'Outils, gadgets, améliorations'
  }
];

export const bestSellers = [
  {
    id: 1,
    name: 'Kit Plaquettes Avant Premium',
    price: 49.99,
    rating: 4.7,
    icon: '🛑',
    soldCount: 1245,
    category: 'Freins'
  },
  {
    id: 2,
    name: 'Liquide de Frein DOT4',
    price: 14.99,
    rating: 4.5,
    icon: '💧',
    soldCount: 987,
    category: 'Freins'
  },
  {
    id: 3,
    name: 'Pneus Été 195/65R15',
    price: 74.99,
    rating: 4.8,
    icon: '🛞',
    soldCount: 856,
    category: 'Pneus'
  },
  {
    id: 4,
    name: 'Huile 10W40 5L',
    price: 29.99,
    rating: 4.6,
    icon: '🛢️',
    soldCount: 743,
    category: 'Lubrifiants'
  },
  {
    id: 5,
    name: 'Batterie 60Ah',
    price: 119.99,
    rating: 4.4,
    icon: '🔋',
    soldCount: 621,
    category: 'Électricité'
  },
  {
    id: 6,
    name: 'Filtre à Pollen',
    price: 19.99,
    rating: 4.3,
    icon: '🌫️',
    soldCount: 534,
    category: 'Filtration'
  }
];

export const brands = [
  'BOSCH',
  'CONTINENTAL',
  'MICHELIN',
  'VALEO',
  'DELPHI',
  'BREMBO',
  'MONROE',
  'NGK',
  'MANN',
  'CASTROL',
  'MOBIL',
  'TOTAL'
];

export const newArrivals = [
  {
    id: 1,
    name: 'Feux AR LED Dynamiques',
    price: 249.99,
    category: 'Éclairage',
    isNew: true,
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Suspension Pneumatique Kit',
    price: 899.99,
    category: 'Suspension',
    isNew: true,
    date: '2024-01-14'
  },
  {
    id: 3,
    name: 'Écran Android Auto',
    price: 199.99,
    category: 'Intérieur',
    isNew: true,
    date: '2024-01-12'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Marc Dubois',
    role: 'Mécanicien indépendant',
    comment: 'La qualité des pièces et la rapidité de livraison sont exceptionnelles. Je recommande !',
    rating: 5,
    date: '2024-01-10'
  },
  {
    id: 2,
    name: 'Sophie Martin',
    role: 'Particulière',
    comment: 'Première commande réussie ! Le kit freins était parfait pour ma voiture.',
    rating: 4,
    date: '2024-01-08'
  },
  {
    id: 3,
    name: 'AutoService 34',
    role: 'Garage professionnel',
    comment: 'Notre fournisseur principal depuis 2 ans. Service impeccable.',
    rating: 5,
    date: '2024-01-05'
  }
];

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  category: string;
}

export interface Promotion {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  link: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
  color: string;
  textColor: string;
  description: string;
}

export interface BestSeller {
  id: number;
  name: string;
  price: number;
  rating: number;
  icon: string;
  soldCount: number;
  category: string;
} 