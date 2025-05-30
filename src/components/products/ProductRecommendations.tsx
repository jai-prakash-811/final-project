'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { getProductById } from '@/lib/data/products';
import ProductCard from './ProductCard';
import { useAuth } from '@/hooks/useAuth';
import { getProductRecommendations, ProductRecommendationsInput } from '@/ai/flows/product-recommendations';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const ProductRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        try {
          // Mock browsing and purchase history
          const input: ProductRecommendationsInput = {
            userId: user.uid,
            browsingHistory: 'product1,product3', // Example history
            purchaseHistory: 'product1',         // Example history
          };
          const result = await getProductRecommendations(input);
          
          if (result && result.productIds) {
            const recommendedProducts = result.productIds
              .map(id => getProductById(id))
              .filter((p): p is Product => p !== undefined); // Type guard to filter out undefined
            setRecommendations(recommendedProducts);
          } else {
            setRecommendations([]);
          }

        } catch (err: any) {
          console.error('Failed to fetch AI recommendations:', err);
          setError(err.message || 'Could not load recommendations.');
          setRecommendations([]);
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendations();
    } else {
      setRecommendations([]); // Clear recommendations if user logs out
    }
  }, [user]);

  if (!user) {
    return null; // Don't show if not logged in
  }

  if (loading) {
    return (
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">Just For You</h2>
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Finding recommendations...</p>
        </div>
      </section>
    );
  }

  if (error) {
     return (
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">Just For You</h2>
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Recommendations</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </section>
     );
  }
  
  if (recommendations.length === 0 && !loading) {
    return (
       <section className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">Just For You</h2>
        <p className="text-center text-muted-foreground">No recommendations available right now. Try browsing more products!</p>
      </section>
    );
  }


  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">Just For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductRecommendations;
