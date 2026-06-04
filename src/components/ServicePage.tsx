import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { servicePages, siteConfig, type ServiceSlug } from "@/lib/site";

export function generateServiceMetadata(slug: ServiceSlug): Metadata {
  const service = servicePages[slug];

  return {
    title: service.metaTitle,
    description: service.description,
    alternates: {
      canonical: `/${service.slug}`
    },
    openGraph: {
      title: service.metaTitle,
      description: service.description,
      url: `${siteConfig.url}/${service.slug}`,
      siteName: siteConfig.name,
      type: "website"
    }
  };
}

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = servicePages[slug];

  if (!service) {
    notFound();
  }

  const heroStyle = {
    "--service-hero-image": `url(${service.image})`
  } as CSSProperties;

  return (
    <>
      <section className="service-hero" style={heroStyle}>
        <div className="container service-hero__content">
          <span className="eyebrow">{service.eyebrow}</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="hero-actions">
            <Link className="button button--primary" href="/contact">
              Get a plan
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="button button--ghost" href="#enquire">
              Enquire online
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container split-layout">
          <div>
            <span className="section-kicker">What this fixes</span>
            <h2>Built for beauty businesses that need sharper demand, not louder noise.</h2>
          </div>
          <div className="feature-list">
            {service.highlights.map((item) => (
              <div className="feature-item" key={item}>
                <CheckCircle2 aria-hidden="true" size={22} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container three-column">
          {service.results.map((result) => (
            <article className="mini-card" key={result}>
              <Sparkles aria-hidden="true" size={22} />
              <h3>{result}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container process-grid">
          <div>
            <span className="section-kicker">How it works</span>
            <h2>A practical plan, then steady optimisation.</h2>
            <p>
              Every campaign is shaped around the services you want to grow, the type of client you
              want more of, and the numbers that show whether marketing is actually working.
            </p>
          </div>
          <ol className="process-list">
            {service.process.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container faq-grid">
          <div>
            <span className="section-kicker">Questions</span>
            <h2>Useful answers before you enquire.</h2>
          </div>
          <div className="faq-list">
            {service.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="enquire">
        <div className="container form-section">
          <div>
            <span className="section-kicker">Start here</span>
            <h2>Tell us what you want your salon marketing to do next.</h2>
            <p>
              Send a short enquiry and the team will review your current marketing, service focus,
              and best next steps.
            </p>
          </div>
          <div className="form-panel">
            <EnquiryForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
