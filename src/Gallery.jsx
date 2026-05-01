import { useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const BRANDING_ITEMS = [
  "Brand Identity","Posters","Brand Moodboard","Billboard",
  "Logo & Application","Publications","Business Card","Menu Board",
  "Letterhead","Handheld Menu","Company Profile","Invitation",
  "Brochure","Wall Mural","Flyer","Illustration",
  "Catalogue","Packaging Design","Banners","& More",
];

const WEB_ITEMS = [
  "Web Design","Online Listings","Web Devt","S.E.O.",
  "Sitemap & Strategy","FB Ads","FB Site Design","Google Ads",
  "Social Media Post","Newsletter Design","Banner Ads","Email Web Blast",
];

const OTHER_ITEMS = [
  "Interior Look & Feel","Outdoor Photography","Signage Design","Studio Photography",
  "Construction Support","AVP Presentations","Booth Design","Video Editing",
  "Food Photography","3D Modeling","Indoor Photography","3D Animation",
  "Photo Editing",
];

const REPAIR_ITEMS = [
  "Electronics Repair","Appliance Repair","Phone & Tablet Repair","Laptop Repair",
  "Gadget Troubleshooting","Screen Replacement","Battery Replacement","Water Damage Repair",
  "Hardware Upgrade","Software Installation","Data Recovery","Preventive Maintenance",
];

const VIDEO_ITEMS = [
  "Corporate Video","Social Media Reels","Product Demo Video","Event Coverage",
  "Motion Graphics","Animation Video","Documentary","YouTube Production",
  "Video Ads","Drone Footage","Post-Production","Color Grading",
];

const PHOTO_EDITING_ITEMS = [
  "Portrait Retouching","Skin Smoothing","Blemish Removal","Eye Enhancement",
  "Background Removal","Background Replacement","Color Correction","Exposure Adjustment",
  "Photo Restoration","Object Removal","Shadow & Highlight","Teeth Whitening",
  "Body Reshaping","Hair Retouching","Makeup Enhancement","Frequency Separation",
  "HDR Editing","Composite Editing","Product Photo Edit","Batch Editing",
];

const serviceImages = {
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  web: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
  other: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  repair: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80",
  video: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
  photo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
};

const SERVICE_CATEGORIES = ["Branding", "Web & Online", "Other Services", "Repair Services", "Video Editing", "Photo Editing"];

// ─── RESPONSIVE STYLES ──────────────────────────────────────────────────────

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .services-page { font-family: 'Segoe UI', sans-serif; }

  /* ── Hero ── */
  .hero {
    position: relative; overflow: hidden; min-height: 480px;
    display: flex; align-items: center; background: #0a1628;
  }
  .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg,#0a1628 0%,#0d2a3a 40%,#003d4d 100%); z-index: 0; }
  .hero-glow1 { position: absolute; top: -80px; right: -60px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle,rgba(0,188,212,0.18) 0%,transparent 70%); z-index: 0; }
  .hero-glow2 { position: absolute; bottom: -100px; left: 30%; width: 350px; height: 350px; border-radius: 50%; background: radial-gradient(circle,rgba(0,188,212,0.10) 0%,transparent 70%); z-index: 0; }
  .hero-grid { position: absolute; inset: 0; background-image: repeating-linear-gradient(120deg,transparent,transparent 60px,rgba(0,188,212,0.03) 60px,rgba(0,188,212,0.03) 61px); z-index: 0; }
  .hero-stripe { position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: linear-gradient(to bottom,#00bcd4,#0097a7,transparent); z-index: 2; }
  .hero-inner {
    position: relative; z-index: 2;
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 70px 80px; gap: 40px;
  }
  .hero-content { max-width: 560px; }
  .hero-eyebrow { display: inline-flex; align-items: center; gap: 14px; margin-bottom: 26px; }
  .hero-eyebrow-line { display: inline-block; width: 48px; height: 3px; border-radius: 2px; }
  .hero-eyebrow-text { color: #00e5ff; font-weight: 900; font-size: 20px; letter-spacing: 6px; text-transform: uppercase; text-shadow: 0 0 20px rgba(0,229,255,0.45); }
  .hero-title { margin-bottom: 10px; line-height: 1.05; }
  .hero-title-white { display: block; color: #fff; font-size: clamp(28px,4.5vw,54px); font-weight: 800; letter-spacing: -1px; }
  .hero-title-grad { display: block; font-size: clamp(28px,4.5vw,54px); font-weight: 900; letter-spacing: -1px; background: linear-gradient(90deg,#00e5ff,#00bcd4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-divider { width: 60px; height: 3px; background: linear-gradient(90deg,#00bcd4,transparent); margin: 22px 0 24px; border-radius: 2px; }
  .hero-list { list-style: none; margin-bottom: 36px; }
  .hero-list li { display: flex; align-items: center; color: rgba(255,255,255,0.85); font-size: 15px; margin-bottom: 12px; gap: 14px; }
  .hero-list-dot { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid rgba(0,188,212,0.6); flex-shrink: 0; }
  .hero-list-inner { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #00bcd4; }
  .hero-cta { position: relative; overflow: hidden; background: linear-gradient(90deg,#00bcd4,#0097a7); color: #fff; border: none; padding: 15px 40px; font-weight: 800; font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; border-radius: 2px; box-shadow: 0 8px 32px rgba(0,188,212,0.35); transition: transform 0.2s, box-shadow 0.2s; }
  .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,188,212,0.5); }
  .hero-visual { position: relative; flex-shrink: 0; width: 360px; height: 360px; }
  .hero-wave { position: absolute; bottom: 0; left: 0; right: 0; z-index: 1; }

  /* ── Service Cards ── */
  .cards-section { background: #f4f4f4; padding: 0 60px 60px; }
  .cards-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; max-width: 1100px; margin: 0 auto; }
  .card { background: #fff; overflow: hidden; border: 1px solid #e8e8e8; position: relative; }
  .card-img-wrap { height: 200px; overflow: hidden; }
  .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; }
  .card-body { padding: 28px 28px 32px; }
  .card-title { font-size: 22px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
  .card-desc { color: #00bcd4; font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
  .card-accent-bar { height: 4px; position: absolute; top: 0; left: 0; right: 0; z-index: 1; }
  .card-title-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .card-title-stripe { display: inline-block; width: 4px; height: 24px; border-radius: 2px; }

  /* Service list */
  .service-list { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; margin-top: 12px; }
  .service-item { display: flex; align-items: flex-start; font-size: 13.5px; color: #333; }
  .service-dot { display: inline-block; width: 10px; height: 10px; background: #00bcd4; margin-right: 10px; flex-shrink: 0; margin-top: 3px; }

  /* Inquire btn */
  .inquire-btn-wrap { margin-top: 24px; text-align: center; }
  .inquire-btn { background: #00bcd4; color: #fff; border: none; padding: 11px 32px; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .inquire-btn:hover { background: #00a3b8; }

  /* ── CTA Banner ── */
  .cta-banner { background: #00bcd4; padding: 22px 60px; text-align: center; }
  .cta-banner p { color: #fff; font-weight: 700; font-size: 18px; }

  /* ── Brand Statement ── */
  .brand-stmt { position: relative; min-height: 280px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0d2d4a; }
  .brand-grid-bg { position: absolute; inset: 0; background: repeating-linear-gradient(90deg,rgba(0,188,212,0.07) 0px,rgba(0,188,212,0.07) 1px,transparent 1px,transparent 80px),repeating-linear-gradient(0deg,rgba(0,188,212,0.07) 0px,rgba(0,188,212,0.07) 1px,transparent 1px,transparent 80px); z-index: 1; }
  .brand-watermark { position: absolute; top: 50%; transform: translateY(-50%); opacity: 0.07; font-size: 52px; font-weight: 900; color: #00bcd4; letter-spacing: 4px; white-space: nowrap; user-select: none; pointer-events: none; z-index: 1; }
  .brand-content { position: relative; z-index: 2; max-width: 820px; text-align: center; padding: 50px 40px; }
  .brand-content p:first-child { color: #00bcd4; font-weight: 700; font-size: clamp(14px,2vw,18px); line-height: 1.7; margin-bottom: 20px; }
  .brand-content p:nth-child(2) { color: #ccc; font-size: 14px; margin-bottom: 28px; }
  .brand-btn { background: #00bcd4; color: #fff; border: none; padding: 14px 36px; font-weight: 700; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; }

  /* ── Modal ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.78); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px); }
  .modal-box { background: #0f1624; border: 1px solid #1e3a5a; border-radius: 8px; width: 100%; max-width: 700px; max-height: 92vh; overflow: auto; position: relative; box-shadow: 0 24px 80px rgba(0,0,0,0.7); }
  .modal-header { background: #00bcd4; padding: 18px 28px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 10; }
  .modal-header-label { color: #0a3344; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
  .modal-header-title { color: #fff; font-size: 20px; font-weight: 800; }
  .modal-close { background: rgba(0,0,0,0.2); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; }
  .modal-body { padding: 24px 28px 32px; }
  .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px; }
  .form-label { font-size: 12px; color: #aaa; margin-bottom: 5px; display: block; letter-spacing: 0.5px; }
  .form-input { width: 100%; padding: 10px 14px; background: #1a1a2e; border: 1px solid #2a3a5a; border-radius: 4px; color: #e0e0e0; font-size: 14px; outline: none; box-sizing: border-box; }
  .form-input.error { border-color: #e74c3c; }
  .form-error { color: #e74c3c; font-size: 11px; margin: 3px 0 0; }
  .svc-check-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 7px 10px; }
  .svc-section { background: #141c30; border-radius: 6px; padding: 14px 16px; margin-bottom: 10px; }
  .svc-section-title { font-size: 11.5px; font-weight: 700; margin: 0 0 10px; letter-spacing: 1px; text-transform: uppercase; }
  .selected-summary { background: #071a0e; border: 1px solid #00bcd4; border-radius: 4px; padding: 10px 14px; margin: 16px 0 0; }
  .selected-label { color: #00bcd4; font-size: 11px; font-weight: 700; margin: 0 0 5px; text-transform: uppercase; letter-spacing: 1px; }
  .selected-items { color: #ccc; font-size: 12.5px; margin: 0; line-height: 1.7; }
  .preview-btn { width: 100%; padding: 13px; background: #00bcd4; color: #fff; border: none; font-weight: 800; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; margin-top: 20px; }
  .preview-btn:hover { background: #00a3b8; }
  .email-preview-box { background: #141c30; border: 1px solid #2a3a5a; border-radius: 6px; overflow: hidden; margin-bottom: 20px; }
  .email-header { padding: 14px 18px; border-bottom: 1px solid #2a3a5a; }
  .email-row { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 5px; }
  .email-lbl { color: #888; font-size: 12px; width: 40px; flex-shrink: 0; }
  .email-body-pre { margin: 0; padding: 18px; color: #ccc; font-size: 13px; line-height: 1.9; white-space: pre-wrap; font-family: 'Courier New', monospace; background: #0d1625; }
  .attach-tips { background: #111c2e; border: 1px solid #1e3a2a; border-radius: 6px; padding: 14px 16px; margin-bottom: 20px; }
  .attach-title { color: #00bcd4; font-weight: 700; font-size: 13px; margin: 0 0 10px; }
  .tip-row { display: flex; gap: 10px; margin-bottom: 7px; align-items: flex-start; }
  .tip-num { background: #00bcd4; color: #fff; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .tip-text { color: #aaa; font-size: 12.5px; line-height: 1.6; }
  .modal-btns { display: flex; gap: 12px; }
  .btn-edit { flex: 1; padding: 12px; background: transparent; border: 1px solid #2a3a5a; color: #aaa; font-weight: 700; font-size: 13px; cursor: pointer; letter-spacing: 1px; }
  .btn-send { flex: 2; padding: 12px; background: #00bcd4; color: #fff; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; text-decoration: none; text-transform: uppercase; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s; }
  .btn-send:hover { background: #00a3b8; }
  .cats-wrap { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }

  /* ── RESPONSIVE ── */

  /* Tablet: ≤ 900px */
  @media (max-width: 900px) {
    .hero-inner { flex-direction: column; padding: 50px 40px 60px; text-align: center; }
    .hero-eyebrow { justify-content: center; }
    .hero-list li { justify-content: center; }
    .hero-visual { display: none; }
    .hero-content { max-width: 100%; }
    .cards-section { padding: 0 24px 40px; }
    .cards-row { grid-template-columns: 1fr; }
    .card { border-left: 1px solid #e8e8e8 !important; border-right: 1px solid #e8e8e8 !important; border-top: none; }
    .card:first-child { border-top: 1px solid #e8e8e8 !important; }
    .cta-banner { padding: 20px 24px; }
    .brand-content { padding: 40px 24px; }
    .svc-check-grid { grid-template-columns: repeat(2,1fr); }
    .form-grid-2 { grid-template-columns: 1fr; }
    .modal-body { padding: 20px 20px 28px; }
    .modal-header { padding: 16px 20px; }
  }

  /* Mobile: ≤ 600px */
  @media (max-width: 600px) {
    .hero-inner { padding: 40px 20px 50px; }
    .hero-eyebrow-text { font-size: 14px; letter-spacing: 3px; }
    .hero-eyebrow-line { width: 28px; }
    .hero-list { display: none; }
    .hero-cta { padding: 14px 28px; font-size: 12px; letter-spacing: 1.5px; }
    .cards-section { padding: 0 0 32px; }
    .card { border-radius: 0; border-left: none !important; border-right: none !important; }
    .card-body { padding: 20px 16px 24px; }
    .card-title { font-size: 18px; }
    .service-list { grid-template-columns: 1fr; }
    .service-item { font-size: 13px; }
    .cta-banner { padding: 18px 16px; }
    .cta-banner p { font-size: 14px; }
    .brand-content { padding: 32px 16px; }
    .brand-watermark { display: none; }
    .svc-check-grid { grid-template-columns: 1fr 1fr; }
    .cats-wrap { gap: 8px; }
    .modal-btns { flex-direction: column; }
    .btn-send { flex: unset; }
    .btn-edit { flex: unset; }
    .modal-box { border-radius: 6px; }
    .modal-header { padding: 14px 16px; }
    .modal-header-title { font-size: 17px; }
    .modal-body { padding: 16px 14px 24px; }
    .email-body-pre { font-size: 11px; padding: 14px; }
    .attach-tips { padding: 12px; }
  }
`;

// ─── SMALL COMPONENTS ───────────────────────────────────────────────────────

const ServiceList = ({ items }) => (
  <div className="service-list">
    {items.map(item => (
      <div key={item} className="service-item">
        <span className="service-dot" />
        {item}
      </div>
    ))}
  </div>
);

const InquireBtn = ({ onClick }) => (
  <div className="inquire-btn-wrap">
    <button className="inquire-btn" onClick={onClick}>INQUIRE NOW</button>
  </div>
);

const SvcCheck = ({ label, checked, onChange }) => (
  <label style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer", fontSize:12.5, color: checked ? "#00bcd4" : "#bbb", fontWeight: checked ? 700 : 400, userSelect:"none" }}>
    <span style={{ display:"inline-block", width:13, height:13, border:`2px solid ${checked ? "#00bcd4" : "#444"}`, background: checked ? "#00bcd4" : "transparent", flexShrink:0, transition:"all 0.15s" }} />
    <input type="checkbox" checked={checked} onChange={onChange} style={{ display:"none" }} />
    {label}
  </label>
);

// ─── INQUIRY MODAL ──────────────────────────────────────────────────────────

function InquiryModal({ open, onClose, defaultCategory }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", address:"", message:"" });
  const [selItems, setSelItems] = useState([]);
  const [selCats, setSelCats] = useState(defaultCategory ? [defaultCategory] : []);
  const [step, setStep] = useState("form");
  const [errors, setErrors] = useState({});

  const toggleItem = (item) => setSelItems(p => p.includes(item) ? p.filter(x => x !== item) : [...p, item]);
  const toggleCat = (cat) => setSelCats(p => p.includes(cat) ? p.filter(x => x !== cat) : [...p, cat]);

  if (!open) return null;

  const allSelected = [...new Set([...selCats, ...selItems])];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (allSelected.length === 0) e.services = "Please select at least one service";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const emailBody =
`Hi,

I would like to inquire about the following services:

Categories: ${selCats.length ? selCats.join(", ") : "N/A"}
Specific Items: ${selItems.length ? selItems.join(", ") : "N/A"}

Name: ${form.name}
Phone: ${form.phone || "N/A"}
Address: ${form.address || "N/A"}

Message / Project Details:
${form.message || "N/A"}

Looking forward to hearing from you.

Best regards,
${form.name}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Creationniel6@gmail.com&su=${encodeURIComponent("Service Inquiry — " + allSelected.slice(0,3).join(", "))}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <p className="modal-header-label">Get In Touch</p>
            <h2 className="modal-header-title">{step === "form" ? "Make an Inquiry" : "Email Preview"}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {step === "form" ? (
          <div className="modal-body">
            <div className="form-grid-2">
              <div>
                <label className="form-label">Name <span style={{ color:"#00bcd4" }}>*</span></label>
                <input className={`form-input${errors.name ? " error" : ""}`} placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))} />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div>
                <label className="form-label">Email <span style={{ color:"#00bcd4" }}>*</span></label>
                <input className={`form-input${errors.email ? " error" : ""}`} placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))} />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
            </div>
            <div className="form-grid-2">
              <div>
                <label className="form-label">Phone Number <span style={{ color:"#555", fontSize:10 }}>(optional)</span></label>
                <input className="form-input" placeholder="+63 912 345 6789" value={form.phone} onChange={e => setForm(f => ({ ...f, phone:e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Address <span style={{ color:"#555", fontSize:10 }}>(optional)</span></label>
                <input className="form-input" placeholder="City, Country" value={form.address} onChange={e => setForm(f => ({ ...f, address:e.target.value }))} />
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label className="form-label">Message / Project Details</label>
              <textarea className="form-input" style={{ minHeight:80, resize:"vertical" }} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm(f => ({ ...f, message:e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize:13, color:"#e0e0e0", marginBottom:10, display:"block", letterSpacing:0.5 }}>
                Services Interested In <span style={{ color:"#00bcd4" }}>*</span>
              </label>
              {errors.services && <p className="form-error" style={{ marginBottom:10 }}>{errors.services}</p>}
              <div className="cats-wrap">
                {SERVICE_CATEGORIES.map(cat => (
                  <SvcCheck key={cat} label={cat} checked={selCats.includes(cat)} onChange={() => toggleCat(cat)} />
                ))}
              </div>
              {[
                { title:"📌 Branding Items", color:"#00bcd4", items:BRANDING_ITEMS },
                { title:"🌐 Web & Online Items", color:"#00bcd4", items:WEB_ITEMS },
                { title:"🎨 Other Service Items", color:"#00bcd4", items:OTHER_ITEMS },
                { title:"🔧 Repair Service Items", color:"#2ecc71", items:REPAIR_ITEMS },
                { title:"🎬 Video Editing Items", color:"#e74c8b", items:VIDEO_ITEMS },
                { title:"📸 Photo Editing Items", color:"#f39c12", items:PHOTO_EDITING_ITEMS },
              ].map(({ title, color, items }) => (
                <div key={title} className="svc-section">
                  <p className="svc-section-title" style={{ color }}>{title}</p>
                  <div className="svc-check-grid">
                    {items.map(item => <SvcCheck key={item} label={item} checked={selItems.includes(item)} onChange={() => toggleItem(item)} />)}
                  </div>
                </div>
              ))}
            </div>
            {allSelected.length > 0 && (
              <div className="selected-summary">
                <p className="selected-label">✔ Selected ({allSelected.length}):</p>
                <p className="selected-items">{allSelected.join(" · ")}</p>
              </div>
            )}
            <button className="preview-btn" onClick={() => validate() && setStep("preview")}>✉ PREVIEW EMAIL</button>
          </div>
        ) : (
          <div className="modal-body">
            <div className="email-preview-box">
              <div className="email-header">
                {[
                  ["To:", "Creationniel6@gmail.com", "#00bcd4"],
                  ["From:", form.email, "#e0e0e0"],
                  ["Sub:", `Service Inquiry — ${allSelected.slice(0,3).join(", ")}${allSelected.length > 3 ? ` +${allSelected.length-3} more` : ""}`, "#e0e0e0"],
                ].map(([lbl, val, col]) => (
                  <div key={lbl} className="email-row">
                    <span className="email-lbl">{lbl}</span>
                    <span style={{ color:col, fontSize:13, fontWeight: lbl === "Sub:" ? 600 : 400 }}>{val}</span>
                  </div>
                ))}
              </div>
              <pre className="email-body-pre">{emailBody}</pre>
            </div>
            <div className="attach-tips">
              <p className="attach-title">📎 How to attach files in Gmail (after clicking Send)</p>
              {[
                `After you click "Send Message", Gmail will open in a new tab with your message pre-filled.`,
                "Look for the Attach files icon (paperclip) at the bottom of the compose window.",
                "Click the paperclip icon, then select images, documents, or any files from your computer.",
                "You can also drag & drop files directly into the email window.",
                "Once files are attached, review your message and click Send.",
              ].map((tip, i) => (
                <div key={i} className="tip-row">
                  <span className="tip-num">{i+1}</span>
                  <p className="tip-text">{tip}</p>
                </div>
              ))}
              <p style={{ color:"#555", fontSize:11, marginTop:10 }}>💡 Pro tip: Max attachment in Gmail is 25MB. For larger files, share via Google Drive link.</p>
            </div>
            <div className="modal-btns">
              <button className="btn-edit" onClick={() => setStep("form")}>← EDIT</button>
              <a className="btn-send" href={gmailUrl} target="_blank" rel="noopener noreferrer">✈ SEND MESSAGE</a>
            </div>
            <p style={{ color:"#555", fontSize:11.5, textAlign:"center", marginTop:10 }}>
              Gmail will open with your message — simply attach your files using the paperclip icon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [modal, setModal] = useState({ open:false, category:null });
  const openModal = (cat) => setModal({ open:true, category:cat });
  const closeModal = () => setModal({ open:false, category:null });

  return (
    <div className="services-page">
      <style>{styles}</style>

      <InquiryModal open={modal.open} onClose={closeModal} defaultCategory={modal.category} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-glow1" />
        <div className="hero-glow2" />
        <div className="hero-grid" />
        <div className="hero-stripe" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" style={{ background:"linear-gradient(90deg,#00bcd4,#00e5ff)" }} />
              <span className="hero-eyebrow-text">Our Services</span>
              <span className="hero-eyebrow-line" style={{ background:"linear-gradient(90deg,#00e5ff,#00bcd4)" }} />
            </div>
            <h1 className="hero-title">
              <span className="hero-title-white">Top Agency Quality</span>
              <span className="hero-title-white">at only the</span>
              <span className="hero-title-grad">Fraction of the price</span>
            </h1>
            <div className="hero-divider" />
            <ul className="hero-list">
              {[
                "High Caliber Professional Branding & Applications",
                "Marketing Strategy & Marketing Collaterals",
                "Website Design, Development, & Custom Features",
                "Complete Branding of Print, Web, Interior, and More",
              ].map((item, i) => (
                <li key={i}>
                  <span className="hero-list-dot"><span className="hero-list-inner" /></span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="hero-cta" onClick={() => openModal(null)}>MAKE AN INQUIRY →</button>
          </div>

          {/* Orbital visual — hidden on tablet/mobile via CSS */}
          <div className="hero-visual">
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1px solid rgba(0,188,212,0.15)" }} />
            <div style={{ position:"absolute", inset:20, borderRadius:"50%", border:"1px dashed rgba(0,188,212,0.2)" }} />
            <div style={{ position:"absolute", inset:50, borderRadius:"50%", border:"1px solid rgba(0,188,212,0.1)", background:"rgba(0,188,212,0.04)" }} />
            <div style={{ position:"absolute", inset:"50%", transform:"translate(-50%,-50%)", width:120, height:120, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,188,212,0.25) 0%,transparent 70%)" }} />
            {[
              { label:"Branding", icon:"🎨", angle:0 },
              { label:"Web Dev", icon:"💻", angle:90 },
              { label:"Marketing", icon:"📣", angle:180 },
              { label:"Photography", icon:"📷", angle:270 },
            ].map(({ label, icon, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const r = 130, cx = 180, cy = 180;
              const x = cx + r * Math.sin(rad) - 42;
              const y = cy - r * Math.cos(rad) - 22;
              return (
                <div key={label} style={{ position:"absolute", left:x, top:y, background:"rgba(0,30,50,0.85)", border:"1px solid rgba(0,188,212,0.4)", borderRadius:8, padding:"8px 14px", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", gap:8, minWidth:84 }}>
                  <span style={{ fontSize:16 }}>{icon}</span>
                  <span style={{ color:"#fff", fontSize:11.5, fontWeight:600, whiteSpace:"nowrap" }}>{label}</span>
                </div>
              );
            })}
            <svg viewBox="0 0 120 140" width="120" height="140" style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", opacity:0.9 }}>
              <circle cx="60" cy="22" r="14" fill="none" stroke="#00bcd4" strokeWidth="2.5" />
              <line x1="60" y1="36" x2="60" y2="85" stroke="#00bcd4" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M60,50 Q35,38 22,48" stroke="#00bcd4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M60,50 Q85,38 98,48" stroke="#00bcd4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M60,85 Q45,105 36,120" stroke="#00bcd4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M60,85 Q75,105 84,120" stroke="#00bcd4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
            <div style={{ position:"absolute", bottom:10, right:10, background:"rgba(0,188,212,0.12)", border:"1px solid rgba(0,188,212,0.35)", borderRadius:8, padding:"10px 16px", textAlign:"center", backdropFilter:"blur(8px)" }}>
              <p style={{ color:"#00bcd4", fontSize:22, fontWeight:900, lineHeight:1 }}>100%</p>
              <p style={{ color:"rgba(255,255,255,0.7)", fontSize:10.5, marginTop:3, letterSpacing:0.5 }}>Client Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display:"block", width:"100%", height:40 }}>
            <path d="M0,20 Q360,0 720,20 Q1080,40 1440,20 L1440,40 L0,40 Z" fill="#f4f4f4" />
          </svg>
        </div>
      </section>

      {/* ── SERVICE CARDS ROW 1 ── */}
      <section className="cards-section">
        <div className="cards-row">
          {[
            { key:"branding", img:serviceImages.branding, bg:"#222", title:"Branding Services", desc:"We create brand identity that effectively communicates with our client's goals, target market, and strategy.", items:BRANDING_ITEMS, cat:"Branding" },
            { key:"web", img:serviceImages.web, bg:"#1a3a5c", title:"Web & Online", desc:"Each website we create aims to communicate our client's message while captivating their visitor to get interested in availing products and services.", items:WEB_ITEMS, cat:"Web & Online" },
            { key:"other", img:serviceImages.other, bg:"#3a3a2a", title:"Other Services", desc:"We specialize in doing any multimedia creative work and strategy that our clients need for branding. Don't hesitate to ask or inquire.", items:OTHER_ITEMS, cat:"Other Services" },
          ].map(({ key, img, bg, title, desc, items, cat }) => (
            <div key={key} className="card" style={{ borderTop: key === "branding" ? "1px solid #e8e8e8" : undefined }}>
              <div className="card-img-wrap" style={{ background:bg }}>
                <img src={img} alt={title} />
              </div>
              <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-desc">{desc}</p>
                <ServiceList items={items} />
                <InquireBtn onClick={() => openModal(cat)} />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="cards-row">
          {[
            { key:"repair", img:serviceImages.repair, bg:"#1a2a1a", title:"Repair Services", desc:"We provide fast, reliable repair solutions for your electronics, gadgets, and devices. From screen fixes to full hardware overhauls — we've got you covered.", items:REPAIR_ITEMS, cat:"Repair Services", accent:"#2ecc71" },
            { key:"video", img:serviceImages.video, bg:"#1a1a3a", title:"Video Editing", desc:"We craft compelling video content that tells your brand's story. From corporate films to social reels — professional editing that captivates your audience.", items:VIDEO_ITEMS, cat:"Video Editing", accent:"#e74c8b" },
            { key:"photo", img:serviceImages.photo, bg:"#2a1a0a", title:"Photo Editing", desc:"We deliver flawless photo retouching and enhancement services. From skin retouching to full composite editing — we make every image picture-perfect.", items:PHOTO_EDITING_ITEMS, cat:"Photo Editing", accent:"#f39c12" },
          ].map(({ key, img, bg, title, desc, items, cat, accent }) => (
            <div key={key} className="card" style={{ borderTop:"none" }}>
              <div className="card-accent-bar" style={{ background:`linear-gradient(90deg,${accent},#00bcd4)` }} />
              <div className="card-img-wrap" style={{ background:bg }}>
                <img src={img} alt={title} />
              </div>
              <div className="card-body">
                <div className="card-title-row">
                  <span className="card-title-stripe" style={{ background:`linear-gradient(to bottom,${accent},#00bcd4)` }} />
                  <h3 className="card-title" style={{ margin:0 }}>{title}</h3>
                </div>
                <p className="card-desc">{desc}</p>
                <ServiceList items={items} />
                <InquireBtn onClick={() => openModal(cat)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <p>Contact us now to get a FREE Consultation and Project Estimate</p>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section className="brand-stmt">
        <div className="brand-grid-bg" />
        <div className="brand-watermark" style={{ left:"5%" }}>WESTWOOD</div>
        <div className="brand-watermark" style={{ left:"50%" }}>WESTWOOD</div>
        <div className="brand-content">
          <p>
            We know how to guide SME & Corporate brands through the delicate process of reinvigorating their passion and how they communicate it through visual and aural touch points. We help traverse potential negative pushback from current brand fans while accentuating the potential for success. That's what you get when working with us.
          </p>
          <p>Don't spend on designers that don't work or understand what your business needs.</p>
          <button className="brand-btn" onClick={() => openModal(null)}>MAKE AN INQUIRY</button>
        </div>
      </section>
    </div>
  );
}
