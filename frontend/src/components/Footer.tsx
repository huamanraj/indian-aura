import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Indian Aura"
                width={36}
                height={36}
                className="rounded-lg invert"
              />
              <span className="text-lg font-bold">Indian Aura</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {BRAND.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-accent">Contact</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <span className="font-medium text-background">Email:</span>{" "}
                {BRAND.email}
              </li>
              <li>
                <span className="font-medium text-background">Phone:</span>{" "}
                {BRAND.phone}
              </li>
              <li>
                <span className="font-medium text-background">Founder:</span>{" "}
                {BRAND.founder}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm text-background/50">
          &copy; {new Date().getFullYear()} Indian Aura. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
