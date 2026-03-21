import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Palette, Heart, Target } from "lucide-react";
import { BRAND } from "@/lib/constants";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Indian Aura — a tribute to the vibrant soul of India, preserving traditional craftsmanship with a contemporary touch.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            About Indian Aura
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-lg">
            A tribute to the vibrant soul of India
          </p>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <FadeIn direction="left">
          <div className="relative aspect-[4/3]  rounded-2xl overflow-hidden">
            <Image
              src="/logo.png"
              alt="Indian Aura heritage"
              fill
              className=""
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </FadeIn>
        <FadeIn direction="right" delay={0.2}>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Indian Aura is a tribute to the vibrant soul of India—its rich
              heritage, timeless artistry, and the spiritual warmth that turns a
              house into a home. We believe that every celebration is an
              opportunity to connect with our roots, and every corner of a home
              should radiate a unique, soulful &quot;aura.&quot;
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our journey began with a simple mission: to preserve the elegance
              of traditional Indian craftsmanship and present it with a
              contemporary touch. We specialize in curating exquisite decor that
              brings light, prosperity, and a festive spirit to your modern
              lifestyle.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Our Values */}
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            What Drives Us
          </h2>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          {
            icon: Sparkles,
            title: "Premium Quality",
            desc: "Every piece meets the highest standards of craftsmanship and materials.",
          },
          {
            icon: Palette,
            title: "Traditional Artistry",
            desc: "Preserving centuries-old techniques passed down through generations.",
          },
          {
            icon: Heart,
            title: "Made with Devotion",
            desc: "Each creation carries the love and spiritual dedication of our artisans.",
          },
          {
            icon: Target,
            title: "Modern Elegance",
            desc: "Bridging tradition with contemporary design for today's homes.",
          },
        ].map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1}>
            <div className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Curated Collections */}
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Our Curated Collections
          </h2>
        </div>
      </FadeIn>

      <div className="space-y-8 mb-20">
        {[
          {
            title: "Festive Essentials",
            desc: "From the spiritual glow of Handcrafted Diyas to the welcoming charm of vibrant Torans, our pieces set the perfect stage for celebration.",
          },
          {
            title: "Ceremonial Artistry",
            desc: "Elegant Puja Thalis, beautifully crafted Warmalas, and traditional Decorative Chowkis that add grace to every ritual.",
          },
          {
            title: "Auspicious Decor",
            desc: "Intricate Shubh Labh hangings and a variety of Decorative Items that invite positive energy and timeless beauty into your home.",
          },
        ].map((col, i) => (
          <FadeIn key={col.title} delay={i * 0.15}>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">
                {col.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {col.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Founder */}
      <FadeIn>
        <div className="bg-card rounded-2xl p-8 sm:p-12 border border-border text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">
              {BRAND.founder.charAt(0)}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground">{BRAND.founder}</h3>
          <p className="text-primary font-medium mt-1">Founder</p>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            Driven by a deep love for Indian traditions and a vision to bring
            handcrafted elegance to modern homes, {BRAND.founder} founded Indian
            Aura to celebrate the artistry and spiritual essence of India.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
