import { useState, useEffect, useRef } from 'react';
import About from './About';
import Experience from './Experience';
import Gallery from './Gallery';
import Testimonails from './Testimonials';
import Contact from './Contact';
import Portfolio from './Portfolio';


const About = () => {
  const [activeTab, setActiveTab] = useState('bio');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    'React', 'JavaScript', 'HTML/CSS', 'Node.js', 
    'Python', 'UI/UX Design', 'Tailwind CSS', 'Git'
  ];

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Building responsive web applications with React and modern frameworks.'
    },
    {
      title: 'Web Developer Intern',
      company: 'Digital Agency Co.',
      period: '2021 - 2022',
      description: 'Assisted in developing client websites and implementing UI components.'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      period: '2018 - 2022',
      description: 'Graduated with honors, focused on web development and UI/UX.'
    }
  ];

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className={`about-container ${isVisible ? 'fade-in' : ''}`}>
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-image">
            <div className="image-placeholder">
              <span>📸</span>
            </div>
          </div>

          <div className="about-info">
            <p className="bio">
              Hi! I'm a passionate web developer with 3+ years of experience creating 
              beautiful and functional web applications. I love turning ideas into reality 
              through code and design.
            </p>

            <div className="tabs">
              <button 
                className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </button>
              <button 
                className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
              <button 
                className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'skills' && (
                <div className="skills-grid">
                  {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="timeline">
                  {experiences.map((exp, index) => (
                    <div key={index} className="timeline-item">
                      <h3>{exp.title}</h3>
                      <h4>{exp.company}</h4>
                      <span className="period">{exp.period}</span>
                      <p>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="timeline">
                  {education.map((edu, index) => (
                    <div key={index} className="timeline-item">
                      <h3>{edu.degree}</h3>
                      <h4>{edu.school}</h4>
                      <span className="period">{edu.period}</span>
                      <p>{edu.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="contact-info">
              <p>📧 john.doe@example.com</p>
              <p>📍 San Francisco, CA</p>
            </div>

            <a href="#contact" className="contact-btn">Get in Touch →</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 80px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .about-container.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          color: white;
          margin-bottom: 50px;
          position: relative;
        }

        .section-title:after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: #ffd700;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 50px;
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .image-placeholder {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
        }

        .bio {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 30px;
        }

        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 2px solid #e0e0e0;
        }

        .tab-btn {
          padding: 10px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: #666;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-btn.active {
          color: #667eea;
        }

        .tab-btn.active:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #667eea;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-tag {
          padding: 8px 16px;
          background: #f0f0f0;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #333;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .timeline-item {
          margin-bottom: 25px;
          padding-left: 20px;
          border-left: 3px solid #667eea;
        }

        .timeline-item h3 {
          color: #333;
          margin-bottom: 5px;
        }

        .timeline-item h4 {
          color: #667eea;
          margin-bottom: 5px;
        }

        .period {
          font-size: 0.85rem;
          color: #999;
          display: block;
          margin-bottom: 10px;
        }

        .contact-info {
          margin: 30px 0 20px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .contact-info p {
          margin: 8px 0;
          color: #666;
        }

        .contact-btn {
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          transition: transform 0.3s ease;
        }

        .contact-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
