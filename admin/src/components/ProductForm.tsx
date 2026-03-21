'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import { Product } from '@/lib/types';
import { addProduct, updateProduct, CATEGORIES } from '@/lib/utils';

interface ProductFormProps {
  product?: Product;
  mode: 'create' | 'edit';
}

export default function ProductForm({ product, mode }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    description: product?.description || '',
    category: product?.category || CATEGORIES[0],
    relatedProducts: product?.relatedProducts || [],
  });
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [relatedProductsInput, setRelatedProductsInput] = useState(
    product?.relatedProducts?.join(', ') || ''
  );
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate images
    if (images.length === 0) {
      setError('At least 1 image is required');
      return;
    }
    if (images.length > 4) {
      setError('Maximum 4 images allowed');
      return;
    }

    // Parse related products
    const relatedProducts = relatedProductsInput
      .split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0);

    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (mode === 'create') {
        addProduct({
          ...formData,
          relatedProducts,
          images,
        });
      } else if (product) {
        updateProduct(product.uuid, {
          ...formData,
          relatedProducts,
          images,
        });
      }

      router.push('/admin/products');
    } catch (err) {
      setError('Failed to save product. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {mode === 'create' ? 'Add New Product' : 'Edit Product'}
        </h1>
        <p className="text-muted-foreground">
          {mode === 'create' 
            ? 'Create a new product listing for your store'
            : 'Update the product information below'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Product Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Name */}
            <div className="lg:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300"
                placeholder="e.g., Handcrafted Brass Diya"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300"
                required
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 resize-none"
                placeholder="Describe the product features, materials, and benefits..."
                required
              />
            </div>

            {/* Related Products */}
            <div className="lg:col-span-2">
              <label htmlFor="relatedProducts" className="block text-sm font-medium text-foreground mb-2">
                Related Products
                <span className="text-xs text-muted-foreground ml-2">(comma-separated UUIDs)</span>
              </label>
              <input
                type="text"
                id="relatedProducts"
                value={relatedProductsInput}
                onChange={(e) => setRelatedProductsInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 font-mono text-sm"
                placeholder="uuid-1, uuid-2, uuid-3"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-card rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Product Images</h2>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            error={error}
            maxImages={4}
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 gradient-primary text-white font-semibold py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {mode === 'create' ? 'Creating Product...' : 'Updating Product...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {mode === 'create' ? 'Create Product' : 'Update Product'}
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="px-8 py-4 rounded-full font-semibold border-2 border-border text-foreground hover:bg-muted transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
