
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronRight, CreditCard, Smartphone, Banknote, Shield, CheckCircle2, Lock, ChevronDown, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { motion } from '@/components/ui/motion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PaymentMethodScreen: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('netbanking');
  const [selectedBank, setSelectedBank] = useState<string>('hdfc');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Animation effect when screen loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const banks = [
    { id: 'hdfc', name: 'HDFC Bank' },
    { id: 'sbi', name: 'State Bank of India' },
    { id: 'icici', name: 'ICICI Bank' },
    { id: 'axis', name: 'Axis Bank' },
  ];
  
  const handleProceed = () => {
    setIsLoading(true);
    
    // Simulate payment processing with progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        toast({
          title: "Payment successful",
          description: "Your investment has been processed successfully",
          variant: "default",
        });
        
        // Navigate to payment confirmation screen
        navigate('/payment/confirmation');
      }
    }, 400);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Simplified Header */}
      <div className="bg-white py-4 px-4 shadow-sm">
        <div className="flex items-center">
          <Link to="/invest/order-summary" className="mr-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all duration-300">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-xl font-medium text-gray-800">Payment Method</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 pb-20">
        {/* Order Summary Card */}
        <div className="my-4">
          <Card className="border rounded-xl shadow-sm p-4 bg-white">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <div className="flex items-center">
                <span className="bg-blue-50 p-1.5 rounded-full mr-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </span>
                <h2 className="text-base font-medium">Order Summary</h2>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2">Ref: #INV86452</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
              </div>
            </div>
            
            {showDetails && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-2 border-t border-gray-100"
              >
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Fund</span>
                    <span className="font-medium flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-100 mr-1.5 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
                      </div>
                      Axis Bluechip Fund
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Plan</span>
                    <span className="font-medium">Direct Growth</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Investment Type</span>
                    <span className="font-medium">SIP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-semibold text-green-600">₹5,000</span>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <span className="text-blue-600 mr-2">
              <CreditCard className="h-5 w-5" />
            </span>
            Choose Payment Method
          </h2>
          
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            {/* UPI */}
            <Card className={`p-0 rounded-xl overflow-hidden ${paymentMethod === 'upi' ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
              <div className="flex items-center p-4">
                <RadioGroupItem id="upi" value="upi" className="mr-3" />
                <Label htmlFor="upi" className="flex-1 flex items-center cursor-pointer">
                  <div className="h-11 w-11 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">UPI</p>
                    <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm & more</p>
                  </div>
                </Label>
              </div>
              
              {paymentMethod === 'upi' && (
                <div className="animate-fade-in border-t border-gray-100">
                  <div className="p-5 bg-gray-50 rounded-b-xl">
                    <div className="flex justify-center mb-6">
                      <div className="h-56 w-56 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                        <div className="w-44 h-44 bg-gray-100 rounded-lg flex items-center justify-center">
                          <p className="text-sm text-gray-500">QR Code will appear here</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm mb-3 font-medium">Or pay using UPI ID</p>
                    <div className="flex items-center justify-center mb-4">
                      <span className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium bg-white select-all flex items-center">
                        invest@paygrow
                        <Button variant="ghost" className="ml-2 h-6 w-6 p-0" onClick={() => {
                          navigator.clipboard.writeText('invest@paygrow');
                          toast({
                            title: "UPI ID copied",
                            description: "UPI ID copied to clipboard",
                          });
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        </Button>
                      </span>
                    </div>
                    <Separator className="my-4" />
                    <Button className="w-full bg-blue-600 text-white h-12 rounded-xl">
                      Continue with UPI App
                    </Button>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Net Banking */}
            <Card className={`p-0 rounded-xl ${paymentMethod === 'netbanking' ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
              <div className="flex items-center p-4">
                <RadioGroupItem id="netbanking" value="netbanking" className="mr-3" />
                <Label htmlFor="netbanking" className="flex-1 flex items-center cursor-pointer">
                  <div className="h-11 w-11 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Banknote className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Net Banking</p>
                    <p className="text-xs text-gray-500">All Indian banks supported</p>
                  </div>
                  <div className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Fastest</div>
                </Label>
              </div>
              
              {paymentMethod === 'netbanking' && (
                <div className="animate-fade-in border-t border-gray-100">
                  <div className="bg-gray-50 p-5 rounded-b-xl">
                    <p className="text-sm mb-3 text-gray-700 font-medium">Select your bank</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {banks.map((bank) => (
                        <div 
                          key={bank.id}
                          className={`p-3 rounded-xl flex items-center ${
                            selectedBank === bank.id ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200 bg-white'
                          } cursor-pointer`}
                          onClick={() => setSelectedBank(bank.id)}
                        >
                          <p className="text-sm font-medium">{bank.name}</p>
                          {selectedBank === bank.id && (
                            <CheckCircle2 className="h-4 w-4 text-blue-600 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-blue-600 text-white h-12 rounded-xl">
                      Continue to {banks.find(b => b.id === selectedBank)?.name}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Debit/Credit Card */}
            <Card className={`p-0 rounded-xl ${paymentMethod === 'card' ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
              <div className="flex items-center p-4">
                <RadioGroupItem id="card" value="card" className="mr-3" />
                <Label htmlFor="card" className="flex-1 flex items-center cursor-pointer">
                  <div className="h-11 w-11 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Card Payment</p>
                    <p className="text-xs text-gray-500">Credit / Debit / ATM cards</p>
                  </div>
                </Label>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="animate-fade-in border-t border-gray-100">
                  <div className="bg-gray-50 p-5 rounded-b-xl">
                    <div className="mb-6">
                      <div className="relative h-48 w-full rounded-xl overflow-hidden p-5 bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500">
                        <div className="relative z-10 h-full flex flex-col justify-between text-white">
                          <div className="flex justify-between items-start">
                            <div className="w-12 h-8">
                              <div className="w-full h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-md"></div>
                            </div>
                            <CreditCard className="h-7 w-7 text-white/80" />
                          </div>
                          
                          <div className="my-4">
                            <div className="h-6 bg-white/20 rounded-md w-full mb-1"></div>
                          </div>
                          
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-xs text-white/70 mb-1">CARD HOLDER</p>
                              <p className="font-medium">Your Name</p>
                            </div>
                            <div>
                              <p className="text-xs text-white/70 mb-1">EXPIRES</p>
                              <p className="font-medium">MM/YY</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 text-white h-12 rounded-xl">
                      Add New Card
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </RadioGroup>
        </div>
        
        {/* Security Badge */}
        <div className="mt-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start">
            <Shield className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">100% Secure Payments</p>
              <p className="text-xs text-blue-700">
                All your payment data is encrypted with bank-level security.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pay Button */}
        <div className="mt-6 pb-8">
          <Button 
            className={`w-full h-14 rounded-xl ${
              isLoading 
                ? 'bg-gray-100' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={isLoading ? undefined : handleProceed}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-full">
                <p className="mb-2 font-medium">Processing Payment...</p>
                <Progress value={progress} className="h-2 bg-blue-100" />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="mr-2 font-medium text-base">Pay ₹5,000</span>
                <Lock className="h-4 w-4" />
              </div>
            )}
          </Button>
          
          <p className="text-center text-xs text-gray-500 mt-3">
            By proceeding, you agree to our <Link to="/terms" className="text-blue-600 font-medium">Terms</Link> & <Link to="/privacy" className="text-blue-600 font-medium">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
