
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from '@/components/ui/motion';

// Enhanced onboarding data with better visuals
const onboardingData = [
  {
    title: "Start Your Investment Journey",
    description: "Join millions of investors and achieve your financial goals with expert guidance",
    image: "📈",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Seamless & Secure Experience",
    description: "Invest in mutual funds, stocks and gold with zero commission and 100% security",
    image: "🛡️",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Track & Grow Your Portfolio",
    description: "Get detailed insights and analytics to optimize your investment performance",
    image: "📊",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Quick & Easy Payments",
    description: "Make transactions in seconds with our secure UPI and payment systems",
    image: "💳",
    color: "from-orange-500 to-orange-600"
  }
];

const OnboardingCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'right' | 'left' | null>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setAnimationDirection('right');
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setAnimationDirection(null);
      }, 200);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimationDirection('left');
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex - 1);
        setAnimationDirection(null);
      }, 200);
    }
  };

  const goToSlide = (index: number) => {
    setAnimationDirection(index > currentIndex ? 'right' : 'left');
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimationDirection(null);
    }, 200);
  };

  useEffect(() => {
    // Auto-advance slides every 5 seconds
    const interval = setInterval(() => {
      if (currentIndex < onboardingData.length - 1) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Enhanced floating elements for modern UI */}
      <div className="absolute top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-paygrow-blue/10 to-blue-400/5 blur-3xl animate-float"></div>
      <div className="absolute bottom-40 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-paygrow-green/10 to-green-400/5 blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/5 blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
      
      {/* Modern logo with glow effect */}
      <div className="flex justify-center pt-8 z-10">
        <div className="text-2xl font-bold bg-gradient-to-r from-paygrow-blue to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
          PayGrow
        </div>
      </div>
      
      {/* Modern slide indicator */}
      <div className="absolute top-28 left-0 right-0 z-10 flex justify-center">
        <div className="flex space-x-2 p-1 bg-white/30 backdrop-blur-sm rounded-full shadow-sm">
          {onboardingData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-10 h-1.5 bg-paygrow-blue rounded-full' 
                  : 'w-3 h-1.5 bg-gray-300 rounded-full'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content with glass morphism */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 z-10">
        {/* Slide Content with enhanced animation */}
        <motion.div
          className="w-full max-w-md transition-all duration-300"
          initial={{ opacity: 0, x: animationDirection === 'right' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center">
            {/* Enhanced stylish emoji container with glow */}
            <div className={`text-6xl mb-10 flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${onboardingData[currentIndex].color} text-white shadow-lg animate-bounce-soft relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 rounded-full"></div>
              <span className="relative z-10">{onboardingData[currentIndex].image}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-paygrow-blue to-blue-700 bg-clip-text text-transparent">
              {onboardingData[currentIndex].title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-12 text-center max-w-xs">
              {onboardingData[currentIndex].description}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Modernized Navigation Buttons */}
      <div className="px-8 py-10 z-10">
        <div className="flex justify-between items-center">
          {currentIndex > 0 ? (
            <Button 
              variant="outline" 
              className="rounded-full border-gray-300 shadow-sm hover:shadow-md transition-all" 
              onClick={handlePrev}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div /> /* Empty div for layout balance */
          )}
          
          {currentIndex < onboardingData.length - 1 ? (
            <Button 
              className="rounded-full bg-gradient-to-r from-paygrow-blue to-blue-700 hover:shadow-lg transition-all"
              onClick={handleNext}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              className="rounded-full bg-gradient-to-r from-paygrow-green to-green-600 hover:shadow-lg transition-all w-full animate-pulse-subtle"
              asChild
            >
              <Link to="/login" className="flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        
        {/* Skip option with better styling */}
        {currentIndex < onboardingData.length - 1 && (
          <div className="mt-4 text-center">
            <Button variant="link" asChild className="text-gray-500 hover:text-paygrow-blue transition-colors">
              <Link to="/login">Skip</Link>
            </Button>
          </div>
        )}
      </div>
      
      {/* Enhanced feature highlights with glass morphism */}
      <div className="mt-auto pb-4 pt-6 border-t border-gray-100 bg-white/60 backdrop-blur-md">
        <div className="grid grid-cols-3 gap-4 px-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <span className="text-paygrow-blue text-lg">⭐</span>
            </div>
            <p className="text-xs mt-2 text-gray-700 font-medium">Zero Commission</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <span className="text-paygrow-green text-lg">🔒</span>
            </div>
            <p className="text-xs mt-2 text-gray-700 font-medium">100% Secure</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <span className="text-purple-500 text-lg">⚡</span>
            </div>
            <p className="text-xs mt-2 text-gray-700 font-medium">Instant Transfers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
