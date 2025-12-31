import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    reviews: number;
    discount?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200">
      <div className="relative overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {/* Image placeholder - remplacer par <Image /> de Next.js */}
          <div className="text-4xl">
            <Image width={200}  height={100} src={'/p.jpg'} alt={''} />
          </div>
        </div>
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">{product.price}€</span>
            {product.discount && (
              <span className="text-gray-400 line-through ml-2">
                {(product.price * (100 / (100 - product.discount))).toFixed(2)}€
              </span>
            )}
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}