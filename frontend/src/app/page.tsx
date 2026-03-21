import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Sparkles, Palette, Heart } from "lucide-react";
import { categories } from "@/lib/products";
import { fetchProducts } from "@/lib/api";
import { getWhatsAppLink, BRAND } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Indian Aura - Bring Home the Aura of Indian Traditions",
  description:
    "Handcrafted decor blending tradition and modern elegance. Discover festive essentials, ceremonial artistry, and auspicious decor.",
};

export default async function HomePage() {
  const products = await fetchProducts();
  const trendingProducts = products.filter((p) => p.trending);
  const popularProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster=""
        >
          <source src="/bg_video.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Bring Home the Aura of Indian Traditions
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl">
                Handcrafted decor blending tradition and modern elegance. Every
                piece tells a story of devotion, skill, and timeless beauty.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full bg-white text-primary px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
                >
                  View Products
                </Link>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105"
                >
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trending Products by Category */}
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category === category
        );
        return (
          <section key={category} className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {category}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Discover our curated {category.toLowerCase()} collection
                    </p>
                  </div>
                  <Link
                    href="/products"
                    className="hidden sm:inline-flex text-sm font-medium text-primary hover:underline"
                  >
                    View All &rarr;
                  </Link>
                </div>
              </FadeIn>

              <div className="overflow-x-auto hide-scrollbar pb-4">
                <div className="flex gap-6 min-w-max sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:min-w-0">
                  {categoryProducts.map((product, i) => (
                    <FadeIn key={product.id} delay={i * 0.1} className="w-72 sm:w-auto">
                      <ProductCard product={product} />
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Popular Products */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Popular Products
              </h2>
              <p className="mt-2 text-muted-foreground">
                Our most loved handcrafted treasures
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.08}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/image1.jpeg"
                  alt="Indian Aura craftsmanship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  About Indian Aura
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Indian Aura is a tribute to the vibrant soul of India—its rich
                  heritage, timeless artistry, and the spiritual warmth that
                  turns a house into a home. We believe that every celebration
                  is an opportunity to connect with our roots, and every corner
                  of a home should radiate a unique, soulful &quot;aura.&quot;
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our journey began with a simple mission: to preserve the
                  elegance of traditional Indian craftsmanship and present it
                  with a contemporary touch. We specialize in curating exquisite
                  decor that brings light, prosperity, and a festive spirit to
                  your modern lifestyle.
                </p>
                <div className="grid grid-cols-3 gap-6 mt-10">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                      <Sparkles size={20} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Premium Quality
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-3">
                      <Palette size={20} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Handcrafted
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-3">
                      <Heart size={20} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Made with Love
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Our Collections
              </h2>
              <p className="mt-2 text-muted-foreground">
                Curated collections for every occasion
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <FadeIn key={cat} delay={i * 0.15}>
                <Link
                  href="/products"
                  className="group relative block aspect-[4/3] rounded-2xl overflow-hidden"
                >
                  <Image
                    src={`/image${(i % 3) + 1}.jpeg`}
                    alt={cat}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">{cat}</h3>
                    <p className="text-white/80 text-sm mt-1">
                      Explore collection &rarr;
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Order Easily on WhatsApp
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Skip the checkout hassle. Simply message us on WhatsApp to place
              your order. We&apos;ll guide you through the process.
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-10 py-4 text-lg font-semibold mt-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              <MessageCircle size={22} />
              Chat on WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
