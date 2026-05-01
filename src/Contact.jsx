import { useState, useEffect } from "react";

const MY_EMAIL = "creationniel6@gmail.com";

const SERVICES = [
  "Branding",
  "Digital Experiences",
  "Web Development",
  "Graphic Design",
  "Content Creation",
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');

  :root {
    --teal: #00b4b4;
    --teal-dark: #009090;
    --dark: #2d3748;
    --darker: #1a202c;
    --light-bg: #f0f0ec;
    --white: #ffffff;
    --gray: #6b7280;
    --light-gray: #e8e8e4;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body { font-family: 'Barlow', sans-serif; background: var(--light-bg); min-height: 100vh; }

  .cn-wrapper { font-family: 'Barlow', sans-serif; background: var(--light-bg); }

  .cn-hero {
    background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 100%),
      url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80') center/cover no-repeat;
    padding: 64px 48px 56px;
    position: relative;
  }
  .cn-hero::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 4px;
    background: var(--teal);
  }
  .cn-hero-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--teal); margin-bottom: 10px;
  }
  .cn-hero h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 6vw, 60px);
    font-weight: 800; color: var(--teal);
    line-height: 1.05; text-transform: uppercase;
  }

  .cn-main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 480px;
  }
  @media (max-width: 768px) {
    .cn-main-grid { grid-template-columns: 1fr; }
    .cn-hero { padding: 40px 24px; }
    .cn-left-panel, .cn-right-panel { padding: 36px 24px; }
    .cn-form-section { padding: 56px 24px; }
    .cn-form-row { grid-template-columns: 1fr !important; }
    footer.cn-footer { grid-template-columns: 1fr 1fr; }
    .cn-attach-guide { padding: 18px; }
    .cn-guide-step { gap: 12px; }
  }

  .cn-left-panel {
    background: var(--teal);
    padding: 56px 48px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .cn-left-panel h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 800; color: var(--white);
    line-height: 1.2; text-transform: uppercase; margin-bottom: 24px;
  }
  .cn-left-panel p {
    color: rgba(255,255,255,0.85);
    font-size: 15px; line-height: 1.75;
    margin-bottom: 14px; font-weight: 300;
  }

  .cn-right-panel { background: var(--light-bg); padding: 56px 48px; }
  .cn-panel-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--teal); margin-bottom: 6px;
  }
  .cn-panel-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 32px; font-weight: 800;
    color: var(--dark); text-transform: uppercase; margin-bottom: 36px;
  }

  .cn-contact-row {
    display: flex; align-items: flex-start; gap: 20px;
    padding: 22px 0; border-bottom: 1px solid var(--light-gray);
  }
  .cn-contact-row:first-of-type { border-top: 1px solid var(--light-gray); }
  .cn-row-icon {
    width: 52px; height: 52px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .cn-row-icon i { font-size: 32px; color: var(--dark); }
  .cn-row-body { flex: 1; }
  .cn-row-label {
    font-size: 12px; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--gray); margin-bottom: 2px;
  }
  .cn-row-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 700;
    color: var(--teal); letter-spacing: 0.3px;
  }
  .cn-row-actions {
    display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;
  }
  .cn-action-btn {
    background: transparent;
    border: 1.5px solid var(--dark);
    color: var(--dark);
    padding: 6px 14px; border-radius: 3px;
    font-size: 12px; font-weight: 600;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px;
    transition: all 0.18s; text-transform: uppercase;
    font-family: 'Barlow', sans-serif;
  }
  .cn-action-btn:hover { background: var(--teal); border-color: var(--teal); color: white; }
  .cn-action-btn.primary { background: var(--teal); border-color: var(--teal); color: white; }
  .cn-action-btn.primary:hover { background: var(--teal-dark); }

  .cn-form-section {
    background: #0d0d14; padding: 80px 48px; position: relative;
  }
  .cn-form-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(0,180,180,0.12) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }
  .cn-form-inner {
    max-width: 1000px; margin: 0 auto; position: relative; z-index: 2;
  }
  .cn-form-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(32px, 5vw, 52px); font-weight: 700;
    color: #ffffff; text-align: center; margin-bottom: 52px;
  }
  .cn-form-heading .accent { color: #e53e3e; }

  .cn-form-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 20px; margin-bottom: 20px;
  }
  .cn-form-group { display: flex; flex-direction: column; gap: 8px; }
  .cn-form-group.full { grid-column: 1 / -1; }
  .cn-form-label {
    font-size: 13px; font-weight: 600;
    color: rgba(255,255,255,0.75); letter-spacing: 0.5px;
  }
  .cn-form-label .req { color: #e53e3e; }
  .cn-form-label .optional {
    color: rgba(255,255,255,0.45); font-weight: 400;
    font-size: 11px; margin-left: 5px;
  }
  .cn-form-input, .cn-form-textarea {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 6px; padding: 14px 18px;
    font-size: 15px; color: #ffffff;
    font-family: 'Barlow', sans-serif;
    outline: none; width: 100%;
  }
  .cn-form-input:focus, .cn-form-textarea:focus {
    border-color: var(--teal);
    background: rgba(0,180,180,0.06);
  }
  .cn-form-textarea { resize: vertical; min-height: 140px; }

  .cn-services-label {
    font-size: 13px; font-weight: 600;
    color: rgba(255,255,255,0.75); margin-bottom: 14px;
  }
  .cn-services-grid {
    display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px;
  }
  .cn-service-chip {
    display: flex; align-items: center; gap: 10px; cursor: pointer;
  }
  .cn-chip-box {
    width: 20px; height: 20px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .cn-chip-box.checked { background: var(--teal); border-color: var(--teal); }
  .cn-chip-box i { font-size: 11px; color: white; }
  .cn-chip-label { font-size: 15px; color: rgba(255,255,255,0.8); }

  .cn-attach-guide {
    background: rgba(0,180,180,0.08);
    border-left: 4px solid var(--teal);
    border-radius: 12px; padding: 22px 26px;
    margin: 24px 0 36px 0;
  }
  .cn-guide-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 700;
    color: var(--teal); letter-spacing: 1px;
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .cn-guide-title i { font-size: 22px; }
  .cn-guide-step {
    display: flex; gap: 16px;
    margin-bottom: 16px; align-items: flex-start;
  }
  .cn-step-num {
    background: rgba(0,180,180,0.2);
    width: 28px; height: 28px; border-radius: 30px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px; color: var(--teal);
    flex-shrink: 0;
    font-family: 'Barlow Condensed', sans-serif;
  }
  .cn-step-text { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.5; }
  .cn-step-text strong { color: white; font-weight: 600; }
  .cn-guide-note {
    margin-top: 16px; padding-top: 12px;
    border-top: 1px solid rgba(0,180,180,0.3);
    font-size: 12px; color: rgba(255,255,255,0.55);
    display: flex; gap: 8px; align-items: center;
  }
  .cn-guide-note i { color: var(--teal); font-size: 13px; }

  .cn-email-preview {
    background: rgba(0,180,180,0.07);
    border: 1px solid rgba(0,180,180,0.25);
    border-radius: 10px; padding: 18px 22px; margin-bottom: 32px;
  }
  .cn-preview-label {
    font-size: 11px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--teal); margin-bottom: 12px;
  }
  .cn-preview-line {
    font-size: 13px; color: rgba(255,255,255,0.7);
    margin-bottom: 5px; line-height: 1.6;
  }
  .cn-preview-line strong { color: rgba(255,255,255,0.95); }

  .cn-send-btn {
    display: block; margin: 0 auto;
    background: #ffffff; color: #0d0d14;
    border: none; padding: 16px 52px;
    border-radius: 60px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 700;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.22s;
  }
  .cn-send-btn:hover { background: var(--teal); color: white; transform: translateY(-2px); }

  .cn-cta-band {
    background: var(--light-gray); text-align: center; padding: 40px 24px;
  }
  .cn-cta-band p {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(18px, 3vw, 26px); font-weight: 700;
    color: var(--dark); text-transform: uppercase;
  }
  .cn-cta-band span { color: var(--teal); }

  footer.cn-footer {
    background: var(--darker); padding: 40px 48px;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
  }
  .cn-footer-col h4 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(255,255,255,0.4); margin-bottom: 16px;
  }
  .cn-footer-col p, .cn-footer-col a {
    font-size: 13px; color: rgba(255,255,255,0.6);
    line-height: 1.8; text-decoration: none; display: block;
  }
  .cn-footer-col a:hover { color: var(--teal); }

  .cn-toast {
    background: var(--darker); color: white;
    text-align: center; border-radius: 4px;
    padding: 12px 24px; position: fixed;
    bottom: 28px; left: 50%;
    transform: translateX(-50%);
    font-size: 13px; z-index: 9999;
    transition: opacity 0.3s;
    border-left: 3px solid var(--teal);
    font-weight: 600; pointer-events: none;
  }
