import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HeroSection = () => {
  const [typingText, setTypingText] = useState('');
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const heroVideoRef = useRef(null);
  const heroAudioRef = useRef(null);

  const textList = ['UI/UX Designer', 'Photo Retoucher', 'Marketing Artist'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  // Typing animation
  useEffect(() => {
    const type = () => {
      const current = textList[wordIndex];
      if (isDeleting) {
        setTypingText(current.substring(0, charIndex--));
      } else {
        setTypingText(current.substring(0, charIndex++));
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % textList.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 50 : 100);
      }
    };

    type();
  }, []);

  // Audio autoplay on click
  useEffect(() => {
    const unlockAudio = () => {
      if (heroAudioRef.current) {
        heroAudioRef.current.play().catch(() => {});
      }
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    return () => document.removeEventListener('click', unlockAudio);
  }, []);

  // Intersection Observer for video/audio
  useEffect(() => {
    const heroSection = document.getElementById('home');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (heroVideoRef.current) heroVideoRef.current.play();
            if (heroAudioRef.current) heroAudioRef.current.play().catch(() => {});
          } else {
            if (heroVideoRef.current) heroVideoRef.current.pause();
            if (heroAudioRef.current) heroAudioRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroSection) observer.observe(heroSection);
    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = (modalId) => {
    setActiveModal(null);
  };

  const closeOnOutsideClick = (e, modalId) => {
    if (e.target.classList.contains('modal')) {
      setActiveModal(null);
    }
  };

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          body {
            font-family: 'Segoe UI', sans-serif;
            background: #000;
            color: #fff;
          }
          
          header {
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 10;
            background: #fff;
          }
          
          .navbar-brand {
            color: #3391ff !important;
          }
          
          .navbar-nav .nav-link {
            color: #3391ff;
            font-weight: bold;
            transition: color 0.3s ease;
          }
          
          .navbar-nav .nav-link:hover {
            color: #000;
          }
          
          .navbar-toggler {
            border: none;
          }
          
          .navbar-toggler:focus {
            box-shadow: none;
          }
          
          .navbar-toggler .bi {
            color: #3391ff;
          }
          
          .hero {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            width: 100%;
            overflow: hidden;
            padding: 60px 10%;
            text-align: center;
          }
          
          .hero-video-container {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
          }
          
          .hero-video-container video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            position: absolute;
            top: 0;
            left: 0;
          }
          
          .hero-video-container .overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
          }
          
          .hero-text {
            position: relative;
            z-index: 1;
            max-width: 600px;
            color: #fff;
          }
          
          .hero-text h3 {
            font-size: 1.5rem;
            color: #3391ff;
          }
          
          .hero-text h1 {
            font-size: 3rem;
            margin: 10px 0;
            color: #3391ff;
          }
          
          .highlight {
            color: #3391ff;
          }
          
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 24px;
            border: 2px solid #3391ff;
            background: #3391ff;
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            border-radius: 4px;
            transition: background 0.3s ease;
          }
          
          .btn:hover {
            background: #2673cc;
          }
          
          @media (max-width: 768px) {
            .hero-text h1 {
              font-size: 2rem;
            }
            .hero-text h3 {
              font-size: 1.2rem;
            }
            .hero {
              padding: 40px 5%;
            }
          }
          
          .modal-dialog {
            max-width: 90%;
            height: 90%;
          }
          
          .modal-body {
            height: 80vh;
            padding: 0;
          }
          
          .modal-body iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
          
          #scrollToTopBtn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #3391ff;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 999;
          }
          
          #scrollToTopBtn:hover {
            background: #2673cc;
          }
          
          .mobile-nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            z-index: 9999;
            display: none;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.3s ease;
            padding: 20px;
          }
          
          .mobile-nav-overlay.active {
            display: flex;
          }
          
          .mobile-nav-overlay .close-btn {
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 2.5rem;
            cursor: pointer;
            color: #3391ff;
            background: none;
            border: none;
          }
          
          .mobile-nav-overlay .social-icons {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-right: 50px;
          }
          
          .mobile-nav-overlay .social-icons a {
            font-size: 2rem;
            color: #3391ff;
            transition: color 0.3s ease;
          }
          
          .mobile-nav-overlay .social-icons a:hover {
            color: #000;
          }
          
          .mobile-nav-overlay .nav-links {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          
          .mobile-nav-overlay .nav-links a {
            font-size: 1.5rem;
            margin: 15px 0;
            color: #3391ff;
            font-weight: bold;
            text-decoration: none;
          }
          
          .mobile-nav-overlay .nav-links a:hover {
            color: #000;
          }
          
          @media (min-width: 992px) {
            .mobile-nav-overlay {
              display: none !important;
            }
          }

          section#about {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            height: 100vh;
          }
          
          .about-left,
          .about-right {
            flex: 1;
            min-width: 300px;
            position: relative;
          }
          
          .about-left {
            background: url('/PNGFILE/profile.jpg') no-repeat center center/cover;
          }
          
          .about-text {
            position: absolute;
            bottom: 60px;
            left: 40px;
            color: white;
            text-shadow: 2px 2px 5px #3391ff;
          }
          
          .about-text p {
            font-size: 16px;
            margin: 0 0 10px 0;
          }
          
          .about-text h2 {
            font-size: 28px;
            font-weight: bold;
            line-height: 1.4;
            margin: 0;
          }
          
          .about-right {
            background-color: #1a1a1a;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 60px;
          }
          
          .about-right h1 {
            font-size: 50px;
            font-weight: bold;
            color: #3391ff;
            margin: 0;
          }
          
          .divider {
            width: 60px;
            height: 3px;
            background-color: #3391ff;
            margin: 20px 0;
          }
          
          .about-right p,
          .about-right ul {
            color: #3391ff;
          }
          
          .about-right p {
            font-size: 18px;
            margin-bottom: 40px;
          }
          
          .about-right ul {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 40px;
            padding-left: 20px;
          }
          
          .about-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }
          
          .about-buttons button,
          .about-buttons a {
            padding: 12px 24px;
            font-weight: bold;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(51, 145, 255, 0.4);
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }
          
          .about-buttons button {
            background-color: white;
            color: #3391ff;
          }
          
          .about-buttons button:hover {
            background-color: #3391ff;
            color: white;
          }
          
          .about-buttons a {
            background-color: #3391ff;
            color: white;
          }
          
          .about-buttons a:hover {
            background-color: #2277cc;
          }
          
          @media (max-width: 768px) {
            section#about {
              flex-direction: column;
              height: auto;
            }
            .about-left,
            .about-right {
              min-height: 400px;
            }
            .about-text {
              position: static;
              padding: 20px;
            }
            .about-right {
              padding: 40px 20px;
            }
            .about-right h1 {
              font-size: 36px;
            }
          }

          .cinematic-section {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            background: #010101;
            padding: 60px 20px;
            gap: 40px;
          }
          
          .cinematic-section.alt {
            background: #000;
          }
          
          .cinematic-content,
          .cinematic-video {
            flex: 1 1 500px;
            min-width: 300px;
          }
          
          .cinematic-video video {
            width: 100%;
            border-radius: 20px;
          }
          
          .cinematic-content h1 {
            font-size: 2.2rem;
            color: white;
            margin-bottom: 20px;
          }
          
          .cinematic-content p {
            font-size: 1rem;
            color: #ffffff;
            line-height: 1.6;
          }
          
          .cinematic-content button {
            margin-top: 20px;
            background-color: #0c3;
            border: none;
            color: white;
            padding: 10px 24px;
            font-size: 1rem;
            border-radius: 8px;
            cursor: pointer;
          }
          
          @media (max-width: 768px) {
            .cinematic-section {
              flex-direction: column;
              text-align: center;
            }
            .cinematic-content h1 {
              font-size: 1.8rem;
            }
          }

          #featured-projects {
            position: relative;
            z-index: 1;
            padding: 60px 20px;
          }
          
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          @media (max-width: 1200px) {
            .projects-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          
          @media (max-width: 900px) {
            .projects-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          @media (max-width: 700px) {
            .projects-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 480px) {
            .projects-grid {
              grid-template-columns: 1fr;
            }
          }
          
          .project-card {
            background: #111;
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.3s;
            cursor: pointer;
          }
          
          .project-card:hover {
            transform: scale(1.02);
          }
          
          .project-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          
          .project-card-button {
            margin-top: 10px;
            display: inline-block;
            padding: 8px 16px;
            background-color: #fff;
            color: #000;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
          }
          
          .modal {
            display: ${activeModal ? 'flex' : 'none'};
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.9);
            justify-content: center;
            align-items: center;
          }
          
          .modal-content {
            background-color: #222;
            margin: auto;
            padding: 20px;
            max-width: 600px;
            border-radius: 10px;
            text-align: center;
            position: relative;
          }
          
          .modal-img {
            max-width: 100%;
            height: auto;
            margin-bottom: 20px;
            border-radius: 10px;
          }
          
          .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 2rem;
            color: #fff;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            line-height: 38px;
            text-align: center;
            transition: background 0.3s ease;
          }
          
          .modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `}
      </style>

      <header>
        <nav className="navbar navbar-expand-lg container-fluid px-5">
          <a className="navbar-brand fw-bold" href="./Index.html">MySite</a>
          <button className="navbar-toggler" type="button" onClick={toggleMobileNav}>
            <span className="bi bi-list fs-1"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="./ABOUT.html">About</a></li>
              <li className="nav-item"><a className="nav-link" href="./Ecperience.html">Experience</a></li>
              <li className="nav-item"><a className="nav-link" href="./Gallery.html">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="./Testimonials.html">Testimonials</a></li>
              <li className="nav-item"><a className="nav-link" href="./Contact.html">Contact</a></li>
              <li className="nav-item"><a className="nav-link" href="./Portfolio.html">Portfolio</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Nav */}
      <div id="mobileNav" className={`mobile-nav-overlay ${mobileNavActive ? 'active' : ''}`}>
        <div className="social-icons">
          <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer"><i className="bi bi-behance"></i></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
        </div>
        <div className="nav-links">
          <a href="./ABOUT.html" onClick={toggleMobileNav}>About</a>
          <a href="./Ecperience.html" onClick={toggleMobileNav}>Experience</a>
          <a href="./Gallery.html" onClick={toggleMobileNav}>Gallery</a>
          <a href="./Testimonials.html" onClick={toggleMobileNav}>Testimonials</a>
          <a href="./Contact.html" onClick={toggleMobileNav}>Contact</a>
          <a href="./Portfolio.html" onClick={toggleMobileNav}>Portfolio</a>
        </div>
      </div>

      <section className="hero" id="home">
        <div className="hero-video-container">
          <video autoPlay muted loop playsInline ref={heroVideoRef} id="hero-video">
            <source src="/PNGFILE/Virtual Tour _ It's More Fun with You in Vigan (3).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay"></div>
        </div>

        <div className="hero-text">
          <h3>Hi There!</h3>
          <h1>I Am a <span className="highlight">{typingText}</span></h1>
          <a href="#" className="btn" data-bs-toggle="modal" data-bs-target="#resumeModal">About Me <i className="bi bi-person-fill"></i></a>
        </div>

        <audio ref={heroAudioRef} id="hero-audio" loop>
          <source src="/background-music.mp3" type="audio/mpeg" />
        </audio>
      </section>

      {/* Scroll To Top */}
      <button id="scrollToTopBtn" onClick={scrollToTop} title="Go to top">↑</button>

      {/* About Section */}
      <section id="about">
        <div className="about-left">
          <div className="about-text"></div>
        </div>
        <div className="about-right">
          <h1>About Me</h1>
          <div className="divider"></div>
          <p>
            I'm Nathaniel Tolentino Oliver II, a creative web developer and designer from the Philippines. With a strong eye for design and a passion for coding, I specialize in building responsive, modern websites and web applications. I love combining aesthetics
            with functionality to deliver meaningful digital experiences.
          </p>
          <ul>
            <li><strong>Location:</strong> Magsingal, Ilocos Sur, Philippines</li>
            <li><strong>Email:</strong> </li>
            <li><strong>Phone:</strong></li>
            <li><strong>Skills:</strong></li>
          </ul>
          <div className="about-buttons">
            <button>Explore My Work</button>
            <a href="/Nathaniel_Oliver_CV.pdf" target="_blank" rel="noopener noreferrer">Download CV</a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured-projects" style={{ padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px' }}>Featured Portfolio Projects</h2>

        <div className="projects-grid">
          {/* Project Cards */}
          <div className="project-card" onClick={() => openModal('modal1')}>
            <img src="/PNGFILE/PORTRAIT.jpg" alt="Project 1" />
            <div style={{ padding: '15px' }}>
              <h3>Project 1</h3>
              <p style={{ color: '#ccc' }}>Description for project 1 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal2')}>
            <img src="/PNGFILE/TRIPPLE EXPOSURE 1.jpg" alt="Project 2" />
            <div style={{ padding: '15px' }}>
              <h3>Project 2</h3>
              <p style={{ color: '#ccc' }}>Description for project 2 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal3')}>
            <img src="/PNGFILE/TRIPPLE EXPOSURE 2.jpg" alt="Project 3" />
            <div style={{ padding: '15px' }}>
              <h3>Project 3</h3>
              <p style={{ color: '#ccc' }}>Description for project 3 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal4')}>
            <img src="/PNGFILE/Untitled-1.png" alt="Project 4" />
            <div style={{ padding: '15px' }}>
              <h3>Project 4</h3>
              <p style={{ color: '#ccc' }}>Description for project 4 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal5')}>
            <img src="" alt="Project 5" />
            <div style={{ padding: '15px' }}>
              <h3>Project 5</h3>
              <p style={{ color: '#ccc' }}>Description for project 5 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal6')}>
            <img src="/PNGFILE/TEATEA.png" alt="Project 6" />
            <div style={{ padding: '15px' }}>
              <h3>Project 6</h3>
              <p style={{ color: '#ccc' }}>Description for project 6 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal7')}>
            <img src="/PNGFILE/peanut sarap.png" alt="Project 7" />
            <div style={{ padding: '15px' }}>
              <h3>Project 7</h3>
              <p style={{ color: '#ccc' }}>Description for project 7 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal8')}>
            <img src="/PNGFILE/ginatang kuhol.png" alt="Project 8" />
            <div style={{ padding: '15px' }}>
              <h3>Project 8</h3>
              <p style={{ color: '#ccc' }}>Description for project 8 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal9')}>
            <img src="/PNGFILE/PROJECT9.jpg" alt="Project 9" />
            <div style={{ padding: '15px' }}>
              <h3>Project 9</h3>
              <p style={{ color: '#ccc' }}>Description for project 9 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
          <div className="project-card" onClick={() => openModal('modal10')}>
            <img src="/PNGFILE/MILKTEA 3.jpg" alt="Project 10" />
            <div style={{ padding: '15px' }}>
              <h3>Project 10</h3>
              <p style={{ color: '#ccc' }}>Description for project 10 goes here.</p>
              <div className="project-card-button">View Details</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="./Portfolio.html" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '12px 24px', fontSize: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              View All Projects
            </button>
          </a>
        </div>
      </section>

      {/* Modals */}
      {['modal1', 'modal2', 'modal3', 'modal4', 'modal5', 'modal6', 'modal7', 'modal8', 'modal9', 'modal10'].map((modalId, index) => (
        <div key={modalId} id={modalId} className="modal" onClick={(e) => closeOnOutsideClick(e, modalId)}>
          <div className="modal-content">
            <div className="modal-close" onClick={() => closeModal(modalId)}>&times;</div>
            <img className="modal-img" src={
              modalId === 'modal1' ? '/PNGFILE/PORTRAIT.jpg' :
              modalId === 'modal2' ? '/PNGFILE/TRIPPLE EXPOSURE 1.jpg' :
              modalId === 'modal3' ? '/PNGFILE/TRIPPLE EXPOSURE 2.jpg' :
              modalId === 'modal4' ? '/PNGFILE/Untitled-1.png' :
              modalId === 'modal5' ? '' :
              modalId === 'modal6' ? '/PNGFILE/TEATEA.png' :
              modalId === 'modal7' ? '/PNGFILE/peanut sarap.png' :
              modalId === 'modal8' ? '/PNGFILE/ginatang kuhol.png' :
              modalId === 'modal9' ? '/PNGFILE/PROJECT9.jpg' :
              '/PNGFILE/MILKTEA 3.jpg'
            } alt={`Project ${index + 1}`} />
            <h2>Project {index + 1}</h2>
            <p>Detailed information about project {index + 1}. You can link more content or even embed videos.</p>
            <a href="./dsfgh.html" target="_blank" rel="noopener noreferrer" className="project-card-button">VIEW MORE</a>
            <a href={modalId === 'modal4' ? './THE DAILY GRIND COFFEE SHOP.html' : modalId === 'modal6' ? './teazy taste.html' : './dsfgh.html'} target="_blank" rel="noopener noreferrer" className="project-card-button">VIEW FULL PROJECT</a>
          </div>
        </div>
      ))}

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default HeroSection;
