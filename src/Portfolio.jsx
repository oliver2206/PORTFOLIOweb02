import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css'; // We'll create this CSS file for the styles

const HeroSection: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroAudioRef = useRef<HTMLAudioElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Typing animation state
  const textList = ['UI/UX Designer', 'Photo Retoucher', 'Marketing Artist'];
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const current = textList[wordIndex];
      if (!isDeleting && charIndex <= current.length) {
        setDisplayText(current.substring(0, charIndex));
        setCharIndex(charIndex + 1);
        if (charIndex === current.length) {
          setIsDeleting(true);
          setTimeout(() => {}, 1500);
        }
      } else if (isDeleting && charIndex >= 0) {
        setDisplayText(current.substring(0, charIndex));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % textList.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, textList]);

  // Intersection Observer for sections
  useEffect(() => {
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    
    sections.forEach((section) => observer.observe(section));
    
    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  // Hero section video/audio observer
  useEffect(() => {
    if (heroSectionRef.current && heroVideoRef.current && heroAudioRef.current) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroVideoRef.current?.play();
            heroAudioRef.current?.play().catch(() => {});
          } else {
            heroVideoRef.current?.pause();
            heroAudioRef.current?.pause();
          }
        });
      }, { threshold: 0.5 });
      
      heroObserver.observe(heroSectionRef.current);
      
      return () => heroObserver.disconnect();
    }
  }, []);

  // Audio unlock on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      heroAudioRef.current?.play().catch(() => {});
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    
    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleNavClick = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header>
        <nav className="navbar navbar-expand-lg container-fluid px-5">
          <a className="navbar-brand fw-bold" href="./Index.html">MySite</a>
          <button className="navbar-toggler" type="button" onClick={toggleMobileNav}>
            <span className="bi bi-list fs-1"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="./ABOUT.html">About</a></li>
              <li className="nav-item"><a className="nav-link" href="./Services.html">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="./Ecperience.html">Experience</a></li>
              <li className="nav-item"><a className="nav-link" href="./Gallery.html">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="./Testimonials.html">Testimonials</a></li>
              <li className="nav-item"><a className="nav-link" href="./Contact.html">Contact</a></li>
              <li className="nav-item"><a className="nav-link" href="./Portfolio.html">Portfolio</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMobileNavOpen ? 'active' : ''}`}>
        <button className="close-btn" onClick={toggleMobileNav}>&times;</button>
        <div className="social-icons">
          <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer"><i className="bi bi-behance"></i></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
        </div>
        <div className="nav-links">
          <a href="./ABOUT.html" onClick={handleNavClick}>About</a>
          <a href="./Services.html" onClick={handleNavClick}>Services</a>
          <a href="./Ecperience.html" onClick={handleNavClick}>Experience</a>
          <a href="./Gallery.html" onClick={handleNavClick}>Gallery</a>
          <a href="./Testimonials.html" onClick={handleNavClick}>Testimonials</a>
          <a href="./Contact.html" onClick={handleNavClick}>Contact</a>
          <a href="./Portfolio.html" onClick={handleNavClick}>Portfolio</a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="hero" ref={heroSectionRef}>
        <div className="hero-video-container">
          <video ref={heroVideoRef} autoPlay muted loop playsInline>
            <source src="/path-to-your-video.mp4" type="video/mp4" />
          </video>
          <audio ref={heroAudioRef} loop>
            <source src="/path-to-your-audio.mp3" type="audio/mpeg" />
          </audio>
          <div className="overlay"></div>
        </div>
        <div className="hero-text">
          <h3>Welcome to My Portfolio</h3>
          <h1>I'm <span className="highlight">[Your Name]</span></h1>
          <p id="typing-text">{displayText}</p>
          <a href="#contact" className="btn">Get In Touch <i className="bi bi-arrow-right"></i></a>
        </div>
      </section>

      {/* Buttons Grid */}
      <div className="button-grid-container">
        <div className="button-grid">
          <a href="#video-editing"><button className="glow-button">Video Editing</button></a>
          <a href="#photo-editing"><button className="glow-button">Photo Editing</button></a>
          <a href="#ui-ux"><button className="glow-button">UI UX</button></a>
          <a href="#branding-identity"><button className="glow-button">Branding & Identity Design</button></a>
          <a href="#marketing-promotional"><button className="glow-button">Marketing & Promotional Graphics</button></a>
          <a href="#digital-content"><button className="glow-button">Digital Content Design</button></a>
          <a href="#packaging-product"><button className="glow-button">Packaging Product Design</button></a>
          <a href="#photo-restoration"><button className="glow-button">Photo Restoration</button></a>
        </div>
      </div>

      {/* Content Sections */}
      <section id="video-editing" className="content-section">
        <h1>Video Editing</h1>
        <div className="gallery">
          <div className="video-player">
            <video src="./PNGFILE/ilooos.mp4" autoPlay muted loop playsInline></video>
          </div>
          <div className="video-player">
            <video src="videos/video2.mp4" autoPlay muted loop playsInline></video>
          </div>
          <div className="video-player">
            <video src="videos/video3.mp4" autoPlay muted loop playsInline></video>
          </div>
          <div className="video-player">
            <video src="videos/video4.mp4" autoPlay muted loop playsInline></video>
          </div>
          <div className="video-player">
            <video src="videos/video5.mp4" autoPlay muted loop playsInline></video>
          </div>
          <div className="video-player">
            <video src="videos/video6.mp4" autoPlay muted loop playsInline></video>
          </div>
        </div>
      </section>

      <section id="photo-editing" className="content-section">
        <div className="photo-editing-container">
          <div className="gallery-title">
            <h2>Graphic Design & Edits</h2>
          </div>
          <div className="gallery-grid">
            <img src="./PNGFILE/after.png" alt="Edit 1" />
            <img src="./PNGFILE/BEFORE AND AFTER LIGHTOOM.jpg" alt="Edit 2" />
            <img src="./PNGFILE/TRIPPLE EXPOSURE 1.jpg" alt="Edit 3" />
            <img src="./PNGFILE/TRIPPLE EXPOSURE 2.jpg" alt="Edit 4" />
            <img src="img5.jpg" alt="Edit 5" />
            <img src="img6.jpg" alt="Edit 6" />
            <img src="img7.jpg" alt="Edit 7" />
            <img src="img8.jpg" alt="Edit 8" />
            <img src="img9.jpg" alt="Edit 9" />
            <img src="img10.jpg" alt="Edit 10" />
            <img src="img11.jpg" alt="Edit 11" />
            <img src="img12.jpg" alt="Edit 12" />
            <img src="img13.jpg" alt="Edit 13" />
            <img src="img14.jpg" alt="Edit 14" />
            <img src="img15.jpg" alt="Edit 15" />
            <img src="img16.jpg" alt="Edit 16" />
          </div>
        </div>
      </section>

      <section id="ui-ux" className="content-section">
        <h2>UI UX</h2>
        <p>Details about UI and UX design...</p>
      </section>

      <section id="branding-identity" className="content-section">
        <h2>Branding & Identity Design</h2>
        <p>Details about branding and visual identity design...</p>
      </section>

      <section id="marketing-promotional" className="content-section">
        <h2>Marketing & Promotional Graphics</h2>
        <p>Details about marketing and promotional design...</p>
      </section>

      <section id="digital-content" className="content-section">
        <h2>Digital Content Design</h2>
        <p>Details about digital content design...</p>
      </section>

      <section id="packaging-product" className="content-section">
        <h2>Packaging Product Design</h2>
        <p>This section focuses on the design of packaging for various products. Services include:</p>
        <ul>
          <li><strong>Label Design:</strong> Creative and compliant product labels.</li>
          <li><strong>Box & Container Design:</strong> Structurally appealing and brand-consistent packaging.</li>
          <li><strong>Retail-Ready Concepts:</strong> Designs that stand out on shelves and convey brand values.</li>
          <li><strong>Mockups:</strong> Realistic previews for marketing and client approval.</li>
        </ul>
        <p>Packaging is designed with focus on functionality, branding, and consumer appeal.</p>
      </section>

      <section id="photo-restoration" className="content-section">
        <h2>Photo Restoration</h2>
        <p>This service involves reviving old or damaged photos to restore their original beauty. Techniques include:</p>
        <ul>
          <li>Repairing torn or scratched photographs</li>
          <li>Color correction and enhancement</li>
          <li>Removing stains, blemishes, or dust</li>
          <li>Restoring faded images with historical accuracy</li>
        </ul>
        <p>Ideal for preserving family memories and historical archives in digital format with improved quality.</p>
      </section>

      {/* Scroll to Top Button */}
      <button id="scrollToTopBtn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
      </button>
    </>
  );
};

export default HeroSection;
