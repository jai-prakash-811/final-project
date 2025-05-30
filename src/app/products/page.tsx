import ProductGrid from '@/components/products/ProductGrid';
import { mockProducts } from '@/lib/data/products'; // In a real app, fetch this data

export const metadata = {
  title: 'All Products - ShopWave',
  description: 'Browse our collection of amazing products on ShopWave.',
};

export default function ProductsPage() {
  // In a real app, you would fetch products from an API
  const products = mockProducts;

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-secondary rounded-lg shadow">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
          Discover Our Products
        </h1>
        <p className="mt-3 text-lg text-secondary-foreground max-w-2xl mx-auto">
          Explore a wide range of items curated just for you. Find your next favorite thing!
        </p>
      </section>
      
      {/* Placeholder for filters and sorting - not implemented */}
      {/* 
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">{products.length} products found</p>
        <div>
          <Button variant="outline">Sort By <ChevronDown className="ml-2 h-4 w-4" /></Button>
        </div>
      </div> 
      */}

      <ProductGrid products={products} />
    </div>
  );
}
