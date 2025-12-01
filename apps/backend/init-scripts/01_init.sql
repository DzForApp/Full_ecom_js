-- Créer l'extension UUID si elle n'existe pas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vérifier si l'utilisateur existe déjà, sinon le créer
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'store') THEN
        CREATE ROLE store WITH LOGIN PASSWORD 'Store25';
    END IF;
END
$$;

-- Donner tous les privilèges à l'utilisateur store
GRANT ALL PRIVILEGES ON DATABASE dbstore TO store;
ALTER USER store CREATEDB;

-- Créer les tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    pwd VARCHAR(255) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    dawr VARCHAR(50) DEFAULT 'customer',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donner les permissions sur les tables
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO store;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO store;