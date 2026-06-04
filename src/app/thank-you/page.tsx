import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Salon Marketing Agency",
  description: "Thank you for contacting Salon Marketing Agency.",
  alternates: {
    canonical: "/thank-you"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function ThankYouPage() {
  return (
    <section className="thank-you">
      <div className="container thank-you__content">
        <CheckCircle2 aria-hidden="true" size={54} />
        <span className="eyebrow">Enquiry sent</span>
        <h1>Thank you. Your salon marketing enquiry has been received.</h1>
        <p>
          You are still on the Salon Marketing Agency website. The team will review your message and
          come back with the most useful next step.
        </p>
        <Link className="button button--primary" href="/">
          Back to home
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </section>
  );
}
