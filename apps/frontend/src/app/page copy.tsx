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

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche:', searchTerm);
    // Redirection ou logique de recherche
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section avec Barre de Recherche */}
      <section 
        className="relative h-[70vh] min-h-[600px] bg-cover bg-center flex items-center justify-center px-4"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/hero-bg.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="container relative mx-auto max-w-6xl text-center">
          {/* Badge Premium */}
           
             {/* Barre de Recherche Centrale */}
          <div className="max-w-4xl mx-auto mb-12">
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSubmit={handleSearch}
            />
            
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Parts auto{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Premium
            </span>
            <br />
            pour votre véhicule
          </h1>
          
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Commandez vos pièces détachées en ligne et recevez-les 
            <span className="text-yellow-300 font-semibold"> en 24h*</span> avec notre service express
          </p>
          
       

          {/* Tags de recherche rapide */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-white/90 font-medium">Recherches fréquentes :</span>
            {['Plaquettes de frein', 'Batterie 12V 70Ah', 'Pneus 205/55R16', 'Kit distribution', 'Amortisseurs'].map((item) => (
              <button
                key={item}
                onClick={() => setSearchTerm(item)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 border border-white/20"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Statistiques et Avantages */}
      <section className="py-12 bg-white -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: 'Livraison 24h', value: 'Express', color: 'text-green-600' },
              { icon: Shield, label: 'Garantie', value: '2 ans minimum', color: 'text-blue-600' },
              { icon: CheckCircle, label: 'Pièces certifiées', value: '100% OEM', color: 'text-purple-600' },
              { icon: HeadphonesIcon, label: 'Support', value: '7j/7', color: 'text-orange-600' },
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
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-3">
                <Tag className="h-4 w-4" />
                <span className="text-sm font-semibold">LIMITÉ DANS LE TEMPS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Promotions <span className="text-red-600">exceptionnelles</span>
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors">
              Voir toutes les promos
              <ChevronRight className="h-5 w-5" />
            </button>
          </div> 
        </div>
      </section>

      {/* Catégories Populaires */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Parcourir par <span className="text-blue-600">catégorie</span>
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Trouvez rapidement la pièce dont vous avez besoin parmi nos catégories spécialisées
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-semibold transition-colors">
              <Filter className="h-4 w-4" />
              Tous les filtres
            </button>
          </div>
          
          
        </div>
      </section>

      {/* Produits en Vedette */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
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

      {/* Meilleures Ventes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Meilleures ventes
                </h2>
                <p className="text-gray-600">Les produits les plus populaires du moment</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <div key={product.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    Best Seller
                  </span>
                  <div className="text-2xl">🔥</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-3xl">{product.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{product.price}€</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marques Partenaires */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm mb-4">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-800">Marques partenaires</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nous travaillons avec les <span className="text-blue-600">meilleures marques</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-300 hover:shadow-lg flex items-center justify-center">
                <div className="text-3xl font-bold text-gray-700">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nouveautés */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Nouveaux arrivages
                </h2>
                <p className="text-gray-600">Découvrez nos dernières pièces ajoutées</p>
              </div>
            </div>
            <button className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
              Voir les nouveautés
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black text-white p-8 hover:shadow-2xl transition-all duration-500">
                <div className="relative z-10">
                  <div className="text-4xl mb-6">🆕</div>
                  <h3 className="text-2xl font-bold mb-4">Arrivages de la semaine</h3>
                  <p className="text-gray-300 mb-6">
                    Découvrez chaque semaine nos nouvelles références de pièces auto
                  </p>
                  <button className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-colors">
                    Explorer
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px'
          }} />
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Prêt à réparer votre véhicule ?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Notre équipe d'experts est disponible pour vous conseiller et vous aider à trouver la pièce parfaite pour votre véhicule.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl">
              Commencer mon diagnostic
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105">
              📞 01 23 45 67 89
            </button>
          </div>
          <p className="text-blue-200 mt-8 text-sm">
            *Livraison express sous 24h en France métropolitaine
          </p>
        </div>
      </section>
    </div>
  );
}