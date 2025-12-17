import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartService } from '../api/services';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  };
}

interface CartStore {
  items: CartItem[];
  total: number;
  totalItems: number;
  isLoading: boolean;
  
  // Actions
  loadCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      totalItems: 0,
      isLoading: false,

      loadCart: async () => {
        set({ isLoading: true });
        try {
          const cart = await cartService.getCart();
          set({
            items: cart.items,
            total: cart.total,
            totalItems: cart.totalItems,
          });
        } catch (error) {
          console.error('Failed to load cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      addToCart: async (productId: string, quantity = 1) => {
        try {
          await cartService.addToCart(productId, quantity);
          await get().loadCart(); // Recharger le panier
        } catch (error) {
          console.error('Failed to add to cart:', error);
          throw error;
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        try {
          await cartService.updateCartItem(itemId, quantity);
          await get().loadCart();
        } catch (error) {
          console.error('Failed to update quantity:', error);
          throw error;
        }
      },

      removeFromCart: async (itemId: string) => {
        try {
          await cartService.removeFromCart(itemId);
          await get().loadCart();
        } catch (error) {
          console.error('Failed to remove from cart:', error);
          throw error;
        }
      },

      clearCart: async () => {
        try {
          await cartService.clearCart();
          set({ items: [], total: 0, totalItems: 0 });
        } catch (error) {
          console.error('Failed to clear cart:', error);
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);