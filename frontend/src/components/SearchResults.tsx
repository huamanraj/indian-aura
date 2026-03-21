"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, SearchX } from "lucide-react";
import { Product } from "@/lib/products";
import SearchResultItem from "./SearchResultItem";

interface SearchResultsProps {
  results: Product[];
  isLoading: boolean;
  query: string;
  selectedIndex: number;
  onResultClick: (productId: number) => void;
  onClose: () => void;
}

export default function SearchResults({
  results,
  isLoading,
  query,
  selectedIndex,
  onResultClick,
  onClose,
}: SearchResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Don't render if no query
  if (!query || query.trim().length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-[400px] md:max-h-[500px] overflow-y-auto"
        role="listbox"
        aria-label="Search results"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">
              Searching...
            </span>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <SearchX className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
              No products found
            </p>
            <p className="text-xs text-muted-foreground">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="py-2">
            {results.map((product, index) => (
              <SearchResultItem
                key={product.id}
                product={product}
                isSelected={index === selectedIndex}
                onClick={() => onResultClick(product.id)}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
