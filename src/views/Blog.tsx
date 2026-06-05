/* NUVEL — Blog list + post detail. */
import { useReveal } from "../components/useReveal";
import { CtaBand } from "../components/ui";
import { Ic } from "../components/icons";
import { POSTS } from "../blog";
import type { Go } from "../router";

function fmtDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function Blog({ go }: { go: Go }) {
  useReveal([]);
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div className="view view-enter">
      <section className="section page-head-sec">
        <div className="wrap">
          <span className="eyebrow">Journal</span>
          <h1 className="display page-h1">
            Notes on design,
            <br />
            speed &amp; <span className="serif">AI.</span>
          </h1>
          <p className="lede" style={{ maxWidth: "54ch", marginTop: "1.6rem" }}>
            Ideas on web design, fast websites, design systems and how AI is changing the way great products get built — from the studio that ships in two weeks.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="blog-grid">
            {posts.map((p) => (
              <button className="blog-card liquid-glass hover-pop reveal" key={p.slug} onClick={() => go("post", p.slug)}>
                <div className="blog-card-meta">
                  <span>{fmtDate(p.date)}</span>
                  <span className="blog-dot">·</span>
                  <span>{p.read}</span>
                </div>
                <h2 className="blog-card-title">{p.title}</h2>
                <p className="muted blog-card-ex">{p.excerpt}</p>
                <div className="blog-card-foot">
                  <div className="blog-tags">
                    {p.tags.map((t) => (
                      <span className="blog-tag" key={t}>{t}</span>
                    ))}
                  </div>
                  <span className="blog-card-arrow">{Ic.arrowUpRight()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        go={go}
        eyebrow="Like how we think?"
        title={
          <>
            Let's design &amp; build your <span className="serif">website.</span>
          </>
        }
        sub="A design & build studio shipping fast, SEO-ready websites and platforms in one to two weeks."
        primaryLabel="Start a project"
        secondaryLabel="See our work"
        secondaryTo="work"
      />
    </div>
  );
}

export function PostDetail({ id, go }: { id: string | null; go: Go }) {
  useReveal([id]);
  const post = POSTS.find((p) => p.slug === id);
  if (!post) {
    return (
      <div className="view view-enter">
        <section className="section page-head-sec">
          <div className="wrap">
            <span className="eyebrow">Journal</span>
            <h1 className="display page-h1">Post not found.</h1>
            <button className="svc-explore" onClick={() => go("blog")} style={{ marginTop: "1.4rem" }}>
              Back to the journal <span className="svc-explore-arrow">{Ic.arrowUpRight()}</span>
            </button>
          </div>
        </section>
      </div>
    );
  }
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <div className="view view-enter post-view">
      <article>
        <section className="section page-head-sec post-hero">
          <div className="wrap">
            <button className="post-back" onClick={() => go("blog")}>
              {Ic.arrow({ style: { width: "1rem", height: "1rem", transform: "rotate(180deg)" } })} Journal
            </button>
            <div className="post-head">
              <div className="blog-tags post-tags">
                {post.tags.map((t) => (
                  <span className="blog-tag" key={t}>{t}</span>
                ))}
              </div>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <span>{fmtDate(post.date)}</span>
                <span className="blog-dot">·</span>
                <span>{post.read} read</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section post-body-sec">
          <div className="wrap">
            <div className="post-body reveal">
              {post.body.map((b, i) =>
                b.h ? (
                  <h2 key={i}>{b.h}</h2>
                ) : (
                  <p key={i}>{b.p}</p>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="eyebrow reveal" style={{ display: "block", marginBottom: "1.2rem" }}>
              Keep reading
            </span>
            <div className="blog-grid">
              {more.map((p) => (
                <button className="blog-card liquid-glass hover-pop reveal" key={p.slug} onClick={() => go("post", p.slug)}>
                  <div className="blog-card-meta">
                    <span>{fmtDate(p.date)}</span>
                    <span className="blog-dot">·</span>
                    <span>{p.read}</span>
                  </div>
                  <h2 className="blog-card-title">{p.title}</h2>
                  <p className="muted blog-card-ex">{p.excerpt}</p>
                  <div className="blog-card-foot">
                    <div className="blog-tags">
                      {p.tags.map((t) => (
                        <span className="blog-tag" key={t}>{t}</span>
                      ))}
                    </div>
                    <span className="blog-card-arrow">{Ic.arrowUpRight()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CtaBand
        go={go}
        eyebrow="Ready to build?"
        title={
          <>
            Put these ideas to work on your <span className="serif">website.</span>
          </>
        }
        sub="Tell us what you're building — we design and build fast, SEO-ready websites and platforms in one to two weeks."
        primaryLabel="Start a project"
        secondaryLabel="All articles"
        secondaryTo="blog"
      />
    </div>
  );
}
