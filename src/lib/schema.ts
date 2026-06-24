/* JSON-LD schema helpers for nuvel.studio structured data. */

const BASE = "https://nuvel.studio";
export const ORG_ID = `${BASE}/#organization`;

const org = {
  "@type": "Organization",
  "@id": ORG_ID,
  "name": "Nuvel",
  "url": BASE,
  "logo": { "@type": "ImageObject", "url": `${BASE}/og.png` },
  "description": "A design & build studio shipping whole websites and platforms in one to two weeks.",
};

export const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    org,
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      "url": BASE,
      "name": "Nuvel",
      "publisher": { "@id": ORG_ID },
    },
  ],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE}${item.path}`,
    })),
  };
}

export function postSchemaGraph(post: {
  slug: string;
  title: string;
  date: string;
  seoDesc: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${BASE}/post/${post.slug}/#article`,
        "headline": post.title,
        "description": post.seoDesc,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": { "@id": ORG_ID },
        "publisher": { "@id": ORG_ID },
        "mainEntityOfPage": { "@id": `${BASE}/post/${post.slug}` },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE}/post/${post.slug}` },
        ],
      },
    ],
  };
}

export function svcSchemaGraph(svc: {
  key: string;
  title: string;
  detail: { intro: string; faq: { q: string; a: string }[] };
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${BASE}/service/${svc.key}/#service`,
        "name": svc.title,
        "description": svc.detail.intro,
        "provider": { "@id": ORG_ID },
        "url": `${BASE}/service/${svc.key}`,
      },
      {
        "@type": "FAQPage",
        "mainEntity": svc.detail.faq.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
          { "@type": "ListItem", "position": 3, "name": svc.title, "item": `${BASE}/service/${svc.key}` },
        ],
      },
    ],
  };
}
