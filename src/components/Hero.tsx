"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useScramble } from "@/hooks/useScramble";

const ROLES = ["Full Stack Engineer", "System Designer", "Open Source Contributor", "Performance Optimizer"];

function SkillMiniCard({ label, pct, delay }: { label: string, pct: number, delay: number }) {
  const [ref, vis] = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} style={{ border: "1px solid var(--border)", padding: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span className="t-mono" style={{ fontSize: ".63rem", color: "var(--ink)" }}>{label}</span>
        <span className="t-mono" style={{ fontSize: ".58rem", color: "var(--rust)" }}>{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ transform: vis ? `scaleX(${pct / 100})` : "scaleX(0)", transitionDelay: `${delay}s` }} />
      </div>
    </div>
  );
}

export default function Hero() {
  const [ri, setRi] = useState(0);
  const [hov, setHov] = useState(false);
  const scr = useScramble(ROLES[ri], hov);
  const canRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t = setInterval(() => setRi(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    let mx = -999, my = -999, raf: number;
    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove);
    const sp = 28;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const cols = Math.ceil(c.width / sp) + 1, rows = Math.ceil(c.height / sp) + 1;
      for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
        const x = col * sp, y = r * sp, d = Math.hypot(x - mx, y - my), ratio = Math.max(0, 1 - d / 130);
        ctx.beginPath(); ctx.arc(x, y, (0.5 + ratio * 2.2) * .5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(12,12,12,${.05 + ratio * .4})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section id="Hero" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <canvas ref={canRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

      {/* Vertical text */}
      <div style={{
        position: "absolute", right: "clamp(1rem,2vw,2rem)", top: "50%", transform: "translateY(-50%) rotate(90deg)",
        fontFamily: "var(--ff-mono)", fontSize: ".55rem", letterSpacing: ".35em", textTransform: "uppercase",
        color: "var(--mist)", userSelect: "none", whiteSpace: "nowrap", zIndex: 2
      }}>
        hrishikesh@dev — 2026
      </div>

      <div style={{
        flex: 1, position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "clamp(1rem,3vw,3rem)",
        padding: "clamp(1rem,4vw,3.5rem)", paddingTop: "calc(70px + clamp(1.5rem,4vw,3rem))",
        maxWidth: "1300px", margin: "0 auto", width: "100%", alignItems: "center",
      }}>
        {/* LEFT */}
        <div>
          {/* Available badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.6rem",
            animation: "slideUp .6s .1s cubic-bezier(.23,1,.32,1) both"
          }}>
            <span style={{ width: "36px", height: "1.5px", background: "var(--rust)" }} />
            <span className="t-mono" style={{ fontSize: ".62rem", letterSpacing: ".25em", textTransform: "uppercase", color: "var(--rust)" }}>
              Available for work
            </span>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%", background: "var(--teal)",
              boxShadow: "0 0 0 3px rgba(11,112,96,.22)", animation: "blink 2s ease-in-out infinite"
            }} />
          </div>

          {/* Name */}
          <div style={{ overflow: "hidden" }}>
            <h1 className="t-disp" style={{
              fontSize: "clamp(4rem, 10vw, 8.5rem)", color: "var(--ink)",
              animation: "slideUp .85s .2s cubic-bezier(.23,1,.32,1) both"
            }}>
              Hrishikesh
            </h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: ".3em" }}>
            <h1 className="t-disp" style={{
              fontSize: "clamp(4rem, 10vw, 8.5rem)", color: "var(--rust)",
              animation: "slideUp .85s .32s cubic-bezier(.23,1,.32,1) both"
            }}>
              Portfolio
            </h1>
          </div>

          {/* Scrambled role */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem",
            animation: "fadeIn .6s .7s both"
          }}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
            <span style={{ color: "var(--rust)", fontSize: ".75rem" }}>⌥</span>
            <span className="t-mono" style={{ fontSize: "clamp(.72rem,1.4vw,.9rem)", color: "var(--mist)", minWidth: "220px" }}>
              {scr}<span className="caret">_</span>
            </span>
          </div>

          <p className="t-mono" style={{
            fontSize: ".78rem", color: "var(--mist)", lineHeight: 1.85,
            maxWidth: "440px", marginBottom: "2.2rem", animation: "slideUp .7s .55s cubic-bezier(.23,1,.32,1) both"
          }}>
            I architect and ship systems that scale to millions. From blazing-fast APIs to
            pixel-perfect UIs — I obsess over every layer of the stack.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", animation: "slideUp .7s .65s cubic-bezier(.23,1,.32,1) both" }}>
            <button className="btn-solid" onClick={() => document.getElementById("Work")?.scrollIntoView({ behavior: "smooth" })}>
              View Work <span>→</span>
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" })}>
              Let&apos;s Talk
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: "clamp(1.2rem,3vw,2.8rem)", marginTop: "2.8rem",
            paddingTop: "1.8rem", borderTop: "1px solid var(--border)",
            animation: "fadeIn .7s 1s both"
          }}>
            {[["7+", "Years"], ["50+", "Projects"], ["12M+", "Req/day"]].map(([n, l]) => (
              <div key={l}>
                <div className="t-disp" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: "var(--ink)", lineHeight: 1 }}>{n}</div>
                <div className="t-mono" style={{ fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--mist)", marginTop: "4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – terminal + mini skill cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", animation: "slideR .9s .4s cubic-bezier(.23,1,.32,1) both" }}>
          {/* Terminal */}
          <div style={{ background: "var(--ink)", padding: "1.4rem 1.6rem" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "1rem", paddingBottom: ".9rem", borderBottom: "1px solid rgba(242,237,228,.1)" }}>
              {["#c0451a", "#b8903e", "#0b7060"].map(c => <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />)}
              <span className="t-mono" style={{ fontSize: ".58rem", color: "rgba(242,237,228,.35)", marginLeft: "8px", letterSpacing: ".08em" }}>~/hrishikesh/profile.ts</span>
            </div>
            {[
              { t: "const dev = {", c: "rgba(242,237,228,.5)" },
              { t: ' name: "Hrishikesh",', c: "#b8903e", i: 1 },
              { t: ' role: "Sr. Engineer",', c: "#0b7060", i: 1 },
              { t: ' location: "Mumbai IN",', c: "#0b7060", i: 1 },
              { t: " stack: [", c: "rgba(242,237,228,.6)", i: 1 },
              { t: '   "TS","Go","Rust","Py"', c: "#c0451a", i: 1 },
              { t: " ],", c: "rgba(242,237,228,.6)", i: 1 },
              { t: " openTo: () => true", c: "#b8903e", i: 1 },
              { t: "};", c: "rgba(242,237,228,.5)" },
            ].map(({ t, c, i }, idx) => (
              <div key={idx} style={{ display: "flex", gap: "10px", lineHeight: 1.9 }}>
                <span className="t-mono" style={{ fontSize: ".55rem", color: "rgba(242,237,228,.18)", minWidth: "16px", textAlign: "right", userSelect: "none" }}>{idx + 1}</span>
                <span className="t-mono" style={{ fontSize: ".75rem", color: c as string, paddingLeft: i ? "0.5rem" : 0 }}>{t}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <span className="t-mono" style={{ fontSize: ".55rem", color: "rgba(242,237,228,.18)", minWidth: "16px", textAlign: "right" }}>10</span>
              <span className="t-mono" style={{ fontSize: ".75rem", color: "var(--teal)" }}>
                $ run profile<span style={{ color: "#f2ede4" }}> &quot;Let&apos;s build&quot;<span className="caret"> ▋</span></span>
              </span>
            </div>
          </div>

          {/* Skill bars grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[["TypeScript", 95], ["Go / Rust", 82], ["React/Next", 96], ["K8s / AWS", 78]].map(([l, p], ii) => (
              <SkillMiniCard key={l as string} label={l as string} pct={p as number} delay={1 + ii * .1} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", paddingBottom: "2rem", animation: "fadeIn .6s 1.5s both" }}>
        <button onClick={() => document.getElementById("Work")?.scrollIntoView({ behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", opacity: .5 }}>
          <span className="t-mono" style={{ fontSize: ".55rem", letterSpacing: ".25em", textTransform: "uppercase", color: "var(--mist)" }}>Scroll</span>
          <span style={{ fontSize: "1rem", lineHeight: 1, color: "var(--mist)" }}>↓</span>
        </button>
      </div>
      
      <style jsx>{`
        @media(max-width:900px) {
          #Hero > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            padding-top: 100px !important;
          }
          #Hero > div:nth-child(3) > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
