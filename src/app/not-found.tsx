import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="thank-you">
      <div className="container thank-you__content">
        <span className="eyebrow">Page not found</span>
        <h1>This page is not available.</h1>
        <p>Head back to the homepage or send an enquiry if you need help with salon marketing.</p>
        <Link className="button button--primary" href="/">
          Back to home
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </section>
  );
}
