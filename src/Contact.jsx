import React, { useState } from 'react';

const ContactPage = () => {
        const [formData, setFormData] = useState({
            senderName: '',
            senderEmail: '',
            phoneNumber: '',
            address: '',
            msgBody: '',
            services: []
        });

        const [showPreview, setShowPreview] = useState(false);
        const [toastMessage, setToastMessage] = useState('');
        const [showToast, setShowToast] = useState(false);

        const MY_EMAIL = "creationniel6@gmail.com";

        const serviceOptions = [
                'Branding',
                'Digital Experiences',
                'Web Development',

                const [showPreview, setShowPreview] = useState(false);
                const [toastMessage, setToastMessage] = useState('');
                const [showToast, setShowToast] = useState(false);

                const MY_EMAIL = "creationniel6@gmail.com";

                const serviceOptions = [
                    'Branding',
                    'Digital Experiences',
                    'Web Development',
                    'Graphic Design',
                    'Content Creation'
                ];

                const showToastMessage = (msg) => {
                    setToastMessage(msg);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2800);
                };

                const copyText = (text, label) => {
                    navigator.clipboard.writeText(text).then(() => {
                        showToastMessage(`✅ ${label} copied!`);
                    }).catch(() => {
                        showToastMessage(`⚠️ Could not copy`);
                    });
                };

                const copyAll = () => {
                    navigator.clipboard.writeText(`Email: creationniel6@gmail.com\nPhone: +63 912 345 6789`).then(() => {
                        showToastMessage("✨ Contact details copied!");
                    });
                };

                const makeCall = () => {
                    window.location.href = `tel:+639123456789`;
                };

                const openGmail = () => {
                    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MY_EMAIL)}`, '_blank');
                };

                const handleServiceChange = (service, checked) => {
                    if (checked) {
                        setFormData(prev => ({...prev, services: [...prev.services, service] }));
                    } else {
                        setFormData(prev => ({...prev, services: prev.services.filter(s => s !== service) }));
                    }
                    updatePreview();
                };

                const handleInputChange = (e) => {
                    const { id, value } = e.target;
                    setFormData(prev => ({...prev, [id]: value }));
                    updatePreview();
                };

                const updatePreview = () => {
                    const { senderName, senderEmail, phoneNumber, address, msgBody, services } = formData;
                    const hasContent = senderName || senderEmail || phoneNumber || services.length || msgBody;
                    setShowPreview(hasContent);
                };

                const buildGmailUrl = () => {
                    const { senderName, senderEmail, phoneNumber, address, msgBody, services } = formData;
                    const serviceStr = services.length ? services.join(', ') : '—';
                    const subject = `Inquiry about: ${serviceStr}`;

                    let body = `Hi Creation Niel,\n\n`;
                    body += `Service(s) Interested In: ${serviceStr}\n\n`;
                    body += `Message:\n${msgBody || '(No message provided)'}\n\n`;
                    body += `Best regards,\n${senderName || '[Your Name]'}\n${senderEmail || '[Your Email]'}\n`;
                    if (phoneNumber) body += `Phone: ${phoneNumber}\n`;
                    if (address) body += `Address: ${address}\n`;
                    body += `\n---\n(P.S. If you have images or relevant files, don't forget to attach them using the paperclip icon in Gmail before sending.)`;

                    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MY_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                };

                const sendMessage = () => {
                    const { senderName, senderEmail, services, msgBody, phoneNumber, address } = formData;

                    if (!senderName || !senderEmail) {
                        showToastMessage('⚠️ Please enter your name and email address');
                        return;
                    }

                    if (!services.length) {
                        showToastMessage('⚠️ Please select at least one service you are interested in');
                        return;
                    }

                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(senderEmail)) {
                        showToastMessage('⚠️ Please provide a valid email address');
                        return;
                    }

                    showToastMessage('✉️ Opening Gmail — now you can attach files using the paperclip icon!');
                    const gmailUrl = buildGmailUrl();
                    window.open(gmailUrl, '_blank');
                };

                return ( <
                    div style = {
                        { fontFamily: "'Barlow', sans-serif", background: "#f0f0ec", minHeight: "100vh" }
                    } > { /* Toast Notification */ } <
                    div id = "toast"
                    style = {
                        {
                            visibility: showToast ? 'visible' : 'hidden',
                            opacity: showToast ? 1 : 0,
                            background: "#1a202c",
                            color: "white",
                            textAlign: "center",
                            borderRadius: "4px",
                            padding: "12px 24px",
                            position: "fixed",
                            bottom: "28px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "13px",
                            zIndex: 9999,
                            transition: "opacity 0.3s",
                            pointerEvents: "none",
                            borderLeft: "3px solid #00b4b4",
                            fontWeight: 600
                        }
                    } > { toastMessage } <
                    /div>

                    { /* Hero Section */ } <
                    section style = {
                        {
                            background: "linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5) 100%), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80') center/cover no-repeat",
                            padding: "64px 48px 56px",
                            position: "relative"
                        }
                    } >
                    <
                    div style = {
                        { position: "relative", zIndex: 2 }
                    } >
                    <
                    p style = {
                        {
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "13px",
                            fontWeight: 700,
                            letterSpacing: "3px",
                            textTransform: "uppercase",
                            color: "#00b4b4",
                            marginBottom: "10px"
                        }
                    } > Inquire Now < /p> <
                    h1 style = {
                        {
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(36px, 6vw, 60px)",
                            fontWeight: 800,
                            color: "#00b4b4",
                            lineHeight: 1.05,
                            textTransform: "uppercase"
                        }
                    } > We 'd love to<br />hear from you</h1> < /
                    div > <
                    div style = {
                        {
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            background: "#00b4b4"
                        }
                    }
                    /> < /
                    section >

                    { /* Main Grid - Contact Info */ } <
                    div style = {
                        { display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "480px" }
                    } > { /* Left Panel */ } <
                    div style = {
                        {
                            background: "#00b4b4",
                            padding: "56px 48px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }
                    } >
                    <
                    h2 style = {
                        {
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(28px, 4vw, 40px)",
                            fontWeight: 800,
                            color: "#ffffff",
                            lineHeight: 1.2,
                            textTransform: "uppercase",
                            marginBottom: "24px"
                        }
                    } > We offer one of < br / > the best deals in < br / > the market. < /h2> <
                    p style = {
                        { color: "rgba(255, 255, 255, 0.85)", fontSize: "15px", lineHeight: 1.75, marginBottom: "14px", fontWeight: 300 }
                    } >
                    We understand where our clients are coming from.They run a business.We do too. <
                        /p> <
                    p style = {
                        { color: "rgba(255, 255, 255, 0.85)", fontSize: "15px", lineHeight: 1.75, marginBottom: "14px", fontWeight: 300 }
                    } >
                    We come up with ways to cut cost and focus on the essentials that make a great branding experience. <
                    /p> <
                    p style = {
                        { color: "rgba(255, 255, 255, 0.85)", fontSize: "15px", lineHeight: 1.75, marginBottom: "14px", fontWeight: 300 }
                    } >
                    We provide you top quality outputs at only a fraction of the price. <
                    /p> < /
                    div >

                    { /* Right Panel - Contact Details */ } <
                    div style = {
                        { background: "#f0f0ec", padding: "56px 48px" }
                    } >
                    <
                    p style = {
                        {
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "3px",
                            textTransform: "uppercase",
                            color: "#00b4b4",
                            marginBottom: "6px"
                        }
                    } > Reach Out < /p> <
                    h3 style = {
                        {
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "32px",
                            fontWeight: 800,
                            color: "#2d3748",
                            textTransform: "uppercase",
                            marginBottom: "36px"
                        }
                    } > Contact Us Now < /h3>

                    { /* Email Row */ } <
                    div style = {
                        { display: "flex", alignItems: "flex-start", gap: "20px", padding: "22px 0", borderBottom: "1px solid #e8e8e4", borderTop: "1px solid #e8e8e4" }
                    } >
                    <
                    div style = {
                        { width: "52px", height: "52px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }
                    } >
                    <
                    i className = "fas fa-envelope"
                    style = {
                        { fontSize: "32px", color: "#ea4335" }
                    } > < /i> < /
                    div > <
                    div style = {
                        { flex: 1 }
                    } >
                    <
                    p style = {
                        { fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b7280", marginBottom: "2px" }
                    } > Email < /p> <
                    p style = {
                        { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, color: "#00b4b4", letterSpacing: "0.3px" }
                    } > creationniel6 @gmail.com < /p> <
                    div style = {
                        { display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }
                    } >
                    <
                    button onClick = { openGmail }
                    style = {
                        { background: "#00b4b4", border: "1.5px solid #00b4b4", color: "white", padding: "6px 14px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.18s", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }
                    } >
                    <
                    i className = "fab fa-google" > < /i> Gmail < /
                    button > <
                    button onClick = {
                        () => copyText('creationniel6@gmail.com', 'Email')
                    }
                    style = {
                        { background: "transparent", border: "1.5px solid #2d3748", color: "#2d3748", padding: "6px 14px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.18s", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }
                    } >
                    <
                    i className = "fas fa-copy" > < /i> Copy < /
                    button > <
                    /div> < /
                    div > <
                    /div>

                    { /* Mobile Row */ } <
                    div style = {
                        { display: "flex", alignItems: "flex-start", gap: "20px", padding: "22px 0", borderBottom: "1px solid #e8e8e4" }
                    } >
                    <
                    div style = {
                        { width: "52px", height: "52px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }
                    } >
                    <
                    i className = "fas fa-mobile-alt"
                    style = {
                        { fontSize: "32px", color: "#10b981" }
                    } > < /i> < /
                    div > <
                    div style = {
                        { flex: 1 }
                    } >
                    <
                    p style = {
                        { fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b7280", marginBottom: "2px" }
                    } > Mobile < /p> <
                    p style = {
                        { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, color: "#00b4b4", letterSpacing: "0.3px" }
                    } > +63 912 345 6789 < /p> <
                    div style = {
                        { display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }
                    } >
                    <
                    button onClick = { makeCall }
                    style = {
                        { background: "#00b4b4", border: "1.5px solid #00b4b4", color: "white", padding: "6px 14px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.18s", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }
                    } >
                    <
                    i className = "fas fa-phone" > < /i> Call < /
                    button > <
                    button onClick = {
                        () => copyText('+639123456789', 'Phone number')
                    }
                    style = {
                        { background: "transparent", border: "1.5px solid #2d3748", color: "#2d3748", padding: "6px 14px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.18s", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }
                    } >
                    <
                    i className = "fas fa-copy" > < /i> Copy < /
                    button > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div style = {
                        { marginTop: "28px" }
                    } >
                    <
                    button onClick = { copyAll }
                    style = {
                        { background: "transparent", border: "1.5px solid #2d3748", color: "#2d3748", padding: "14px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, cursor: "pointer", width: "100%", justifyContent: "center", transition: "all 0.18s", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }
                    } >
                    <
                    i className = "fas fa-copy" > < /i> Copy All Contact Details < /
                    button > <
                    /div> < /
                    div > <
                    /div>

                    { /* Form Section */ } <
                    section style = {
                        { background: "#0d0d14", padding: "80px 48px", position: "relative" }
                    } >
                    <
                    div style = {
                        { position: "relative", zIndex: 2, maxWidth: "1000px", margin: "0 auto" }
                    } >
                    <
                    h2 style = {
                        {
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 700,
                            color: "#ffffff",
                            textAlign: "center",
                            marginBottom: "52px"
                        }
                    } > Don < span style = {
                        { color: "#e53e3e" }
                    } > '</span>t be shy, write to us</h2>

                    { /* Form Row 1 */ } <
                    div style = {
                        { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }
                    } >
                    <
                    div style = {
                        { display: "flex", flexDirection: "column", gap: "8px" }
                    } >
                    <
                    label style = {
                        { fontSize: "13px", fontWeight: 600, color: "rgba(255, 255, 255, 0.75)", letterSpacing: "0.5px" }
                    } >
                    Name < span style = {
                        { color: "#e53e3e" }
                    } > * < /span> < /
                    label > <
                    input id = "senderName"
                    type = "text"
                    placeholder = "Full name"
                    value = { formData.senderName }
                    onChange = { handleInputChange }
                    style = {
                        { background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "14px 18px", fontSize: "15px", color: "#ffffff", fontFamily: "'Barlow', sans-serif", outline: "none", width: "100%" }
                    }
                    /> < /
                    div > <
                    div style = {
                        { display: "flex", flexDirection: "column", gap: "8px" }
                    } >
                    <
                    label style = {
                        { fontSize: "13px", fontWeight: 600, color: "rgba(255, 255, 255, 0.75)", letterSpacing: "0.5px" }
                    } >
                    Email < span style = {
                        { color: "#e53e3e" }
                    } > * < /span> < /
                    label > <
                    input id = "senderEmail"
                    type = "email"
                    placeholder = "Email address"
                    value = { formData.senderEmail }
                    onChange = { handleInputChange }
                    style = {
                        { background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "14px 18px", fontSize: "15px", color: "#ffffff", fontFamily: "'Barlow', sans-serif", outline: "none", width: "100%" }
                    }
                    /> < /
                    div > <
                    /div>

                    { /* Form Row 2 */ } <
                    div style = {
                        { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }
                    } >
                    <
                    div style = {
                        { display: "flex", flexDirection: "column", gap: "8px" }
                    } >
                    <
                    label style = {
                        { fontSize: "13px", fontWeight: 600, color: "rgba(255, 255, 255, 0.75)", letterSpacing: "0.5px" }
                    } >
                    Phone Number < span style = {
                        { color: "rgba(255, 255, 255, 0.45)", fontWeight: 400, fontSize: "11px", marginLeft: "5px" }
                    } > (optional) < /span> < /
                    label > <
                    input id = "phoneNumber"
                    type = "tel"
                    placeholder = "+63 912 345 6789"
                    value = { formData.phoneNumber }
                    onChange = { handleInputChange }
                    style = {
                        { background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "14px 18px", fontSize: "15px", color: "#ffffff", fontFamily: "'Barlow', sans-serif", outline: "none", width: "100%" }
                    }
                    /> < /
                    div > <
                    div style = {
                        { display: "flex", flexDirection: "column", gap: "8px" }
                    } >
                    <
                    label style = {
                        { fontSize: "13px", fontWeight: 600, color: "rgba(255, 255, 255, 0.75)", letterSpacing: "0.5px" }
                    } >
                    Address < span style = {
                        { color: "rgba(255, 255, 255, 0.45)", fontWeight: 400, fontSize: "11px", marginLeft: "5px" }
                    } > (optional) < /span> < /
                    label > <
                    input id = "address"
                    type = "text"
                    placeholder = "City, Country"
                    value = { formData.address }
                    onChange = { handleInputChange }
                    style = {
                        { background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "14px 18px", fontSize: "15px", color: "#ffffff", fontFamily: "'Barlow', sans-serif", outline: "none", width: "100%" }
                    }
                    /> < /
                    div > <
                    /div>

                    { /* Message */ } <
                    div style = {
                        { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }
                    } >
                    <
                    label style = {
                        { fontSize: "13px", fontWeight: 600, color: "rgba(255, 255, 255, 0.75)", letterSpacing: "0.5px" }
                    } > Message / Project Details < /label> <
                    textarea id = "msgBody"
                    placeholder = "Tell me about your project..."
                    value = { formData.msgBody }
                    onChange = { handleInputChange }
                    style = {
                        { background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "14px 18px", fontSize: "15px", color: "#ffffff", fontFamily: "'Barlow', sans-serif", outline: "none", width: "100%", resize: "vertical", minHeight: "140px" }
                    }
                    /> < /
                    div >

                    { /* Services */ } <
                    p style = {
                        { fontSize: "13px", fontWeight: 600, color: "rgba(255, 255, 255, 0.75)", marginBottom: "14px" }
                    } >
                    Services Interested In < span style = {
                        { color: "#e53e3e" }
                    } > * < /span> < /
                    p > <
                    div style = {
                        { display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }
                    } > {
                        serviceOptions.map(service => ( <
                                label key = { service }
                                style = {
                                    { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }
                                } >
                                <
                                input type = "checkbox"
                                value = { service }
                                checked = { formData.services.includes(service) }
                                onChange = {
                                    (e) => handleServiceChange(service, e.target.checked)
                                }
                                style = {
                                    { display: "none" }
                                }
                                /> <
                                span style = {
                                    {
                                        width: "20px",
                                        height: "20px",
                                        border: "2px solid rgba(255, 255, 255, 0.3)",
                                        borderRadius: "4px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: formData.services.includes(service) ? "#00b4b4" : "transparent",
                                        borderColor: formData.services.includes(service) ? "#00b4b4" : "rgba(255, 255, 255, 0.3)"
                                    }
                                } > {
                                    formData.services.includes(service) && < i className = "fas fa-check"
                                    style = {
                                        { fontSize: "11px", color: "white" }
                                    } > < /i>} < /
                                    span > <
                                    span style = {
                                        { fontSize: "15px", color: "rgba(255, 255, 255, 0.8)" }
                                    } > { service } < /span> < /
                                    label >
                                ))
                        } <
                        /div>

                        { /* Attachment Guide */ } <
                        div style = {
                            { background: "rgba(0, 180, 180, 0.08)", borderLeft: "4px solid #00b4b4", borderRadius: "12px", padding: "22px 26px", margin: "24px 0 36px 0", backdropFilter: "blur(2px)" }
                        } >
                        <
                        div style = {
                            { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", fontWeight: 700, color: "#00b4b4", letterSpacing: "1px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }
                        } >
                        <
                        i className = "fas fa-paperclip" > < /i> <
                        span > How to attach files in Gmail(after clicking Send) < /span> < /
                        div > <
                        div style = {
                            { display: "flex", gap: "16px", marginBottom: "16px", alignItems: "flex-start" }
                        } >
                        <
                        div style = {
                            { background: "rgba(0, 180, 180, 0.2)", width: "28px", height: "28px", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", color: "#00b4b4", flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif" }
                        } > 1 < /div> <
                        div style = {
                            { fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }
                        } > After you click < strong > "Send Message" < /strong>, Gmail will open in a new tab with your message pre-filled.</div >
                        <
                        /div> <
                        div style = {
                            { display: "flex", gap: "16px", marginBottom: "16px", alignItems: "flex-start" }
                        } >
                        <
                        div style = {
                            { background: "rgba(0, 180, 180, 0.2)", width: "28px", height: "28px", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", color: "#00b4b4", flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif" }
                        } > 2 < /div> <
                        div style = {
                            { fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }
                        } > Look
                        for the < strong > < i className = "fas fa-paperclip" > < /i> Attach files</strong > icon(paperclip) at the bottom of the compose window. < /div> < /
                        div > <
                        div style = {
                            { display: "flex", gap: "16px", marginBottom: "16px", alignItems: "flex-start" }
                        } >
                        <
                        div style = {
                            { background: "rgba(0, 180, 180, 0.2)", width: "28px", height: "28px", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", color: "#00b4b4", flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif" }
                        } > 3 < /div> <
                        div style = {
                            { fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }
                        } > Click the paperclip icon,
                        then select < strong > images,
                        documents,
                        or any files < /strong> from your computer (design briefs, logos, references, etc.).</div >
                        <
                        /div> <
                        div style = {
                            { display: "flex", gap: "16px", marginBottom: "16px", alignItems: "flex-start" }
                        } >
                        <
                        div style = {
                            { background: "rgba(0, 180, 180, 0.2)", width: "28px", height: "28px", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", color: "#00b4b4", flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif" }
                        } > 4 < /div> <
                        div style = {
                            { fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }
                        } > You can also < strong > drag & drop < /strong> files directly into the email window. Attachments appear as thumbnails below the subject line.</div >
                        <
                        /div> <
                        div style = {
                            { display: "flex", gap: "16px", marginBottom: "16px", alignItems: "flex-start" }
                        } >
                        <
                        div style = {
                            { background: "rgba(0, 180, 180, 0.2)", width: "28px", height: "28px", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", color: "#00b4b4", flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif" }
                        } > 5 < /div> <
                        div style = {
                            { fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }
                        } > Once files are attached,
                        review your message and click < strong > Send < /strong> — your attachments will be delivered along with the inquiry.</div >
                        <
                        /div> <
                        div style = {
                            { marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(0, 180, 180, 0.3)", fontSize: "12px", color: "rgba(255, 255, 255, 0.55)", display: "flex", gap: "8px", alignItems: "center" }
                        } >
                        <
                        i className = "fas fa-lightbulb"
                        style = {
                            { color: "#00b4b4", fontSize: "13px" }
                        } > < /i> <
                        span > < strong > Pro tip: < /strong> Maximum attachment size in Gmail is 25MB. If your files are larger, share via Google Drive link or compress them before attaching.</span >
                            <
                            /div> < /
                            div >

                            { /* Email Preview */ } {
                                showPreview && ( <
                                    div style = {
                                        { background: "rgba(0, 180, 180, 0.07)", border: "1px solid rgba(0, 180, 180, 0.25)", borderRadius: "10px", padding: "18px 22px", marginBottom: "32px" }
                                    } >
                                    <
                                    p style = {
                                        { fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#00b4b4", marginBottom: "12px" }
                                    } >
                                    <
                                    i className = "fas fa-envelope" > < /i> Email Preview < /
                                    p > <
                                    p style = {
                                        { fontSize: "13px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "5px", lineHeight: 1.6 }
                                    } >
                                    <
                                    strong > To: < /strong> creationniel6@gmail.com < /
                                    p > <
                                    p style = {
                                        { fontSize: "13px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "5px", lineHeight: 1.6 }
                                    } >
                                    <
                                    strong > Subject: < /strong> Inquiry about: {formData.services.length ? formData.services.join(', ') : '—'} < /
                                    p > <
                                    div style = {
                                        { fontSize: "13px", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6, whiteSpace: "pre-line" }
                                    } >
                                    <
                                    strong > Message: < /strong><br / >
                                    Hi Creation Niel, < br / > < br / >
                                    Service(s) Interested In: { formData.services.length ? formData.services.join(', ') : '—' } < br / > < br / >
                                    Message: < br / > { formData.msgBody || '(No message provided)' } < br / > < br / >
                                    Best regards, < br / > { formData.senderName || '[Your Name]' } < br / > { formData.senderEmail || '[Your Email]' } < br / > { formData.phoneNumber && `Phone: ${formData.phoneNumber}\n` } { formData.address && `Address: ${formData.address}\n` } <
                                    /div> < /
                                    div >
                                )
                            }

                        { /* Send Button */ } <
                        button onClick = { sendMessage }
                        style = {
                            { display: "block", margin: "0 auto", background: "#ffffff", color: "#0d0d14", border: "none", padding: "16px 52px", borderRadius: "60px", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", fontWeight: 700, textTransform: "uppercase", cursor: "pointer", transition: "all 0.22s" }
                        } >
                        <
                        i className = "fas fa-paper-plane"
                        style = {
                            { marginRight: "10px" }
                        } > < /i> Send Message < /
                        button >

                        <
                        p style = {
                            { textAlign: "center", marginTop: "20px", fontSize: "12px", color: "rgba(255, 255, 255, 0.4)" }
                        } >
                        <
                        i className = "fas fa-info-circle" > < /i> Fill out the form, then click Send. Gmail will open with your message — simply attach your files using the paperclip icon. < /
                        p > <
                        /div> < /
                        section >

                        { /* CTA Band */ } <
                        div style = {
                            { background: "#e8e8e4", textAlign: "center", padding: "40px 24px" }
                        } >
                        <
                        p style = {
                            { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#2d3748", textTransform: "uppercase" }
                        } >
                        Contact us now toget a < span style = {
                            { color: "#00b4b4" }
                        } > FREE Consultation < /span> and Project Estimate < /
                        p > <
                        /div>

                        { /* Footer */ } <
                        footer style = {
                            { background: "#1a202c", padding: "40px 48px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }
                        } >
                        <
                        div >
                        <
                        h4 style = {
                            { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.4)", marginBottom: "16px" }
                        } > Creation Niel < /h4> <
                        p style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8 }
                        } > A creative professional offering top - quality outputs. < /p> < /
                        div > <
                        div >
                        <
                        h4 style = {
                            { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.4)", marginBottom: "16px" }
                        } > Main Services < /h4> <
                        a href = "#"
                        style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8, textDecoration: "none", display: "block" }
                        } > Branding < /a> <
                        a href = "#"
                        style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8, textDecoration: "none", display: "block" }
                        } > Graphic Design < /a> <
                        a href = "#"
                        style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8, textDecoration: "none", display: "block" }
                        } > Web Design < /a> <
                        a href = "#"
                        style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8, textDecoration: "none", display: "block" }
                        } > Content Creation < /a> < /
                        div > <
                        div >
                        <
                        h4 style = {
                            { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.4)", marginBottom: "16px" }
                        } > Follow Me < /h4> <
                        a href = "#"
                        style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8, textDecoration: "none", display: "block" }
                        } > < i className = "fab fa-facebook" > < /i> Facebook</a >
                        <
                        a href = "#"
                        style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8, textDecoration: "none", display: "block" }
                        } > < i className = "fab fa-instagram" > < /i> Instagram</a >
                        <
                        /div> <
                        div >
                        <
                        h4 style = {
                            { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.4)", marginBottom: "16px" }
                        } > Let 's Talk</h4> <
                        p style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8 }
                        } > Email: creationniel6 @gmail.com < /p> <
                        p style = {
                            { fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8 }
                        } > Phone: +63 912 345 6789 < /p> < /
                            div > <
                            /footer> < /
                            div >
                    );
                };

                export default ContactPage;
