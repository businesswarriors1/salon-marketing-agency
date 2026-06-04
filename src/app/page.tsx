import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, CalendarCheck, CheckCircle2, MousePointerClick, Sparkles } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { heroImage, salonImages, serviceList, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Salon Marketing Agency | Salon SEO, Ads, Websites and Email",
  description:
    "Cleaner, conversion-focused salon marketing for beauty businesses that want better leads, more bookings, and a more professional digital presence.",
  alternates: {
    canonical: "/"
  }
};

const heroStyle = {
  "--hero-image": `url(${heroImage})`
} as CSSProperties;

export default function Home() {
  return (
    <>
      <section className="hero" style={heroStyle}>
        <div className="container hero__content">
          <span className="eyebrow">Beauty and wellness growth specialists</span>
          <h1>Salon Marketing Agency</h1>
          <p>
            A cleaner, sharper marketing partner for salons, spas, beauty clinics, and wellness
            brands that want more qualified enquiries and a stronger booking pipeline.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" href="/contact">
              Start an enquiry
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="button button--ghost" href="/website-design">
              View services
            </Link>
          </div>
          <div className="hero-metrics" aria-label="Marketing focus points">
            <span>
              <strong>SEO</strong>
              Local search visibility
            </span>
            <span>
              <strong>Ads</strong>
              Lead-focused campaigns
            </span>
            <span>
              <strong>Websites</strong>
              Better enquiry paths
            </span>
          </div>
        </div>
      </section>

      <section className="section intro-strip">
        <div className="container intro-strip__grid">
          <div>
            <span className="section-kicker">Built for salons</span>
            <h2>Marketing that respects the way beauty businesses actually grow.</h2>
          </div>
          <p>
            The best salon marketing is not just louder content or more clicks. It is a joined-up
            system: search visibility, service pages, paid campaigns, email follow-up, and social
            proof all pulling people toward the right next step.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <span className="section-kicker">Services</span>
          <h2>Focused pages and campaigns for the channels that move bookings.</h2>
        </div>
        <div className="container services-grid">
          {serviceList.map((service) => (
            <Link className="service-card" key={service.slug} href={`/${service.slug}`}>
              <span>{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <strong>
                Learn more
                <ArrowRight aria-hidden="true" size={17} />
              </strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container proof-grid">
          <article>
            <BarChart3 aria-hidden="true" size={28} />
            <h3>Measure the right numbers</h3>
            <p>Track enquiries, calls, booking intent, campaign spend, and service performance.</p>
          </article>
          <article>
            <MousePointerClick aria-hidden="true" size={28} />
            <h3>Improve the path to enquiry</h3>
            <p>Give visitors clear service information, trust signals, and simple next steps.</p>
          </article>
          <article>
            <CalendarCheck aria-hidden="true" size={28} />
            <h3>Support repeat bookings</h3>
            <p>Use email, retargeting, and smart offers to keep existing clients returning.</p>
          </article>
        </div>
      </section>

      <section className="section visual-section">
        <div className="container visual-grid">
          <div className="image-stack" aria-label="Salon marketing imagery">
            <Image
              src={salonImages[0]}
              alt="Salon client consultation"
              width={640}
              height={760}
              sizes="(max-width: 900px) 100vw, 46vw"
            />
            <Image
              src={salonImages[1]}
              alt="Modern beauty salon workspace"
              width={520}
              height={620}
              sizes="(max-width: 900px) 72vw, 28vw"
            />
          </div>
          <div>
            <span className="section-kicker">Why it jumps out</span>
            <h2>Professional enough for premium salons. Direct enough for real sales.</h2>
            <div className="check-list">
              {[
                "Lighter visual design that feels polished, not heavy",
                "SEO-ready pages for each core marketing service",
                "Clear calls to action without sending visitors away",
                "Enquiry flow designed for fast follow-up"
              ].map((item) => (
                <p key={item}>
                  <CheckCircle2 aria-hidden="true" size={20} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--plum">
        <div className="container cta-band">
          <div>
            <Sparkles aria-hidden="true" size={26} />
            <h2>Ready to make the site work harder for salon enquiries?</h2>
            <p>
              Start with the channel you need most, or send one enquiry and ask for the simplest
              growth plan.
            </p>
          </div>
          <Link className="button button--light" href="/contact">
            Contact the team
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section className="section" id="enquire">
        <div className="container form-section">
          <div>
            <span className="section-kicker">Online enquiry</span>
            <h2>Tell {siteConfig.name} what you want to improve.</h2>
            <p>
              Share the basics and the team will review the best next step for SEO, ads, social,
              email, website design, or a complete growth plan.
            </p>
          </div>
          <div className="form-panel">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
