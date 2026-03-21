"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useWhatsAppStore } from "@/store/whatsapp-store";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const getLink = useWhatsAppStore((s) => s.getLink);

  return (
    <div className="group bg-card rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.trending && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
              Trending
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.category}
        </span>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-base font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-primary font-bold text-lg mt-2">{product.price}</p>

        <a
          href={getLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full mt-3 rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
        >
          <MessageCircle size={16} />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
