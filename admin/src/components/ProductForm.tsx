'use client';

import { useState, FormEvent, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import { Product } from '@/lib/types';
import { products as productsApi, categories as categoriesApi } from '@/lib/api';

interface ProductFormProps {
  product?: Product;
  mode: 'create' | 'edit';
}

export default function ProductForm({ product, mode }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    description: product?.description || '',
    category: product?.category || '',
    inStock: product?.inStock ?? true,
  });

  // Fetch categories from API
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await categoriesApi.getPublic();
        setCategories(cats.map((c: any) => c.name));
        // Set default category if none selected
        if (!formData.category && cats.length > 0) {
          setFormData(prev => ({ ...prev, category: cats[0].name }));
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // For edit mode, store existing image URLs for display and existing image objects for API
  const [existingImages, setExistingImages] = useState<{ url: string; public_id: string }[]>(
    product?.images || []
  );
  // New image files (File objects from input)
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Cache object URLs so they stay stable across renders
  const newImageObjectUrls = useMemo(() => {
    return newImageFiles.map(file => URL.createObjectURL(file));
  }, [newImageFiles]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const totalImages = existingImages.length + newImageFiles.length;
    if (totalImages === 0) {
      setError('At least 1 image is required');
      return;
    }
    if (totalImages > 4) {
      setError('Maximum 4 images allowed');
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('inStock', formData.inStock.toString());

      // Append existing images (for edit mode)
      if (mode === 'edit' && existingImages.length > 0) {
        formDataToSend.append('existingImages', JSON.stringify(existingImages));
      }

      // Append new image files
      for (const file of newImageFiles) {
        formDataToSend.append('images', file);
      }

      if (mode === 'create') {
        await productsApi.create(formDataToSend);
      } else if (product) {
        await productsApi.update(product._id, formDataToSend);
      }

      router.push('/products');
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err.response?.data?.message || 'Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Compute all image URLs for ImageUpload component
  const allImageUrls = [
    ...existingImages.map(img => img.url),
    ...newImageObjectUrls
  ];

  const handleImagesChange = (urls: string[]) => {
    // Determine which existing images to keep
    const keptExisting = existingImages.filter(img => urls.includes(img.url));
    setExistingImages(keptExisting);

    // Determine new files to keep using cached object URLs
    const keptNewFiles = newImageFiles.filter((_, i) => urls.includes(newImageObjectUrls[i]));
    setNewImageFiles(keptNewFiles);
  };

  const handleFilesSelected = (files: File[]) => {
    setNewImageFiles(prev => [...prev, ...files]);
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
                {categories.length === 0 ? (
                  <option value="">No categories available</option>
                ) : (
                  categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                <a href="/categories" className="text-primary hover:underline">Manage categories</a> to add more
              </p>
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

            {/* In Stock */}
            <div className="lg:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-foreground">In Stock</span>
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-card rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Product Images</h2>
          <ImageUpload
            images={allImageUrls}
            onImagesChange={handleImagesChange}
            onFilesSelected={handleFilesSelected}
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
            onClick={() => router.push('/products')}
            className="px-8 py-4 rounded-full font-semibold border-2 border-border text-foreground hover:bg-muted transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
