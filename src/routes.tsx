/* NUVEL — React Router v6 routes for vite-react-ssg. */
import type { FC } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { Head } from "vite-react-ssg";
import { globalSchema, breadcrumbSchema, postSchemaGraph, svcSchemaGraph } from "./lib/schema";
import { Layout } from "./Layout";
import { Home } from "./views/Home";
import { Work, CaseDetail } from "./views/Work";
import { Services } from "./views/Services";
import { ServiceDetail } from "./views/ServiceDetail";
import { Blog, PostDetail } from "./views/Blog";
import { Process } from "./views/Process";
import { Contact } from "./views/Contact";
import { CASES, SERVICES } from "./data";
import { POSTS } from "./blog";
import type { Go } from "./router";

const BASE = "https://nuvel.studio";

/* ── thin wrappers: inject go from outlet context, no view changes needed ── */
function W({ C, title, desc, path }: { C: FC<{ go: Go }>; title: string; desc: string; path: string }) {
  const go = useOutletContext<Go>();
  const isHome = path === "/";
  const schema = isHome
    ? globalSchema
    : breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: path.slice(1).charAt(0).toUpperCase() + path.slice(2), path },
      ]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${BASE}${path}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${BASE}${path}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <C go={go} />
    </>
  );
}

function CasePage() {
  const go = useOutletContext<Go>();
  const { id } = useParams<{ id: string }>();
  const c = CASES.find((x) => x.id === id);
  const title = c ? `${c.title} — Nuvel` : "Case study — Nuvel";
  const desc = c?.tldr ?? "A Nuvel case study — the challenge, the approach and the result.";
  const schema = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: c?.title ?? "Case study", path: `/case/${id ?? ""}` },
  ]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${BASE}/case/${id}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <CaseDetail go={go} id={id ?? null} />
    </>
  );
}

function ServicePage() {
  const go = useOutletContext<Go>();
  const { id } = useParams<{ id: string }>();
  const s = SERVICES.find((x) => x.key === id);
  const title = s?.detail.seoTitle ?? "Services — Nuvel";
  const desc = s?.detail.seoDesc ?? "A Nuvel service — designed, built and shipped fast.";
  const schema = s ? svcSchemaGraph(s) : null;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${BASE}/service/${id}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      </Head>
      <ServiceDetail go={go} id={id ?? null} />
    </>
  );
}

function PostPage() {
  const go = useOutletContext<Go>();
  const { id } = useParams<{ id: string }>();
  const post = POSTS.find((x) => x.slug === id);
  const title = post?.seoTitle ?? "Journal — Nuvel";
  const desc = post?.seoDesc ?? "An article from Nuvel — a design & build studio.";
  const schema = post ? postSchemaGraph(post) : null;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${BASE}/post/${id}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      </Head>
      <PostDetail go={go} id={id ?? null} />
    </>
  );
}

/* ── route tree ── */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <W
            C={Home}
            path="/"
            title="Nuvel — design & build studio for fast websites & apps"
            desc="A design & build studio. Fast, fearless websites — and the platforms behind them — designed, built and shipped in one to two weeks."
          />
        ),
      },
      {
        path: "work",
        element: (
          <W
            C={Work}
            path="/work"
            title="Selected work — websites & platforms · Nuvel studio"
            desc="Selected websites and platforms — brand to checkout, marketplace to launchpad. Most shipped end-to-end in one to two weeks."
          />
        ),
      },
      {
        path: "case/:id",
        element: <CasePage />,
        getStaticPaths: () => CASES.map((c) => `case/${c.id}`),
      },
      {
        path: "services",
        element: (
          <W
            C={Services}
            path="/services"
            title="Services — websites, platforms, brand & systems · Nuvel"
            desc="Websites, platforms & CRM, brand and design systems — designed, built and shipped fast by one tight, opinionated studio."
          />
        ),
      },
      {
        path: "service/:id",
        element: <ServicePage />,
        getStaticPaths: () => SERVICES.map((s) => `service/${s.key}`),
      },
      {
        path: "process",
        element: (
          <W
            C={Process}
            path="/process"
            title="Our process — from brief to launched in two weeks · Nuvel"
            desc="A tight four-step rhythm — Spark, Shape, Build, Launch — taking your project from brief to launched in about two weeks."
          />
        ),
      },
      {
        path: "blog",
        element: (
          <W
            C={Blog}
            path="/blog"
            title="Journal — web design, fast websites & AI · Nuvel"
            desc="Ideas on web design, fast websites, design systems and how AI is changing the way great products get built — from a studio that ships in two weeks."
          />
        ),
      },
      {
        path: "post/:id",
        element: <PostPage />,
        getStaticPaths: () => POSTS.map((p) => `post/${p.slug}`),
      },
      {
        path: "contact",
        element: (
          <W
            C={Contact}
            path="/contact"
            title="Start a project — work with the Nuvel design studio"
            desc="Tell us what you're building — a website, a platform or a full product. We reply within one business day."
          />
        ),
      },
    ],
  },
];
