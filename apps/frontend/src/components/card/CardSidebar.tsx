'use client';

import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';

interface CardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CardSidebar({ isOpen, onClose }: CardSidebarProps) {
  const { items, total, totalItems, isLoading, loadCart, updateQuantity, removeFromCart, clearCart } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen, loadCart]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart(itemId);
  };

  const handleClearCart = async () => {
    if (confirm('Vider tout le panier ?')) {
      await clearCart();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Mon panier</h2>
              <p className="text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Chargement du panier...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto text-gray-300 mb-4">
                <ShoppingCart className="w-full h-full" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Votre panier est vide
              </h3>
              <p className="text-gray-500 mb-6">
                Ajoutez des produits pour commencer vos achats
              </p>
              <Link
                href="/products"
                onClick={onClose}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <>
              {/* Clear Cart Button */}
              <div className="mb-4">
                <button
                  onClick={handleClearCart}
                  className="flex items-center text-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Vider le panier
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-lg border flex-shrink-0">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <Link
                        href={`/products/${item.product.id}`}
                        onClick={onClose}
                        className="font-medium text-gray-900 hover:text-blue-600 line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        {(item.product.price * item.quantity).toFixed(2)} DH
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.product.price.toFixed(2)} DH × {item.quantity}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                            item.quantity <= 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Sous-total</span>
              <span className="text-xl font-bold text-gray-900">
                {total.toFixed(2)} DH
              </span>
            </div>

            {/* Tax Estimate */}
            <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
              <span>Estimation TVA</span>
              <span>{(total * 0.2).toFixed(2)} DH</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6 pt-4 border-t">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                {(total * 1.2).toFixed(2)} DH
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full px-6 py-3 text-center border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Voir le panier détaillé
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Passer à la caisse
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full text-center text-gray-500 hover:text-gray-700 mt-4"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}