
import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Download, Share2, Home, ArrowLeft, Calendar, ChevronDown, ChevronUp, FileText, Phone, CreditCard, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';
import { motion } from '@/components/ui/motion';

const RedemptionConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactionId] = useState(`TXN${Math.floor(Math.random() * 1000000)}`);
  const [currentDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Processing stages
  const stages = [
    { label: "Order Received", completed: true, date: new Date().toLocaleDateString() },
    { label: "Redemption Processed", completed: true, date: new Date().toLocaleDateString() },
    { label: "Amount Credited", completed: false, date: "Expected in 2-3 business days" }
  ];
  
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
      title: "Redemption Successful!",
      description: "Your redemption request has been processed",
      variant: "success",
    });
    
    setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate('/invest/sip-management')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold">Redemption Successful</h1>
        <div className="w-8"></div> {/* Empty div for alignment */}
      </div>
      
      <div className="p-4 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-soft">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Redemption Successful!</h1>
          <p className="text-gray-600">Your redemption request has been processed successfully</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
                <span className="text-sm text-gray-500">Redemption Type</span>
                <span className="font-medium">Partial Redemption</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Redeemed Amount</span>
                <span className="font-medium text-green-600">₹16,270</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Units Redeemed</span>
                <span className="font-medium">355.19</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">NAV Applied</span>
                <span className="font-medium">₹45.81</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Remaining Units</span>
                <span className="font-medium">355.18</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Remaining Value</span>
                <span className="font-medium">₹16,270.50</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Bank Account</span>
                <span className="font-medium">HDFC Bank - XXXX1234</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-green-600 font-medium flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Processed
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-5 mb-6 border border-blue-100 bg-blue-50/50 rounded-xl">
            <h3 className="font-semibold mb-4 text-gray-800 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Processing Timeline
            </h3>
            
            <div className="space-y-4">
              {stages.map((stage, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 relative">
                    <div className={`h-6 w-6 rounded-full ${stage.completed ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center`}>
                      {stage.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    {index < stages.length - 1 && (
                      <div className={`absolute top-6 left-1/2 w-px h-10 transform -translate-x-1/2 ${stage.completed && stages[index + 1].completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className={`font-medium ${stage.completed ? 'text-gray-900' : 'text-gray-500'}`}>{stage.label}</p>
                      <p className="text-xs text-gray-500">{stage.date}</p>
                    </div>
                    {index === 2 && (
                      <p className="text-xs text-gray-500 mt-1">
                        The redemption amount will be credited to your registered bank account
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-4 border-0 shadow-md rounded-xl mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <h3 className="font-semibold text-gray-800">Important Information</h3>
              {showDetails ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </div>
            
            {showDetails && (
              <div className="mt-3 space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-sm">Processing Time</p>
                  <p className="text-sm text-gray-600 mt-1">The redemption amount will typically be credited to your bank account within 2-3 business days.</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-sm">Exit Load</p>
                  <p className="text-sm text-gray-600 mt-1">No exit load was applied to this redemption as your investment is over 1 year old.</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-sm">Tax Implications</p>
                  <p className="text-sm text-gray-600 mt-1">This redemption may have tax implications. Capital gains tax may be applicable as per income tax laws.</p>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <Button 
            variant="outline" 
            className="gap-1 border-gray-300 shadow-sm"
            onClick={() => {
              toast({
                title: "Receipt Downloaded",
                description: "Your redemption receipt has been downloaded",
              });
            }}
          >
            <Download className="h-4 w-4" />
            <span>Receipt</span>
          </Button>
          <Button 
            variant="outline" 
            className="gap-1 border-gray-300 shadow-sm"
            onClick={() => {
              toast({
                title: "Share Options",
                description: "Share options opened",
              });
            }}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-3"
        >
          <Button 
            className="w-full bg-gradient-to-r from-paygrow-blue to-blue-600 text-white gap-1 h-12 shadow-md"
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
        </motion.div>
        
        <div className="mt-6 flex justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center text-sm text-paygrow-blue cursor-pointer" 
            onClick={() => {
              toast({
                title: "Support",
                description: "Connecting to customer support...",
              });
            }}
          >
            <Phone className="h-4 w-4 mr-1" />
            <span>Need help? Contact Support</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RedemptionConfirmationScreen;
