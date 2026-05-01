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
];

const toPairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i += 2) pairs.push([arr[i], arr[i + 1]]);
  return pairs;
};

const serviceImages = {
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  web: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
  other: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
};

const SERVICE_CATEGORIES = ["Branding", "Web & Online", "Other Services"];

// ─── SMALL COMPONENTS ───────────────────────────────────────────────────────

const ServiceList = ({ items }) => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 16px", marginTop:12 }}>
    {toPairs(items).map(([a, b]) =>
      [a, b].map(item => item && (
        <div key={item} style={{ display:"flex", alignItems:"flex-start", fontSize:13.5, color:"#333" }}>
          <span style={{ display:"inline-block", width:10, height:10, background:"#00bcd4", marginRight:10, flexShrink:0, marginTop:3 }} />
          {item}
        </div>
      ))
    )}
  </div>
);

const InquireBtn = ({ onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ marginTop:24, textAlign:"center" }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ background: hov ? "#00a3b8" : "#00bcd4", color:"#fff", border:"none", padding:"11px 32px", fontWeight:700, fontSize:13, letterSpacing:1.5, textTransform:"uppercase", cursor:"pointer", transition:"background 0.2s" }}
      >
        INQUIRE NOW
      </button>
    </div>
  );
};

// ─── SERVICE CHECKBOX ───────────────────────────────────────────────────────

const SvcCheck = ({ label, checked, onChange }) => (
  <label style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer", fontSize:12.5, color: checked ? "#00bcd4" : "#bbb", fontWeight: checked ? 700 : 400, userSelect:"none" }}>
    <span style={{ display:"inline-block", width:13, height:13, border:`2px solid ${checked ? "#00bcd4" : "#444"}`, background: checked ? "#00bcd4" : "transparent", flexShrink:0, transition:"all 0.15s" }} />
    <input type="checkbox" checked={checked} onChange={onChange} style={{ display:"none" }} />
    {label}
  </label>
);

// ─── INQUIRY MODAL ──────────────────────────────────────────────────────────

const INPUT = {
  width:"100%", padding:"10px 14px", background:"#1a1a2e",
  border:"1px solid #2a3a5a", borderRadius:4, color:"#e0e0e0",
  fontSize:14, outline:"none", boxSizing:"border-box",
};
const LBL = { fontSize:12, color:"#aaa", marginBottom:5, display:"block", letterSpacing:0.5 };

