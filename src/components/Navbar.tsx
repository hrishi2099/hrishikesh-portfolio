"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Hero");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    
    const sections = ["Hero", "Work", "Skills", "Experience", "Contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { threshold: 0.4 });
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", fn);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 clamp(1.2rem, 4vw, 3.5rem)",
      height: scrolled ? "54px" : "70px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(242,237,228,.95)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all .4s ease",
    }}>
      <button onClick={() => go("Hero")} style={{ display: "flex", alignItems: "center", gap: "9px", background: "none", border: "none", cursor: "pointer" }}>
        <span className="t-disp" style={{ fontSize: "1.65rem", color: "var(--ink)", lineHeight: 1 }}>H.</span>
        <span style={{ width: "1.5px", height: "18px", background: "var(--rust)" }} />
        <span className="t-mono" style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--mist)" }}>Portfolio</span>
      </button>

      <nav style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
        {["Work", "Skills", "Experience", "Contact"].map((s, i) => (
          <button key={s} className="nav-link" onClick={() => go(s)}
            style={{ color: active === s ? "var(--ink)" : "var(--mist)" }}>
            <span style={{ color: "var(--rust)", marginRight: "3px" }}>{String(i + 1).padStart(2, "0")}.</span>{s}
          </button>
        ))}
        <button className="btn-solid" style={{ padding: "8px 18px" }} onClick={() => go("Contact")}>Hire Me</button>
      </nav>

      <style jsx>{`
        @media(max-width:700px) {
          nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
