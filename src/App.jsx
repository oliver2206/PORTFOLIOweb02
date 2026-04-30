import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showContact, setShowContact] = useState(false);

  // Portfolio projects data from the screenshot
  const projects = [
    { id: 1, title: "TRIPPLE EXPOSURE POSTER IMAGE", category: "poster", tags: ["Poster", "Experimental"] },
    { id: 2, title: "TRIPPLE EXPOSURE POSTER IMAGE", category: "poster", tags: ["Poster", "Double Exposure"] },
    { id: 3, title: "THE DAILY GRIND COFFEE SHOP", category: "branding", tags: ["Branding", "Menu"] },
    { id: 4, title: "TEAZY TASTE LOGO", category: "logo", tags: ["Logo", "Minimalist"] },
    { id: 5, title: "PEANUTSARAP DELIGHT LOGO", category: "logo", tags: ["Logo", "Playful"] },
    { id: 6, title: "EFFECT FOR A RAINY DAY VATAANG KUHOL", category: "editing", tags: ["Photo Effect", "Cinematic"] },
    { id: 7, title: "LIGHTROOM ADJUSTMENT EDITING", category: "editing", tags: ["Color Grading", "Lightroom"] },
    { id: 8, title: "GINATANG KOHOL THUMBNAIL", category: "thumbnail", tags: ["Thumbnail", "YouTube"] },
    { id: 9, title: "MILKTEA LOUNGE MENU", category: "menu", tags: ["Menu Design", "Typography"] },
    { id: 10, title: "IHAWAN LOGO", category: "logo", tags: ["Logo", "Grill", "Restaurant"] },
    { id: 11, title: "MARITES CRAB PASTE", category: "packaging", tags: ["Packaging", "Label Design"] },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Skill tags from About Me section
  const skills = ["HTML", "CSS", "JavaScript", "UI/UX", "Responsive Design", "Photo Retouching", "Lightroom", "Branding"];

  return (
    <div className="app">
      {/* Header / Navigation */}
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <span className="logo-icon">✨</span>
              Nathan<span className="logo-highlight">iel</span>
            </div>
            <ul className="nav-links">
              <li><a href="#home" className="nav-link active">Home</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#portfolio" className="nav-link">Portfolio</a></li>
              <li><a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); setShowContact(true); }}>Contact</a></li>
            </ul>
            <button className="cv-btn">Download CV</button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section - "Hi There! I Am a Photo Retoucher" */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-greeting">
                <span className="wave-hand">👋</span>
                <span className="greeting-text">Hi There!</span>
              </div>
              <h1 className="hero-title">
                I Am a <span className="highlight">Photo Retoucher</span>
                <br />& Creative Developer
              </h1>
              <p className="hero-description">
                Transforming ordinary images into extraordinary visual stories. 
                Based in the Philippines, crafting powerful digital experiences.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary">Explore My Work</button>
                <button className="btn btn-outline">View Portfolio</button>
              </div>
              <div className="tech-stack">
                {skills.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="tech-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="hero-image-wrapper">
              <div className="hero-image">
                <img src={heroImg} alt="Nathaniel Tolentino Oliver II - Creative Developer" />
                <div className="image-badge">
                  <span>📍 Magsingal, Ilocos Sur</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section - from second screenshot */}
        <section id="about" className="about">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Get to know me</span>
              <h2>About Me</h2>
              <div className="section-line"></div>
            </div>
            <div className="about-grid">
              <div className="about-text">
                <h3>Nathaniel Tolentino Oliver II</h3>
                <p className="about-role">Creative Web Developer & Designer from the Philippines</p>
                <p className="about-desc">
                  I specialize in building responsive, modern websites and web applications that combine 
                  aesthetics with powerful functionality. With a passion for both development and visual storytelling, 
                  I bring ideas to life through clean code and captivating design.
                </p>
                <div className="about-info">
                  <div className="info-item">
                    <span className="info-label">📍 Location:</span>
                    <span>Magsingal, Ilocos Sur, Philippines</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📧 Email:</span>
                    <span>nathaniel.oliver@creative.dev</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📞 Phone:</span>
                    <span>+63 912 345 6789</span>
                  </div>
                </div>
                <div className="skills-section">
                  <p className="skills-label">Core Expertise</p>
                  <div className="skills-cloud">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="about-actions">
                  <button className="btn btn-primary">Explore My Work</button>
                  <button className="btn btn-outline">Download CV 📄</button>
                </div>
              </div>
              <div className="about-stats">
                <div className="stat-card">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Creative Flow</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section - Featured Projects from third screenshot */}
        <section id="portfolio" className="portfolio">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Creative Showcase</span>
              <h2>Featured Portfolio Projects</h2>
              <div className="section-line"></div>
            </div>
            
            {/* Filter Buttons */}
            <div className="filter-tabs">
              {['all', 'poster', 'logo', 'branding', 'editing'].map(filter => (
                <button 
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'all' ? 'All Works' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-image">
                    <div className="image-placeholder">
                      <span className="placeholder-icon">🎨</span>
                    </div>
                    <div className="project-overlay">
                      <button className="view-btn">View Details →</button>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <a href="#" className="project-link">View Details <span>→</span></a>
                  </div>
                </div>
              ))}
            </div>

            {/* Show all projects indicator - matching screenshot style */}
            <div className="portfolio-footer">
              <p>✨ 11+ creative projects • always exploring new aesthetics ✨</p>
            </div>
          </div>
        </section>

        {/* Contact / Modal Section */}
        {showContact && (
          <div className="modal-overlay" onClick={() => setShowContact(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowContact(false)}>×</button>
              <h3>Let's Connect</h3>
              <p>Have a project in mind? I'd love to collaborate.</p>
              <div className="contact-info-modal">
                <div>📧 nathaniel.oliver@creative.dev</div>
                <div>📞 +63 912 345 6789</div>
                <div>📍 Magsingal, Ilocos Sur, PH</div>
              </div>
              <button className="btn btn-primary" onClick={() => setShowContact(false)}>Close</button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">Nathan<span className="logo-highlight">iel</span></div>
              <p>Creative Developer & Visual Storyteller</p>
            </div>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); setShowContact(true); }}>Contact</a>
            </div>
            <div className="footer-social">
              <span>📷 IG</span>
              <span>🐦 X</span>
              <span>💼 LinkedIn</span>
              <span>🎨 Behance</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Nathaniel Tolentino Oliver II | Magsingal, Ilocos Sur, Philippines</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
