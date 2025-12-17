'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Search, Clock, TrendingUp, Package } from 'lucide-react';
import { productService } from '@/lib/api/services';
import { Product } from '@/lib/api/services';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    
    // Load popular products
    loadPopularProducts();
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const loadPopularProducts = async () => {
    try {
      const products = await productService.getFeatured(4);
      setPopularProducts(products);
    } catch (error) {
      console.error('Failed to load popular products:', error);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await productService.search(searchQuery);
      setResults(data.slice(0, 6));
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      // Navigate to search results
      window.location.href = `/products?search=${encodeURIComponent(query)}`;
      onClose();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-0 z-50 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Rechercher des pièces auto, marques, modèles..."
                    className="w-full px-6 py-4 pr-12 text-lg bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Search Results */}
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Recherche en cours...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="p-6">
                  <h3 className="font-semibold text-gray-700 mb-4">
                    Résultats ({results.length})
                  </h3>
                  <div className="space-y-3">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="mr-3 flex-grow">
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-blue-600">
                            {product.price.toFixed(2)} DH
                          </span>
                          {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                            <p className="text-xs text-orange-600 mt-1">
                              {product.stockQuantity} en stock
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/products?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="block mt-4 text-center text-blue-600 font-medium hover:text-blue-700"
                  >
                    Voir tous les résultats →
                  </Link>
                </div>
              ) : query.length >= 2 ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-500">
                    Essayez d'autres mots-clés ou découvrez nos produits populaires
                  </p>
                </div>
              ) : (
                <>
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700 flex items-center">
                          <Clock className="w-4 h-4 ml-2" />
                          Recherches récentes
                        </h3>
                        <button
                          onClick={clearRecentSearches}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Effacer
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setQuery(search);
                              handleSearch(search);
                            }}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Products */}
                  {popularProducts.length > 0 && (
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                        <TrendingUp className="w-4 h-4 ml-2" />
                        Produits populaires
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {popularProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            onClick={onClose}
                            className="group"
                          >
                            <div className="bg-gray-50 rounded-lg p-3 hover:bg-blue-50 transition-colors">
                              <div className="aspect-square bg-white rounded-lg mb-2 overflow-hidden">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <h4 className="font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-blue-600">
                                {product.name}
                              </h4>
                              <p className="font-bold text-blue-600 text-sm mt-1">
                                {product.price.toFixed(2)} DH
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Quick Categories */}
            <div className="p-6 bg-gray-50 border-t">
              <h3 className="font-semibold text-gray-700 mb-4">
                Rechercher par catégorie
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Freinage',
                  'Moteur',
                  'Suspension',
                  'Électricité',
                  'Filtration',
                  'Échappement',
                  'Transmission',
                  'Accessoires',
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setQuery(category);
                      handleSearch(category);
                    }}
                    className="px-3 py-2 bg-white text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-sm text-center border"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}