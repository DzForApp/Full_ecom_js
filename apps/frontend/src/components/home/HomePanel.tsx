// app/page.tsx 

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
  CheckCircle,
  Grid,
  List
} from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import CategoryCard from '@/components/home/CategoriesGrid';
import PromoCarousel from '@/components/home/FeaturedProducts';
import SearchBar from '@/components/home/SearchBar';
import SearchDisplayArea from '@/components/home/SearchDisplayArea'
import { featuredProducts, categories, promotions, bestSellers, brands } from '@/data/homeData';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import { categoryService } from '@/lib/api/services';
import CategoriesSidebar from '@/components/home/CategoriesSidebar';
import HomeSidebar from './HomeSidebar';

export default async function HomePanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

 // const [categories, setCategories] = useState<any[]>([]);
 
 // const categories = await categoryService.getAll();
 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche:', searchTerm);
    // Redirection ou logique de recherche
  };

  return (
    <div className="min-h-screen bg-gradient-to-b max-h-screen from-gray-50 to-white">
      {/* Hero Section avec Barre de Recherche */}
      <section  
        className="relative h-[70vh] min-h-[600px]  bg-cover  w-full flex items-start justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/hero-bg.jpg)'
        }}
      >
        <div className="relative inset-0 " />
        <div className="container w-[100%] flex h-auto max-h-screen relative mx-0  text-center">
          {/* Badge Premium */}
              
             {/* Barre de Recherche Centrale */}
       <div className=' w-3/4'>
            <div className=" flex  h-14 w-full bg-gray-900 px-8 items-center">
               
                <SearchBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSubmit={handleSearch}
                />
               
                   
            </div>
            <div className='w-full'>
                <SearchDisplayArea />
               </div>
                
       </div>
            
    
          <div className='flex flex-col h-full w-1/4 px-0'>
            <div className='relative h-14 flex text-xl   items-center justify-center 
                            uppercase    w-full bg-gradient-to-r from-gray-500 to-gray-900'>
          
                Categories
                      {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
                className="p-2 rounded-lg "
            >
              <List className="w-5 h-5" />
            </button>
          </div>
            </div>
            
            <div className=' h-full w-full items-center justify-center
            bg-gradient-to-r text-gray-900 font-sans text-xl '>
               <HomeSidebar categories={[]}  />

            </div>

            {/* Tags de recherche rapide */}
          <div className="flex flex-wrap  justify-center text-xl gap-3 mb-8">
            <span className="text-white/90 font-medium">Recherches fréquentes</span>
            {['Plaquettes de frein', 'Batterie 12V 70Ah', 'Pneus 205/55R16', 'Kit distribution', 'Amortisseurs'].map((item) => (
              <button
                key={item}
                onClick={() => setSearchTerm(item)}
                className="bg-white/10 hover:bg-white/20 text-white px-1 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 border border-white/20"
              >
                {item}
              </button>
            ))}
          </div>
          </div>
       
        </div>
          

          
        {/* Wave separator */}
      
      </section>

    
    

    </div>
  );
}