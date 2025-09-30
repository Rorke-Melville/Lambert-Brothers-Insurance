import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const reviews = [
    { name: "Sarah Johnson", role: "Homeowner", content: "Lambert Brothers provided exceptional service when I needed home insurance. Their attention to detail and personalized approach made all the difference. I couldn't be happier with my coverage!", rating: 5, avatar: "SJ" },
    { name: "Michael Chen", role: "Business Owner", content: "Professional, reliable, and trustworthy. They helped me find the perfect coverage for my business at a competitive rate. The peace of mind they provide is invaluable.", rating: 5, avatar: "MC" },
    { name: "Emily Rodriguez", role: "Young Professional", content: "As a first-time insurance buyer, they made the process simple and stress-free. Their expertise and patience helped me understand exactly what I needed. Highly recommend!", rating: 5, avatar: "ER" },
    { name: "David Thompson", role: "Family Man", content: "Outstanding service from start to finish. They took the time to understand our family's unique needs and provided comprehensive coverage that fits our budget perfectly.", rating: 5, avatar: "DT" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [reviews.length]);

  const StarRating = ({ rating, delay }: { rating: number; delay?: number }) => (
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 text-yellow-400 fill-current transition-all duration-300 transform
            ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          style={{
            transitionDelay: `${(delay || 0) + i * 100}ms`,
            filter: isVisible ? 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))' : ''
          }}
        />
      ))}
    </div>
  );

  const ReviewCard = ({ review, index }: {
    review: typeof reviews[0]; index: number;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`bg-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden
          transition-all duration-700 transform
          ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}
          ${isHovered ? 'shadow-2xl -translate-y-2' : ''}`}
        style={{ transitionDelay: `${index * 150}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Quote icon */}
        <div className={`absolute top-4 right-4 transition-all duration-300 ${isHovered ? 'scale-110 opacity-100' : 'opacity-30'}`}>
          <Quote className="h-8 w-8 text-blue-300" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <StarRating rating={review.rating} delay={index * 200} />
          <p className={`text-gray-600 mb-6 leading-relaxed italic transition-all duration-300 ${isHovered ? 'text-gray-700 transform translate-x-2' : ''}`}>
            "{review.content}"
          </p>
          <div className="flex items-center">
            <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full
                flex items-center justify-center text-white font-bold mr-4 transition-all duration-300
                ${isHovered ? 'scale-110 rotate-6' : ''}`}>
              {review.avatar}
            </div>
            <div>
              <div className={`font-bold text-gray-900 transition-colors duration-300 ${isHovered ? 'text-blue-600' : ''}`}>
                {review.name}
              </div>
              <div className="text-gray-500 text-sm">{review.role}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FeaturedReview = () => {
    const review = reviews[currentReview];
    return (
      <div className={`bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden
        transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Quote className="h-16 w-16 text-blue-300 mx-auto mb-6 opacity-50" />
          <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed mb-8 italic">"{review.content}"</p>
          <div className="flex justify-center mb-6">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current mx-1 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }} />
            ))}
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl font-semibold">{review.name}</div>
            <div className="text-blue-300">{review.role}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="reviews" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Client Reviews
          </h2>
          <p className={`text-lg sm:text-xl text-gray-600 transition-all duration-1000 delay-400
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            See what our satisfied clients have to say about our services.
          </p>
        </div>

        {/* Featured Review - only show on md+ screens */}
        <div className="mb-16 hidden md:block">
          <FeaturedReview />
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