function InquiryModal({ open, onClose, defaultCategory }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", address:"", message:"" });
  const [selItems, setSelItems] = useState([]);
  const [selCats, setSelCats] = useState(defaultCategory ? [defaultCategory] : []);
  const [step, setStep] = useState("form");
  const [errors, setErrors] = useState({});

  // Reset when modal opens with new category
  const prevOpen = useState(open)[0];

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
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.78)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:16, backdropFilter:"blur(4px)" }}
    >
      <div style={{ background:"#0f1624", border:"1px solid #1e3a5a", borderRadius:8, width:"100%", maxWidth:700, maxHeight:"92vh", overflow:"auto", position:"relative", boxShadow:"0 24px 80px rgba(0,0,0,0.7)" }}>

        {/* Header */}
        <div style={{ background:"#00bcd4", padding:"18px 28px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:10 }}>
          <div>
            <p style={{ color:"#0a3344", fontSize:11, fontWeight:700, letterSpacing:2, margin:0, textTransform:"uppercase" }}>Get In Touch</p>
            <h2 style={{ color:"#fff", margin:0, fontSize:20, fontWeight:800 }}>
              {step === "form" ? "Make an Inquiry" : "Email Preview"}
            </h2>
          </div>
          <button onClick={onClose} style={{ background:"rgba(0,0,0,0.2)", border:"none", color:"#fff", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:20, lineHeight:1, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>

        {step === "form" ? (
          <div style={{ padding:"24px 28px 32px" }}>

            {/* Name + Email */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:14 }}>
              <div>
                <label style={LBL}>Name <span style={{ color:"#00bcd4" }}>*</span></label>
                <input style={{ ...INPUT, borderColor: errors.name ? "#e74c3c" : "#2a3a5a" }} placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))} />
                {errors.name && <p style={{ color:"#e74c3c", fontSize:11, margin:"3px 0 0" }}>{errors.name}</p>}
              </div>
              <div>
                <label style={LBL}>Email <span style={{ color:"#00bcd4" }}>*</span></label>
                <input style={{ ...INPUT, borderColor: errors.email ? "#e74c3c" : "#2a3a5a" }} placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))} />
                {errors.email && <p style={{ color:"#e74c3c", fontSize:11, margin:"3px 0 0" }}>{errors.email}</p>}
              </div>
            </div>

            {/* Phone + Address */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:14 }}>
              <div>
                <label style={LBL}>Phone Number <span style={{ color:"#555", fontSize:10 }}>(optional)</span></label>
                <input style={INPUT} placeholder="+63 912 345 6789" value={form.phone} onChange={e => setForm(f => ({ ...f, phone:e.target.value }))} />
              </div>
              <div>
                <label style={LBL}>Address <span style={{ color:"#555", fontSize:10 }}>(optional)</span></label>
                <input style={INPUT} placeholder="City, Country" value={form.address} onChange={e => setForm(f => ({ ...f, address:e.target.value }))} />
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom:20 }}>
              <label style={LBL}>Message / Project Details</label>
              <textarea style={{ ...INPUT, minHeight:80, resize:"vertical" }} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm(f => ({ ...f, message:e.target.value }))} />
            </div>

            {/* Services Section */}
            <div>
              <label style={{ ...LBL, fontSize:13, color:"#e0e0e0", marginBottom:10 }}>
                Services Interested In <span style={{ color:"#00bcd4" }}>*</span>
              </label>
              {errors.services && <p style={{ color:"#e74c3c", fontSize:11.5, margin:"0 0 10px" }}>{errors.services}</p>}

              {/* Category pills */}
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:16 }}>
                {SERVICE_CATEGORIES.map(cat => (
                  <SvcCheck key={cat} label={cat} checked={selCats.includes(cat)} onChange={() => toggleCat(cat)} />
                ))}
              </div>

              {/* Branding */}
              <div style={{ background:"#141c30", borderRadius:6, padding:"14px 16px", marginBottom:10 }}>
                <p style={{ color:"#00bcd4", fontSize:11.5, fontWeight:700, margin:"0 0 10px", letterSpacing:1, textTransform:"uppercase" }}>📌 Branding Items</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"7px 10px" }}>
                  {BRANDING_ITEMS.map(item => <SvcCheck key={item} label={item} checked={selItems.includes(item)} onChange={() => toggleItem(item)} />)}
                </div>
              </div>

              {/* Web */}
              <div style={{ background:"#141c30", borderRadius:6, padding:"14px 16px", marginBottom:10 }}>
                <p style={{ color:"#00bcd4", fontSize:11.5, fontWeight:700, margin:"0 0 10px", letterSpacing:1, textTransform:"uppercase" }}>🌐 Web & Online Items</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"7px 10px" }}>
                  {WEB_ITEMS.map(item => <SvcCheck key={item} label={item} checked={selItems.includes(item)} onChange={() => toggleItem(item)} />)}
                </div>
              </div>

              {/* Other */}
              <div style={{ background:"#141c30", borderRadius:6, padding:"14px 16px" }}>
                <p style={{ color:"#00bcd4", fontSize:11.5, fontWeight:700, margin:"0 0 10px", letterSpacing:1, textTransform:"uppercase" }}>🎨 Other Service Items</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"7px 10px" }}>
                  {OTHER_ITEMS.map(item => <SvcCheck key={item} label={item} checked={selItems.includes(item)} onChange={() => toggleItem(item)} />)}
                </div>
              </div>
            </div>

            {/* Selected summary */}
            {allSelected.length > 0 && (
              <div style={{ background:"#071a0e", border:"1px solid #00bcd4", borderRadius:4, padding:"10px 14px", margin:"16px 0 0" }}>
                <p style={{ color:"#00bcd4", fontSize:11, fontWeight:700, margin:"0 0 5px", textTransform:"uppercase", letterSpacing:1 }}>✔ Selected ({allSelected.length}):</p>
                <p style={{ color:"#ccc", fontSize:12.5, margin:0, lineHeight:1.7 }}>{allSelected.join(" · ")}</p>
              </div>
            )}

            <button
              onClick={() => validate() && setStep("preview")}
              style={{ width:"100%", padding:13, background:"#00bcd4", color:"#fff", border:"none", fontWeight:800, fontSize:14, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", marginTop:20 }}
              onMouseEnter={e => (e.target.style.background = "#00a3b8")}
              onMouseLeave={e => (e.target.style.background = "#00bcd4")}
            >
              ✉ PREVIEW EMAIL
            </button>
          </div>
        ) : (
          /* EMAIL PREVIEW */
          <div style={{ padding:"24px 28px 32px" }}>
            <div style={{ background:"#141c30", border:"1px solid #2a3a5a", borderRadius:6, overflow:"hidden", marginBottom:20 }}>
              {/* Meta */}
              <div style={{ padding:"14px 18px", borderBottom:"1px solid #2a3a5a" }}>
                {[
                  ["To:", "Creationniel6@gmail.com", "#00bcd4"],
                  ["From:", form.email, "#e0e0e0"],
                  ["Sub:", `Service Inquiry — ${allSelected.slice(0,3).join(", ")}${allSelected.length > 3 ? ` +${allSelected.length-3} more` : ""}`, "#e0e0e0"],
                ].map(([lbl, val, col]) => (
                  <div key={lbl} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:5 }}>
                    <span style={{ color:"#888", fontSize:12, width:40, flexShrink:0 }}>{lbl}</span>
                    <span style={{ color:col, fontSize:13, fontWeight: lbl === "Sub:" ? 600 : 400 }}>{val}</span>
                  </div>
                ))}
              </div>
              {/* Body */}
              <pre style={{ margin:0, padding:"18px", color:"#ccc", fontSize:13, lineHeight:1.9, whiteSpace:"pre-wrap", fontFamily:"'Courier New', monospace", background:"#0d1625" }}>
                {emailBody}
              </pre>
            </div>

            {/* Attach tip */}
            <div style={{ background:"#111c2e", border:"1px solid #1e3a2a", borderRadius:6, padding:"14px 16px", marginBottom:20 }}>
              <p style={{ color:"#00bcd4", fontWeight:700, fontSize:13, margin:"0 0 10px" }}>📎 How to attach files in Gmail (after clicking Send)</p>
              {[
                `After you click "Send Message", Gmail will open in a new tab with your message pre-filled.`,
                "Look for the Attach files icon (paperclip) at the bottom of the compose window.",
                "Click the paperclip icon, then select Images, documents, or any files from your computer (design briefs, logos, references, etc.).",
                "You can also drag & drop files directly into the email window.",
                "Once files are attached, review your message and click Send — your attachments will be delivered along with the inquiry.",
              ].map((tip, i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom:7, alignItems:"flex-start" }}>
                  <span style={{ background:"#00bcd4", color:"#fff", borderRadius:"50%", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0, marginTop:1 }}>{i+1}</span>
                  <p style={{ color:"#aaa", fontSize:12.5, margin:0, lineHeight:1.6 }}>{tip}</p>
                </div>
              ))}
              <p style={{ color:"#555", fontSize:11, marginTop:10, marginBottom:0 }}>💡 Pro tip: Max attachment in Gmail is 25MB. For larger files, share via Google Drive link or compress first.</p>
            </div>

            <div style={{ display:"flex", gap:12 }}>
              <button onClick={() => setStep("form")} style={{ flex:1, padding:12, background:"transparent", border:"1px solid #2a3a5a", color:"#aaa", fontWeight:700, fontSize:13, cursor:"pointer", letterSpacing:1 }}>
                ← EDIT
              </button>
              <a
                href={gmailUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex:2, padding:12, background:"#00bcd4", color:"#fff", fontWeight:800, fontSize:13, letterSpacing:1.5, textDecoration:"none", textTransform:"uppercase", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#00a3b8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#00bcd4")}
              >
                ✈ SEND MESSAGE
              </a>
            </div>
            <p style={{ color:"#555", fontSize:11.5, textAlign:"center", marginTop:10, marginBottom:0 }}>
              Fill out this form, then click Send. Gmail will open with your message — simply attach your files using the paperclip icon.
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
    <div style={{ fontFamily:"'Segoe UI', sans-serif", margin:0, padding:0 }}>

      <InquiryModal open={modal.open} onClose={closeModal} defaultCategory={modal.category} />

      {/* ── HERO ── */}
      <section style={{ background:"#00bcd4", padding:"60px 80px", display:"flex", alignItems:"center", justifyContent:"space-between", minHeight:340, position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:520, zIndex:2, position:"relative" }}>
          <p style={{ color:"#1a4a6b", fontWeight:700, fontSize:13, letterSpacing:2, marginBottom:12, textTransform:"uppercase" }}>OUR SERVICES</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(28px,4vw,42px)", fontWeight:700, lineHeight:1.2, margin:"0 0 28px" }}>
            Top Agency Quality at only the<br />Fraction of the price
          </h1>
          <ul style={{ listStyle:"none", padding:0, margin:"0 0 32px" }}>
            {["High Caliber Professional Branding & Applications","Marketing Strategy & Marketing Collaterals","Website Design, Development, & Custom Features","Complete Branding of Print, Web, Interior, and More"].map((item, i) => (
              <li key={i} style={{ display:"flex", alignItems:"flex-start", color:"#fff", fontSize:15, marginBottom:10 }}>
                <span style={{ display:"inline-block", width:11, height:11, background:"#1a4a6b", marginRight:12, flexShrink:0, marginTop:4 }} />{item}
              </li>
            ))}
          </ul>
          <button onClick={() => openModal(null)} style={{ background:"#1a4a6b", color:"#fff", border:"none", padding:"12px 28px", fontWeight:700, fontSize:13, letterSpacing:1.5, textTransform:"uppercase", cursor:"pointer" }}>
            MAKE AN INQUIRY
          </button>
        </div>
        <div style={{ position:"absolute", right:0, top:0, width:"50%", height:"100%", opacity:0.18, background:"radial-gradient(ellipse at 70% 40%,#fff 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:2, width:340, height:280, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 320 280" width="320" height="280" style={{ opacity:0.85 }}>
            <ellipse cx="200" cy="140" rx="130" ry="130" fill="rgba(255,255,255,0.08)" />
            <ellipse cx="200" cy="140" rx="90" ry="90" fill="rgba(255,255,255,0.06)" />
            <path d="M60,180 Q120,100 200,140 Q260,170 290,120" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" />
            <circle cx="205" cy="95" r="14" fill="rgba(255,255,255,0.7)" />
            <path d="M205,109 L195,155 L220,170 L210,195" stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M200,125 L175,145 M200,125 L225,142" stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <line x1="80" y1="60" x2="160" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
            <line x1="240" y1="50" x2="300" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
          </svg>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section style={{ background:"#f4f4f4", padding:"0 60px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, maxWidth:1100, margin:"0 auto" }}>

          {[
            { key:"branding", img:serviceImages.branding, bg:"#222", title:"Branding Services", desc:"We create brand identity that effectively communicates with our client's goals, target market, and strategy.", items:BRANDING_ITEMS, cat:"Branding", border:"1px solid #e8e8e8" },
            { key:"web", img:serviceImages.web, bg:"#1a3a5c", title:"Web & Online", desc:"Each website we create aims to communicate our client's message while captivating their visitor to get interested in availing products and services.", items:WEB_ITEMS, cat:"Web & Online", border:"1px solid #e8e8e8", borderL:"none", borderR:"none" },
            { key:"other", img:serviceImages.other, bg:"#3a3a2a", title:"Other Services", desc:"We specialize in doing any multimedia creative work and strategy that our clients need for branding. Don't hesitate to ask or inquire.", items:OTHER_ITEMS, cat:"Other Services", border:"1px solid #e8e8e8" },
          ].map(({ key, img, bg, title, desc, items, cat, border, borderL, borderR }) => (
            <div key={key} style={{ background:"#fff", overflow:"hidden", border, borderLeft:borderL, borderRight:borderR }}>
              <div style={{ height:200, overflow:"hidden", background:bg }}>
                <img src={img} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.9 }} />
              </div>
              <div style={{ padding:"28px 28px 32px" }}>
                <h3 style={{ fontSize:22, fontWeight:700, color:"#1a1a1a", marginBottom:12 }}>{title}</h3>
                <p style={{ color:"#00bcd4", fontSize:14, lineHeight:1.6, marginBottom:16 }}>{desc}</p>
                <ServiceList items={items} />
                <InquireBtn onClick={() => openModal(cat)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background:"#00bcd4", padding:"22px 60px", textAlign:"center" }}>
        <p style={{ color:"#fff", fontWeight:700, fontSize:18, margin:0 }}>Contact us now to get a FREE Consultation and Project Estimate</p>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section style={{ position:"relative", minHeight:280, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", background:"#0d2d4a" }}>
        <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(90deg,rgba(0,188,212,0.07) 0px,rgba(0,188,212,0.07) 1px,transparent 1px,transparent 80px),repeating-linear-gradient(0deg,rgba(0,188,212,0.07) 0px,rgba(0,188,212,0.07) 1px,transparent 1px,transparent 80px)", zIndex:1 }} />
        {["5%","50%"].map((left, i) => (
          <div key={i} style={{ position:"absolute", top:"50%", left, transform:"translateY(-50%)", opacity:0.07, fontSize:52, fontWeight:900, color:"#00bcd4", letterSpacing:4, whiteSpace:"nowrap", userSelect:"none", pointerEvents:"none", zIndex:1 }}>WESTWOOD</div>
        ))}
        <div style={{ position:"relative", zIndex:2, maxWidth:820, textAlign:"center", padding:"50px 40px" }}>
          <p style={{ color:"#00bcd4", fontWeight:700, fontSize:"clamp(14px,2vw,18px)", lineHeight:1.7, marginBottom:20 }}>
            We know how to guide SME & Corporate brands through the delicate process of reinvigorating their passion and how they communicate it through visual and aural touch points. We help traverse potential negative pushback from current brand fans while accentuating the potential for success. That's what you get when working with us.
          </p>
          <p style={{ color:"#ccc", fontSize:14, marginBottom:28 }}>Don't spend on designers that don't work or understand what your business needs.</p>
          <button onClick={() => openModal(null)} style={{ background:"#00bcd4", color:"#fff", border:"none", padding:"14px 36px", fontWeight:700, fontSize:13, letterSpacing:2, textTransform:"uppercase", cursor:"pointer" }}>
            MAKE AN INQUIRY
          </button>
        </div>
      </section>
    </div>
  );
}
