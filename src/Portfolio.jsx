import { useState, useEffect, useCallback } from "react";

const projects = [
  { id: 1,  title: "Nebula Core",    short: "Real-time AI analytics dashboard",    full: "Nebula Core delivers predictive insights, streaming data, and enterprise-grade dashboards. Built with cutting-edge AI models.",                       cat: "web",      tags: ["React","D3","Tailwind"],         img: "https://picsum.photos/id/20/600/400",  tag: "⚡ AI REALTIME",  icon: "fa-bolt",         year: "2025", role: "Lead Architect"   },
  { id: 2,  title: "Bloom Studio",   short: "Eco-friendly brand identity",          full: "A full visual ecosystem for sustainable beauty. Packaging, identity, and digital presence crafted for the green economy.",                              cat: "branding", tags: ["Illustrator","Typography"],       img: "https://picsum.photos/id/127/600/400", tag: "✨ ECO AWARD",    icon: "fa-star",         year: "2024", role: "Creative Director" },
  { id: 3,  title: "Voyage Go",      short: "Offline travel planner app",           full: "Powerful itinerary builder with offline maps and local recommendations. Used by 150k+ travelers worldwide.",                                            cat: "mobile",   tags: ["Flutter","Firebase"],             img: "https://picsum.photos/id/104/600/400", tag: "📱 TRAVEL HOT",   icon: "fa-plane",        year: "2025", role: "Mobile Lead"       },
  { id: 4,  title: "Finora Bank",    short: "Modern neobank UI/UX",                 full: "Intelligent budgeting, investments, and seamless onboarding. Redefines the digital banking experience for Gen Z.",                                       cat: "web",      tags: ["Figma","React"],                 img: "https://picsum.photos/id/24/600/400",  tag: "🏆 BEST UI/UX",  icon: "fa-trophy",       year: "2025", role: "UX Designer"       },
  { id: 5,  title: "Aether Music",   short: "Spatial audio player",                 full: "Cross-platform immersive music player with collaborative playlists and AI-powered mixing engine.",                                                      cat: "mobile",   tags: ["SwiftUI","AudioKit"],             img: "https://picsum.photos/id/29/600/400",  tag: "🎧 AUDIO INNOV", icon: "fa-headphones",   year: "2024", role: "Lead Engineer"     },
  { id: 6,  title: "Helix System",   short: "Enterprise design system",             full: "Component library used across 25+ products, fully WCAG compliant and design-token driven.",                                                             cat: "web",      tags: ["Storybook","Tokens"],             img: "https://picsum.photos/id/0/600/400",   tag: "🌟 DESIGN OPS",  icon: "fa-gem",          year: "2025", role: "Design Lead"       },
  { id: 7,  title: "Orion Space",    short: "Futurist aerospace branding",          full: "Aerospace startup identity with real-time 3D motion and futurist asset production pipeline.",                                                           cat: "branding", tags: ["After Effects","3D"],             img: "https://picsum.photos/id/96/600/400",  tag: "🚀 SPACE TECH",  icon: "fa-rocket",       year: "2024", role: "Art Director"      },
  { id: 8,  title: "TaskFlow Pro",   short: "AI productivity suite",                full: "Smart kanban, AI suggestions, and team analytics driving +30% productivity for remote teams.",                                                          cat: "web",      tags: ["Vue","Node"],                     img: "https://picsum.photos/id/169/600/400", tag: "⚡ PRODUCTIVITY",icon: "fa-bolt",         year: "2025", role: "Full Stack"        },
  { id: 9,  title: "EcoCart",        short: "Sustainable marketplace platform",     full: "Carbon tracking and ethical product discovery. B Corp certified and climate-positive. Serving 80k+ conscious consumers.",                               cat: "web",      tags: ["Next.js","Stripe"],               img: "https://picsum.photos/id/26/600/400",  tag: "🌿 GREEN LEADER",icon: "fa-leaf",         year: "2025", role: "Tech Lead"         },
  { id: 10, title: "PixelStack",     short: "3D WebGL storytelling",                full: "Interactive storytelling with real-time shaders and cinematic WebGL animations. Awarded at Awwwards.",                                                  cat: "web",      tags: ["Three.js","GSAP"],                img: "https://picsum.photos/id/42/600/400",  tag: "🎨 SHADER ART",  icon: "fa-palette",      year: "2024", role: "Creative Tech"     },
  { id: 11, title: "Morph Studio",   short: "Generative motion branding",           full: "Dynamic identity system with generative motion algorithms and expressive variable typography.",                                                          cat: "branding", tags: ["After Effects","Blender"],        img: "https://picsum.photos/id/47/600/400",  tag: "🌀 MOTION IO",   icon: "fa-circle-notch", year: "2025", role: "Motion Lead"       },
  { id: 12, title: "Lumina Wallet",  short: "Crypto DeFi mobile app",               full: "Decentralized wallet with token swaps, staking, and an integrated NFT gallery. Multi-chain support.",                                                   cat: "mobile",   tags: ["React Native","Web3"],            img: "https://picsum.photos/id/106/600/400", tag: "💰 CRYPTO PICK", icon: "fa-coins",        year: "2025", role: "Blockchain Dev"    },
  { id: 13, title: "Aura Health",    short: "Wellness tracking platform",           full: "Holistic health dashboard combining wearables, nutrition, sleep and mindfulness in a single cohesive experience.",                                       cat: "mobile",   tags: ["Swift","HealthKit"],              img: "https://picsum.photos/id/55/600/400",  tag: "❤️ WELLNESS",    icon: "fa-heart",        year: "2025", role: "Product Lead"      },
  { id: 14, title: "Prism Agency",   short: "Creative agency brand identity",       full: "Full brand rollout for a boutique creative studio — from wordmark to collateral, print, and digital presence.",                                         cat: "branding", tags: ["Sketch","InDesign"],              img: "https://picsum.photos/id/87/600/400",  tag: "🎨 BRAND AWARD", icon: "fa-palette",      year: "2024", role: "Brand Designer"    },
  { id: 15, title: "GridOS",         short: "Developer cloud dashboard",            full: "Realtime infrastructure monitoring, log streaming, and deployment pipelines for DevOps teams at scale.",                                                cat: "web",      tags: ["React","GraphQL","K8s"],          img: "https://picsum.photos/id/180/600/400", tag: "☁️ CLOUD OPS",   icon: "fa-cloud",        year: "2025", role: "Frontend Lead"     },
];

