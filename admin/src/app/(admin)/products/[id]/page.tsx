'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/lib/types';
import { getProductById } from '@/lib/utils';

export default function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const id = params.id as string;
    const data = getProductById(id);
    
    if (!data) {
      router.push('/products');
      return;
    }

    setProduct(data);
    setIsLoading(false);
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return <ProductForm product={product} mode="edit" />;
}
