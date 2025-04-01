
import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Download, Share2, Home, ArrowLeft, Calendar, ChevronDown, ChevronUp, Star, FileText, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

const PaymentConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactionId] = useState(`TXN${Math.floor(Math.random() * 1000000)}`);
  const [currentDate] = useState(new Date());
  const [showFAQ, setShowFAQ] = useState(false);
  const [navValue, setNavValue] = useState(45.67); // Example NAV value
  
  useEffect(() => {
    // Trigger confetti animation on component mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0066FF', '#00C853'],
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0066FF', '#00C853'],
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
    
    // Show toast notification
    toast({
      title: "Investment Successful!",
      description: "Your SIP has been set up successfully",
      variant: "success",
    });
  }, [toast]);
  
  const handleDownloadReceipt = () => {
    toast({
      title: "Receipt Downloaded",
      description: "Your investment receipt has been downloaded",
    });
  };
  
  const handleShareReceipt = () => {
    toast({
      title: "Share Options",
      description: "Share options opened",
    });
  };
  
  const handleContactSupport = () => {
    toast({
      title: "Support",
      description: "Connecting to customer support...",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate('/invest')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold">Payment Successful</h1>
        <div className="w-8"></div> {/* Empty div for alignment */}
      </div>
      
      <div className="p-4 pb-24">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Payment Successful!</h1>
          <p className="text-gray-600">Your investment has been processed successfully</p>
          
          <div className="mt-4 bg-green-50 p-3 rounded-lg inline-flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm text-green-800">You've earned 25 reward points!</span>
          </div>
        </div>
        
        <Card className="p-5 shadow-md rounded-xl border-0 mb-6 hoverable-card">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Transaction ID</span>
              <span className="font-medium">{transactionId}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date & Time</span>
              <span className="font-medium">
                {currentDate.toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}, {currentDate.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Fund</span>
              <span className="font-medium">Axis Bluechip Fund</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Plan</span>
              <span className="font-medium">Direct Growth</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Investment Type</span>
              <span className="font-medium">SIP</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">SIP Date</span>
              <div className="flex items-center font-medium">
                <Calendar className="h-3.5 w-3.5 mr-1 text-paygrow-blue" />
                <span>7th of every month</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Current NAV</span>
              <span className="font-medium">₹{navValue.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Units Allotted</span>
              <span className="font-medium">{(5000 / navValue).toFixed(3)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount Invested</span>
              <span className="font-medium text-green-600">₹5,000</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Payment Method</span>
              <span className="font-medium">Net Banking (HDFC Bank)</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-green-600 font-medium flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1" /> Completed
              </span>
            </div>
          </div>
        </Card>
        
        {/* Expected returns card */}
        <Card className="p-5 mb-6 border-0 shadow-md rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="font-semibold mb-3 text-gray-800">Expected Returns</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">1 Year</p>
              <p className="font-semibold text-paygrow-blue">₹63,500</p>
              <p className="text-xs text-green-600">+12.7%</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">3 Years</p>
              <p className="font-semibold text-paygrow-blue">₹2,12,600</p>
              <p className="text-xs text-green-600">+41.8%</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">5 Years</p>
              <p className="font-semibold text-paygrow-blue">₹3,86,900</p>
              <p className="text-xs text-green-600">+72.3%</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">*Returns are calculated based on historical performance and are not guaranteed</p>
        </Card>
        
        {/* FAQ Accordion */}
        <Card className="p-4 border-0 shadow-md rounded-xl mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowFAQ(!showFAQ)}
          >
            <h3 className="font-semibold text-gray-800">Frequently Asked Questions</h3>
            {showFAQ ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
          </div>
          
          {showFAQ && (
            <div className="mt-3 space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-sm">When will my units be allotted?</p>
                <p className="text-sm text-gray-600 mt-1">Units will be allotted within 1-3 business days based on the NAV of the allotment date.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-sm">How can I track my investment?</p>
                <p className="text-sm text-gray-600 mt-1">You can track your investment in the Portfolio section of the app.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-sm">How do I modify or cancel my SIP?</p>
                <p className="text-sm text-gray-600 mt-1">You can modify or cancel your SIP anytime from the Portfolio section under your investments.</p>
              </div>
            </div>
          )}
        </Card>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            variant="outline" 
            className="gap-1 border-gray-300 shadow-sm"
            onClick={handleDownloadReceipt}
          >
            <Download className="h-4 w-4" />
            <span>Receipt</span>
          </Button>
          <Button 
            variant="outline" 
            className="gap-1 border-gray-300 shadow-sm"
            onClick={handleShareReceipt}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-paygrow-green to-green-500 text-white gap-1 h-12 shadow-md"
            onClick={() => navigate('/invest/portfolio')}
          >
            <span>View Portfolio</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full gap-1 border-gray-300 h-12"
            onClick={() => navigate('/home')}
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="flex items-center text-sm text-paygrow-blue cursor-pointer" onClick={handleContactSupport}>
            <Phone className="h-4 w-4 mr-1" />
            <span>Need help? Contact Support</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="flex items-center text-sm text-gray-500 cursor-pointer" onClick={() => navigate('/profile/kyc')}>
            <FileText className="h-4 w-4 mr-1" />
            <span>Complete KYC for higher investment limits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationScreen;
