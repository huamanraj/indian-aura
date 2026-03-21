import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Tag, Sparkles } from "lucide-react";
import { products } from "@/lib/products";
import { getWhatsAppLink } from "@/lib/constants";
import FadeIn from "@/components/FadeIn";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} - Indian Aura`,
      description: product.description,
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <FadeIn>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-12">
        <FadeIn direction="left">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary uppercase tracking-wide">
              <Tag size={12} />
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-3">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary mt-4">
              {product.price}
            </p>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="flex items-center gap-3 mt-8 p-4 bg-muted rounded-xl">
              <Sparkles size={20} className="text-accent shrink-0" />
              <p className="text-sm text-muted-foreground">
                Handcrafted with love by skilled Indian artisans. Each piece is
                unique.
              </p>
            </div>

            <a
              href={getWhatsAppLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full mt-8 rounded-full bg-primary text-primary-foreground py-4 text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
            >
              <MessageCircle size={20} />
              Order on WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <FadeIn>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Related Products
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
