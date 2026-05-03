"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const PROJECTS = [
  { num: "01", name: "QuantumDB", sub: "Distributed SQL Engine", desc: "Horizontally-scalable database in Go with RAFT consensus, auto-sharding, and vectorised query execution. 2M+ writes/sec at sub-2ms p99 latency.", stack: ["Go", "RAFT", "gRPC", "eBPF"], accent: "#c0451a", stat: "2M+ writes/sec" },
  { num: "02", name: "Collab.io", sub: "Real-time Multiplayer Editor", desc: "Notion-meets-Figma with CRDT conflict resolution over WebSockets. Live cursors, version history, offline-first sync engine. 65k+ active users.", stack: ["TypeScript", "YJS", "WebSocket", "Redis"], accent: "#0b7060", stat: "65k users" },
  { num: "03", name: "Sentinel AI", sub: "Infrastructure Anomaly Detection", desc: "Transformer-based ML trained on 18 months of production telemetry. Predicts outages 12 minutes early with 96% precision. Cloud-agnostic.", stack: ["Python", "PyTorch", "Prometheus", "K8s"], accent: "#b8903e", stat: "96% precision" },
  { num: "04", name: "Prism CLI", sub: "Dev Scaffolding Toolchain", desc: "Spin up production-grade full-stack projects in one command. 14 frameworks, auto-configured CI/CD, Dockerfile, and Terraform included.", stack: ["Rust", "CLI", "GH Actions", "Docker"], accent: "#6366f1", stat: "6k installs/wk" },
];

function ProjectCard({ p, i }: { p: typeof PROJECTS[0], i: number }) {
  const [ref, vis] = useInView<HTMLDivElement>(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        border: "1.5px solid var(--ink)", padding: "clamp(1.2rem,2.5vw,2rem)",
        position: "relative", overflow: "hidden", background: hov ? "var(--cream)" : "var(--paper)",
        transform: hov ? "translateY(-6px) rotate(-.25deg)" : vis ? `translateY(0) rotate(0)` : "translateY(40px) rotate(0)",
        opacity: vis ? 1 : 0,
        transition: "all .55s cubic-bezier(.23,1,.32,1)",
        transitionDelay: `${i * .1}s`,
        boxShadow: hov ? `5px 9px 0 ${p.accent}` : "none",
      }}>
      {/* Corner pip */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "36px", height: "36px",
        background: p.accent, clipPath: "polygon(100% 0,0 0,100% 100%)",
        opacity: hov ? 1 : 0, transition: "opacity .3s"
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span className="t-disp" style={{ fontSize: "clamp(2.2rem,4vw,3rem)", color: hov ? p.accent : "rgba(12,12,12,.1)", lineHeight: 1, transition: "color .3s" }}>{p.num}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {["⎇", "↗"].map((icon, ii) => (
            <button key={ii} style={{
              background: "none", border: "none", cursor: "pointer", color: "var(--mist)", fontSize: ".9rem",
              transition: "color .2s"
            }}
              onMouseEnter={e => e.currentTarget.style.color = p.accent}
              onMouseLeave={e => e.currentTarget.style.color = "var(--mist)"}>{icon}</button>
          ))}
        </div>
      </div>

      <h3 className="t-disp" style={{ fontSize: "clamp(1.5rem,2.5vw,1.9rem)", color: "var(--ink)", lineHeight: 1, marginBottom: "4px" }}>{p.name}</h3>
      <p className="t-mono" style={{ fontSize: ".62rem", color: p.accent, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".9rem" }}>{p.sub}</p>
      <p className="t-mono" style={{ fontSize: ".74rem", color: "var(--mist)", lineHeight: 1.8, marginBottom: "1.2rem" }}>{p.desc}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "1.2rem" }}>
        {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
      </div>

      <div style={{ paddingTop: ".9rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="t-mono" style={{ fontSize: ".65rem", color: p.accent }}>✦ {p.stat}</span>
        <span style={{ fontSize: ".85rem", color: hov ? p.accent : "var(--mist)", transition: "all .2s", transform: hov ? "translateX(4px)" : "none", display: "inline-block" }}>→</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, vis] = useInView<HTMLDivElement>(0.1);
  return (
    <section id="Work" style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.2rem,4vw,3.5rem)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: "clamp(2rem,4vw,3.5rem)", paddingBottom: "1.2rem", borderBottom: "1.5px solid var(--ink)"
        }}>
          <div>
            <p className="t-mono" style={{
              fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--mist)", marginBottom: "6px",
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(12px)", transition: "all .6s .1s"
            }}>02 / Selected Work</p>
            <h2 className="t-disp" style={{
              fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1,
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all .7s .15s cubic-bezier(.23,1,.32,1)"
            }}>
              Things I&apos;ve <span style={{ color: "var(--rust)" }}>Shipped</span>
            </h2>
          </div>
          <a href="#" className="t-mono" style={{
            fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase",
            color: "var(--mist)", display: "flex", alignItems: "center", gap: "5px",
            opacity: vis ? 1 : 0, transition: "opacity .6s .3s", textDecoration: "none"
          }}>All Projects →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "1.5px", background: "var(--ink)" }}>
          {PROJECTS.map((p, i) => (
            <div key={p.num} style={{ background: "var(--paper)" }}><ProjectCard p={p} i={i} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}
