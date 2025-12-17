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
  Phone,
  SaveIcon,
  Heart
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

  const navLinks = [
    { href: '/', label: 'Acceuil', icon: <Home className="w-4 h-4" /> },
    { href: '/products', label: 'Produits', icon: <Package className="w-4 h-4" /> },
    { href: '/categories', label: 'Catégorie', icon: <Tag className="w-4 h-4" /> },
   // { href: '/about', label: 'A Propos', icon: <Info className="w-4 h-4" /> },
    { href: '/contact', label: ' Contacte', icon: <Phone className="w-4 h-4" /> },
  ];

  

  const adminMenuItems = [
    { href: '/admin/dashboard', label: 'Tableau de bord', icon: <Settings className="w-4 h-4" /> },
    { href: '/admin/products', label: 'Gérer produits', icon: <Package className="w-4 h-4" /> },
    { href: '/admin/orders', label: 'Commandes', icon: <ShoppingBag className="w-4 h-4" /> },
    { href: '/admin/users', label: 'Utilisateurs', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex  justify-between items-center h-24">
           {/* Actions */}
            <div className="flex items-center space-x-3">
               {/* User/Auth */}
              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="relative  flex flex-row-reverse items-center space-x-4 ">
                  <Heart />
                  <ShoppingCart className="w-6 h-6" />
                  <div className='flex flex-col'>
                    <span>Panier</span>
                    <span>3000 DZ</span>
                  </div>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </div>
              </button>

           

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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}

                {/* Categories in mobile */}
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Catégories
                  </p>
                  {isLoading ? (
                    <div className="text-center py-3">
                      <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.id}`}
                          className="px-3 py-2 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Auth buttons for mobile */}
                {!isAuthenticated && (
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/login"
                        className="px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Connexion
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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 px-2   py-2 rounded-lg transition-colors ${
                      pathname === link.href
                        ? 'bg-blue-50 text-blue-600 text-2'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    {link.icon}
                    <span className="font-bold px-2">{link.label}</span>
                  </Link>
                ))}

                {/* Categories Dropdown */}
                <div className="relative group">
                  <button
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                    onMouseEnter={() => setIsCategoriesOpen(true)}
                    onMouseLeave={() => setIsCategoriesOpen(false)}
                  >
                    <span className="font-medium">Catégories</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isCategoriesOpen && (
                    <div
                      className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                      onMouseEnter={() => setIsCategoriesOpen(true)}
                      onMouseLeave={() => setIsCategoriesOpen(false)}
                    >
                      {isLoading ? (
                        <div className="px-4 py-3 text-center text-gray-500">
                          <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                          <p className="text-sm">Chargement...</p>
                        </div>
                      ) : categories.length > 0 ? (
                        <>
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/categories/${category.id}`}
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              onClick={() => setIsCategoriesOpen(false)}
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              <span>{category.name}</span>
                            </Link>
                          ))}
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <Link
                              href="/categories"
                              className="flex items-center justify-center px-4 py-2 text-blue-600 hover:bg-blue-50 font-medium"
                              onClick={() => setIsCategoriesOpen(false)}
                            >
                              Voir toutes les catégories →
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="px-4 py-3 text-center text-gray-500">
                          <p className="text-sm">Aucune catégorie</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            {/* Logo */}
            <div className="flex items-center space-x-12">
              <Link href="/" className="flex items-center space-x-3 group">
                
                <div className='flex items-center  px-4 w-auto'>
                  <span className="block text-bold text-blue-600 font-medium">Auto</span>
                  <span className="text-xl font-bold text-gray-900">R-AzeX</span>
                </div>
                 
              </Link>
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