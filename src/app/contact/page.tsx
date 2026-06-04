import type { Metadata } from "next";
import { ArrowRight, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact | Salon Marketing Agency",
  description:
    "Contact Salon Marketing Agency for salon SEO, Google Ads, email marketing, Meta Ads, social media marketing, and website design.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow">Contact</span>
            <h1>Send an enquiry and keep the whole journey on this site.</h1>
            <p>
              Tell us what your salon, clinic, spa, or wellness brand needs. Your enquiry goes
              straight through for review and you will land on a thank-you page once it is sent.
            </p>
          </div>
          <div className="contact-points">
            <p>
              <MessageCircle aria-hidden="true" size={20} />
              Clear next-step recommendations
            </p>
            <p>
              <Clock aria-hidden="true" size={20} />
              Typical reply within 1 business day
            </p>
            <p>
              <ShieldCheck aria-hidden="true" size={20} />
              No off-site redirect after submission
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container form-section form-section--wide">
          <div>
            <span className="section-kicker">Enquiry form</span>
            <h2>What would you like your marketing to do better?</h2>
            <p>
              Add a little detail about your business, current marketing, and the kind of support
              you are interested in.
            </p>
            <a className="inline-link" href="#contact-form">
              Go to form
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
          <div className="form-panel" id="contact-form">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
