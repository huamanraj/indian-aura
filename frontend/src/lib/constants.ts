export const WHATSAPP_NUMBER = "918459492209";

export function getWhatsAppLink(productName?: string): string {
  const message = productName
    ? `Hi! I want to order *${productName}* from Indian Aura.`
    : "Hi! I'd like to know more about Indian Aura products.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const BRAND = {
  name: "Indian Aura",
  tagline: "Handcrafted Indian Artistry",
  description:
    "Indian Aura is a tribute to the vibrant soul of India—its rich heritage, timeless artistry, and the spiritual warmth that turns a house into a home.",
  email: "indianaura9@gmail.com",
  phone: "8459492209",
  address:
    "SR NO.78/2 Patil Nagar Chawl, Gauraipada Santosh Bhavan, Nityanand Hall nearby, Nallasopara East, District Palghar, State Maharashtra - 401209",
  founder: "Amit Soni",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
