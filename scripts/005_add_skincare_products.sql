-- Update existing categories to be skincare focused
UPDATE public.categories SET 
  name_en = 'Cleansers',
  name_km = 'ឧបករណ៍សម្អាតមុខ',
  slug = 'cleansers',
  description_en = 'Facial cleansers and makeup removers',
  description_km = 'ឧបករណ៍សម្អាតមុខ និងលុបគ្រឿងសំអាង'
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

UPDATE public.categories SET 
  name_en = 'Serums',
  name_km = 'សេរ៉ូម',
  slug = 'serums',
  description_en = 'Targeted treatment serums',
  description_km = 'សេរ៉ូមព្យាបាលជាក់លាក់'
WHERE id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22';

UPDATE public.categories SET 
  name_en = 'Moisturizers',
  name_km = 'ក្រែមសំណើម',
  slug = 'moisturizers',
  description_en = 'Hydrating creams and lotions',
  description_km = 'ក្រែម និងឡូស្យុងផ្តល់សំណើម'
WHERE id = 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33';

UPDATE public.categories SET 
  name_en = 'Sunscreen',
  name_km = 'ក្រែមការពារពន្លឺថ្ងៃ',
  slug = 'sunscreen',
  description_en = 'Sun protection products',
  description_km = 'ផលិតផលការពារពន្លឺថ្ងៃ'
WHERE id = 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44';

-- Update existing products with skincare items and add image_url
UPDATE public.products SET
  name_en = 'Hydrating Gel Cleanser',
  name_km = 'ជែលសម្អាតមុខផ្តល់សំណើម',
  description_en = 'Gentle gel cleanser that removes impurities while maintaining skin moisture balance',
  description_km = 'ជែលសម្អាតមុខថ្នមៗ ដែលលុបសំអាត និងរក្សាតុល្យភាពសំណើមស្បែក',
  slug = 'hydrating-gel-cleanser',
  sku = 'CL-001',
  price = 28.00,
  compare_at_price = 35.00,
  stock_quantity = 150,
  image_url = '/placeholder.svg?height=600&width=600',
  category_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
WHERE id = 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55';

UPDATE public.products SET
  name_en = 'Vitamin C Brightening Serum',
  name_km = 'សេរ៉ូម វីតាមីន C ធ្វើឱ្យស្បែកភ្លឺ',
  description_en = 'Advanced vitamin C serum that brightens and evens skin tone',
  description_km = 'សេរ៉ូម វីតាមីន C កម្រិតខ្ពស់ ធ្វើឱ្យស្បែកភ្លឺ និងស្មើ',
  slug = 'vitamin-c-serum',
  sku = 'SR-001',
  price = 65.00,
  compare_at_price = 85.00,
  stock_quantity = 80,
  image_url = '/placeholder.svg?height=600&width=600',
  category_id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'
WHERE id = 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66';

