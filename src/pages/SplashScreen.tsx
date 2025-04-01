
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-navigate to onboarding after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-fade-in text-center">
        <Logo size="lg" className="mb-4" />
        <p className="text-gray-600 mt-2">
          Payments & Investments, Simplified
        </p>
      </div>
      <div className="mt-12 animate-pulse-slow">
        <div className="w-8 h-8 rounded-full border-4 border-paygrow-blue border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