const catLabel = (c) =>
  c === "web" ? "Web App" : c === "mobile" ? "Mobile App" : "Branding";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --ink: #0b0d12;
    --surface: #f5f6fa;
    --card-bg: #ffffff;
    --accent: #3b5bdb;
    --accent2: #f76707;
    --muted: #6b7280;
    --chip-bg: #eef2ff;
    --chip-color: #3b5bdb;
  }

  .ps-wrap { background: var(--surface); font-family: 'DM Sans', sans-serif; color: var(--ink); min-height: 100vh; }

  .ps-section { max-width: 1700px; margin: 0 auto; padding: 4rem 2rem 6rem; }

  .ps-header { text-align: center; margin-bottom: 3rem; }
  .ps-header h1 { font-family: 'Syne', sans-serif; font-size: 2.8rem; font-weight: 800; letter-spacing: -0.03em; color: var(--ink); margin-bottom: 0.5rem; }
  .ps-header p { color: var(--muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto; }

  .ps-filters { display: flex; justify-content: center; gap: 0.6rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
  .ps-filter-btn { background: white; border: 1px solid #e5e7eb; padding: 0.5rem 1.2rem; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 500; cursor: pointer; transition: all 0.18s; color: var(--ink); }
  .ps-filter-btn:hover { border-color: var(--accent); color: var(--accent); }
  .ps-filter-btn.active { background: var(--ink); color: white; border-color: var(--ink); }

  .ps-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.1rem; }
  @media (max-width: 1300px) { .ps-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (max-width: 1000px) { .ps-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 700px)  { .ps-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 460px)  { .ps-grid { grid-template-columns: 1fr; } }

  .ps-card { position: relative; background: var(--card-bg); border-radius: 1.2rem; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.07); transition: transform 0.3s cubic-bezier(.2,.9,.4,1.1), box-shadow 0.3s; cursor: pointer; }
  .ps-card:hover { transform: translateY(-7px); box-shadow: 0 18px 40px rgba(0,0,0,0.15); }

  .ps-card-img { position: relative; height: 200px; overflow: hidden; background: #111; }
  .ps-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.45s cubic-bezier(.2,.9,.4,1.1); display: block; }
  .ps-card:hover .ps-card-img img { transform: scale(1.1); }

  .ps-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse at 15% 25%, rgba(59,91,219,0.3), rgba(10,14,26,0.72)); z-index: 2; transition: background 0.4s; pointer-events: none; }
  .ps-card:hover .ps-gradient { background: radial-gradient(ellipse at 85% 75%, rgba(247,103,7,0.45), rgba(0,0,0,0.88)); }

  .ps-tag { position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); color: white; font-family: 'Syne', sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.5px; padding: 5px 11px; border-radius: 50px; border-left: 3px solid var(--accent2); z-index: 10; display: flex; align-items: center; gap: 5px; transition: transform 0.2s; }
  .ps-card:hover .ps-tag { transform: translateX(3px); }

  .ps-orb { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.5); width: 52px; height: 52px; border-radius: 50%; background: rgba(255,255,255,0.12); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1.5px solid rgba(255,255,255,0.55); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem; z-index: 12; opacity: 0; transition: all 0.3s cubic-bezier(.2,.9,.5,1.3); pointer-events: none; }
  .ps-card:hover .ps-orb { opacity: 1; transform: translate(-50%, -50%) scale(1); }

  .ps-strip { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(110deg, rgba(0,0,0,0.9) 0%, rgba(20,20,55,0.95) 100%); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 10px 14px; transform: translateY(100%); transition: transform 0.38s cubic-bezier(.2,.9,.3,1.2); z-index: 13; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.15); }
  .ps-card:hover .ps-strip { transform: translateY(0); }

  .ps-strip-meta { display: flex; flex-direction: column; gap: 2px; }
  .ps-strip-meta strong { color: #fcd34d; font-size: 0.7rem; font-family: 'Syne', sans-serif; }
  .ps-strip-meta span { color: #94a3b8; font-size: 0.62rem; }

  .ps-strip-cta { background: var(--accent); color: white; border: none; padding: 5px 10px; border-radius: 50px; font-size: 0.6rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.2s; font-family: 'Syne', sans-serif; }
  .ps-card:hover .ps-strip-cta { background: var(--accent2); transform: translateX(3px); }

  .ps-card-body { padding: 1rem 1.1rem 1.1rem; background: white; }

  .ps-cat-chip { display: inline-block; background: var(--chip-bg); color: var(--chip-color); font-size: 0.6rem; font-weight: 700; padding: 0.18rem 0.7rem; border-radius: 20px; margin-bottom: 0.5rem; font-family: 'Syne', sans-serif; letter-spacing: 0.3px; }

  .ps-card-body h3 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; line-height: 1.3; }
  .ps-card-body p { font-size: 0.73rem; color: var(--muted); margin-bottom: 0.7rem; line-height: 1.5; }

  .ps-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 0.7rem; }
  .ps-tags span { background: #f1f5f9; color: #475569; font-size: 0.58rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 20px; }

  .ps-view-btn { width: 100%; background: var(--ink); color: white; border: none; padding: 0.55rem 0; border-radius: 50px; font-size: 0.7rem; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; letter-spacing: 0.5px; transition: background 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .ps-view-btn:hover { background: var(--accent); }

  /* Modal */
  .ps-modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.92); backdrop-filter: blur(12px); z-index: 2000; overflow-y: auto; padding: 2rem; }
  .ps-modal-backdrop.open { display: block; }
  .ps-modal-box { max-width: 900px; margin: 2rem auto; background: white; border-radius: 1.5rem; overflow: hidden; animation: psPopIn 0.22s ease; }
  @keyframes psPopIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }

  .ps-modal-top { background: var(--ink); padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
  .ps-modal-top h2 { color: white; font-family: 'Syne', sans-serif; font-size: 1.1rem; }
  .ps-modal-close { background: rgba(255,255,255,0.15); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 0.9rem; transition: background 0.2s; }
  .ps-modal-close:hover { background: rgba(255,255,255,0.3); }

  .ps-modal-img { width: 100%; max-height: 320px; object-fit: cover; display: block; }
  .ps-modal-body { padding: 1.5rem; }
  .ps-modal-desc { font-size: 0.9rem; line-height: 1.65; color: #374151; margin-bottom: 1.2rem; }
  .ps-modal-meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.8rem; background: #f8fafc; padding: 1rem; border-radius: 1rem; margin-bottom: 1.2rem; }
  .ps-meta-label { font-family: 'Syne', sans-serif; font-size: 0.62rem; font-weight: 700; color: var(--accent); margin-bottom: 2px; }
  .ps-meta-val { font-size: 0.85rem; color: var(--ink); }

  .ps-modal-actions { display: flex; gap: 0.8rem; margin-top: 1rem; }
  .ps-btn-a { padding: 0.55rem 1.2rem; border-radius: 50px; font-weight: 600; font-size: 0.8rem; background: var(--accent); color: white; border: none; cursor: pointer; }
  .ps-btn-b { padding: 0.55rem 1.2rem; border-radius: 50px; font-weight: 600; font-size: 0.8rem; background: white; color: var(--ink); border: 1.5px solid #e5e7eb; cursor: pointer; }

  /* Zoom */
  .ps-zoom-backdrop { display: none; position: fixed; inset: 0; background: #000; z-index: 3000; justify-content: center; align-items: center; cursor: zoom-out; }
  .ps-zoom-backdrop.open { display: flex; }
  .ps-zoom-backdrop img { max-width: 90vw; max-height: 90vh; border-radius: 0.8rem; }

  .ps-empty { grid-column: 1 / -1; text-align: center; padding: 3rem; color: #6b7280; }
`;

function Card({ project, onOpen, onZoom }) {
  return (
    <div className="ps-card">
      <div className="ps-card-img" onClick={() => onZoom(project.img)}>
        <img src={project.img} alt={project.title} loading="lazy" />
        <div className="ps-gradient" />
        <div className="ps-tag">
          <i className={`fas ${project.icon}`} /> {project.tag}
        </div>
        <div className="ps-orb">
          <i className="fas fa-expand" />
        </div>
        <div className="ps-strip">
          <div className="ps-strip-meta">
            <strong><i className="far fa-calendar" /> {project.year}</strong>
            <span>{project.role}</span>
          </div>
          <button
            className="ps-strip-cta"
            onClick={(e) => { e.stopPropagation(); onOpen(project.id); }}
          >
            <i className="fas fa-arrow-right" /> View
          </button>
        </div>
      </div>
      <div className="ps-card-body">
        <div className="ps-cat-chip">{catLabel(project.cat)}</div>
        <h3>{project.title}</h3>
        <p>{project.short}</p>
        <div className="ps-tags">
          {project.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
        <button className="ps-view-btn" onClick={() => onOpen(project.id)}>
          <i className="fas fa-info-circle" /> VIEW DETAILS
        </button>
      </div>
    </div>
  );
}

function Modal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className={`ps-modal-backdrop open`} onClick={(e) => { if (e.target.classList.contains("ps-modal-backdrop")) onClose(); }}>
      <div className="ps-modal-box">
        <div className="ps-modal-top">
          <h2><i className="fas fa-cube" /> {project.title}</h2>
          <button className="ps-modal-close" onClick={onClose}>
            <i className="fas fa-times" />
          </button>
        </div>
        <img className="ps-modal-img" src={project.img} alt={project.title} />
        <div className="ps-modal-body">
          <p className="ps-modal-desc">{project.full}</p>
          <div className="ps-modal-meta">
            <div><div className="ps-meta-label">TECH STACK</div><div className="ps-meta-val">{project.tags.join(", ")}</div></div>
            <div><div className="ps-meta-label">YEAR</div><div className="ps-meta-val">{project.year}</div></div>
            <div><div className="ps-meta-label">ROLE</div><div className="ps-meta-val">{project.role}</div></div>
            <div><div className="ps-meta-label">CATEGORY</div><div className="ps-meta-val">{catLabel(project.cat)}</div></div>
          </div>
          <div className="ps-modal-actions">
            <button className="ps-btn-a"><i className="fas fa-external-link-alt" /> Full Case Study</button>
            <button className="ps-btn-b"><i className="fas fa-github" /> GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoomViewer({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!src) return null;
  return (
    <div className="ps-zoom-backdrop open" onClick={onClose}>
      <img src={src} alt="zoom" />
    </div>
  );
}

const FILTERS = [
  { key: "all",      label: "All",      icon: "fa-th"          },
  { key: "web",      label: "Web",      icon: "fa-globe"       },
  { key: "branding", label: "Branding", icon: "fa-paintbrush"  },
  { key: "mobile",   label: "Mobile",   icon: "fa-mobile-alt"  },
];

export default function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalId, setModalId]           = useState(null);
  const [zoomSrc, setZoomSrc]           = useState(null);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.cat === activeFilter);

  const modalProject = projects.find((p) => p.id === modalId) ?? null;

  const closeModal = useCallback(() => setModalId(null), []);
  const closeZoom  = useCallback(() => setZoomSrc(null), []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalId || zoomSrc ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalId, zoomSrc]);

  return (
    <>
      <style>{styles}</style>
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />

      <div className="ps-wrap">
        <section className="ps-section">
          <div className="ps-header">
            <h1>Portfolio Showcase</h1>
            <p>Hover each card to reveal all 5 layers: image · gradient · tag · zoom orb · slide strip.</p>
          </div>

          <div className="ps-filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`ps-filter-btn${activeFilter === f.key ? " active" : ""}`}
                onClick={() => setActiveFilter(f.key)}
              >
                <i className={`fas ${f.icon}`} /> {f.label}
              </button>
            ))}
          </div>

          <div className="ps-grid">
            {filtered.length === 0 ? (
              <div className="ps-empty">No projects match.</div>
            ) : (
              filtered.map((p) => (
                <Card
                  key={p.id}
                  project={p}
                  onOpen={setModalId}
                  onZoom={setZoomSrc}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {modalProject && <Modal project={modalProject} onClose={closeModal} />}
      {zoomSrc      && <ZoomViewer src={zoomSrc} onClose={closeZoom} />}
    </>
  );
}
