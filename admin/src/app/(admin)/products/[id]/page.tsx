'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/lib/types';
import { products as productsApi } from '@/lib/api';

export default function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const id = params.id as string;
      try {
        const data = await productsApi.getById(id);
        if (!data) {
          router.push('/products');
          return;
        }
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        router.push('/products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
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
