export const siteConfig = {
  name: "Salon Marketing Agency",
  url: "https://salonmarketingagency.com",
  description:
    "A conversion-focused marketing agency for salons, beauty clinics, spas, and wellness brands that want better leads, bookings, and repeat clients."
};

export const heroImage =
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1800&q=80";

export const salonImages = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80"
];

export type ServiceSlug =
  | "seo"
  | "google-ads"
  | "email-marketing"
  | "website-design"
  | "meta-ads"
  | "social-media-marketing";

export type ServicePage = {
  slug: ServiceSlug;
  eyebrow: string;
  navLabel: string;
  title: string;
  metaTitle: string;
  description: string;
  image: string;
  highlights: string[];
  results: string[];
  process: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const servicePages: Record<ServiceSlug, ServicePage> = {
  seo: {
    slug: "seo",
    eyebrow: "Local SEO",
    navLabel: "SEO",
    title: "SEO for salons that want to be found before competitors",
    metaTitle: "SEO for Salons | Salon Marketing Agency",
    description:
      "Grow visibility in Google Maps, organic search, and local service searches with a practical SEO system built around salon bookings.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Google Business Profile tuning for salon services, suburbs, and treatment keywords",
      "Location and service-page structure for hair, beauty, spa, cosmetic, and wellness searches",
      "Review, citation, and content planning that strengthens local authority"
    ],
    results: [
      "More discovery searches from people already looking for a salon",
      "Clearer service pages that turn traffic into booking enquiries",
      "Better local trust signals across Google and the wider web"
    ],
    process: [
      "Audit current rankings, Google Business Profile, content, backlinks, and conversion gaps",
      "Build an SEO roadmap around the highest-intent services and suburbs",
      "Improve technical foundations, page copy, local signals, and monthly reporting"
    ],
    faq: [
      {
        question: "Do salons still need SEO if they run ads?",
        answer:
          "Yes. Ads can generate demand quickly, while SEO builds compounding visibility for local searches and reduces reliance on paid traffic over time."
      },
      {
        question: "Can SEO help single-location salons?",
        answer:
          "Absolutely. A focused local SEO strategy is often strongest for single-location salons because every signal can point to one clear service area."
      }
    ]
  },
  "google-ads": {
    slug: "google-ads",
    eyebrow: "Google Ads",
    navLabel: "Google Ads",
    title: "Google Ads for salons ready to turn searches into bookings",
    metaTitle: "Google Ads for Salons | Salon Marketing Agency",
    description:
      "Launch search campaigns that capture high-intent clients looking for hair, beauty, spa, cosmetic, and wellness services right now.",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Campaigns grouped by service type, margin, urgency, and location intent",
      "Landing-page recommendations that reduce wasted spend and raise enquiry quality",
      "Conversion tracking for calls, forms, bookings, and key website actions"
    ],
    results: [
      "Cleaner budget allocation toward services that are profitable",
      "Better visibility for clients actively searching for a provider",
      "More useful reporting than clicks and impressions alone"
    ],
    process: [
      "Map the services worth advertising and the suburbs worth targeting",
      "Build keyword, ad, extension, and landing-page structure",
      "Optimise weekly around search terms, cost per lead, and booking quality"
    ],
    faq: [
      {
        question: "Can a salon start with a small Google Ads budget?",
        answer:
          "Yes, but the budget needs to match the local competition and service value. We prioritise high-intent campaigns first so spend has a clearer job."
      },
      {
        question: "Will you track enquiries?",
        answer:
          "Yes. Tracking is part of the setup so decisions are based on real enquiry and booking actions, not surface metrics."
      }
    ]
  },
  "email-marketing": {
    slug: "email-marketing",
    eyebrow: "Email Marketing",
    navLabel: "Email",
    title: "Email marketing that keeps salon clients returning",
    metaTitle: "Email Marketing for Salons | Salon Marketing Agency",
    description:
      "Create welcome, rebooking, win-back, seasonal, and promotion campaigns that help salons grow repeat revenue without sounding generic.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Automations for new clients, lapsed clients, birthdays, treatment cycles, and seasonal offers",
      "Campaign calendars that support promotions without training clients to wait for discounts",
      "Segmentation for hair, beauty, spa, cosmetic, and wellness service groups"
    ],
    results: [
      "More repeat visits from clients already familiar with the salon",
      "Better launches for new treatments, packages, and product offers",
      "A marketing channel the salon owns rather than renting attention"
    ],
    process: [
      "Review current list health, booking patterns, and salon offers",
      "Build automations and monthly campaigns around client behaviour",
      "Track revenue, enquiry replies, click quality, and booking movement"
    ],
    faq: [
      {
        question: "Can email marketing work for a small salon list?",
        answer:
          "Yes. A smaller list can still perform well when it is made of real clients and the message is timed around practical booking behaviour."
      },
      {
        question: "Do you write the emails?",
        answer:
          "Yes. The strategy, copy, structure, and campaign flow can be handled for you, with salon-specific tone and offers."
      }
    ]
  },
  "website-design": {
    slug: "website-design",
    eyebrow: "Website Design",
    navLabel: "Websites",
    title: "Salon website design built to turn attention into appointments",
    metaTitle: "Salon Website Design | Salon Marketing Agency",
    description:
      "Design a polished salon website with strong service pages, clear enquiry paths, fast loading, and a premium first impression.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Service-led structure for treatments, locations, prices, offers, and booking actions",
      "Mobile-first layouts that make it easy to enquire from search, ads, or social",
      "Technical foundations for SEO, analytics, speed, and conversion tracking"
    ],
    results: [
      "A more premium first impression for new clients comparing salons",
      "Clearer paths from service interest to enquiry or booking",
      "A stronger base for Google Ads, SEO, and social campaigns"
    ],
    process: [
      "Plan the pages and conversion paths based on salon services and target clients",
      "Design the interface, copy flow, trust signals, and form strategy",
      "Build, test, launch, and connect tracking so marketing has a solid base"
    ],
    faq: [
      {
        question: "Can you redesign an existing salon website?",
        answer:
          "Yes. We can improve the current site or rebuild it when the structure, performance, or user journey is holding the business back."
      },
      {
        question: "Will the website support future marketing campaigns?",
        answer:
          "Yes. The pages are planned so SEO, ads, email, and social traffic have relevant places to land."
      }
    ]
  },
  "meta-ads": {
    slug: "meta-ads",
    eyebrow: "Meta Ads",
    navLabel: "Meta Ads",
    title: "Meta Ads for salons, clinics, and beauty brands",
    metaTitle: "Meta Ads for Salons | Salon Marketing Agency",
    description:
      "Run Facebook and Instagram campaigns that introduce services, build trust, and retarget warm prospects with sharper booking intent.",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Creative testing for treatments, transformations, packages, offers, and local proof",
      "Audience strategy across cold, warm, and retargeting campaigns",
      "Landing-page and enquiry flow alignment so social traffic has a clear next step"
    ],
    results: [
      "A stronger pipeline of new prospects for signature services",
      "Retargeting that keeps the salon visible while prospects decide",
      "More disciplined testing of creative, audience, and offer angles"
    ],
    process: [
      "Identify offers, services, visuals, and audiences worth testing",
      "Build campaign structure, tracking, creative briefs, and landing paths",
      "Optimise around enquiry quality, creative fatigue, and cost per result"
    ],
    faq: [
      {
        question: "Are Meta Ads the same as boosting posts?",
        answer:
          "No. Boosting is limited. A structured Meta Ads account gives better control over audiences, placements, creative tests, and retargeting."
      },
      {
        question: "Do salon visuals matter for Meta Ads?",
        answer:
          "Yes. The creative usually carries the campaign. Strong before-and-after, treatment, team, and trust-building assets can make a major difference."
      }
    ]
  },
  "social-media-marketing": {
    slug: "social-media-marketing",
    eyebrow: "Social Media",
    navLabel: "Social",
    title: "Social media marketing that makes salons easier to choose",
    metaTitle: "Social Media Marketing for Salons | Salon Marketing Agency",
    description:
      "Build a more consistent salon presence across Facebook, Instagram, and social channels with content that supports trust, enquiries, and client loyalty.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Content pillars for services, proof, team culture, education, offers, and client care",
      "Caption and campaign planning that works with real salon operations",
      "Social profile polish so visitors quickly understand services and next steps"
    ],
    results: [
      "A sharper social presence for clients checking the salon before booking",
      "More consistent content without last-minute posting pressure",
      "Better alignment between organic social, paid ads, website, and email"
    ],
    process: [
      "Clarify the salon's services, voice, clients, proof points, and content capacity",
      "Build a practical content rhythm and campaign calendar",
      "Review performance and refine themes, hooks, and calls to action"
    ],
    faq: [
      {
        question: "Can social media bring in real salon enquiries?",
        answer:
          "Yes, especially when organic content, retargeting, and website enquiry paths support each other instead of operating separately."
      },
      {
        question: "Do you need salon staff to film content?",
        answer:
          "Some authentic content helps, but the plan can be built around what the salon can realistically capture each week."
      }
    ]
  }
};

export const serviceList = Object.values(servicePages);

export const navItems = [
  { label: "Home", href: "/" },
  ...serviceList.map((service) => ({
    label: service.navLabel,
    href: `/${service.slug}`
  })),
  { label: "Contact", href: "/contact" }
];
