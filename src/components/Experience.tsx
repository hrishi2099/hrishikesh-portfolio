"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const JOBS = [
  { co: "Stripe", role: "Senior Software Engineer", period: "2022 — Present", loc: "San Francisco, CA", color: "#c0451a",
    points: ["Architected fraud detection system processing 3M+ txns/day at <10ms latency", "Led migration of 40+ microservices, cutting deploy time by 70%", "Mentored 6 engineers; established TypeScript standards across the org", "Built internal dev tooling adopted by 200+ engineers company-wide"],
    stack: ["Go", "TypeScript", "Kubernetes", "PostgreSQL", "Kafka"] },
  { co: "Vercel", role: "Software Engineer", period: "2020 — 2022", loc: "Remote", color: "#0b7060",
    points: ["Contributed core features to Next.js App Router — now used by 1M+ devs", "Reduced cold start times 40% via V8 isolate optimisation", "Shipped initial Edge Middleware with sub-1ms execution overhead", "Delivered 12 customer-facing features including image optimisation pipeline"],
    stack: ["TypeScript", "React", "Edge Computing", "Rust", "C++"] },
  { co: "Coinbase", role: "Software Engineer", period: "2019 — 2020", loc: "San Francisco, CA", color: "#b8903e",
    points: ["Built HFT infrastructure for Coinbase Pro handling $2B+ daily volume", "Implemented WebSocket order book with 10k+ concurrent connections", "Designed fault-tolerant crypto withdrawal processing architecture"],
    stack: ["Go", "Python", "Redis", "gRPC", "AWS"] },
  { co: "Lyft", role: "Junior Engineer", period: "2018 — 2019", loc: "San Francisco, CA", color: "#6366f1",
    points: ["Improved driver matching algorithm — reduced wait times 8%", "Built internal analytics dashboard for 200+ ops team members", "Contributed to React Native driver app serving 500k+ active drivers"],
    stack: ["Python", "React Native", "PostgreSQL", "Docker"] },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const [ref, vis] = useInView<HTMLDivElement>(0.1);
  const job = JOBS[active];

  return (
    <section id="Experience" style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.2rem,4vw,3.5rem)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: "clamp(2rem,4vw,3.5rem)", paddingBottom: "1.2rem", borderBottom: "1.5px solid var(--ink)" }}>
          <p className="t-mono" style={{
            fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--mist)", marginBottom: "6px",
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: "all .5s .1s"
          }}>04 / Career</p>
          <h2 className="t-disp" style={{
            fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1,
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all .7s .15s cubic-bezier(.23,1,.32,1)"
          }}>
            Where I&apos;ve <span style={{ color: "var(--rust)" }}>Worked</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", border: "1.5px solid var(--ink)" }}>
          {/* Tabs */}
          <div style={{ borderRight: "1.5px solid var(--ink)" }}>
            {JOBS.map((j, i) => (
              <button key={j.co} onClick={() => setActive(i)}
                style={{
                  width: "100%", textAlign: "left", padding: "1.1rem 1.4rem",
                  background: active === i ? "var(--cream)" : "transparent",
                  border: "none", borderBottom: i < JOBS.length - 1 ? "1px solid var(--border)" : "none",
                  cursor: "pointer", position: "relative", transition: "background .2s",
                }}>
                {active === i && <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: j.color }} />}
                <div className="t-disp" style={{ fontSize: "1.05rem", color: active === i ? "var(--ink)" : "var(--mist)", transition: "color .2s" }}>{j.co}</div>
                <div className="t-mono" style={{ fontSize: ".58rem", color: active === i ? j.color : "var(--mist)", marginTop: "2px", transition: "color .2s" }}>{j.period}</div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div key={active} style={{ padding: "clamp(1.5rem,3vw,2.5rem)", background: "var(--cream)", animation: "fadeIn .35s ease" }}>
            <h3 className="t-disp" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", lineHeight: 1, marginBottom: "4px" }}>
              {job.role} <span style={{ color: job.color }}>@ {job.co}</span>
            </h3>
            <p className="t-mono" style={{ fontSize: ".62rem", color: "var(--mist)", marginBottom: "1.4rem" }}>
              {job.period} · {job.loc}
            </p>

            <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
              {job.points.map((pt, i) => (
                <li key={i} style={{
                  display: "flex", gap: "10px", marginBottom: "10px",
                  opacity: 1, animation: `slideUp .45s ${i * .07}s ease both`
                }}>
                  <span style={{ color: job.color, flexShrink: 0, lineHeight: 1.8 }}>▸</span>
                  <span className="t-mono" style={{ fontSize: ".74rem", color: "var(--mist)", lineHeight: 1.8 }}>{pt}</span>
                </li>
              ))}
            </ul>

            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {job.stack.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media(max-width:700px) {
          div[style*="grid-template-columns: 220px 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="border-right: 1.5px solid var(--ink)"] {
            border-right: none !important;
            border-bottom: 1.5px solid var(--ink) !important;
            display: flex !important;
            overflow-x: auto !important;
          }
          button {
            min-width: 140px !important;
            border-bottom: none !important;
            border-right: 1px solid var(--border) !important;
          }
        }
      `}</style>
    </section>
  );
}
