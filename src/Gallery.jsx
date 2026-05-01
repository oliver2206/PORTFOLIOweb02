import { useState } from "react";

const brandingServices = [
  ["Brand Identity", "Posters"],
  ["Brand Moodboard", "Billboard"],
  ["Logo & Application", "Publications"],
  ["Business Card", "Menu Board"],
  ["Letterhead", "Handheld Menu"],
  ["Company Profile", "Invitation"],
  ["Brochure", "Wall Mural"],
  ["Flyer", "Illustration"],
  ["Catalogue", "Packaging Design"],
  ["Banners", "& More"],
];

const webServices = [
  ["Web Design", "Online Listings"],
  ["Web Devt", "S.E.O."],
  ["Sitemap & Strategy", "FB Ads"],
  ["FB Site Design", "Google Ads"],
  ["Social Media Post", "Newsletter Design"],
  ["Banner Ads", "Email Web Blast"],
];

const otherServices = [
  ["Interior Look & Feel", "Outdoor Photography"],
  ["Signage Design", "Studio Photography"],
  ["Construction Support", "AVP Presentations"],
  ["Booth Design", "Video Editing"],
  ["Food Photography", "3D Modeling"],
  ["Indoor Photography", "3D Animation"],
];

const CheckIcon = () => (
  <span
    style={{
      display: "inline-block",
      width: 10,
      height: 10,
      background: "#00bcd4",
      marginRight: 10,
      flexShrink: 0,
      marginTop: 4,
    }}
  />
);

const ServiceList = ({ pairs }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "6px 16px",
      marginTop: 12,
    }}
  >
    {pairs.map(([a, b], i) => (
      <>
        <div key={`a-${i}`} style={{ display: "flex", alignItems: "flex-start", fontSize: 13.5, color: "#333" }}>
          <CheckIcon />
          {a}
        </div>
        <div key={`b-${i}`} style={{ display: "flex", alignItems: "flex-start", fontSize: 13.5, color: "#333" }}>
          <CheckIcon />
          {b}
        </div>
      </>
    ))}
  </div>
);

const serviceImages = {
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  web: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
  other: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
};

