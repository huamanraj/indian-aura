"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { debounce } from "@/lib/utils";
import SearchResults from "./SearchResults";
import type { Product } from "@/lib/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface SearchBarProps {
  className?: string;
  onResultClick?: (productId: string) => void;
}

export default function SearchBar({ className = "", onResultClick }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showLoading, setShowLoading] = useState(false);
  const [ariaMessage, setAriaMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  // Transform backend product to frontend format
  const transformProduct = (p: any): Product => ({
    id: p._id,
    name: p.name,
    image: p.images?.[0]?.url || '/image1.jpeg',
    price: `₹${p.price?.toLocaleString() || p.price}`,
    priceValue: p.price,
    category: p.category,
    description: p.description,
    trending: false,
  });

  // Debounced search function using API
  const performSearch = useCallback(
    debounce(async (query: string) => {
      if (!query || query.trim().length === 0) {
        setSearchResults([]);
        setIsSearching(false);
        setShowLoading(false);
        setIsSearchOpen(false);
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
        return;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setIsSearching(true);
      setAriaMessage("Searching...");

      // Show loading state only after 300ms delay
      loadingTimeoutRef.current = setTimeout(() => {
        setShowLoading(true);
      }, 300);

      try {
        const response = await fetch(
          `${API_URL}/products/search?q=${encodeURIComponent(query)}`,
          { signal: abortControllerRef.current.signal }
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();
        const results = (data.results || []).map(transformProduct);

        setSearchResults(results);
        setIsSearchOpen(true);
        setSelectedIndex(-1);

        // Announce results to screen readers
        if (results.length === 0) {
          setAriaMessage("No products found");
        } else if (results.length === 1) {
          setAriaMessage("1 product found");
        } else {
          setAriaMessage(`${results.length} products found`);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Search error:', error);
          setSearchResults([]);
        }
      } finally {
        setIsSearching(false);
        setShowLoading(false);
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      }
    }, 300),
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };

  // Handle result click
  const handleResultClick = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedIndex(-1);

    if (onResultClick) {
      onResultClick(productId);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchOpen || searchResults.length === 0) {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;

      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          const selectedProduct = searchResults[selectedIndex];
          const selectedProductId = String(selectedProduct.id);
          handleResultClick(selectedProductId);
          router.push(`/products/${selectedProductId}`);
        }
        break;
    }
  };

  // Close dropdown handler
  const handleClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          role="searchbox"
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isSearchOpen}
        />
      </div>

      {/* ARIA live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {ariaMessage}
      </div>

      {isSearchOpen && (
        <SearchResults
          results={searchResults}
          isLoading={showLoading}
          query={searchQuery}
          selectedIndex={selectedIndex}
          onResultClick={handleResultClick}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
