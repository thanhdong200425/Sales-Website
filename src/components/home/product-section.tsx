import { Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import ProductCard from '@/pages/ProductCard';
 

type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
};

interface ProductSectionProps {
  title: string;
  products: Product[];
  ctaLabel?: string;
}


function ProductSection({ title, products, ctaLabel = 'See all' }: ProductSectionProps) {
  return (
    <section className='px-4 py-16'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-black uppercase tracking-tight text-slate-900'>
            {title}
          </h2>
          <Button className='rounded-full px-6' variant='outline'>
            {ctaLabel}
          </Button>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {products.map((product) => (
      <ProductCard key={product.id} product={product} />
  ))}
        </div>
      </div>
    </section>
  );
}

export type { Product };
export { ProductSection };
