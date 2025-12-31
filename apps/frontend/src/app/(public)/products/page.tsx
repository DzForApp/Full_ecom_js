'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/lib/api/services';
import { productService, categoryService } from '@/lib/api/services';
import { Filter, Search, Grid, List } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
            if (filters.categoryId) params.categoryId = filters.categoryId;
            if (filters.minPrice) params.minPrice = filters.minPrice;
            if (filters.maxPrice) params.maxPrice = filters.maxPrice;
            if (filters.inStock) params.inStock = filters.inStock;

            const data = await productService.getAll(params);
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
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                    <div className="flex items-center mb-6">
                        <Filter className="w-5 h-5 mr-2" />
                        <h2 className="text-xl font-bold">Filtres</h2>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Recherche
                        </label>
                        <div className="relative">
                            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Catégorie
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.categoryId}
                            onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                        >
                            <option value="">Toutes les catégories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fourchette de prix (DA)
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Stock Filter */}
                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded"
                                checked={filters.inStock}
                                onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                            />
                            <span className="ml-2 text-gray-700">En stock seulement</span>
                        </label>
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={() => setFilters({
                            search: '',
                            categoryId: '',
                            minPrice: '',
                            maxPrice: '',
                            inStock: false,
                        })}
                        className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Nos produits</h1>
                        <p className="text-gray-600 mt-2">
                            {products.length} produits trouvés
                        </p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
                                }`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Products */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                                <div className="h-48 bg-gray-300 rounded mb-4"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                            : 'space-y-6'
                    }>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto text-gray-300 mb-4">
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