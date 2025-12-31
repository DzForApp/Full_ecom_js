// app/page.tsx
'use client';

import { useState } from 'react';
import {
  Search,
  TrendingUp,
  Star,
  Clock,
  Tag,
  ChevronRight,
  Shield,
  Truck,
  HeadphonesIcon,
  Award,
  Filter,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import CategoryCard from '@/components/home/CategoriesGrid';
import PromoCarousel from '@/components/home/FeaturedProducts';
import SearchBar from '@/components/home/SearchBar';
import { featuredProducts, categories, promotions, bestSellers, brands } from '@/data/homeData';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import { categoryService } from '@/lib/api/services';
import CategoriesSidebar from '@/components/home/CategoriesSidebar';
import IntroPanel from '@/components/home/HomePanel';
import HomePanel from '@/components/home/HomePanel';
import Navbar from '@/components/layout/Navbar';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  //const categories = await categoryService.getAll();


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche:', searchTerm);
    // Redirection ou logique de recherche
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-white">
      {/* Hero Section avec Barre de Recherche */}

      <HomePanel />



      {/* Statistiques et Avantages */}
      <section className="w-full py-12  h-screen bg-white  ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: 'Livraison 24h', value: 'Rapide', color: 'text-green-600' },
              { icon: Shield, label: 'Garantie', value: '2 ans minimum', color: 'text-blue-600' },
              { icon: CheckCircle, label: 'Pièces certifiées', value: '100% Original', color: 'text-purple-600' },
              { icon: HeadphonesIcon, label: 'Support Technique', value: '7j/7', color: 'text-orange-600' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className={`inline-flex p-3 rounded-full bg-gray-50 mb-4 ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Carousel */}


      {/* Catégories Populaires */}

      {/* Produits en Vedette */}
      {/* <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Produits en vedette
                </h2>
                <p className="text-gray-600">Les produits les mieux notés par nos clients</p>
              </div>
            </div>
            <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors">
              Voir le catalogue complet
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((featuredProducts) => (
              <ProductCard key={featuredProducts.id} product={featuredProducts} />
            ))}
          </div>

          
          <div className="mt-12 text-center">
            <button className="md:hidden inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors shadow-lg">
              Explorer tous les produits
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
      */}
      {/* Meilleures Ventes */}


      {/* Marques Partenaires */}


      {/* Nouveautés */}


      {/* CTA Final */}

    </div>
  );
}