import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Truck, 
  CreditCard, 
  Headphones,
  Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    boutique: [
      { label: 'Tous les produits', href: '/products' },
      { label: 'Nouveautés', href: '/products?sort=newest' },
      { label: 'Meilleures ventes', href: '/products?sort=popular' },
      { label: 'Promotions', href: '/products?sort=discount' },
      { label: 'Produits en vedette', href: '/products/featured' },
    ],
    catégories: [
      { label: 'Freinage', href: '/categories/11111111-1111-1111-1111-111111111111' },
      { label: 'Moteur', href: '/categories/22222222-2222-2222-2222-222222222222' },
      { label: 'Suspension', href: '/categories/33333333-3333-3333-3333-333333333333' },
      { label: 'Électricité', href: '/categories/44444444-4444-4444-4444-444444444444' },
      { label: 'Filtration', href: '/categories/55555555-5555-5555-5555-555555555555' },
    ],
    informations: [
      { label: 'À propos de nous', href: '/about' },
      { label: 'Contactez-nous', href: '/contact' },
      { label: 'Livraison', href: '/shipping' },
      { label: 'Paiement sécurisé', href: '/payment' },
      { label: 'Retours et échanges', href: '/returns' },
      { label: 'FAQ', href: '/faq' },
      { label: 'CGV', href: '/terms' },
      { label: 'Politique de confidentialité', href: '/privacy' },
    ],
    mon_compte: [
      { label: 'Mon compte', href: '/profile' },
      { label: 'Mes commandes', href: '/orders' },
      { label: 'Mes favoris', href: '/wishlist' },
      { label: 'Historique', href: '/history' },
      { label: 'Adresses', href: '/addresses' },
    ],
  };

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Livraison rapide',
      description: 'Expédition sous 24-48h',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Garantie 2 ans',
      description: 'Sur tous nos produits',
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Paiement sécurisé',
      description: 'CB, PayPal, virement',
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: 'Support 7j/7',
      description: 'Assistance technique',
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  ];

  const contactInfo = [
    { icon: <Phone className="w-4 h-4" />, text: '+213 6 12 34 56 78' },
    { icon: <Mail className="w-4 h-4" />, text: 'contact@autoparts.com' },
    { icon: <MapPin className="w-4 h-4" />, text: '123 Avenue , Algeries' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Features Banner */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center">
                  <div className="text-blue-400">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">AP</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">AutoParts</span>
                <span className="block text-sm text-blue-400 font-medium">Store</span>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Votre destination de confiance pour des pièces automobiles de qualité. 
              Nous fournissons des pièces authentiques avec garantie et livraison rapide dans tout le Maroc.
            </p>
            
            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-white font-semibold mb-4">Inscrivez-vous à notre newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  S'abonner
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold text-lg mb-6 capitalize">
                {title.replace('_', ' ')}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  {info.icon}
                </div>
                <span>{info.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8">
          <h4 className="text-white font-semibold mb-4">Moyens de paiement acceptés</h4>
          <div className="flex flex-wrap gap-3">
            {['Visa', 'MasterCard', 'PayPal', 'CIH', 'BMCE', 'Attijari'].map((method) => (
              <div
                key={method}
                className="px-4 py-2 bg-gray-800 rounded-lg text-sm font-medium"
              >
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-500">
                © {currentYear} AutoParts Store. Tous droits réservés.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Made with <Heart className="w-4 h-4 inline text-red-500" /> in Algeria
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="text-gray-500 hover:text-white text-sm">
                Conditions générales
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-white text-sm">
                Confidentialité
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-white text-sm">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-white text-sm">
                Plan du site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}