import { create } from "zustand";
import { WHATSAPP_NUMBER } from "@/lib/constants";

interface WhatsAppState {
  number: string;
  setNumber: (number: string) => void;
  getMessage: (productName?: string) => string;
  getLink: (productName?: string) => string;
}

export const useWhatsAppStore = create<WhatsAppState>((set, get) => ({
  number: WHATSAPP_NUMBER,
  setNumber: (number) => set({ number }),
  getMessage: (productName) =>
    productName
      ? `Hi! I want to order *${productName}* from Indian Aura.`
      : "Hi! I'd like to know more about Indian Aura products.",
  getLink: (productName) => {
    const { number } = get();
    const message = get().getMessage(productName);
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  },
}));
