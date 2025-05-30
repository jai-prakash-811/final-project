import Image from 'next/image';
import { getProductById, mockProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type ProductDetailPageProps = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: ProductDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) {
    return {
      title: 'Product Not Found - ShopWave',
    };
  }
  return {
    title: `${product.name} - ShopWave`,
    description: product.description,
  };
}

// This function is needed for Next.js to know which paths to pre-render at build time.
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}


export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn&apos;t find the product you&apos;re looking for.</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border shadow-md">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint="product detail"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="aspect-square relative rounded-md overflow-hidden border hover:border-primary transition">
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" data-ai-hint="product thumbnail"/>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
          
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating!) ? 'fill-current' : 'text-muted-foreground/50'}`} />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">({product.rating.toFixed(1)} from {product.reviews?.length || 0} reviews)</span>
            </div>
          )}

          <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          
          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {product.details && product.details.length > 0 && (
             <div>
                <h3 className="text-lg font-medium mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {product.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </div>
          )}
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>
          {product.stock !== undefined && (
             <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
            </p>
          )}
        </div>
      </div>

      {/* Reviews Section Placeholder */}
      <Separator className="my-12" />
      <div className="space-y-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary"/> Customer Reviews
        </h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map(review => (
              <Card key={review.id} className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{review.userName}</CardTitle>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-muted-foreground/50'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet for this product. Be the first to write one!</p>
        )}
        <Button variant="outline">Write a Review (Placeholder)</Button>
      </div>
    </div>
  );
}
