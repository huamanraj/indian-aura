"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import type { Product } from "@/lib/products";

type SortOption = "popular" | "price-low" | "price-high";

export default function ProductsClient({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sort, setSort] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from products
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // Calculate max price from products
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 10000;
    return Math.ceil(Math.max(...products.map(p => p.priceValue)) / 100) * 100;
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.priceValue >= priceRange[0] && p.priceValue <= priceRange[1]
    );

    if (sort === "price-low") result.sort((a, b) => a.priceValue - b.priceValue);
    else if (sort === "price-high")
      result.sort((a, b) => b.priceValue - a.priceValue);
    else result.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));

    return result;
  }, [products, search, selectedCategory, priceRange, sort]);

  return (
    <div>
      {/* Search Bar */}
      <FadeIn>
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </FadeIn>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`w-64 shrink-0 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          <FadeIn direction="left">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  Filters
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Category
                    </label>
                    <div className="space-y-2">
                      {["All", ...categories].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === cat
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Price Range
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([0, Number(e.target.value)])
                        }
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹0</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Sort By
                    </label>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortOption)}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </aside>

        {/* Mobile filter toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 shadow-lg"
          >
            <SlidersHorizontal size={18} />
            {showFilters ? "Hide" : "Filters"}
          </button>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <FadeIn>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filtered.length} product{filtered.length !== 1 && "s"}
            </p>
          </FadeIn>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <FadeIn key={product.id} delay={i * 0.05}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setPriceRange([0, maxPrice]);
                }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
