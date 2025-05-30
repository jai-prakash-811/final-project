import TrendingCarousel from '@/components/products/TrendingCarousel';
import ProductRecommendations from '@/components/products/ProductRecommendations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-secondary via-background to-secondary rounded-xl shadow-lg">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
          Welcome to ShopWave!
        </h1>
        <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto">
          Your ultimate destination for on-demand shopping. Discover trends, get personalized picks, and enjoy a seamless experience.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/products">Shop All Products</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#trending">Explore Trends</Link>
          </Button>
        </div>
      </section>

      {/* Trending Items Section */}
      <div id="trending">
        <TrendingCarousel />
      </div>
      
      {/* AI Product Recommendations Section */}
      <ProductRecommendations />

      {/* Call to Action / Categories (Optional) */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-tight">Ready to Dive In?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Browse our categories or see what's new today.
        </p>
        <Button size="lg" variant="default" asChild>
            <Link href="/products">View All Collections</Link>
        </Button>
      </section>
    </div>
  );
}
