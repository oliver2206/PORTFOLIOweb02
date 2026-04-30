import { SKILLS } from './shared'

export default function About({ navigate }) {
  return (
    <div className="page-wrapper" style={{ background: 'linear-gradient(180deg, #050508 0%, #080810 100%)', color: '#e0e8ff' }}>
      {/* Page Banner */}
      <div className="page-hero-banner">
        <h1>About Me</h1>
        <p>Get to know the person behind the work</p>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '80px 5%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}>
        {/* Photo */}
        <div style={{
          aspectRatio: '3/4',
          background: 'linear-gradient(135deg, #0d1b3e 0%, #0a0a18 100%)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(41,121,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          animation: 'float 6s ease-in-out infinite, slideInLeft 0.7s ease forwards',
          boxShadow: '0 30px 80px rgba(41,121,255,0.1)',
        }}>
          <div style={{
            width: '80%', height: '80%',
            background: 'rgba(41,121,255,0.05)',
            borderRadius: '14px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '16px',
          }}>
            <div style={{ fontSize: '6rem' }}>📷</div>
            <p style={{ color: '#2979ff', fontSize: '0.85rem', opacity: 0.6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Your Photo Here
            </p>
          </div>
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(5,5,8,0.5) 0%, transparent 60%)',
          }} />
          {/* Decorative corner accent */}
          <div style={{
            position: 'absolute', top: 20, right: 20,
            width: '60px', height: '60px',
            border: '2px solid rgba(41,121,255,0.3)',
            borderRadius: '12px',
          }} />
          <div style={{
            position: 'absolute', bottom: 20, left: 20,
            width: '40px', height: '40px',
            border: '2px solid rgba(41,121,255,0.2)',
            borderRadius: '50%',
          }} />
        </div>

        {/* Info */}
        <div style={{ animation: 'slideInRight 0.7s ease forwards' }}>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />

          <p style={{ color: '#a0b4d0', lineHeight: 1.9, marginBottom: '32px', fontSize: '1rem' }}>
            I'm{' '}
            <strong style={{ color: '#e0e8ff', fontWeight: 700 }}></strong>
            , a creative web developer and designer from the Philippines. I specialize in building responsive, modern websites and web applications that combine aesthetics with powerful functionality.
          </p>

          <p style={{ color: '#a0b4d0', lineHeight: 1.9, marginBottom: '36px', fontSize: '0.95rem' }}>
            With a passion for both design and development, I bring ideas to life through clean code and thoughtful visuals — from logo design and photo retouching to full web applications.
          </p>

          {/* Contact Info */}
          <div style={{
            background: 'rgba(41,121,255,0.05)',
            border: '1px solid rgba(41,121,255,0.15)',
            borderRadius: '14px',
            padding: '24px',
            marginBottom: '28px',
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            {[
              { icon: '📍', label: 'Location', val: '' },
              { icon: '✉️', label: 'Email', val: '' },
              { icon: '📱', label: 'Phone', val: '+63 9XX XXX XXXX' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span style={{ color: '#90b8ff', fontWeight: 600, fontSize: '0.88rem', minWidth: '65px' }}>{item.label}:</span>
                <span style={{ color: '#a0b4d0', fontSize: '0.88rem' }}>{item.val}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
            {SKILLS.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn-outline" onClick={() => navigate('portfolio')}>
              Explore My Work
            </button>
            <button className="btn-primary">
              Download CV ↓
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{
        background: 'rgba(41,121,255,0.04)',
        borderTop: '1px solid rgba(41,121,255,0.1)',
        borderBottom: '1px solid rgba(41,121,255,0.1)',
        padding: '50px 5%',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px', textAlign: 'center',
        }}>
          {[
            { num: '3+', label: 'Years Experience' },
            { num: '50+', label: 'Projects Done' },
            { num: '30+', label: 'Happy Clients' },
            { num: '10+', label: 'Skills Mastered' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2979ff', lineHeight: 1 }}>{stat.num}</div>
              <div style={{ color: '#8898aa', fontSize: '0.85rem', marginTop: '8px', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
