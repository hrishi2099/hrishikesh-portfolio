"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

export default function Contact() {
  const [ref, vis] = useInView<HTMLDivElement>(0.1);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [state, setState] = useState("idle"); // idle | sending | sent

  const submit = async () => {
    setState("sending");
    await new Promise(r => setTimeout(r, 1400));
    setState("sent");
  };

  return (
    <section id="Contact" style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.2rem,4vw,3.5rem)", background: "var(--ink)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: "clamp(2rem,4vw,3.5rem)", paddingBottom: "1.2rem", borderBottom: "1.5px solid rgba(242,237,228,.15)" }}>
          <p className="t-mono" style={{
            fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(242,237,228,.3)", marginBottom: "6px",
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: "all .5s .1s"
          }}>05 / Say Hello</p>
          <h2 className="t-disp" style={{
            fontSize: "clamp(2.2rem,5vw,4rem)", color: "var(--paper)", lineHeight: 1,
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all .7s .15s cubic-bezier(.23,1,.32,1)"
          }}>
            Let&apos;s Build <span style={{ color: "var(--rust)" }}>Together</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)" }}>
          {/* Left – form */}
          <div>
            {state === "sent" ? (
              <div style={{ border: "1.5px solid var(--teal)", padding: "2rem", textAlign: "center", animation: "fadeIn .5s ease" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✓</div>
                <h3 className="t-disp" style={{ fontSize: "1.8rem", color: "var(--teal)", marginBottom: "8px" }}>Message Sent!</h3>
                <p className="t-mono" style={{ fontSize: ".72rem", color: "rgba(242,237,228,.5)" }}>I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                {[["name", "Your name", "text"], ["email", "your@email.com", "email"]].map(([k, ph, t]) => (
                  <div key={k}>
                    <label className="t-mono" style={{ fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(242,237,228,.4)", display: "block", marginBottom: "6px" }}>
                      {k}
                    </label>
                    <input type={t} placeholder={ph} value={form[k as keyof typeof form]}
                      onChange={e => setForm({ ...form, [k]: e.target.value })}
                      style={{ borderColor: "rgba(242,237,228,.25)", color: "var(--paper)" }} />
                  </div>
                ))}
                <div>
                  <label className="t-mono" style={{ fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(242,237,228,.4)", display: "block", marginBottom: "6px" }}>Message</label>
                  <textarea rows={5} placeholder="Tell me about your project..." value={form.msg}
                    onChange={e => setForm({ ...form, msg: e.target.value })}
                    style={{ borderColor: "rgba(242,237,228,.25)", color: "var(--paper)" }} />
                </div>
                <button className="btn-solid" onClick={submit}
                  style={{ background: state === "sending" ? "rgba(242,237,228,.15)" : "var(--paper)", color: "var(--ink)", borderColor: "var(--paper)" }}>
                  {state === "sending" ? <><span style={{ animation: "blink 1s step-end infinite" }}>Sending</span>…</> : <>Send Message →</>}
                </button>
              </div>
            )}
          </div>

          {/* Right – info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "✉", label: "Email", val: "hrishikesh@example.com" },
              { icon: "◎", label: "Location", val: "Mumbai, India" },
              { icon: "◈", label: "Timezone", val: "IST (UTC+5:30)" },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{
                display: "flex", gap: "14px", padding: "1.1rem 1.4rem",
                border: "1px solid rgba(242,237,228,.1)", background: "rgba(242,237,228,.03)"
              }}>
                <span style={{ fontSize: "1rem", color: "var(--rust)", lineHeight: 1.6 }}>{icon}</span>
                <div>
                  <div className="t-mono" style={{ fontSize: ".58rem", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(242,237,228,.35)" }}>{label}</div>
                  <div className="t-mono" style={{ fontSize: ".8rem", color: "var(--paper)", marginTop: "3px" }}>{val}</div>
                </div>
              </div>
            ))}

            <div style={{ padding: "1.4rem", border: "1px solid rgba(242,237,228,.1)", background: "rgba(242,237,228,.03)" }}>
              <p className="t-mono" style={{ fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(242,237,228,.35)", marginBottom: "1rem" }}>Find me online</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {[["⎇", "GitHub"], ["in", "LinkedIn"], ["𝕏", "Twitter"]].map(([i, l]) => (
                  <a key={l} href="#" style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
                    padding: "10px", border: "1px solid rgba(242,237,228,.1)",
                    textDecoration: "none", transition: "all .25s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--rust)"; e.currentTarget.style.background = "rgba(192,69,26,.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(242,237,228,.1)"; e.currentTarget.style.background = "transparent"; }}>
                    <span style={{ fontSize: "1rem", color: "var(--paper)" }}>{i}</span>
                    <span className="t-mono" style={{ fontSize: ".55rem", color: "rgba(242,237,228,.4)" }}>{l}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media(max-width:750px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
