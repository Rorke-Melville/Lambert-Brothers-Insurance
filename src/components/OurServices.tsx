import React, { useState, useEffect, useRef } from 'react';
import { Shield, Users, Award, CheckCircle } from 'lucide-react';

const OurServices: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Short-Term Insurance",
      description: "Comprehensive coverage for your immediate needs including auto, home, and personal property insurance.",
      icon: Shield,
      features: ["Auto Insurance", "Home Insurance", "Personal Property", "Business Coverage"],
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700"
    },
    {
      title: "Life & Investments",
      description: "Secure your family's future with our life insurance and investment planning services.",
      icon: Users,
      features: ["Life Insurance", "Investment Planning", "Retirement Plans", "Education Funding"],
      color: "from-green-500 to-green-600",
      hoverColor: "from-green-600 to-green-700"
    },
    {
      title: "Risk Planning",
      description: "Strategic risk assessment and planning to protect your assets and minimize potential losses.",
      icon: Award,
      features: ["Risk Assessment", "Asset Protection", "Business Continuity", "Emergency Planning"],
      color: "from-purple-500 to-purple-600",
      hoverColor: "from-purple-600 to-purple-700"
    }
  ];

  const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const Icon = service.icon;

    // Detect mobile
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Force features visible on mobile
    useEffect(() => {
      if (isMobile) {
        setIsHovered(false);
        setShowFeatures(true);
      }
    }, [isMobile]);

    return (
      <div
        className={`
          relative bg-gray-50 rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-700 transform group
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-12 opacity-0 scale-95'
          }
          ${!isMobile && isHovered 
            ? 'shadow-2xl -translate-y-4 rotate-1 scale-105' 
            : 'shadow-lg'}
        `}
        style={{ transitionDelay: `${index * 200}ms` }}
        onMouseEnter={() => !isMobile && (setIsHovered(true), setTimeout(() => setShowFeatures(true), 200))}
        onMouseLeave={() => !isMobile && (setIsHovered(false), setShowFeatures(false))}
      >
        {/* Animated background gradient */}
        <div className={`
          absolute inset-0 bg-gradient-to-br transition-all duration-500
          ${isHovered ? service.hoverColor : service.color}
          ${isHovered && !isMobile ? 'opacity-10' : 'opacity-0'}
        `}></div>

        {/* Floating particles effect - disabled on mobile */}
        {!isMobile && isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              ></div>
            ))}
          </div>
        )}

        <div className="relative p-8 z-10">
          {/* Icon with glow effect */}
          <div className="relative mb-6">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              bg-gradient-to-br ${service.color} transition-all duration-300 transform
              ${isHovered && !isMobile ? 'scale-110 rotate-12' : ''}
            `}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div className={`
              absolute inset-0 w-16 h-16 rounded-full blur-lg transition-opacity duration-300
              bg-gradient-to-br ${service.color}
              ${isHovered && !isMobile ? 'opacity-30 scale-125' : 'opacity-0'}
            `}></div>
          </div>

          {/* Title */}
          <h3 className={`
            text-2xl font-bold text-gray-900 mb-4 transition-all duration-300
            ${isHovered && !isMobile ? 'text-blue-600 translate-x-2' : ''}
          `}>
            {service.title}
          </h3>

          {/* Description */}
          <p className={`
            text-gray-600 mb-6 leading-relaxed transition-all duration-300
            ${isHovered && !isMobile ? 'text-gray-700' : ''}
          `}>
            {service.description}
          </p>

          {/* Features list - always visible on mobile */}
          <div className={`
            transition-all duration-500 transform
            ${showFeatures ? 'max-h-48 opacity-100' : 'max-h-32 opacity-80'}
          `}>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li
                  key={idx}
                  className={`
                    flex items-center text-gray-600 transition-all duration-300 transform
                    ${showFeatures ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-60'}
                  `}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <CheckCircle className={`
                    h-4 w-4 text-green-500 mr-2 transition-all duration-300
                    ${isHovered && !isMobile ? 'scale-110 text-green-400' : ''}
                  `} />
                  <span className={`${isHovered && !isMobile ? 'font-medium' : ''}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hover indicator - hidden on mobile */}
          {!isMobile && (
            <div className={`
              absolute bottom-4 right-4 transition-all duration-300
              ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
            `}>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Animated border */}
        <div className={`
          absolute inset-0 rounded-2xl border-2 transition-all duration-300
          ${isHovered && !isMobile
            ? 'border-blue-300 shadow-lg shadow-blue-100' 
            : 'border-transparent'
          }
        `}></div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`
            text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000
            ${isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
            }
          `}>
            Our Services
          </h2>
          <div className={`
            w-24 h-1 bg-blue-600 mx-auto mb-6 transition-all duration-1000 delay-200
            ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
          `}></div>
          <p className={`
            text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-400
            ${isVisible 
              ? 'translate-y-0 opacity-100 blur-none' 
              : 'translate-y-4 opacity-0 blur-sm'
            }
          `}>
            Comprehensive insurance solutions tailored to protect your lifestyle, assets, and future.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <div className={`
          text-center mt-16 transition-all duration-1000 delay-800
          ${isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
          }
        `}>
          <p className="text-lg text-gray-600 mb-6">
            Ready to find the perfect insurance solution for your needs?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
          >
            Get Started Today
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
