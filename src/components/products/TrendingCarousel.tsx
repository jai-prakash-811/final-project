import { getTrendingProducts } from '@/lib/data/products';
import ProductCard from './ProductCard';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const TrendingCarousel = () => {
  const trendingProducts = getTrendingProducts();

  if (!trendingProducts || trendingProducts.length === 0) {
    return null; // Or some placeholder if needed
  }

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">Trending Now</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-4">
          {trendingProducts.map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[300px] md:w-[320px]"> {/* Fixed width for cards in carousel */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default TrendingCarousel;
