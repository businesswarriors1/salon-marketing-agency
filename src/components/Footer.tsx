import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image src="/logo.svg" alt="Salon Marketing Agency" width={245} height={57} />
          <p>
            Marketing systems for salons, beauty clinics, spas, and wellness brands that need more
            qualified enquiries and stronger repeat bookings.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Salon Marketing Agency. All rights reserved.</span>
        <span>
          Website built by Business Warriors{" "}
          <a href="https://businesswarriors.global/" target="_blank" rel="noreferrer">
            Digital Marketing Agency
            <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </span>
      </div>
    </footer>
  );
}
