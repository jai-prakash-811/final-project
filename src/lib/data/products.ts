import type { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'product1',
    name: 'Classic White T-Shirt',
    description: 'A comfortable and versatile t-shirt made from 100% organic cotton. Perfect for everyday wear.',
    price: 25.99,
    images: ['https://placehold.co/600x400.png?text=T-Shirt+Front&font=arial', 'https://placehold.co/600x400.png?text=T-Shirt+Back&font=arial'],
    category: 'Apparel',
    rating: 4.5,
    isTrending: true,
    details: ["100% Organic Cotton", "Soft and breathable", "Crew neck", "Machine washable"],
    stock: 150,
    reviews: [
      { id: 'r1', userId: 'u1', userName: 'Alice', rating: 5, comment: 'Super comfortable and fits perfectly!', date: new Date('2023-05-10').toISOString() },
      { id: 'r2', userId: 'u2', userName: 'Bob', rating: 4, comment: 'Great quality for the price.', date: new Date('2023-05-12').toISOString() },
    ],
  },
  {
    id: 'product2',
    name: 'Wireless Bluetooth Headphones',
    description: 'Experience immersive sound with these noise-cancelling wireless headphones. Long-lasting battery life.',
    price: 129.50,
    images: ['https://placehold.co/600x400.png?text=Headphones+Main&font=arial', 'https://placehold.co/600x400.png?text=Headphones+Side&font=arial'],
    category: 'Electronics',
    rating: 4.8,
    isTrending: true,
    details: ["Active Noise Cancellation", "20+ hours battery life", "Comfortable over-ear design", "Bluetooth 5.0"],
    stock: 75,
    reviews: [
      { id: 'r3', userId: 'u3', userName: 'Charlie', rating: 5, comment: 'Amazing sound quality and noise cancellation!', date: new Date('2023-06-01').toISOString() },
    ],
  },
  {
    id: 'product3',
    name: 'Modern Leather Backpack',
    description: 'Stylish and durable leather backpack with multiple compartments. Ideal for work or travel.',
    price: 89.00,
    images: ['https://placehold.co/600x400.png?text=Backpack+Front&font=arial', 'https://placehold.co/600x400.png?text=Backpack+Interior&font=arial'],
    category: 'Accessories',
    rating: 4.2,
    details: ["Genuine Leather", "Padded laptop sleeve (15\")", "Multiple pockets", "Water-resistant"],
    stock: 90,
  },
  {
    id: 'product4',
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks cold or hot for hours with this insulated stainless steel water bottle.',
    price: 19.99,
    images: ['https://placehold.co/600x400.png?text=Water+Bottle&font=arial'],
    category: 'Home Goods',
    rating: 4.9,
    isTrending: true,
    details: ["Double-wall insulation", "BPA-free", "Leak-proof lid", "750ml capacity"],
    stock: 200,
  },
  {
    id: 'product5',
    name: 'Yoga Mat Premium',
    description: 'Eco-friendly and non-slip yoga mat for your daily practice. Provides excellent cushioning.',
    price: 35.00,
    images: ['https://placehold.co/600x400.png?text=Yoga+Mat&font=arial'],
    category: 'Sports',
    rating: 4.6,
    details: ["Eco-friendly TPE material", "Non-slip texture", "6mm thickness", "Includes carrying strap"],
    stock: 120,
  },
  {
    id: 'product6',
    name: 'Smart Coffee Maker',
    description: 'Brew the perfect cup of coffee with this smart coffee maker. Controllable via app.',
    price: 199.99,
    images: ['https://placehold.co/600x400.png?text=Coffee+Maker&font=arial'],
    category: 'Electronics',
    isTrending: true,
    details: ["Wi-Fi enabled", "Programmable schedule", "Adjustable brew strength", "12-cup capacity"],
    stock: 50,
  },
  {
    id: 'product7',
    name: 'Running Shoes UltraComfort',
    description: 'Lightweight and breathable running shoes designed for maximum comfort and performance.',
    price: 110.00,
    images: ['https://placehold.co/600x400.png?text=Running+Shoes&font=arial'],
    category: 'Apparel',
    rating: 4.7,
    details: ["Mesh upper for breathability", "Cushioned midsole", "Durable rubber outsole", "Neutral arch support"],
    stock: 80,
  },
  {
    id: 'product8',
    name: 'Desk Organizer Set',
    description: 'Keep your workspace tidy with this elegant desk organizer set. Includes multiple pieces.',
    price: 28.75,
    images: ['https://placehold.co/600x400.png?text=Desk+Organizer&font=arial'],
    category: 'Office',
    details: ["Includes pen holder, file sorter, note tray", "Durable metal construction", "Modern design"],
    stock: 110,
  }
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(p => p.id === id);
};

export const getTrendingProducts = (): Product[] => {
  return mockProducts.filter(p => p.isTrending).slice(0, 5); // Get up to 5 trending products
};
