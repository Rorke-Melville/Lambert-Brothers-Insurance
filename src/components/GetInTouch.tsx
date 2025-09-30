import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const GetInTouch: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const ContactInfoCard = ({ 
    icon: Icon, 
    title, 
    content, 
    delay 
  }: { 
    icon: React.ElementType; 
    title: string; 
    content: string | string[]; 
    delay: number;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`
          flex items-start p-6 bg-white/10 rounded-xl backdrop-blur-sm
          transition-all duration-700 transform hover:bg-white/20 cursor-pointer
          ${isVisible 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-8 opacity-0'
          }
          ${isHovered ? 'scale-105 shadow-xl' : ''}
        `}
        style={{ transitionDelay: `${delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`
          transition-all duration-300 mr-4 mt-1 relative
          ${isHovered ? 'scale-110 rotate-6' : ''}
        `}>
          <Icon className="h-6 w-6 text-blue-300" />
          {isHovered && (
            <div className="absolute -inset-2 bg-blue-400/30 rounded-full blur-lg animate-pulse"></div>
          )}
        </div>
        <div>
          <h4 className={`
            font-semibold text-white mb-2 transition-colors duration-300
            ${isHovered ? 'text-blue-200' : ''}
          `}>
            {title}
          </h4>
          {Array.isArray(content) ? (
            content.map((line, index) => (
              <p key={index} className="text-blue-100">{line}</p>
            ))
          ) : (
            <p className="text-blue-100">{content}</p>
          )}
        </div>
      </div>
    );
  };

  const AnimatedInput = ({ 
    type, 
    name, 
    placeholder, 
    required = false,
    children 
  }: {
    type?: string;
    name: string;
    placeholder: string;
    required?: boolean;
    children?: React.ReactNode;
  }) => {
    const isFocused = focusedField === name;
    const hasValue = formData[name as keyof typeof formData];

    return (
      <div className="relative">
        <label 
          htmlFor={name} 
          className={`
            absolute left-4 transition-all duration-300 pointer-events-none
            ${isFocused || hasValue 
              ? 'top-2 text-xs text-blue-600 font-medium' 
              : 'top-4 text-gray-500'
            }
          `}
        >
          {placeholder}
        </label>
        
        {children || (
          <input
            type={type || 'text'}
            id={name}
            name={name}
            required={required}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            className={`
              w-full pt-6 pb-3 px-4 border-2 rounded-lg transition-all duration-300 bg-white
              focus:ring-0 focus:outline-none
              ${isFocused 
                ? 'border-blue-500 shadow-lg transform scale-105' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          />
        )}

        {/* Animated underline */}
        <div className={`
          absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300
          ${isFocused ? 'w-full' : 'w-0'}
        `}></div>
      </div>
    );
  };

  const SubmitButton = () => (
    <button
      type="submit"
      disabled={isSubmitting || isSubmitted}
      className={`
        w-full py-4 px-6 rounded-lg font-semibold text-lg
        relative overflow-hidden transition-all duration-500 transform group
        ${isSubmitted 
          ? 'bg-green-500 text-white scale-105' 
          : isSubmitting 
            ? 'bg-blue-400 text-white cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-xl'
        }
        ${!isSubmitting && !isSubmitted ? 'hover:-translate-y-1' : ''}
      `}
    >
      {/* Button background animation */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 transition-opacity duration-300
        ${isSubmitting ? 'opacity-100' : 'opacity-0 hover:opacity-20'}
      `}></div>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center">
        {isSubmitted ? (
          <>
            <CheckCircle className="w-6 h-6 mr-2 animate-bounce" />
            Message Sent!
          </>
        ) : isSubmitting ? (
          <>
            <div className="w-6 h-6 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </span>

      {/* Ripple effect */}
      {!isSubmitting && !isSubmitted && (
        <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>
      )}
    </button>
  );

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`
            text-4xl font-bold text-white mb-4 transition-all duration-1000
            ${isVisible 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
            }
          `}>
            Get In Touch
          </h2>
          <div className={`
            w-24 h-1 bg-blue-300 mx-auto mb-6 transition-all duration-1000 delay-200
            ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
          `}></div>
          <p className={`
            text-xl text-blue-100 max-w-3xl mx-auto transition-all duration-1000 delay-400
            ${isVisible 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-4 opacity-0'
            }
          `}>
            Ready to protect what matters most? Contact us today for a personalized insurance quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className={`
              text-2xl font-bold text-white mb-8 transition-all duration-700 delay-600
              ${isVisible 
                ? 'transform translate-x-0 opacity-100' 
                : 'transform -translate-x-8 opacity-0'
              }
            `}>
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <ContactInfoCard
                icon={Phone}
                title="Phone"
                content="+1 (555) 123-4567"
                delay={800}
              />
              <ContactInfoCard
                icon={Mail}
                title="Email"
                content="info@lambertbrothers.com"
                delay={1000}
              />
              <ContactInfoCard
                icon={MapPin}
                title="Address"
                content={["123 Insurance Ave", "Suite 100", "City, State 12345"]}
                delay={1200}
              />
              <ContactInfoCard
                icon={Clock}
                title="Office Hours"
                content={["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"]}
                delay={1400}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`
              bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-1000 delay-600
              ${isVisible 
                ? 'transform translate-y-0 opacity-100' 
                : 'transform translate-y-8 opacity-0'
              }
            `}>
              <h3 className="text-2xl font-bold text-white mb-8">Send Us A Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <AnimatedInput
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                  />
                  <AnimatedInput
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <AnimatedInput
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                  />
                  <AnimatedInput
                    name="service"
                    placeholder="Service Interest"
                  >
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className={`
                        w-full pt-6 pb-3 px-4 border-2 rounded-lg transition-all duration-300 bg-white
                        focus:ring-0 focus:outline-none
                        ${focusedField === 'service' 
                          ? 'border-blue-500 shadow-lg transform scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <option value="">Select a service</option>
                      <option value="auto">Auto Insurance</option>
                      <option value="home">Home Insurance</option>
                      <option value="life">Life Insurance</option>
                      <option value="business">Business Insurance</option>
                      <option value="other">Other</option>
                    </select>
                  </AnimatedInput>
                </div>

                <AnimatedInput
                  name="message"
                  placeholder="Your Message"
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full pt-6 pb-3 px-4 border-2 rounded-lg transition-all duration-300 bg-white resize-none
                      focus:ring-0 focus:outline-none
                      ${focusedField === 'message' 
                        ? 'border-blue-500 shadow-lg transform scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </AnimatedInput>

                <SubmitButton />
              </form>
            </div>
          </div>
        </div>

        {/* Additional CTA */}
        <div className={`
          text-center mt-16 transition-all duration-1000 delay-1000
          ${isVisible 
            ? 'transform translate-y-0 opacity-100' 
            : 'transform translate-y-8 opacity-0'
          }
        `}>
          <p className="text-blue-100 text-lg mb-4">
            Prefer to speak directly? Give us a call!
          </p>
          <a
            href="tel:+15551234567"
            className="inline-flex items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            <Phone className="w-5 h-5 mr-2" />
            +1 (555) 123-4567
          </a>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;