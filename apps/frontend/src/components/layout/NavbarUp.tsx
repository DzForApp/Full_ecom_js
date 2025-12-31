'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  ChevronDown,
  Package,
  Settings,
  LogOut,
  Home,
  ShoppingBag,
  Tag,
  Info,
  Phone
} from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import CartSidebar from '@/components/card/CardSidebar';
import SearchModal from '@/components/ui/SearchModal';
import { categoryService } from '@/lib/api/services';
import { Category } from '@/lib/api/services';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const { totalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data.slice(0, 8)); // Limit to 8 categories for navbar
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };



  const userMenuItems = [
    { href: '/profile', label: 'Mon profil', icon: <User className="w-4 h-4" /> },
    { href: '/orders', label: 'Mes commandes', icon: <Package className="w-4 h-4" /> },
    { href: '/wishlist', label: 'Favoris', icon: <Tag className="w-4 h-4" /> },
  ];

  const adminMenuItems = [
    { href: '/admin/dashboard', label: 'Tableau de bord', icon: <Settings className="w-4 h-4" /> },
    { href: '/admin/products', label: 'Gérer les produits', icon: <Package className="w-4 h-4" /> },
    { href: '/admin/orders', label: 'Commandes', icon: <ShoppingBag className="w-4 h-4" /> },
    { href: '/admin/users', label: 'Utilisateurs', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className="bg-gray-900 flex shadow-lg sticky top-0 z-50  border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex  flex-row-reverse justify-between items-center h-auto">
            {/* Actions */}
            <div className="flex items-center space-x-3 h-auto ">
              {/* User/Auth */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user?.nameEn}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
                  </button>

                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-white-900">{user?.nameEn}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    {/* User Menu */}
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex  items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Admin Menu */}
                    {user?.role === 'admin' && (
                      <>
                        <div className="border-t border-gray-100 pt-2 mt-2">
                          <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Administration
                          </p>
                          {adminMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2 mt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex  items-center  ">
                  <Link
                    href="/auth/login"
                    className="hidden md:block px-4 py-2    hover:text-blue-800 font-medium"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 bg-gradient-to-r  text-white  hover:text-blue-700 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    S'inscrire
                  </Link>
                </div>
              )}




              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="lg:hidden border-t border-gray-100 py-4">
                <div className="space-y-1">



                  {/* Auth buttons for mobile */}
                  {!isAuthenticated && (
                    <div className="px-4 py-3 border-t border-gray-100">
                      <div className="flex flex-col space-y-2">
                        <Link
                          href="/login"
                          className="px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Se connecter
                        </Link>
                        <Link
                          href="/register"
                          className="px-4 py-2 text-center bg-blue-600 text-white rounded-lg font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          S'inscrire
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-row-reverse   items-center space-x-1">

            </div>
          </div>


        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}