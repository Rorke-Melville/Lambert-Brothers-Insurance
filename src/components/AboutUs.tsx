import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Users, Award } from 'lucide-react';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ clients: 0, experience: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate counters
          animateCounter('clients', 500, 2000);
          animateCounter('experience', 15, 1500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = (key: 'clients' | 'experience', target: number, duration: number) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
    }, 16);
  };

  const FeatureCard = ({ icon: Icon, title, description, delay }: {
    icon: React.ElementType;
    title: string;
    description: string;
    delay: number;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`
          flex items-start transition-all duration-700 transform
          ${isVisible 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-8 opacity-0'
          }
        `}
        style={{ transitionDelay: `${delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`
          transition-all duration-300 transform mr-3 mt-1 flex-shrink-0
          ${isHovered ? 'scale-110 rotate-6' : ''}
        `}>
          <Icon className="h-6 w-6 text-green-500" />
          {isHovered && (
            <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-lg animate-pulse"></div>
          )}
        </div>
        <div>
          <h4 className={`
            font-semibold text-gray-900 transition-colors duration-300
            ${isHovered ? 'text-green-600' : ''}
          `}>
            {title}
          </h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, number, label, delay }: {
    icon: React.ElementType;
    number: number;
    label: string;
    delay: number;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`
          text-center transition-all duration-700 transform
          ${isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
          }
        `}
        style={{ transitionDelay: `${delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <Icon className={`
            h-8 w-8 text-blue-600 mx-auto mb-2 transition-all duration-300 transform
            ${isHovered ? 'scale-125 text-blue-500' : ''}
          `} />
          {isHovered && (
            <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl animate-pulse"></div>
          )}
        </div>
        <div className={`
          text-2xl font-bold text-gray-900 transition-all duration-300
          ${isHovered ? 'text-blue-600 scale-110' : ''}
        `}>
          {number}+
        </div>
        <div className="text-gray-600">{label}</div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`
            text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000
            ${isVisible 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
            }
          `}>
            About Lambert Brothers
          </h2>
          <div className={`
            w-24 h-1 bg-blue-600 mx-auto mb-6 transition-all duration-1000 delay-200
            ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
          `}></div>
          <p className={`
            text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400
            ${isVisible 
              ? 'transform translate-y-0 opacity-100 filter blur-none' 
              : 'transform translate-y-4 opacity-0 filter blur-sm'
            }
          `}>
            With decades of combined experience, we've built our reputation on trust, expertise, and personalized service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className={`
              text-2xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-600
              ${isVisible 
                ? 'transform translate-x-0 opacity-100' 
                : 'transform -translate-x-8 opacity-0'
              }
            `}>
              Our Story
            </h3>
            
            <div className="space-y-4">
              <p className={`
                text-gray-600 leading-relaxed transition-all duration-700 delay-700
                ${isVisible 
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform -translate-x-8 opacity-0'
                }
              `}>
                Founded with a vision to provide comprehensive insurance solutions, Lambert Brothers Insurance has been serving families and businesses with dedication and integrity. We understand that insurance isn't just about policies—it's about protecting your dreams, your future, and your peace of mind.
              </p>
              <p className={`
                text-gray-600 leading-relaxed transition-all duration-700 delay-800
                ${isVisible 
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform -translate-x-8 opacity-0'
                }
              `}>
                Our expert team specializes in both short-term and long-term coverage options, ensuring that you have the right protection at every stage of your life journey.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <StatCard 
                icon={Users} 
                number={counters.clients} 
                label="Happy Clients" 
                delay={1000}
              />
              <StatCard 
                icon={Award} 
                number={counters.experience} 
                label="Years Experience" 
                delay={1200}
              />
            </div>
          </div>
          
          <div className={`
            bg-white p-8 rounded-2xl shadow-xl transition-all duration-1000 delay-400 transform
            ${isVisible 
              ? 'translate-x-0 opacity-100 rotate-0' 
              : 'translate-x-8 opacity-0 rotate-1'
            }
          `}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
            <div className="space-y-6">
              <FeatureCard
                icon={CheckCircle}
                title="Personalized Service"
                description="Tailored solutions that fit your unique needs and budget."
                delay={800}
              />
              <FeatureCard
                icon={CheckCircle}
                title="Expert Guidance"
                description="Professional advice from experienced insurance specialists."
                delay={1000}
              />
              <FeatureCard
                icon={CheckCircle}
                title="Comprehensive Coverage"
                description="Wide range of insurance products to protect what matters most."
                delay={1200}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;