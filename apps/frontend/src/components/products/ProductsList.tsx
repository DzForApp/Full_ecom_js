'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/lib/api/services';
import { productService, categoryService } from '@/lib/api/services';
import { Filter, Search, Grid, List } from 'lucide-react';
import { featuredProducts } from '@/data/homeData';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [filters]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const params: any = {};
      if (filters.search) params.search = filters.search;
      //if (filters.categoryId) params.categoryId = filters.categoryId;
      //if (filters.minPrice) params.minPrice = filters.minPrice;
      //if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      //if (filters.inStock) params.inStock = filters.inStock;

      const data = await productService.getAll();
      //const data = featuredProducts

      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      
   {/* Products Grid */}
      <div className="lg:w-full ">
        

        {/* Products */}
        {isLoading ? (
          <div className="grid  min-h-screen grid-cols-1 md:grid-cols-4 px-4 lg:grid-cols-4  w-full gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white w-48 h-48 rounded-lg shadow-md p-2 animate-pulse">
                <div className="h-32 bg-gray-300 rounded mb-4"></div>
                <div className="h-2 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                 
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
           <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                }>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24  h-24 mx-auto text-gray-300 mb-4">
              <Search className="w-full h-full" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}