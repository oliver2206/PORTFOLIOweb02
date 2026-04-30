import React, { useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => {
  const heroVideoRef = useRef(null);
  const heroAudioRef = useRef(null);
  const particlesInitialized = useRef(false);
  const typingInterval = useRef(null);
  const textList = ['UI/UX Designer', 'Photo Retoucher', 'Marketing Artist'];
  const typingTextRef = useRef(null);

  // Typing Effect
  useEffect(() => {
    let wordIndex = 0,
      charIndex = 0,
      isDeleting = false;

    const type = () => {
      if (!typingTextRef.current) return;
      const current = textList[wordIndex];
      if (isDeleting) {
        typingTextRef.current.textContent = current.substring(0, charIndex--);
      } else {
        typingTextRef.current.textContent = current.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        typingInterval.current = setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % textList.length;
        typingInterval.current = setTimeout(type, 500);
      } else {
        typingInterval.current = setTimeout(type, isDeleting ? 50 : 100);
      }
    };

    type();

    return () => {
      if (typingInterval.current) clearTimeout(typingInterval.current);
    };
  }, []);

  // Audio unlock on first click
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

  // Hero video/audio observer
  useEffect(() => {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

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

    observer.observe(heroSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  }, []);

  // Particles.js initialization
  useEffect(() => {
    if (particlesInitialized.current) return;
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: ['#ffffff', '#0000ff'] },
          shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
          opacity: { value: 8.0, random: true, anim: { enable: false } },
          size: { value: 3, random: true, anim: { enable: false } },
          line_linked: {
            enable: true,
            distance: 150,
            color: '0000ff',
            opacity: 10.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: 'none',
            random: false,
            straight: false,
            bounce: false,
            attract: { enable: false },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.8 } },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
      particlesInitialized.current = true;
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
      script.onload = () => {
        if (window.particlesJS) {
          window.particlesJS('particles-js', {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: ['#ffffff', '#0000ff'] },
              shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
              opacity: { value: 8.0, random: true, anim: { enable: false } },
              size: { value: 3, random: true, anim: { enable: false } },
              line_linked: {
                enable: true,
                distance: 150,
                color: '0000ff',
                opacity: 10.5,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: false,
                straight: false,
                bounce: false,
                attract: { enable: false },
              },
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true,
              },
              modes: {
                grab: { distance: 140, line_linked: { opacity: 0.8 } },
                push: { particles_nb: 4 },
              },
            },
            retina_detect: true,
          });
          particlesInitialized.current = true;
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const toggleMobileNav = useCallback(() => {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.toggle('active');
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

          /* HERO SECTION */
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

          /* About Section Styles */
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
            background: url('./PNGFILE/profile.jpg') no-repeat center center/cover;
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

          /* Services Section Styles */
          #services {
            position: relative;
            height: auto;
            padding: 80px 10%;
            background-color: #090505;
            overflow: hidden;
          }

          #particles-js {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          .services-container {
            position: relative;
            z-index: 1;
          }

          .services-container h1,
          .services-container h2 {
            text-align: center;
            margin-bottom: 20px;
          }

          .services-container h2 {
            font-size: 2.5rem;
            color: #fff;
            letter-spacing: 2px;
          }

          .services-container h1 {
            font-size: 2rem;
            font-weight: bold;
            color: #f5f5f5;
            line-height: 1.5;
            margin-bottom: 50px;
          }

          .experience-education {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 60px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .experience-education h3 {
            letter-spacing: 2px;
            color: #aaa;
            font-size: 0.9rem;
          }

          .experience-education p {
            margin: 5px 0;
            font-size: 0.9rem;
            color: #bbb;
          }

          .experience-education .job-title {
            font-weight: bold;
            color: #fff;
          }

          .experience-education .position {
            color: #ccc;
          }

          .experience-education .date {
            font-size: 0.8rem;
            color: #888;
          }
        `}
      </style>

      {/* Header */}
      <header>
        <nav className="navbar navbar-expand-lg container-fluid px-5">
          <a className="navbar-brand fw-bold" href="./Index.html">
            MySite
          </a>
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
      <div id="mobileNav" className="mobile-nav-overlay">
        <button className="close-btn" onClick={toggleMobileNav}>&times;</button>
        <div className="social-icons">
          <a href="https://www.behance.net/" target="_blank" rel="noreferrer">
            <i className="bi bi-behance"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
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

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-video-container">
          <video
            ref={heroVideoRef}
            id="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://via.placeholder.com/1920x1080?text=Hero+Video"
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
          <div className="overlay"></div>
        </div>
        <audio ref={heroAudioRef} id="hero-audio" loop>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>
        <div className="hero-text">
          <h3>Welcome To My World</h3>
          <h1>Hi, I'm <span className="highlight">Nathaniel</span></h1>
          <h3>A <span id="typing-text" ref={typingTextRef}></span></h3>
          <button
            className="btn mt-4"
            data-bs-toggle="modal"
            data-bs-target="#resumeModal"
          >
            View My Resume <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </section>

      {/* Scroll To Top */}
      <button id="scrollToTopBtn" title="Go to top" onClick={scrollToTop}>
        ↑
      </button>

      {/* Resume Modal */}
      <div className="modal fade" id="resumeModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">My Resume</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <iframe
                src="./PNGFILE/20241009-462596351_1088628659494015_4898831739426233640_n.jpg"
                title="Resume"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about">
        <div className="about-left">
          <div className="about-text"></div>
        </div>
        <div className="about-right">
          <h1>About Me</h1>
          <div className="divider"></div>
          <p>
            I'm Nathaniel Tolentino Oliver II, a creative web developer and designer from the
            Philippines. With a strong eye for design and a passion for coding, I specialize in
            building responsive, modern websites and web applications. I love combining aesthetics
            with functionality to deliver meaningful digital experiences.
          </p>
          <ul>
            <li><strong>Location:</strong> Magsingal, Ilocos Sur, Philippines</li>
            <li><strong>Email:</strong> nathaniel@example.com</li>
            <li><strong>Phone:</strong> +63 912 345 6789</li>
            <li><strong>Skills:</strong> HTML, CSS, JavaScript, React, UI/UX Design</li>
          </ul>
          <div className="about-buttons">
            <button>Explore My Work</button>
            <a href="./Nathaniel_Oliver_CV.pdf" target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div id="particles-js"></div>
        <div className="services-container">
          <h2>EXPERTISE</h2>
          <h1>
            Visual Design, Branding Identity, UI Design,<br /> Product Design, Prototyping,
            Illustration
          </h1>
          <div className="experience-education">
            {/* Experience */}
            <div>
              <h3>EXPERIENCE</h3>
              <div>
                <p className="job-title">Dropbox</p>
                <p className="position">Product Designer</p>
                <p className="date">August 2019 – Present</p>
                <p>
                  Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur.
                </p>
              </div>
              <div style={{ marginTop: '30px' }}>
                <p className="job-title">Microsoft</p>
                <p className="position">Frontend Developer</p>
                <p className="date">August 2016 – July 2019</p>
                <p>
                  Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur.
                </p>
              </div>
            </div>
            {/* Education */}
            <div>
              <h3>EDUCATION</h3>
              <div>
                <p className="job-title">University of Life</p>
                <p className="position">Master in Graphic Design</p>
                <p className="date">April 2018</p>
                <p>
                  Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur.
                </p>
              </div>
              <div style={{ marginTop: '30px' }}>
                <p className="job-title">School of Cool Designers</p>
                <p className="position">B.A. Degree in Graphic Design</p>
                <p className="date">August 2012</p>
                <p>
                  Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default HomePage;
