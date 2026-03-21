export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  priceValue: number;
  category: string;
  description: string;
  trending: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Handcrafted Diya",
    image: "/image1.jpeg",
    price: "₹499",
    priceValue: 499,
    category: "Festive Essentials",
    description:
      "Beautifully handcrafted brass diya with intricate traditional patterns. Perfect for daily puja and festive celebrations. Each piece is carefully made by skilled artisans.",
    trending: true,
  },
  {
    id: 2,
    name: "Decorative Toran",
    image: "/image2.jpeg",
    price: "₹899",
    priceValue: 899,
    category: "Festive Essentials",
    description:
      "Vibrant handcrafted toran door hanging adorned with beads, mirrors, and traditional motifs. Welcomes prosperity and positive energy into your home.",
    trending: true,
  },
  {
    id: 3,
    name: "Elegant Puja Thali",
    image: "/image3.jpeg",
    price: "₹1,299",
    priceValue: 1299,
    category: "Ceremonial Artistry",
    description:
      "Exquisite brass puja thali with engraved traditional designs. Includes kumkum and chandan holders. Elevates every spiritual ritual with grace.",
    trending: true,
  },
  {
    id: 4,
    name: "Shubh Labh Hanging",
    image: "/image1.jpeg",
    price: "₹349",
    priceValue: 349,
    category: "Auspicious Decor",
    description:
      "Traditional Shubh Labh wall hanging crafted with vibrant colors and auspicious symbols. Invites prosperity and positive energy into your living space.",
    trending: true,
  },
  {
    id: 5,
    name: "Traditional Warmala",
    image: "/image2.jpeg",
    price: "₹599",
    priceValue: 599,
    category: "Ceremonial Artistry",
    description:
      "Elegant traditional warmala garland made with fresh flowers and decorative elements. Perfect for wedding ceremonies and festive occasions.",
    trending: false,
  },
  {
    id: 6,
    name: "Decorative Chowki",
    image: "/image3.jpeg",
    price: "₹1,899",
    priceValue: 1899,
    category: "Ceremonial Artistry",
    description:
      "Handcrafted wooden chowki with intricate carvings and traditional paint work. Ideal for placing deities and performing rituals with devotion.",
    trending: false,
  },
  {
    id: 7,
    name: "Brass Aarti Stand",
    image: "/image1.jpeg",
    price: "₹749",
    priceValue: 749,
    category: "Ceremonial Artistry",
    description:
      "Premium brass aarti stand with elegant design. Perfect for performing aarti during daily prayers and special ceremonies.",
    trending: false,
  },
  {
    id: 8,
    name: "Festive Rangoli Set",
    image: "/image2.jpeg",
    price: "₹299",
    priceValue: 299,
    category: "Festive Essentials",
    description:
      "Vibrant rangoli stencils with colorful powders. Create beautiful traditional designs at your doorstep for festivals and celebrations.",
    trending: false,
  },
  {
    id: 9,
    name: "Incense Holder",
    image: "/image3.jpeg",
    price: "₹199",
    priceValue: 199,
    category: "Auspicious Decor",
    description:
      "Elegant handcrafted incense holder with traditional motifs. Fills your home with divine fragrance and peaceful ambiance.",
    trending: false,
  },
  {
    id: 10,
    name: "Decorative Bell",
    image: "/image1.jpeg",
    price: "₹649",
    priceValue: 649,
    category: "Auspicious Decor",
    description:
      "Beautiful brass temple bell with intricate engravings. Produces a resonant sound that purifies the atmosphere during prayers.",
    trending: false,
  },
  {
    id: 11,
    name: "Marigold Garland",
    image: "/image2.jpeg",
    price: "₹149",
    priceValue: 149,
    category: "Festive Essentials",
    description:
      "Fresh and vibrant marigold garland for decorating homes and temples. A symbol of auspiciousness in Indian traditions.",
    trending: false,
  },
  {
    id: 12,
    name: "Ceremonial Kalash",
    image: "/image3.jpeg",
    price: "₹899",
    priceValue: 899,
    category: "Ceremonial Artistry",
    description:
      "Traditional brass kalash pot with coconut and mango leaves. Symbolizes abundance and is essential for all auspicious ceremonies.",
    trending: false,
  },
];

export const categories = [
  "Festive Essentials",
  "Ceremonial Artistry",
  "Auspicious Decor",
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getTrendingProducts(): Product[] {
  return products.filter((p) => p.trending);
}
