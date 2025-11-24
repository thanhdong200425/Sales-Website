import { Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
 

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
            <Link key={product.id} to={`/product/${product?.slug}`} className='group'>
              <Card key={product.id} className='border-none bg-slate-50 p-4 shadow-none'>
                <div className='relative overflow-hidden rounded-3xl bg-white'>
                  {product.badge && (
                    <Badge
                      className='absolute left-4 top-4 bg-white text-slate-900'
                      variant='secondary'
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <img
                    alt={product.name}
                    className='h-64 w-full object-cover'
                    src={product.image}
                  />
                </div>
                <CardContent className='space-y-3 px-0 py-4'>
                  <p className='text-lg font-semibold text-slate-900'>{product.name}</p>
                  <div className='flex items-center gap-2 text-sm text-amber-500'>
                    <Star className='size-4 fill-amber-400 text-amber-400' aria-hidden />
                    <span className='text-slate-600'>{product.rating.toFixed(1)}/5</span>
                  </div>
                  <div className='flex items-center gap-3 text-xl font-semibold'>
                    <span>${product.price}</span>
                    {product.originalPrice && (
                      <span className='text-base font-normal text-slate-400 line-through'>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export type { Product };
export { ProductSection };
