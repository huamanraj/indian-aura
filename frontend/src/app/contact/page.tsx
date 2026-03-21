import type { Metadata } from "next";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { BRAND, getWhatsAppLink } from "@/lib/constants";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Indian Aura. Reach out via WhatsApp, email, or visit us. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Get in Touch
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-lg">
            We&apos;d love to hear from you! Reach out to us for orders,
            queries, or just to say hello.
          </p>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-12">
        <FadeIn direction="left">
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <p className="text-muted-foreground mt-1">{BRAND.phone}</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground mt-1">{BRAND.email}</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Address</h3>
                <p className="text-muted-foreground mt-1">{BRAND.address}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <div className="bg-card rounded-2xl p-8 sm:p-10 border border-border text-center flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-6">
              <MessageCircle size={36} className="text-[#25D366]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Order Easily on WhatsApp
            </h2>
            <p className="text-muted-foreground max-w-md leading-relaxed mb-8">
              The quickest way to reach us! Message us on WhatsApp for orders,
              custom requests, or any questions about our products.
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#25D366] text-white px-10 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/25 hover:scale-105"
            >
              <MessageCircle size={22} />
              Chat on WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
