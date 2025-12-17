

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ChevronDown, 
  Car, 
  Gauge, 
  Settings, 
  Filter, 
  Wrench, 
  Zap, 
  Thermometer,
  Truck,
  Sparkles,
  Headphones,
  Shield,
  Battery,
  Radio,
  Fan,
  Disc,
  Cpu,
  Package,
  Star,
  TrendingUp,
  Tag,
  Clock
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  productCount?: number;
  subcategories?: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  productCount?: number;
}

interface CategoriesSidebarProps {
  categories: Category[];
  //activeCategory?: string;
 // onCategorySelect?: (categoryId: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Freinage': <Gauge className="w-4 h-4" />,
  'Moteur': <Settings className="w-4 h-4" />,
  'Suspension': <Car className="w-4 h-4" />,
  'Électricité': <Zap className="w-4 h-4" />,
  'Filtration': <Filter className="w-4 h-4" />,
  'Échappement': <Thermometer className="w-4 h-4" />,
  'Transmission': <Wrench className="w-4 h-4" />,
  'Carrosserie': <Truck className="w-4 h-4" />,
  'Jantes': <Sparkles className="w-4 h-4" />,
  'Électronique': <Headphones className="w-4 h-4" />,
  'Sécurité': <Shield className="w-4 h-4" />,
  'Batterie': <Battery className="w-4 h-4" />,
  'Audio': <Radio className="w-4 h-4" />,
  'Refroidissement': <Fan className="w-4 h-4" />,
  'Freins': <Disc className="w-4 h-4" />,
  'Calculateur': <Cpu className="w-4 h-4" />,
  'Accessoires': <Package className="w-4 h-4" />,
  'default': <Car className="w-4 h-4" />,
};

export default function HomeSidebar({ 
  categories, 
  //activeCategory,
  //onCategorySelect 
}: CategoriesSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  const brands = [
    { id: 'bosch', name: 'Bosch', count: 42 },
    { id: 'delphi', name: 'Delphi', count: 28 },
    { id: 'valeo', name: 'Valeo', count: 35 },
    { id: 'bremsen', name: 'Bremsen', count: 19 },
    { id: 'mahle', name: 'Mahle', count: 31 },
    { id: 'mann', name: 'Mann Filter', count: 27 },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <span className="font-semibold text-gray-900">Filtres & Catégories</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
        {/* Categories Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600" />
              Catégories
            </h3>
            <p className="text-sm text-gray-600 mt-1">Parcourez par type de pièce</p>
          </div>

          <div className="p-2">
            {categories.map((category) => {
              const isExpanded = expandedCategories.includes(category.id);
              //const isActive = activeCategory === category.id;
              const icon = categoryIcons[category.name] || categoryIcons.default;

              return (
                <div key={category.id} className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory(category.id);
                      //onCategorySelect?.(category.id);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      //isActive 
                         'bg-blue-50 text-blue-600 border border-blue-100' 
                        
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 
                      
                //        isActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <div className={/*isActive ?*/ 'text-blue-600'}>
                          {icon}
                        </div>
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {category.productCount && (
                        <span className={`px-2 py-1 text-xs rounded-full 
                         // isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        `}>
                          {category.productCount}
                        </span>
                      )}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      )}
                    </div>
                  </button>

                  {/* Subcategories */}
                  {isExpanded && category.subcategories && (
                    <div className="ml-10 mt-1 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/categories/${category.id}/${subcategory.id}`}
                          className="flex items-center justify-between p-2 pl-4 rounded-lg hover:bg-gray-50 text-sm"
                        >
                          <span className="text-gray-700">{subcategory.name}</span>
                          {subcategory.productCount && (
                            <span className="text-gray-500 text-xs">
                              {subcategory.productCount}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* View All Link */}
            <div className="p-3 border-t border-gray-100">
              <Link
                href="/categories"
                className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                <span>Voir toutes les catégories</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Price Filter */}
       
 

        {/* Special Offers */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 text-yellow-300 mr-2" />
            <h3 className="text-lg font-bold text-white">Nouvel Arrivage</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Freins</span>
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                  -30%
                </span>
              </div>
              <p className="text-white/80 text-sm">Jusqu'au 30 décembre</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Filtres</span>
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                  -20%
                </span>
              </div>
              <p className="text-white/80 text-sm">Achat en ligne seulement</p>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Voir toutes les promos
          </button>
        </div>

        
      </div>
    </aside>
  );
}