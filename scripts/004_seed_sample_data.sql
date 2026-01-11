-- Insert sample categories
INSERT INTO public.categories (id, name_en, name_km, slug, description_en, description_km) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Electronics', 'អេឡិចត្រូនិច', 'electronics', 'Electronic devices and accessories', 'ឧបករណ៍អេឡិចត្រូនិច និងគ្រឿងបរិក្ខារ'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Fashion', 'ម៉ូដ', 'fashion', 'Clothing and accessories', 'សម្លៀកបំពាក់ និងគ្រឿងបរិក្ខារ'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Home & Living', 'ផ្ទះ និង ការរស់នៅ', 'home-living', 'Home decor and furniture', 'ការតុបតែងផ្ទះ និងគ្រឿងសង្ហារឹម'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Beauty & Health', 'សម្រស់ និង សុខភាព', 'beauty-health', 'Beauty products and health items', 'ផលិតផលសម្រស់ និងសុខភាព');

-- Insert sample products
INSERT INTO public.products (id, name_en, name_km, description_en, description_km, slug, sku, price, compare_at_price, stock_quantity, is_featured, category_id) VALUES
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
    'Wireless Headphones',
    'កាស៊ែតឥតខ្សែ',
    'Premium wireless headphones with noise cancellation',
    'កាស៊ែតឥតខ្សែកម្រិតខ្ពស់ជាមួយនឹងការលុបសំឡេង',
    'wireless-headphones',
    'WH-001',
    89.99,
    129.99,
    50,
    true,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66',
    'Smart Watch',
    'នាឡិកាឆ្លាតវៃ',
    'Fitness tracker with heart rate monitoring',
    'ឧបករណ៍តាមដានសុខភាពជាមួយនឹងការត្រួតពិនិត្យអត្រាបេះដូង',
    'smart-watch',
    'SW-001',
    199.99,
    249.99,
    30,
    true,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  );

-- Insert sample product images
INSERT INTO public.product_images (product_id, image_url, alt_text_en, alt_text_km, position) VALUES
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '/placeholder.svg?height=400&width=400', 'Wireless Headphones', 'កាស៊ែតឥតខ្សែ', 0),
  ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '/placeholder.svg?height=400&width=400', 'Smart Watch', 'នាឡិកាឆ្លាតវៃ', 0);
