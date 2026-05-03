"use client";

export default function Marquee() {
  const items = ["TypeScript", "★", "Go", "★", "Rust", "★", "React", "★", "Next.js", "★", "PostgreSQL", "★", "Redis", "★", "Kubernetes", "★", "AWS", "★", "System Design", "★"];
  const doubled = [...items, ...items];
  return (
    <div style={{
      borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)",
      background: "var(--ink)", padding: "11px 0", overflow: "hidden", userSelect: "none"
    }}>
      <div className="mq-track">
        {doubled.map((item, i) => (
          <span key={i} className={item === "★" ? "t-serif" : "t-disp"} style={{
            fontSize: item === "★" ? ".7rem" : "1.05rem",
            color: item === "★" ? "var(--rust)" : "var(--paper)",
            padding: "0 16px", whiteSpace: "nowrap", letterSpacing: item === "★" ? 0 : ".06em",
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}
