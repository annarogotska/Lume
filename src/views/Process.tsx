/* NUVEL — Process view. */
import { useReveal } from "../components/useReveal";
import { PROCESS } from "../data";

export function Process() {
  useReveal([]);
  return (
    <div className="view view-enter">
      <section className="section page-head-sec">
        <div className="wrap">
          <span className="eyebrow">Process</span>
          <h1 className="display page-h1">
            Two weeks,
            <br />
            start to <span className="serif">live.</span>
          </h1>
          <p className="lede" style={{ maxWidth: "46ch", marginTop: "1.6rem" }}>
            No drawn-out decks or month-long discovery. A tight, opinionated four-step rhythm that gets you to a launched, beautiful result — fast.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap proc-stack">
          {PROCESS.map((p, i) => (
            <div className="proc-step liquid-glass reveal" data-delay={i * 80} key={p.n}>
              <div className="proc-n">{p.n}</div>
              <div className="proc-body">
                <div className="proc-head">
                  <h2 className="h-sec">{p.t}</h2>
                  <span className="tag liquid-glass">{p.days}</span>
                </div>
                <p className="muted" style={{ maxWidth: "52ch", marginTop: ".8rem" }}>
                  {p.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="proc-promise liquid-glass-strong reveal">
            <span className="eyebrow">The promise</span>
            <h2 className="h-sec" style={{ marginTop: "1rem", maxWidth: "18ch" }}>
              You'll see <span className="serif">real design</span> in the first week — every time.
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
