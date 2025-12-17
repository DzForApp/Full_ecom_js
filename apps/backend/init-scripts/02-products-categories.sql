-- ============================================
-- INITIALISATION DES CATÉGORIES ET PRODUITS
-- ============================================

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: categories
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE categories IS 'Catégories de produits auto';
COMMENT ON COLUMN categories.name IS 'Nom de la catégorie';
COMMENT ON COLUMN categories.description IS 'Description de la catégorie';
COMMENT ON COLUMN categories.image_url IS 'URL de l''image de la catégorie';

-- ============================================
-- TABLE: products
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    sku VARCHAR(100) UNIQUE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    image_url VARCHAR(500),
    images TEXT[], -- Tableau d'URLs d'images
    brand VARCHAR(100),
    model VARCHAR(100),
    vehicle_type VARCHAR(100), -- Voiture, Moto, Camion, etc.
    specifications JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE products IS 'Produits pièces auto';
COMMENT ON COLUMN products.sku IS 'Stock Keeping Unit (référence unique)';
COMMENT ON COLUMN products.images IS 'Tableau d''URLs d''images du produit';
COMMENT ON COLUMN products.specifications IS 'Spécifications techniques en JSON';
COMMENT ON COLUMN products.rating IS 'Note moyenne (0-5)';

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;

-- ============================================
-- DONNÉES DE TEST: Catégories
-- ============================================
INSERT INTO categories (id, name, description, image_url) VALUES
-- Freinage
('111111', 'Freinage', 'Systèmes de freinage complets', 'https://example.com/images/brakes.jpg'),
-- Moteur
('2222', 'Moteur', 'Pièces moteur et accessoires', 'https://example.com/images/engine.jpg'),
-- Suspension
('33333333', 'Suspension', 'Amortisseurs, ressorts, rotules', 'https://example.com/images/suspension.jpg'),
-- Électricité
('44444', 'Électricité', 'Batteries, alternateurs, démarreurs', 'https://example.com/images/electrical.jpg'),
-- Filtration
('5555555555', 'Filtration', 'Filtres à air, huile, habitacle', 'https://example.com/images/filters.jpg'),
-- Échappement
('66666666', 'Échappement', 'Pot d''échappement, catalyseur', 'https://example.com/images/exhaust.jpg'),
-- Transmission
('77777777', 'Transmission', 'Embrayage, boîte de vitesses', 'https://example.com/images/transmission.jpg')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- DONNÉES DE TEST: Produits
-- ============================================
INSERT INTO products (
    id, name, description, price, stock_quantity, sku, category_id, 
    image_url, brand, model, vehicle_type, specifications, rating, review_count
) VALUES
-- Produits Freinage
(
    'aaaaaaaa-aaa',
    'Plaquettes de frein avant',
    'Plaquettes de frein haute performance pour un freinage optimal. Compatible avec la plupart des véhicules.',
    45.99,
    150,
    'BP-1001',
    '11111111-11',
    'https://example.com/images/brake-pads.jpg',
    'Brembo',
    'Premium',
    'Voiture',
    '{"material": "Céramique", "warranty": "2 ans", "compatibility": ["Toyota", "Honda", "Ford"], "weight": "1.2kg"}',
    4.5,
    128
),
(
    'aaa5',
    'Disques de frein',
    'Disques de frein ventilés pour une meilleure dissipation de la chaleur.',
    89.99,
    75,
    'BD-2001',
    '111111',
    'https://example.com/images/brake-discs.jpg',
    'ATE',
    'Ventilated',
    'Voiture',
    '{"diameter": "280mm", "thickness": "22mm", "material": "Acier", "warranty": "3 ans"}',
    4.7,
    89
),
(
    'aaaaaa3',
    'Liquide de frein DOT4',
    'Liquide de frein haute température. Point d''ébullition: 230°C.',
    12.50,
    300,
    'BF-3001',
    '111',
    'https://example.com/images/brake-fluid.jpg',
    'Motul',
    'DOT4',
    'Tous',
    '{"type": "DOT4", "boiling_point": "230°C", "volume": "500ml", "color": "Jaune"}',
    4.8,
    256
),

-- Produits Moteur
(
    'bbb',
    'Filtre à huile',
    'Filtre à huile premium avec membrane synthétique.',
    9.99,
    500,
    'OF-4001',
    '222',
    'https://example.com/images/oil-filter.jpg',
    'MANN-FILTER',
    'W 712/95',
    'Voiture',
    '{"thread": "M20x1.5", "height": "110mm", "diameter": "76mm", "bypass_valve": "Oui"}',
    4.6,
    312
),
(
    'bb',
    'Bougies d''allumage',
    'Bougies iridium longue durée de vie (100.000 km).',
    8.50,
    400,
    'SP-5001',
    '22',
    'https://example.com/images/spark-plugs.jpg',
    'NGK',
    'Laser Iridium',
    'Voiture',
    '{"type": "Iridium", "gap": "0.8mm", "heat_range": "7", "resistance": "5kΩ"}',
    4.9,
    478
),

