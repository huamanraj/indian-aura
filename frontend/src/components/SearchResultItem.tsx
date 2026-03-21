"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface SearchResultItemProps {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
}

export default function SearchResultItem({
  product,
  isSelected,
  onClick,
}: SearchResultItemProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 sm:px-4 py-3 transition-colors ${
        isSelected
          ? "bg-primary/10 text-primary"
          : "hover:bg-muted text-foreground"
      }`}
      role="option"
      aria-selected={isSelected}
      aria-label={`${product.name}, ${product.category}, ${product.price}`}
    >
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-md overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 40px, 48px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{product.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {product.category}
        </p>
      </div>
      <div className="text-sm font-semibold flex-shrink-0">{product.price}</div>
    </Link>
  );
}
