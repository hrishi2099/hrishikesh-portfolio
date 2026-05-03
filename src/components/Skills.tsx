"use client";
import { useInView } from "@/hooks/useInView";

const SKILL_GROUPS = [
  { label: "Languages", color: "#c0451a", skills: [["TypeScript", 95], ["Go", 88], ["Python", 82], ["Rust", 68]] },
  { label: "Frontend", color: "#0b7060", skills: [["React/Next.js", 96], ["CSS/Animation", 90], ["WebGL", 70], ["Testing", 84]] },
  { label: "Backend", color: "#b8903e", skills: [["Node.js", 93], ["PostgreSQL", 91], ["Redis", 87], ["gRPC", 80]] },
  { label: "Infra", color: "#6366f1", skills: [["Kubernetes", 78], ["AWS/GCP", 80], ["Terraform", 74], ["Docker", 92]] },
];

function SkillBar({ name, pct, color, delay }: { name: string, pct: number, color: string, delay: number }) {
  const [ref, vis] = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span className="t-mono" style={{ fontSize: ".72rem", color: "var(--ink)" }}>{name}</span>
        <span className="t-mono" style={{ fontSize: ".62rem", color }}>{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ background: color, transform: vis ? `scaleX(${pct / 100})` : "scaleX(0)", transitionDelay: `${delay}s` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, vis] = useInView<HTMLDivElement>(0.1);
  const TOOLS = ["VS Code", "Neovim", "Docker", "Terraform", "GitHub Actions", "DataDog", "Figma", "Linear", "Postman", "Grafana", "pgAdmin", "k9s", "Sentry", "Notion", "Obsidian"];
  return (
    <section id="Skills" style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.2rem,4vw,3.5rem)", background: "var(--cream)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: "clamp(2rem,4vw,3.5rem)", paddingBottom: "1.2rem", borderBottom: "1.5px solid var(--ink)" }}>
          <p className="t-mono" style={{
            fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--mist)", marginBottom: "6px",
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: "all .5s .1s"
          }}>03 / Expertise</p>
          <h2 className="t-disp" style={{
            fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1,
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all .7s .15s cubic-bezier(.23,1,.32,1)"
          }}>
            My <span style={{ color: "var(--rust)" }}>Toolkit</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(1.5rem,3vw,3rem)", marginBottom: "3rem" }}>
          {SKILL_GROUPS.map((g, gi) => (
            <div key={g.label}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.4rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: g.color }} />
                <span className="t-mono" style={{ fontSize: ".62rem", color: g.color, letterSpacing: ".18em", textTransform: "uppercase" }}>{g.label}</span>
              </div>
              {g.skills.map(([n, p], si) => (
                <SkillBar key={n as string} name={n as string} pct={p as number} color={g.color} delay={gi * .1 + si * .1 + .3} />
              ))}
            </div>
          ))}
        </div>

        {/* Tools */}
        <div style={{ border: "1.5px solid var(--ink)", padding: "clamp(1.2rem,2.5vw,2rem)", background: "var(--paper)" }}>
          <p className="t-mono" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--mist)", marginBottom: "1rem" }}>Daily Tools</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {TOOLS.map(t => (
              <span key={t} className="tag" style={{ cursor: "default" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
