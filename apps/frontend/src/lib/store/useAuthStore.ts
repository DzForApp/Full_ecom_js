import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../api/services';

interface User {
  id: string;
  email: string;
  nameEn: string;
  nameAr: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    nameEn: string;
    nameAr: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          await authService.login({ email, password });
          const user = await authService.getProfile();
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          await authService.register(data);
          const user = await authService.getProfile();
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
      },

      loadUser: async () => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        set({ isLoading: true });
        try {
          const user = await authService.getProfile();
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error('Failed to load user:', error);
          localStorage.removeItem('access_token');
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);