-- Add more skincare products
INSERT INTO public.products (id, name_en, name_km, description_en, description_km, slug, sku, price, compare_at_price, stock_quantity, is_featured, category_id, image_url) VALUES
  (
    'g0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77',
    'Hyaluronic Acid Moisturizer',
    'ក្រែមសំណើម Hyaluronic Acid',
    'Deep hydration cream with hyaluronic acid for plump, dewy skin',
    'ក្រែមផ្តល់សំណើមជ្រៅជាមួយ Hyaluronic Acid សម្រាប់ស្បែករឹង និងភ្លឺ',
    'hyaluronic-acid-moisturizer',
    'MO-001',
    48.00,
    60.00,
    120,
    true,
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    '/placeholder.svg?height=600&width=600'
  ),
  (
    'h0eebc99-9c0b-4ef8-bb6d-6bb9bd380a88',
    'SPF 50+ Mineral Sunscreen',
    'ក្រែមការពារពន្លឺថ្ងៃ SPF 50+',
    'Lightweight mineral sunscreen with broad spectrum protection',
    'ក្រែមការពារពន្លឺថ្ងៃស្រាលជាមួយការពារលើសពីវិសាលភាព',
    'spf-50-mineral-sunscreen',
    'SS-001',
    32.00,
    42.00,
    200,
    true,
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    '/placeholder.svg?height=600&width=600'
  ),
  (
    'i0eebc99-9c0b-4ef8-bb6d-6bb9bd380a99',
    'Retinol Night Cream',
    'ក្រែមយប់ Retinol',
    'Anti-aging night cream with retinol for smoother, firmer skin',
    'ក្រែមយប់ប្រឆាំងវ័យចំណាស់ជាមួយ Retinol សម្រាប់ស្បែករលោង និងរឹង',
    'retinol-night-cream',
    'NC-001',
    78.00,
    95.00,
    60,
    true,
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    '/placeholder.svg?height=600&width=600'
  ),
  (
    'j0eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa',
    'Niacinamide Pore Refining Serum',
    'សេរ៉ូម Niacinamide បង្រួមរន្ធញើស',
    'Pore minimizing serum with niacinamide for refined skin texture',
    'សេរ៉ូមបង្រួមរន្ធញើសជាមួយ Niacinamide សម្រាប់វាយនភាពស្បែករលោង',
    'niacinamide-serum',
    'SR-002',
    42.00,
    55.00,
    90,
    false,
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    '/placeholder.svg?height=600&width=600'
  ),
  (
    'k0eebc99-9c0b-4ef8-bb6d-6bb9bd380bbb',
    'Gentle Foaming Cleanser',
    'ជែលសម្អាតមុខពពុះ',
    'Mild foaming cleanser for sensitive skin',
    'ជែលសម្អាតមុខពពុះថ្នមៗសម្រាប់ស្បែកងាយរងគ្រោះ',
    'gentle-foaming-cleanser',
    'CL-002',
    24.00,
    30.00,
    180,
    false,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '/placeholder.svg?height=600&width=600'
  ),
  (
    'l0eebc99-9c0b-4ef8-bb6d-6bb9bd380ccc',
    'Peptide Eye Cream',
    'ក្រែមភ្នែក Peptide',
    'Firming eye cream with peptides to reduce fine lines and dark circles',
    'ក្រែមភ្នែករឹងជាមួយ Peptide កាត់បន្ថយបន្ទាត់ស្រួច និងរង្វង់ងងឹត',
    'peptide-eye-cream',
    'EC-001',
    58.00,
    72.00,
    70,
    false,
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    '/placeholder.svg?height=600&width=600'
  );

-- Update product images to match new products
DELETE FROM public.product_images;

INSERT INTO public.product_images (product_id, image_url, alt_text_en, alt_text_km, position) VALUES
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '/placeholder.svg?height=600&width=600', 'Hydrating Gel Cleanser', 'ជែលសម្អាតមុខផ្តល់សំណើម', 0),
  ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '/placeholder.svg?height=600&width=600', 'Vitamin C Serum', 'សេរ៉ូម វីតាមីន C', 0),
  ('g0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '/placeholder.svg?height=600&width=600', 'Hyaluronic Acid Moisturizer', 'ក្រែមសំណើម Hyaluronic Acid', 0),
  ('h0eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', '/placeholder.svg?height=600&width=600', 'SPF 50+ Mineral Sunscreen', 'ក្រែមការពារពន្លឺថ្ងៃ SPF 50+', 0),
  ('i0eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '/placeholder.svg?height=600&width=600', 'Retinol Night Cream', 'ក្រែមយប់ Retinol', 0),
  ('j0eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa', '/placeholder.svg?height=600&width=600', 'Niacinamide Serum', 'សេរ៉ូម Niacinamide', 0),
  ('k0eebc99-9c0b-4ef8-bb6d-6bb9bd380bbb', '/placeholder.svg?height=600&width=600', 'Gentle Foaming Cleanser', 'ជែលសម្អាតមុខពពុះ', 0),
  ('l0eebc99-9c0b-4ef8-bb6d-6bb9bd380ccc', '/placeholder.svg?height=600&width=600', 'Peptide Eye Cream', 'ក្រែមភ្នែក Peptide', 0);
