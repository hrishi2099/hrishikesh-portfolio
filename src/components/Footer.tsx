"use client";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--ink)", borderTop: "1px solid rgba(242,237,228,.1)",
      padding: "1.2rem clamp(1.2rem,4vw,3.5rem)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px"
    }}>
      <span className="t-mono" style={{ fontSize: ".6rem", color: "rgba(242,237,228,.3)", letterSpacing: ".08em" }}>
        © 2026 Hrishikesh — Built with Next.js
      </span>
      <span className="t-disp" style={{ fontSize: "1.2rem", color: "rgba(242,237,228,.15)", letterSpacing: ".05em" }}>H.</span>
    </footer>
  );
}
