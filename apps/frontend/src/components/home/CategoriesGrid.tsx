'use client';

import { Category } from '@/lib/api/services';
import Link from 'next/link';
import { ArrowRight, Car, Gauge, Settings, Battery, Filter, Wrench, Zap, Thermometer, Truck, Sparkles, Headphones } from 'lucide-react';

interface CategoriesGridProps {
  categories: Category[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Freinage': <Gauge className="w-6 h-6" />,
  'Moteur': <Settings className="w-6 h-6" />,
  'Suspension': <Car className="w-6 h-6" />,
  'Électricité': <Zap className="w-6 h-6" />,
  'Filtration': <Filter className="w-6 h-6" />,
  'Échappement': <Thermometer className="w-6 h-6" />,
  'Transmission': <Wrench className="w-6 h-6" />,
  'Body Parts': <Truck className="w-6 h-6" />,
  'Custom Wheels': <Sparkles className="w-6 h-6" />,
  'Electronics': <Headphones className="w-6 h-6" />,
  'default': <Car className="w-6 h-6" />,
};

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Services Banner - Inspired by Chromium template */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Livraison Gratuite</h3>
                <p className="text-sm text-gray-600">À partir de 75€ dans le monde</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Retours Faciles</h3>
                <p className="text-sm text-gray-600">365 jours pour retours gratuits</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Paiements Sécurisés</h3>
                <p className="text-sm text-gray-600">Cartes bancaires acceptées</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Cadeaux Gratuits</h3>
                <p className="text-sm text-gray-600">Recevez des cadeaux et réductions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Nos <span className="text-blue-600">Catégories</span>
            </h2>
            <p className="text-gray-600 text-lg">Parcourez nos catégories de pièces automobiles</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Tous
                </button>
                <button className="px-4 py-2 border border-blue-600 bg-blue-50 text-blue-600 rounded-lg font-medium">
                  Populaires
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Nouveautés
                </button>
              </div>
            </div>
            <Link
              href="/categories"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300"
            >
              <span>Voir tout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Categories Grid - Updated Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const icon = categoryIcons[category.name] || categoryIcons.default;
            const reviewCount = Math.floor(Math.random() * 5); // For demo - replace with actual data

            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full">
                  {/* Category Image/Icon Area */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center">
                        <div className="text-blue-600">
                          {icon}
                        </div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-blue-100 opacity-70"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-blue-50 opacity-50"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                        {category.name.split(' ')[0]}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        {'★'.repeat(5)}
                        <span className="text-gray-500 text-xs ml-2">({reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    {/* Features/Details */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-600 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>En stock</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>Livraison 24-48h</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">À partir de</span>
                        <div className="text-3xl font-bold text-blue-600">99€</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                          Voir produits
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sale Badge (conditional) */}
                  {Math.random() > 0.7 && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        PROMO
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}

          {/* View All Card - Updated Design */}
          <Link
            href="/categories"
            className="group"
          >
            <div className="border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-blue-200">
                <ArrowRight className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Tout Explorer
              </h3>
              <p className="text-gray-600 mb-6">
                Découvrez notre catalogue complet de pièces automobiles
              </p>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold group-hover:from-blue-700 group-hover:to-blue-800">
                Voir toutes les catégories
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}