import { useState, useEffect, useRef } from 'react';
import './App.css';

// Sample project data
const PROJECTS = [
  { id: 1, img: './PNGFILE/PORTRAIT.jpg', title: 'Project 1', desc: 'Description for project 1 goes here.', link: './dsfgh.html' },
  { id: 2, img: './PNGFILE/TRIPPLE EXPOSURE 1.jpg', title: 'Project 2', desc: 'Description for project 2 goes here.', link: './dsfgh.html' },
  { id: 3, img: './PNGFILE/TRIPPLE EXPOSURE 2.jpg', title: 'Project 3', desc: 'Description for project 3 goes here.', link: './dsfgh.html' },
  { id: 4, img: './PNGFILE/Untitled-1.png', title: 'Project 4', desc: 'Description for project 4 goes here.', link: './THE DAILY GRIND COFFEE SHOP.html' },
  { id: 5, img: '', title: 'Project 5', desc: 'Description for project 5 goes here.', link: './dsfgh.html' },
  { id: 6, img: './PNGFILE/TEATEA.png', title: 'Project 6', desc: 'Description for project 6 goes here.', link: './teazy taste.html' },
  { id: 7, img: './PNGFILE/peanut sarap.png', title: 'Project 7', desc: 'Description for project 7 goes here.', link: './dsfgh.html' },
  { id: 8, img: './PNGFILE/ginatang kuhol.png', title: 'Project 8', desc: 'Description for project 8 goes here.', link: './dsfgh.html' },
  { id: 9, img: './PNGFILE/PROJECT9.jpg', title: 'Project 9', desc: 'Description for project 9 goes here.', link: './dsfgh.html' },
  { id: 10, img: './PNGFILE/MILKTEA 3.jpg', title: 'Project 10', desc: 'Description for project 10 goes here.', link: './dsfgh.html' },
];

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Typing effect
  const [typingText, setTypingText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const textList = ['UI/UX Designer', 'Photo Retoucher', 'Marketing Artist'];

  useEffect(() => {
    const current = textList[wordIndex];
    let timeout;

    if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % textList.length);
      timeout = setTimeout(() => {}, 500);
    } else {
      const next = isDeleting ? charIndex - 1 : charIndex + 1;
      timeout = setTimeout(() => {
        setTypingText(current.substring(0, next));
        setCharIndex(next);
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Video/Audio intersection observer
  useEffect(() => {
    const heroSection = document.getElementById('home');
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!heroSection || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            audio?.play().catch(() => {});
          } else {
            video.pause();
            audio?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(heroSection);

    // Auto-play unlock on user interaction
    const unlockAudio = () => {
      audio?.play().catch(() => {});
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', unlockAudio);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const closeOnOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  return (
    <div className="app">
      {/* Header / Navbar */}
      <header>
        <nav className="navbar container-fluid px-5">
          <a className="navbar-brand fw-bold" href="./Index.html">MySite</a>
          <button className="navbar-toggler" type="button" onClick={() => setMobileNavOpen(true)}>
            <span className="bi bi-list fs-1">☰</span>
          </button>
          <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#experience">Experience</a></li>
              <li className="nav-item"><a className="nav-link" href="#gallery">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="#testimonials">Testimonials</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="mobile-nav-overlay active">
          <button className="close-btn" onClick={() => setMobileNavOpen(false)}>×</button>
          <div className="social-icons">
            <a href="https://www.behance.net/" target="_blank" rel="noreferrer">Be</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Fb</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Ig</a>
          </div>
          <div className="nav-links">
            <a href="#about" onClick={() => setMobileNavOpen(false)}>About</a>
            <a href="#experience" onClick={() => setMobileNavOpen(false)}>Experience</a>
            <a href="#gallery" onClick={() => setMobileNavOpen(false)}>Gallery</a>
            <a href="#testimonials" onClick={() => setMobileNavOpen(false)}>Testimonials</a>
            <a href="#contact" onClick={() => setMobileNavOpen(false)}>Contact</a>
            <a href="#portfolio" onClick={() => setMobileNavOpen(false)}>Portfolio</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-video-container">
          <video ref={videoRef} autoPlay muted loop playsInline id="hero-video">
            <source src="./PNGFILE/Virtual Tour _ It's More Fun with You in Vigan (3).mp4" type="video/mp4" />
          </video>
          <div className="overlay"></div>
        </div>

        <div className="hero-text">
          <h3>Hi There!</h3>
          <h1>I Am a <span className="highlight" id="typing-text">{typingText}</span></h1>
          <button className="btn" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            About Me <span>👤</span>
          </button>
        </div>

        <audio ref={audioRef} loop>
          <source src="./background-music.mp3" type="audio/mpeg" />
        </audio>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-left">
          <div className="about-text"></div>
        </div>
        <div className="about-right">
          <h1>About Me</h1>
          <div className="divider"></div>
          <p>
            I'm Nathaniel Tolentino Oliver II, a creative web developer and designer from the Philippines.
            With a strong eye for design and a passion for coding, I specialize in building responsive,
            modern websites and web applications. I love combining aesthetics with functionality to deliver
            meaningful digital experiences.
          </p>
          <ul>
            <li><strong>Location:</strong> Magsingal, Ilocos Sur, Philippines</li>
            <li><strong>Email:</strong> nathaniel@example.com</li>
            <li><strong>Phone:</strong> +63 912 345 6789</li>
            <li><strong>Skills:</strong> React, Node.js, UI/UX, Photo Manipulation</li>
          </ul>
          <div className="about-buttons">
            <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore My Work
            </button>
            <a href="./Nathaniel_Oliver_CV.pdf" target="_blank" rel="noreferrer">Download CV</a>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="portfolio" className="featured-projects">
        <h2>Featured Portfolio Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card" onClick={() => openModal(project)}>
              <img 
                src={project.img || 'https://via.placeholder.com/400x300?text=No+Image'} 
                alt={project.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
              <div style={{ padding: '15px' }}>
                <h3>{project.title}</h3>
                <p style={{ color: '#ccc' }}>{project.desc}</p>
                <div className="project-card-button">View Details →</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="./Portfolio.html" style={{ textDecoration: 'none' }}>
            <button className="view-all-btn">View All Projects</button>
          </a>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="modal" onClick={closeOnOutsideClick}>
          <div className="modal-content">
            <div className="modal-close" onClick={closeModal}>&times;</div>
            <img 
              className="modal-img" 
              src={selectedProject.img || 'https://via.placeholder.com/800x500?text=No+Image'} 
              alt={selectedProject.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x500?text=No+Image';
              }}
            />
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.desc}</p>
            <div className="modal-buttons">
              <a href={selectedProject.link} target="_blank" rel="noreferrer" className="modal-btn">VIEW MORE</a>
              <a href={selectedProject.link} target="_blank" rel="noreferrer" className="modal-btn">VIEW FULL PROJECT</a>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button id="scrollToTopBtn" onClick={scrollToTop}>↑</button>
      )}

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Nathaniel Tolentino Oliver II — All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
