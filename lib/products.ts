// lib/products.ts

export const categories = [
  { id: "all", name: "All Products" },
  { id: "face-care", name: "Face Care" },
  { id: "treatment", name: "Treatment" },
  { id: "masks", name: "Masks" },
  { id: "body-care", name: "Body Care" },
  { id: "intimate-care", name: "Intimate Care" },
  { id: "sets", name: "Sets" },
  { id: "best-sellers", name: "Best Sellers" },
]

export const products = [
  // --- GROUP 1: FACE CARE (មុខ) ---
  {
    id: 1,
    name: "Fruit Serum (សេរ៉ូមផ្លែឈើ)",
    price: "$14.00",
    category: "Face Care",
    description: "មុខសរលោង បំបាត់ស្នាម ផ្តល់វីតាមីន",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-fruit-vitamin-glow-serum.jpg?alt=media&token=c4218af3-2fb4-4f86-8cfa-7cd2b805f0a7" // ⚠️ ដាក់ Link រូប cyra-fruit-vitamin-glow-serum.jpg
  },
  {
    id: 2,
    name: "Hydrating Serum (សេរ៉ូមផ្តល់សំណើម)",
    price: "$14.00",
    category: "Face Care",
    description: "ផ្តល់សំណើម មុខទន់រលោង បំបាត់ភាពស្ងួត",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-hyaluronic-moisture-shield.jpg?alt=media&token=b7d3c59a-523f-4721-9efd-6f86107400fa" // ⚠️ ដាក់ Link រូប hydra...
  },
  {
    id: 3,
    name: "Sunscreen SPF50+ (ឡេការពារកំដៅថ្ងៃ)",
    price: "$14.00",
    category: "Face Care",
    description: "ការពារកាំរស្មី UV មិនស្អិត",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-ultra-light-daily-sunscreen.jpg?alt=media&token=8aa47d12-7a7e-4dd5-851d-a889beda5a09" // ⚠️ ដាក់ Link រូប sunscreen...
  },
  {
    id: 4,
    name: "Repair Night Cream (ឡេយប់ស្តារស្បែក)",
    price: "$23.00",
    category: "Face Care",
    description: "ជួសជុលស្បែកខូច ឱ្យរឹងមាំវិញ",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-cell-renewal-repair-cream.jpg?alt=media&token=a32d96c4-9523-4601-8fed-107618f3c490" // ⚠️ ដាក់ Link រូប cyra-cell-renewal-repair-cream.jpg
  },

  // --- GROUP 2: TREATMENT (ព្យាបាល) ---
  {
    id: 5,
    name: "Melasma Night Cream (ឡេយប់ព្យាបាលជាំ)",
    price: "$17.00",
    category: "Treatment",
    description: "ឯកទេសបំបែកជាំផ្ទាំង ជាំឈាម",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-melasma-therapy-night-cream.jpg?alt=media&token=f46a62fb-cfd2-416f-9aad-02d7551a5f94"
  },
  {
    id: 6,
    name: "Freckle Night Cream (ឡេយប់ព្យាបាលអាចម៍រុយ)",
    price: "$17.00",
    category: "Treatment",
    description: "កំចាត់អាចម៍រុយ និងស្នាមអុចខ្មៅ",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-freckle-correcting-night-cream.jpg?alt=media&token=1083afdf-8c17-4915-a8ed-20761028ade5" // ⚠️ រូប cyra-freckle-correcting-night-cream.jpg
  },
  {
    id: 7,
    name: "Acne Night Cream (ឡេយប់ព្យាបាលមុន)",
    price: "$17.00",
    category: "Treatment",
    description: "កំចាត់មុនតូចធំ ទប់ស្កាត់ការកើតឡើងវិញ",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-acne-dispel-night-cream.jpg?alt=media&token=0d6b5587-c81e-466e-a698-7c65fba1b12f" // ⚠️ រូប cyra-acne-dispel-night-cream.jpg
  },
  {
    id: 8,
    name: "Acne Serum (សេរ៉ូមព្យាបាលមុន)",
    price: "$14.00",
    category: "Treatment",
    description: "លាបលើមុនឱ្យឆាប់ស្ងួត និងរាបស្មើ",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-acne-clarifying-serum.jpg?alt=media&token=ded473d7-59cb-44ec-af92-ebd6142614ae" // ⚠️ រូប cyra-acne-clarifying-serum.jpg
  },

  // --- GROUP 3: MASKS (ម៉ាស) ---
  {
    id: 9,
    name: "Espresso Mask (ម៉ាសកាហ្វេ)",
    price: "$14.00",
    category: "Masks",
    description: "បឺតជាតិពុល បង្រួមរន្ធញើស",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-espresso-pore-purifying-mask.jpg?alt=media&token=802bb7c9-852e-4aa6-b0d7-a402a42868e7" // ⚠️ រូប cyra-espresso-pore-purifying-mask.jpg
  },
  {
    id: 10,
    name: "Strawberry Detox Mask (ម៉ាសស្រ្តប៊ែរី)",
    price: "$14.00",
    category: "Masks",
    description: "បឺតធូលីដី បានជ្រៅពីរន្ធញើស",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-strawberry-antioxidant-mask.jpg?alt=media&token=334bd9a1-2032-462a-bbf4-ff1f8ba84bac"
  },

  {
    id: 11,
    name: "Kiwi Detox Mask (ម៉ាសគីវី)",
    price: "$14.00",
    category: "Masks",
    description: "ផ្តល់វីតាមីន C ស្បែក ភ្លឺ ស ចែងចាំង",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-kiwi-detox-mask.jpg?alt=media&token=1eafe9a3-a3f5-4d61-989a-58e8662b388c"
  },

  // --- GROUP 4: BODY CARE (ដងខ្លួន) ---
  {
    id: 12,
    name: "Body Night Lotion (ឡេខ្លួនយប់)",
    price: "$23.00",
    category: "Body Care",
    description: "ធ្វើឱ្យស្បែកខ្លួនស ម៉ដ្ឋ រលោង",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-body-night-lotion-pink.jpg?alt=media&token=0185f927-8677-4b12-90ad-8b8f54d8afbd" // ⚠️ រូប cyra-body-night-lotion-pink.jpg
  },
  {
    id: 13,
    name: "Body Day Lotion (ឡេខ្លួនថ្ងៃ)",
    price: "$23.00",
    category: "Body Care",
    description: "ការពារកំដៅថ្ងៃ និងធ្វើឱ្យស្បែកស",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-body-day-cream-blue.jpg?alt=media&token=f44d33df-5851-46e8-82b5-f9f3c96ab0e8" // ⚠️ រូប cyra-body-day-cream-blue.jpg
  },
  {
    id: 14,
    name: "Armpit Cream Blue (ឡេក្លៀកខៀវ)",
    price: "$9.00",
    category: "Body Care",
    description: "ក្លៀកស បំបាត់ក្លិន (ត្រជាក់)",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-underarm-whitening-blue.jpg?alt=media&token=57197ec0-5eac-4115-a63e-3dd175afb454"
  },
  {
    id: 15,
    name: "Armpit Cream Pink (ឡេក្លៀកផ្កាឈូក)",
    price: "$9.00",
    category: "Body Care",
    description: "ក្លៀកស ម៉ដ្ឋ (សម្រាប់ស្បែកស្តើង)",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-private-area-repair-pink.jpg?alt=media&token=1c318c0b-39d8-43a8-8a32-c449323a6cc1"
  },

  // --- GROUP 5: INTIMATE CARE (អនាម័យ) ---
  {
    id: 16,
    name: "Yoni Steam Gold (ស្ប៉ាអនាម័យ មាស)",
    price: "$19.00",
    category: "Intimate Care",
    description: "អនាម័យ សុវត្ថិភាព ក្លិនក្រអូប",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-yoni-steam-gold-premium.jpg?alt=media&token=c81f39aa-a429-4c68-811d-c828c5c67aa4"
  },
  {
    id: 17,
    name: "Yoni Steam Platinum (ស្ប៉ាអនាម័យ ផ្លាទីន)",
    price: "$13.00",
    category: "Intimate Care",
    description: "រូបមន្តពិសេស សម្រាប់ស្ត្រី ដែលពិបាកមានបុត្រ",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-yoni-steam-platinum-fertility.jpg?alt=media&token=f901f26a-a169-4117-88f3-e7f33aa99100"
  },
  {
    id: 18,
    name: "Yoni Steam Silver (ស្ប៉ាអនាម័យ ប្រាក់)",
    price: "$13.00",
    category: "Intimate Care",
    description: "ថែរក្សាអនាម័យប្រចាំថ្ងៃ",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-yoni-steam-silver-balance.jpg?alt=media&token=8d622f69-0393-4318-8d49-7958664e6e15"
  },

  // --- GROUP 6: SETS (ឈុតលក់ដាច់) ---
  {
    id: 19,
    name: "Acne Set 3in1 (ឈុតកំចាត់មុន)",
    price: "$42.00",
    category: "Sets",
    description: "សេរ៉ូម + ឡេយប់ + ការពារកំដៅថ្ងៃ",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-acne-3in1-set.jpg?alt=media&token=8db7c1ac-6579-4cba-9276-5ed5539e40ed" // ⚠️ រូប cyra-acne-3in1-set.jpg
  },
  {
    id: 20,
    name: "Freckle Set 3in1 (ឈុតកំចាត់អាចម៍រុយ)",
    price: "$42.00",
    category: "Sets",
    description: "សេរ៉ូម + ឡេយប់ + ការពារកំដៅថ្ងៃ",
    image: "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0545600562.firebasestorage.app/o/products%2Fcyra-3in1-freckle-solution-set.jpg?alt=media&token=3e461e80-41df-4d5b-b56b-8b9814d64c95" // ⚠️ រូប cyra-3in1-freckle-solution-set.jpg
  },
  
];
