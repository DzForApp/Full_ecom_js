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
import { featuredProducts, categories, promotions, bestSellers, brands } from '@/data/homeData';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import { categoryService } from '@/lib/api/services';
import CategoriesSidebar from '@/components/home/CategoriesSidebar';
import HomeSidebar from './HomeSidebar';
import ProductsList from '../products/ProductsList';
import HeroSection from './HeroSection';
import Brands from './BrandsSection/Brands';

export default function HomePanel() {

  // const [categories, setCategories] = useState<any[]>([]); 
  // const categories = await categoryService.getAll();




  return (
    <div className="min-h-screen  bg-red-600 bg-gradient-to-b max-h-screen from-gray-50 to-white">
      {/* Hero Section avec Barre de Recherche */}
      <section
        className="relative  bg-cover  w-full flex items-start justify-center"   >
        <div className="relative inset-0 " />
        <div className="container relative w-[100%] flex h-auto max-h-screen  mx-0  text-center">
          {/* Badge Premium */}

          {/* Barre de Recherche Centrale */}
          <div className='w-full mt-0 '>
            <HeroSection />

          </div>

        </div>



        {/* Wave separator */}

      </section>




    </div>
  );
}