export default function ServicesPage() {
  const [imgErrors, setImgErrors] = useState({});

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", margin: 0, padding: 0 }}>

      {/* ── HERO SECTION ── */}
      <section
        style={{
          background: "#00bcd4",
          padding: "60px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 340,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left content */}
        <div style={{ maxWidth: 520, zIndex: 2, position: "relative" }}>
          <p
            style={{
              color: "#1a4a6b",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            OUR SERVICES
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 28,
              margin: "0 0 28px 0",
            }}
          >
            Top Agency Quality at only the<br />Fraction of the price
          </h1>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0" }}>
            {[
              "High Caliber Professional Branding & Applications",
              "Marketing Strategy & Marketing Collaterals",
              "Website Design, Development, & Custom Features",
              "Complete Branding of Print, Web, Interior, and More",
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  color: "#fff",
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 11,
                    height: 11,
                    background: "#1a4a6b",
                    marginRight: 12,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#inquiry"
            style={{
              display: "inline-block",
              background: "#1a4a6b",
              color: "#fff",
              padding: "12px 28px",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1.5,
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.target.style.background = "#0d3354")}
            onMouseLeave={e => (e.target.style.background = "#1a4a6b")}
          >
            MAKE AN INQUIRY
          </a>
        </div>

        {/* Decorative surfer graphic (SVG stand-in) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "50%",
            height: "100%",
            opacity: 0.18,
            background:
              "radial-gradient(ellipse at 70% 40%, #fff 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: 340,
            height: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Abstract surfer shape using layered divs */}
          <svg
            viewBox="0 0 320 280"
            width="320"
            height="280"
            style={{ opacity: 0.85 }}
          >
            <ellipse cx="200" cy="140" rx="130" ry="130" fill="rgba(255,255,255,0.08)" />
            <ellipse cx="200" cy="140" rx="90" ry="90" fill="rgba(255,255,255,0.06)" />
            {/* Wave shapes */}
            <path
              d="M60,180 Q120,100 200,140 Q260,170 290,120"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M40,200 Q110,120 210,155 Q270,185 300,135"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
            />
            {/* Abstract figure */}
            <circle cx="205" cy="95" r="14" fill="rgba(255,255,255,0.7)" />
            <path
              d="M205,109 L195,155 L220,170 L210,195"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M200,125 L175,145 M200,125 L225,142"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Diagonal slashes */}
            <line x1="80" y1="60" x2="160" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
            <line x1="110" y1="40" x2="170" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
            <line x1="240" y1="50" x2="300" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
          </svg>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section style={{ background: "#f4f4f4", padding: "0 60px 60px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* Card: Branding */}
          <div style={{ background: "#fff", borderRadius: 0, overflow: "hidden", border: "1px solid #e8e8e8" }}>
            <div style={{ height: 200, overflow: "hidden", background: "#222" }}>
              <img
                src={serviceImages.branding}
                alt="Branding Services"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                onError={() => setImgErrors(e => ({ ...e, branding: true }))}
              />
            </div>
            <div style={{ padding: "28px 28px 32px" }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>
                Branding Services
              </h3>
              <p style={{ color: "#00bcd4", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                We create brand identity that effectively communicates with our client's goals, target market, and strategy.
              </p>
              <ServiceList pairs={brandingServices} />
              <div style={{ marginTop: 24, textAlign: "center" }}>
                <a
                  href="#inquiry"
                  style={{
                    display: "inline-block",
                    background: "#00bcd4",
                    color: "#fff",
                    padding: "11px 32px",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.target.style.background = "#00a3b8")}
                  onMouseLeave={e => (e.target.style.background = "#00bcd4")}
                >
                  INQUIRE NOW
                </a>
              </div>
            </div>
          </div>

          {/* Card: Web & Online */}
          <div style={{ background: "#fff", borderRadius: 0, overflow: "hidden", border: "1px solid #e8e8e8", borderLeft: "none", borderRight: "none" }}>
            <div style={{ height: 200, overflow: "hidden", background: "#1a3a5c" }}>
              <img
                src={serviceImages.web}
                alt="Web & Online"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                onError={() => setImgErrors(e => ({ ...e, web: true }))}
              />
            </div>
            <div style={{ padding: "28px 28px 32px" }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>
                Web & Online
              </h3>
              <p style={{ color: "#00bcd4", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                Each website we create aims to communicate our client's message while captivating their visitor to get interested in availing products and services.
              </p>
              <ServiceList pairs={webServices} />
              <div style={{ marginTop: 24, textAlign: "center" }}>
                <a
                  href="#inquiry"
                  style={{
                    display: "inline-block",
                    background: "#00bcd4",
                    color: "#fff",
                    padding: "11px 32px",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.target.style.background = "#00a3b8")}
                  onMouseLeave={e => (e.target.style.background = "#00bcd4")}
                >
                  INQUIRE NOW
                </a>
              </div>
            </div>
          </div>

          {/* Card: Other Services */}
          <div style={{ background: "#fff", borderRadius: 0, overflow: "hidden", border: "1px solid #e8e8e8" }}>
            <div style={{ height: 200, overflow: "hidden", background: "#3a3a2a" }}>
              <img
                src={serviceImages.other}
                alt="Other Services"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                onError={() => setImgErrors(e => ({ ...e, other: true }))}
              />
            </div>
            <div style={{ padding: "28px 28px 32px" }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>
                Other Services
              </h3>
              <p style={{ color: "#00bcd4", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                We specialize in doing any multimedia creative work and strategy that our clients need for branding. Don't hesitate to ask or inquire.
              </p>
              <ServiceList pairs={otherServices} />
              <div style={{ marginTop: 24, textAlign: "center" }}>
                <a
                  href="#inquiry"
                  style={{
                    display: "inline-block",
                    background: "#00bcd4",
                    color: "#fff",
                    padding: "11px 32px",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.target.style.background = "#00a3b8")}
                  onMouseLeave={e => (e.target.style.background = "#00bcd4")}
                >
                  INQUIRE NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          background: "#00bcd4",
          padding: "22px 60px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#fff", fontWeight: 700, fontSize: 18, margin: 0 }}>
          Contact us now to get a FREE Consultation and Project Estimate
        </p>
      </section>

      {/* ── BRAND STATEMENT SECTION ── */}
      <section
        style={{
          position: "relative",
          minHeight: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#0d2d4a",
        }}
      >
        {/* Tiled background brand imagery overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(90deg, rgba(0,188,212,0.07) 0px, rgba(0,188,212,0.07) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(0,188,212,0.07) 0px, rgba(0,188,212,0.07) 1px, transparent 1px, transparent 80px)",
            zIndex: 1,
          }}
        />
        {/* Ghosted brand name repeated */}
        {["left", "center", "right"].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: pos === "left" ? "5%" : pos === "center" ? "50%" : "auto",
              right: pos === "right" ? "5%" : "auto",
              transform: "translateY(-50%)",
              opacity: 0.07,
              fontSize: 52,
              fontWeight: 900,
              color: "#00bcd4",
              letterSpacing: 4,
              whiteSpace: "nowrap",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            WESTWOOD
          </div>
        ))}

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 820,
            textAlign: "center",
            padding: "50px 40px",
          }}
        >
          <p
            style={{
              color: "#00bcd4",
              fontWeight: 700,
              fontSize: "clamp(14px, 2vw, 18px)",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            We know how to guide SME & Corporate brands through the delicate process of reinvigorating
            their passion and how they communicate it through visual and aural touch points. We help
            traverse potential negative pushback from current brand fans while accentuating the potential
            for success. That's what you get when working with us.
          </p>
          <p style={{ color: "#ccc", fontSize: 14, marginBottom: 28 }}>
            Don't spend on designers that don't work or understand what your business needs.
          </p>
          <a
            id="inquiry"
            href="mailto:inquiry@example.com"
            style={{
              display: "inline-block",
              background: "#00bcd4",
              color: "#fff",
              padding: "14px 36px",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => {
              e.target.style.background = "#00a3b8";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "#00bcd4";
              e.target.style.transform = "translateY(0)";
            }}
          >
            MAKE AN INQUIRY
          </a>
        </div>
      </section>
    </div>
  );
}
