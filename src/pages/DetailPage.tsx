import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Minus, Plus, RefreshCcw, Star, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
type ProductImage = {
  id: number;
  url: string;
  altText: string | null;
  position: number;
};




const BREADCRUMBS = ['Home', 'Shop', 'Men', 'T-shirts'];
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const [productDetail, setProductDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('slug', slug);
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
        if (!res.ok) throw new Error('Product not found');

        const data = await res.json();
        console.log('data', data?.images);
        setProductDetail(data);

        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProductDetail();
    }
  }, [slug]);

 

  const handleQuantityChange = (direction: 'increment' | 'decrement') => {
    setQuantity((current) => {
      const nextValue = direction === 'increment' ? current + 1 : current - 1;
      return Math.min(Math.max(nextValue, 1), 10);
    });
  };
  if (loading) return <div>Loading...</div>;
  if (!productDetail) return <div>Product not found</div>;

  return (
    <section className='bg-white px-4 py-10 sm:py-14'>
      <div className='mx-auto w-full max-w-6xl space-y-8'>
        <nav
          aria-label='Breadcrumb'
          className='flex flex-wrap items-center gap-2 text-sm text-slate-500'
        >
          {BREADCRUMBS.map((crumb, index) => {
            const isLast = index === BREADCRUMBS.length - 1;

            return (
              <div key={crumb} className='flex items-center gap-2'>
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(isLast ? 'font-semibold text-slate-900' : '')}
                >
                  {crumb}
                </span>
                {!isLast && <span className='text-slate-300'>/</span>}
              </div>
            );
          })}
        </nav>

        <div className='grid gap-10 lg:grid-cols-[0.8fr_1fr]'>
          <div className='grid gap-6 lg:grid-cols-[120px_1fr]'>
            <div className='flex gap-4 lg:flex-col'>
              
              {productDetail?.images?.map((img: any) => (
                <button
                  key={img.id}
                  type='button'
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    'relative overflow-hidden rounded-2xl border border-transparent p-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30',
                    
                    img.id === selectedImage?.id
                      ? 'border-gray-500'
                      : 'hover:border-gray-200'
                  )}
                 
                  aria-label={`View ${img.altText}`}
                >
                  <img
                    
                    alt={img.altText}
                    src={img.url}
                    className='h-20 w-20 rounded-xl object-cover'
                  />
                </button>
              ))}
            </div>
            <div className='overflow-hidden rounded-[32px] bg-slate-100 p-6'>
              {selectedImage && (
                <img
                  // alt={selectedImage.altText}
                  src={selectedImage.url}
                  className='h-full w-full rounded-[24px] object-cover'
                />
              )}
            </div>
          </div>

          <div className='space-y-8'>
            <div className='space-y-4'>
              <p className='text-xs font-medium uppercase tracking-[0.3em] text-slate-400'>
                Men · T-shirts
              </p>
              <h1 className='text-3xl font-black leading-tight text-slate-900 sm:text-4xl'>
                {productDetail.name}
              </h1>
              
              <div className='flex flex-wrap items-center gap-4'>
                <p className='text-4xl font-semibold text-slate-900'>
                  ${productDetail?.price}
                </p>
              </div>
              <p className='max-w-xl text-base leading-relaxed text-slate-600'>
                {productDetail.description}
              </p>
            </div>

           

            <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
              <div className='flex items-center rounded-full border border-slate-200'>
                <button
                  type='button'
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity === 1}
                  className='h-12 w-12 rounded-full text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300'
                >
                  <Minus className='mx-auto size-4' />
                </button>
                <span className='min-w-[56px] text-center text-lg font-semibold text-slate-900'>
                  {quantity}
                </span>
                <button
                  type='button'
                  onClick={() => handleQuantityChange('increment')}
                  disabled={quantity === 10}
                  className='h-12 w-12 rounded-full text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300'
                >
                  <Plus className='mx-auto size-4' />
                </button>
              </div>
              <Button className='h-14 flex-1 rounded-full bg-slate-900 text-base font-semibold text-white shadow-lg hover:bg-slate-900/90'>
                Add to Cart
              </Button>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-3xl border border-slate-100 bg-slate-50 p-5'>
                <div className='flex items-center gap-3 text-slate-900'>
                  <Truck className='size-6 text-slate-700' />
                  <div>
                    <p className='text-sm font-semibold'>Free shipping</p>
                    <p className='text-sm text-slate-500'>Arrives in 2-4 business days</p>
                  </div>
                </div>
              </div>
              <div className='rounded-3xl border border-slate-100 bg-slate-50 p-5'>
                <div className='flex items-center gap-3 text-slate-900'>
                  <RefreshCcw className='size-6 text-slate-700' />
                  <div>
                    <p className='text-sm font-semibold'>30-day returns</p>
                    <p className='text-sm text-slate-500'>Free pickup available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
