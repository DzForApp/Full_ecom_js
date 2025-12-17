'use client';

import { Product } from '@/lib/api/services';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import des styles Swiper - IMPORTANT : Doit être après les imports de composants
import 'swiper/css';
import 'swiper/css/navigation';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Produits en vedette</h2>
            <p className="text-gray-600">Nos meilleures pièces sélectionnées pour vous</p>
          </div>
        </div>
        <Link
          href="/products?featured=true"
          className="hidden md:flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          <span>Voir tous</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile & Tablet Carousel */}
      <div className="lg:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
          }}
          className="relative pb-12"
        >
          {products.slice(0, 6).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="pb-6">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg cursor-pointer">
            <ArrowRight className="w-5 h-5 text-gray-800 rotate-180" />
          </div>
          <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg cursor-pointer">
            <ArrowRight className="w-5 h-5 text-gray-800" />
          </div>
        </Swiper>
      </div>

      {/* Mobile View All Link */}
      <div className="lg:hidden text-center mt-8">
        <Link
          href="/products?featured=true"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
        >
          <span>Voir tous les produits</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}