-- Produits Suspension
(
    'cccc',
    'Amortisseur avant',
    'Amortisseur hydraulique pour confort optimal.',
    65.00,
    120,
    'SH-6001',
    '33333',
    'https://example.com/images/shock-absorber.jpg',
    'Bilstein',
    'B4',
    'Voiture',
    '{"type": "Hydraulique", "length": "450mm", "stroke": "150mm", "mounting": "OEM"}',
    4.4,
    167
),

-- Produits Électricité
(
    'dd',
    'Batterie 12V 60Ah',
    'Batterie au plomb sans entretien. Garantie 4 ans.',
    89.99,
    80,
    'BT-7001',
    '444',
    'https://example.com/images/battery.jpg',
    'VARTA',
    'Blue Dynamic',
    'Voiture',
    '{"voltage": "12V", "capacity": "60Ah", "cca": "540A", "technology": "AGM"}',
    4.7,
    234
),

-- Produits Filtration
(
    'ee',
    'Filtre à air sport',
    'Filtre à air lavable pour augmentation des performances.',
    49.99,
    90,
    'AF-8001',
    '555',
    'https://example.com/images/air-filter.jpg',
    'K&N',
    'High Flow',
    'Voiture',
    '{"type": "Lavable", "material": "Coton", "oil_required": "Oui", "lifetime": "10 ans"}',
    4.8,
    189
),

-- Produits Featured (en vedette)
(
    'f1',
    'Kit frein complet sport',
    'Kit complet freinage sport: disques + plaquettes.',
    249.99,
    40,
    'BK-9001',
    '1',
    'https://example.com/images/brake-kit.jpg',
    'EBC',
    'Ultimax',
    'Voiture',
    '{"includes": ["Disques", "Plaquettes", "Liquide"], "performance": "+30%", "warranty": "2 ans"}',
    4.9,
    56
),
(
    'f2',
    'Suspension complète sport',
    'Kit 4 amortisseurs + ressorts abaissés.',
    499.99,
    25,
    'SK-9002',
    '33',
    'https://example.com/images/suspension-kit.jpg',
    'KW',
    'Variant 1',
    'Voiture',
    '{"lowering": "30mm", "adjustable": "Non", "includes": "4 amortisseurs + ressorts"}',
    4.8,
    42
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- METTRE EN VEDETTE CERTAINS PRODUITS
-- ============================================
UPDATE products SET is_featured = true 
WHERE sku IN ('BK-9001', 'SK-9002', 'BP-1001', 'BD-2001');

-- ============================================
-- TABLE: product_reviews (Optionnel)
-- ============================================
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    images TEXT[],
    is_verified_purchase BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les avis
CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON product_reviews(user_id);

-- ============================================
-- DONNÉES DE TEST: Avis produits
-- ============================================
INSERT INTO product_reviews (product_id, rating, comment, is_verified_purchase) VALUES
('aa1', 5, 'Excellent produit, freinage impeccable!', true),
('aaa1', 4, 'Très bon rapport qualité/prix', true),
('b1', 5, 'Filtre de qualité, facile à installer', true),
('c1', 4, 'Améliore le confort, bon produit', false);

-- ============================================
-- MISE À JOUR DES NOTES MOYENNES
-- ============================================
WITH review_stats AS (
    SELECT 
        product_id,
        AVG(rating) as avg_rating,
        COUNT(*) as total_reviews
    FROM product_reviews
    GROUP BY product_id
)
UPDATE products p
SET 
    rating = COALESCE(rs.avg_rating, 0),
    review_count = COALESCE(rs.total_reviews, 0)
FROM review_stats rs
WHERE p.id = rs.product_id;

-- ============================================
-- VÉRIFICATION DES DONNÉES
-- ============================================
SELECT '✅ Initialisation terminée' as status;

SELECT '📊 Catégories créées:' as info, COUNT(*) as count FROM categories;
SELECT '📦 Produits créés:' as info, COUNT(*) as count FROM products;
SELECT '⭐ Produits en vedette:' as info, COUNT(*) as count FROM products WHERE is_featured = true;
SELECT '🌟 Moyenne des notes:' as info, AVG(rating) as average_rating FROM products WHERE rating > 0;