`;

export default function CreationNielContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [services, setServices] = useState([]);
  const [toast, setToast] = useState({ visible: false, msg: "" });

  useEffect(() => {
    // Inject stylesheet
    const styleEl = document.createElement("style");
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);

    // Inject Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fa = document.createElement("link");
      fa.rel = "stylesheet";
      fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
      document.head.appendChild(fa);
    }

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  function showToast(msg) {
    setToast({ visible: true, msg });
    setTimeout(() => setToast({ visible: false, msg: "" }), 2800);
  }

  function copyText(text, label) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast(`✅ ${label} copied!`))
      .catch(() => showToast("⚠️ Could not copy"));
  }

  function copyAll() {
    navigator.clipboard
      .writeText(`Email: ${MY_EMAIL}\nPhone: +63 912 345 6789`)
      .then(() => showToast("✨ Contact details copied!"));
  }

  function makeCall() {
    window.location.href = "tel:+639123456789";
  }

  function openGmail() {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MY_EMAIL)}`,
      "_blank"
    );
  }

  function toggleService(service) {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  function buildGmailUrl() {
    const { name, email, phone, address, message } = form;
    const serviceStr = services.join(", ");
    const subject = `Inquiry about: ${serviceStr}`;
    let body = `Hi Creation Niel,\n\n`;
    body += `Service(s) Interested In: ${serviceStr}\n\n`;
    body += `Message:\n${message || "(No message provided)"}\n\n`;
    body += `Best regards,\n${name || "[Your Name]"}\n${email || "[Your Email]"}\n`;
    if (phone) body += `Phone: ${phone}\n`;
    if (address) body += `Address: ${address}\n`;
    body += `\n---\n(P.S. If you have images or relevant files, don't forget to attach them using the paperclip icon in Gmail before sending.)`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MY_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function sendMessage() {
    const { name, email } = form;
    if (!name || !email) {
      showToast("⚠️ Please enter your name and email address");
      return;
    }
    if (!services.length) {
      showToast("⚠️ Please select at least one service you are interested in");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast("⚠️ Please provide a valid email address");
      return;
    }
    showToast("✉️ Opening Gmail — now you can attach files using the paperclip icon!");
    window.open(buildGmailUrl(), "_blank");
  }

  const hasPreview =
    form.name || form.email || form.phone || services.length || form.message;

  const serviceStr = services.length ? services.join(", ") : "—";

  let previewBody = `Hi Creation Niel,\n\nService(s) Interested In: ${serviceStr}\n\nMessage:\n${form.message || "(No message provided)"}\n\nBest regards,\n${form.name || "[Your Name]"}\n${form.email || "[Your Email]"}`;
  if (form.phone) previewBody += `\nPhone: ${form.phone}`;
  if (form.address) previewBody += `\nAddress: ${form.address}`;

  return (
    <div className="cn-wrapper">
      {/* Hero */}
      <section className="cn-hero">
        <p className="cn-hero-label">Inquire Now</p>
        <h1>
          We'd love to
          <br />
          hear from you
        </h1>
      </section>

      {/* Main Grid */}
      <div className="cn-main-grid">
        <div className="cn-left-panel">
          <h2>
            We offer one of
            <br />
            the best deals in
            <br />
            the market.
          </h2>
          <p>We understand where our clients are coming from. They run a business. We do too.</p>
          <p>We come up with ways to cut cost and focus on the essentials that make a great branding experience.</p>
          <p>We provide you top quality outputs at only a fraction of the price.</p>
        </div>

        <div className="cn-right-panel">
          <p className="cn-panel-label">Reach Out</p>
          <h3 className="cn-panel-title">Contact Us Now</h3>

          <div className="cn-contact-row">
            <div className="cn-row-icon">
              <i className="fas fa-envelope" style={{ color: "#ea4335", fontSize: 32 }} />
            </div>
            <div className="cn-row-body">
              <p className="cn-row-label">Email</p>
              <p className="cn-row-value">{MY_EMAIL}</p>
              <div className="cn-row-actions">
                <button className="cn-action-btn primary" onClick={openGmail}>
                  <i className="fab fa-google" /> Gmail
                </button>
                <button className="cn-action-btn" onClick={() => copyText(MY_EMAIL, "Email")}>
                  <i className="fas fa-copy" /> Copy
                </button>
              </div>
            </div>
          </div>

          <div className="cn-contact-row">
            <div className="cn-row-icon">
              <i className="fas fa-mobile-alt" style={{ color: "#10b981", fontSize: 32 }} />
            </div>
            <div className="cn-row-body">
              <p className="cn-row-label">Mobile</p>
              <p className="cn-row-value">+63 912 345 6789</p>
              <div className="cn-row-actions">
                <button className="cn-action-btn primary" onClick={makeCall}>
                  <i className="fas fa-phone" /> Call
                </button>
                <button className="cn-action-btn" onClick={() => copyText("+639123456789", "Phone number")}>
                  <i className="fas fa-copy" /> Copy
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <button
              className="cn-action-btn"
              style={{ width: "100%", justifyContent: "center", padding: "14px" }}
              onClick={copyAll}
            >
              <i className="fas fa-copy" /> Copy All Contact Details
            </button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="cn-form-section">
        <div className="cn-form-inner">
          <h2 className="cn-form-heading">
            Don<span className="accent">'</span>t be shy, write to us
          </h2>

          <div className="cn-form-row">
            <div className="cn-form-group">
              <label className="cn-form-label">
                Name <span className="req">*</span>
              </label>
              <input
                className="cn-form-input"
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="cn-form-group">
              <label className="cn-form-label">
                Email <span className="req">*</span>
              </label>
              <input
                className="cn-form-input"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="cn-form-row">
            <div className="cn-form-group">
              <label className="cn-form-label">
                Phone Number <span className="optional">(optional)</span>
              </label>
              <input
                className="cn-form-input"
                type="tel"
                placeholder="+63 912 345 6789"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="cn-form-group">
              <label className="cn-form-label">
                Address <span className="optional">(optional)</span>
              </label>
              <input
                className="cn-form-input"
                type="text"
                placeholder="City, Country"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </div>

          <div className="cn-form-group full" style={{ marginBottom: 20 }}>
            <label className="cn-form-label">Message / Project Details</label>
            <textarea
              className="cn-form-textarea"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <p className="cn-services-label">
            Services Interested In <span style={{ color: "#e53e3e" }}>*</span>
          </p>
          <div className="cn-services-grid">
            {SERVICES.map((service) => (
              <label
                key={service}
                className="cn-service-chip"
                onClick={() => toggleService(service)}
              >
                <span className={`cn-chip-box ${services.includes(service) ? "checked" : ""}`}>
                  {services.includes(service) && <i className="fas fa-check" />}
                </span>
                <span className="cn-chip-label">{service}</span>
              </label>
            ))}
          </div>

          {/* Attachment Guide */}
          <div className="cn-attach-guide">
            <div className="cn-guide-title">
              <i className="fas fa-paperclip" />
              <span>How to attach files in Gmail (after clicking Send)</span>
            </div>
            {[
              {
                n: 1,
                text: (
                  <>
                    After you click <strong>"Send Message"</strong>, Gmail will open in a new tab
                    with your message pre-filled.
                  </>
                ),
              },
              {
                n: 2,
                text: (
                  <>
                    Look for the <strong><i className="fas fa-paperclip" /> Attach files</strong> icon
                    (paperclip) at the bottom of the compose window.
                  </>
                ),
              },
              {
                n: 3,
                text: (
                  <>
                    Click the paperclip icon, then select{" "}
                    <strong>images, documents, or any files</strong> from your computer (design
                    briefs, logos, references, etc.).
                  </>
                ),
              },
              {
                n: 4,
                text: (
                  <>
                    You can also <strong>drag &amp; drop</strong> files directly into the email
                    window. Attachments appear as thumbnails below the subject line.
                  </>
                ),
              },
              {
                n: 5,
                text: (
                  <>
                    Once files are attached, review your message and click <strong>Send</strong> —
                    your attachments will be delivered along with the inquiry.
                  </>
                ),
              },
            ].map(({ n, text }) => (
              <div className="cn-guide-step" key={n}>
                <div className="cn-step-num">{n}</div>
                <div className="cn-step-text">{text}</div>
              </div>
            ))}
            <div className="cn-guide-note">
              <i className="fas fa-lightbulb" />
              <span>
                <strong>Pro tip:</strong> Maximum attachment size in Gmail is 25MB. If your files
                are larger, share via Google Drive link or compress them before attaching.
              </span>
            </div>
          </div>

          {/* Email Preview */}
          {hasPreview && (
            <div className="cn-email-preview">
              <p className="cn-preview-label">
                <i className="fas fa-envelope" /> Email Preview
              </p>
              <p className="cn-preview-line">
                <strong>To:</strong> {MY_EMAIL}
              </p>
              <p className="cn-preview-line">
                <strong>Subject:</strong> Inquiry about: {serviceStr}
              </p>
              <div
                className="cn-preview-line"
                style={{ whiteSpace: "pre-line" }}
              >
                {previewBody}
              </div>
            </div>
          )}

          <button className="cn-send-btn" onClick={sendMessage}>
            <i className="fas fa-paper-plane" style={{ marginRight: 10 }} />
            Send Message
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <i className="fas fa-info-circle" /> Fill out the form, then click Send. Gmail will
            open with your message — simply attach your files using the paperclip icon.
          </p>
        </div>
      </section>

      {/* CTA Band */}
      <div className="cn-cta-band">
        <p>
          Contact us now to get a <span>FREE Consultation</span> and Project Estimate
        </p>
      </div>

      {/* Footer */}
      <footer className="cn-footer">
        <div className="cn-footer-col">
          <h4>Creation Niel</h4>
          <p>A creative professional offering top-quality outputs.</p>
        </div>
        <div className="cn-footer-col">
          <h4>Main Services</h4>
          <a href="#">Branding</a>
          <a href="#">Graphic Design</a>
          <a href="#">Web Design</a>
          <a href="#">Content Creation</a>
        </div>
        <div className="cn-footer-col">
          <h4>Follow Me</h4>
          <a href="#"><i className="fab fa-facebook" /> Facebook</a>
          <a href="#"><i className="fab fa-instagram" /> Instagram</a>
        </div>
        <div className="cn-footer-col">
          <h4>Let's Talk</h4>
          <p>Email: {MY_EMAIL}</p>
          <p>Phone: +63 912 345 6789</p>
        </div>
      </footer>

      {/* Toast */}
      {toast.visible && (
        <div className="cn-toast">{toast.msg}</div>
      )}
    </div>
  );
}
