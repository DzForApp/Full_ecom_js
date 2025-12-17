'use client';

import { useState } from 'react';
import { Search, ChevronRight, Shield, Truck, Clock, Star } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Livraison rapide',
      description: 'Sous 24-48h',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Garantie 2 ans',
      description: 'Pièces certifiées',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Support 24/7',
      description: 'Experts à votre écoute',
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '+5000 produits',
      description: 'Large sélection',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-lg">
      <div className="absolute inset-0 bg-grid-blue-100/10" />
      
      <div className="relative px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full ml-2 animate-pulse"></span>
                Votre expert en pièces auto depuis 2015
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Des{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  pièces auto
                </span>
                <br />
                de qualité pour votre véhicule
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Découvrez notre large sélection de pièces automobiles authentiques 
                avec garantie constructeur et livraison rapide dans tout le Maroc.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher une pièce, une marque, un modèle..."
                      className="w-full px-6 py-4 pr-12 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                  >
                    Rechercher
                    <ChevronRight className="w-5 h-5 mr-2" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500">Suggestions :</span>
                  {['Plaquettes frein', 'Filtre à huile', 'Amortisseur', 'Batterie 12V'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      <div className="text-blue-600">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{feature.title}</p>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image/CTA */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 shadow-2xl">
                <div className="text-white mb-6">
                  <h2 className="text-2xl font-bold mb-2">Promotion spéciale</h2>
                  <p className="opacity-90">Jusqu'à -30% sur les kits freinage</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-blue-100">À partir de</span>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">299</span>
                        <span className="text-xl text-blue-200 mr-2">DH</span>
                        <span className="text-sm line-through text-blue-300">429 DH</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                      -30%
                    </div>
                  </div>
                  <p className="text-blue-100 mb-4">Kit freinage complet avant + arrière</p>
                  <Link
                    href="/products?category=11111111-1111-1111-1111-111111111111"
                    className="block w-full py-3 bg-white text-blue-600 font-semibold rounded-lg text-center hover:bg-blue-50 transition-colors"
                  >
                    Voir l'offre
                  </Link>
                </div>

                <div className="flex items-center justify-between text-blue-100 text-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center ml-3">
                      <span className="text-lg">🚗</span>
                    </div>
                    <div>
                      <p className="font-medium">+10,000 clients</p>
                      <p className="text-xs opacity-75">satisfaits</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">4.8/5</p>
                    <p className="text-xs opacity-75">Note moyenne</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full blur-2xl opacity-20" />
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-2xl opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}