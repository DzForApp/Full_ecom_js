// /components/PromoCarousel.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronRight } from 'lucide-react';

export interface Promotion {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  link: string;
}

interface PromoCarouselProps {
  promotions: Promotion[];
}

export default function PromoCarousel({ promotions }: PromoCarouselProps) {
  // ... reste du code inchangé
}