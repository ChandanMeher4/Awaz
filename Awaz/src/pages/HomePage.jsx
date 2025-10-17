import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom'; // This component was causing the error.

// SVG Icon components for features. Modern practice keeps these as components.
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-indigo-400">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>
  </svg>
);

const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-indigo-400">
    <path d="M12 8V4H8"></path><path d="M16 4h-4v4"></path><path d="M12 14v-2"></path><path d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z"></path><path d="M8 12h8"></path>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-indigo-400">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);


// Feature card component with a ref for observing when it enters the viewport
const FeatureCard = React.forwardRef(({ icon, title, description }, ref) => (
  <div ref={ref} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg transform transition-all duration-500 opacity-0 translate-y-8">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
));

function HomePage() {
  // Refs for the elements we want to animate on scroll
  const featuresRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  
  // This effect sets up an Intersection Observer to add a 'visible' class
  // to elements when they scroll into view. This is a modern, performant
  // way to handle scroll-triggered animations.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const refs = [featuresRef, card1Ref, card2Ref, card3Ref];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <>
      {/* This style tag contains the CSS for our animations */}
      <style>{`
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient {
          background: linear-gradient(-45deg, #111827, #1f2937, #374151, #111827);
          background-size: 400% 400%;
          animation: gradient-animation 25s ease infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .hero-animation {
            animation: fade-in-up 1s ease-out forwards;
        }
        .hero-animation-delay-1 {
            animation: fade-in-up 1s 0.2s ease-out forwards;
        }
        .hero-animation-delay-2 {
            animation: fade-in-up 1s 0.4s ease-out forwards;
        }
      `}</style>
      
      <div className="animated-gradient text-white min-h-screen">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight hero-animation opacity-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Your Voice Matters.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl hero-animation-delay-1 opacity-0">
            Awaz is a secure, anonymous platform for students to voice concerns, seek support, and improve campus life. Because we listen.
          </p>
          {/* FIX: Replaced <Link> with a standard <a> tag to prevent the crash. */}
          {/* This ensures the component renders, even if the Router context is missing. */}
          <a
            href="/login"
            className="mt-12 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 hero-animation-delay-2 opacity-0"
          >
            Enter Securely
          </a>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={featuresRef} className="text-center opacity-0">
              <h2 className="text-base font-semibold text-indigo-400 tracking-wider uppercase">Features</h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                A Safer Campus for Everyone
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
                Three powerful tools to ensure your well-being.
              </p>
            </div>

            <div className="mt-20 grid md:grid-cols-3 gap-12">
              <FeatureCard 
                ref={card1Ref}
                icon={<ShieldCheckIcon />}
                title="Confidential Reporting"
                description="Submit reports on ragging, harassment, or campus issues with complete anonymity. Your identity is protected, always."
              />
              <FeatureCard 
                ref={card2Ref}
                icon={<BotIcon />}
                title="AI-Powered Support"
                description="Chat with our empathetic AI bot for mental health support anytime, anywhere. It's a safe space to talk."
              />
              <FeatureCard 
                ref={card3Ref}
                icon={<UsersIcon />}
                title="Community Forum"
                description="Discuss campus-wide topics like mess food or events with fellow students in a public, yet anonymous, forum."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

