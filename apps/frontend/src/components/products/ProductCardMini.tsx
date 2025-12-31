import { Star, ShoppingCart, ArrowDownToDotIcon, ShoppingCartIcon, ShoppingBag, LucideMove3D, Heart } from 'lucide-react';
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

export default function ProductCardMini({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
    transition-all duration-500 hover:-translate-y-2 border border-gray-200">
      <div className="relative overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex 
        items-center justify-center">
          {/* Image placeholder - remplacer par <Image /> de Next.js */}
          <div className="text-3xl"><Image width={200}  height={100} src={'/p.jpg'} alt={''} /></div>
        </div>
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
        <div className="absolute flex flex-col-reverse  gap-2 top-4 right-4
         opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <Heart className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
      <div className="p-2">
        <h3 className="font-bold text-sm text-gray-700 group-hover:text-blue-600
         transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-1 justify-between">
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
          <span className="text-lg font-bold text-gray-900">{product.price}DA</span>

        </div>
         
         
      </div>
    </div>
  );
}