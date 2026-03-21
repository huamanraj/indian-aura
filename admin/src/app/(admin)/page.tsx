'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, getSettings } from '@/lib/utils';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalImages: 0,
    categories: 0,
    hasWhatsApp: false,
  });

  useEffect(() => {
    const products = getProducts();
    const settings = getSettings();
    
    const categories = new Set(products.map(p => p.category));
    const totalImages = products.reduce((sum, p) => sum + p.images.length, 0);

    setStats({
      totalProducts: products.length,
      totalImages,
      categories: categories.size,
      hasWhatsApp: !!settings.whatsappNumber,
    });
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Indian Aura Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scaleIn">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{stats.totalProducts}</p>
          <p className="text-sm text-muted-foreground mt-1">Products</p>
        </div>

        <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scaleIn delay-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{stats.totalImages}</p>
          <p className="text-sm text-muted-foreground mt-1">Images</p>
        </div>

        <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scaleIn delay-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <span className="text-sm text-muted-foreground">Active</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{stats.categories}</p>
          <p className="text-sm text-muted-foreground mt-1">Categories</p>
        </div>

        <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scaleIn delay-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              stats.hasWhatsApp ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <svg className={`w-6 h-6 ${stats.hasWhatsApp ? 'text-green-600' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className={`text-sm ${stats.hasWhatsApp ? 'text-green-600' : 'text-red-600'}`}>
              {stats.hasWhatsApp ? 'Set' : 'Not Set'}
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground">WhatsApp</p>
          <p className="text-sm text-muted-foreground mt-1">Contact Number</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/products/new"
            className="flex items-center gap-4 p-6 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Add New Product
              </p>
              <p className="text-sm text-muted-foreground">Create a new product listing</p>
            </div>
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-4 p-6 rounded-xl border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                View All Products
              </p>
              <p className="text-sm text-muted-foreground">Manage your product catalog</p>
            </div>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-4 p-6 rounded-xl border-2 border-dashed border-border hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                Update Settings
              </p>
              <p className="text-sm text-muted-foreground">Configure WhatsApp & more</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Getting Started</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-semibold text-foreground">Add your first product</p>
              <p className="text-sm text-muted-foreground mt-1">
                Click on &quot;Add New Product&quot; to create your first product listing with images.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-semibold text-foreground">Upload product images</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add 1-4 high-quality images for each product to showcase your items effectively.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-semibold text-foreground">Configure WhatsApp</p>
              <p className="text-sm text-muted-foreground mt-1">
                Set up your WhatsApp number in Settings to enable customer inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
