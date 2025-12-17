-- 1. Vérifier la structure actuelle
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'categories';

-- 2. Si la colonne name existe déjà mais a des NULL, corriger
UPDATE categories SET name = 
  CASE id 
    WHEN '11111111-1111-1111-1111-111111111111' THEN 'Freinage'
    WHEN '22222222-2222-2222-2222-222222222222' THEN 'Moteur'
    WHEN '33333333-3333-3333-3333-333333333333' THEN 'Suspension'
    WHEN '44444444-4444-4444-4444-444444444444' THEN 'Électricité'
    WHEN '55555555-5555-5555-5555-555555555555' THEN 'Filtration'
    WHEN '66666666-6666-6666-6666-666666666666' THEN 'Échappement'
    WHEN '77777777-7777-7777-7777-777777777777' THEN 'Transmission'
    ELSE 'Autre'
  END
WHERE name IS NULL;

-- 3. Rendre la colonne NOT NULL
ALTER TABLE categories ALTER COLUMN name SET NOT NULL;

-- 4. Vérifier
SELECT id, name FROM categories;