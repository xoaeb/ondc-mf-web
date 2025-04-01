
import React, { useEffect } from 'react';
import OnboardingCarousel from '@/components/OnboardingCarousel';
import { useToast } from '@/hooks/use-toast';

const OnboardingScreen: React.FC = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast to enhance user experience
    toast({
      title: "Welcome to PayGrow",
      description: "Your journey to financial growth starts here",
      variant: "default"
    });
  }, [toast]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <OnboardingCarousel />
    </div>
  );
};

export default OnboardingScreen;
