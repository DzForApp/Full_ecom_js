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
import NavbarUp from '@/components/layout/NavbarUp';

export default function LoginPage() {


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-white">
      {/* Hero Section avec Barre de Recherche */}

      <NavbarUp />


    </div>
  );
}