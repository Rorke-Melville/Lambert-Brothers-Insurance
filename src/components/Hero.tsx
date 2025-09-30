import React, { useState, useEffect, useRef } from 'react';
import heroImage from '../assets/her.jpg';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '150px 0',
        textAlign: 'center',
        overflow: 'hidden',
        opacity: 0.8,
      }}
    >
     

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2
          style={{
            color: '#3d559a',
            fontSize: '2.5em',
            fontWeight: 'bold',
            transition: 'all 0.7s ease',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transitionDelay: '0.2s',
          }}
        >
          Protecting What Matters Most
        </h2>
        <p
          style={{
            color: '#fff',
            fontSize: '1.5em',
            fontWeight: 'bold',
            textShadow: '1px 1px 5px #000',
            transition: 'all 0.7s ease',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transitionDelay: '0.4s',
          }}
        >
          Professional insurance solutions with integrity.
        </p>
      </div>
    </section>
  );
};

export default Hero;
