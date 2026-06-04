import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { navItems } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Salon Marketing Agency home">
          <Image src="/logo.svg" alt="Salon Marketing Agency" width={190} height={75} priority />
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button--primary site-header__cta" href="/contact">
          Enquire
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </header>
  );
}
