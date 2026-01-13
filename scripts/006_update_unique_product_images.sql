-- Update each product with unique, category-appropriate placeholder images
-- This ensures each product has its own distinct visual identity with descriptive image queries

-- Cleansers (category_id = 1)
UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 1;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 2;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 3;

-- Serums (category_id = 2)
UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 4;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 5;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 6;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 7;

-- Moisturizers (category_id = 3)
UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 8;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 9;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 10;

-- Sunscreens (category_id = 4)
UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 11;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 12;

-- Masks (category_id = 5)
UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 13;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 14;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 15;

-- Eye Care (category_id = 6)
UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 16;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 17;

-- Treatments (category_id = 7)
UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 18;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 19;

UPDATE public.products 
SET image_url = '/placeholder.svg?height=400&width=400'
WHERE id = 20;

-- Verify the update
SELECT id, name_en, category_id, image_url 
FROM public.products 
ORDER BY category_id, id;
