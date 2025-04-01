
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const UPIPinScreen: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  // Handle PIN input
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and max 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
    }
  };
  
  // Process payment when PIN is entered
  useEffect(() => {
    if (pin.length === 6) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/payment/confirmation');
      }, 2000);
    }
  }, [pin, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/payment/amount" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Enter UPI PIN</h1>
          <p className="text-white/80">Paying ₹500 to Rahul Sharma</p>
        </div>
      </div>
      
      {/* PIN Entry */}
      <div className="flex-1 px-4 py-6">
        <Card className="p-6 mb-6">
          <div className="flex flex-col items-center mb-6">
            <ShieldCheck className="h-16 w-16 text-paygrow-blue mb-4" />
            <h2 className="text-xl font-semibold mb-1">Secure Transaction</h2>
            <p className="text-gray-500 text-center">
              Enter your 6-digit UPI PIN to authenticate this payment
            </p>
          </div>
          
          <div className="mb-6">
            <Input
              type="password"
              value={pin}
              onChange={handlePinChange}
              className="text-center text-xl"
              placeholder="Enter 6-digit UPI PIN"
              maxLength={6}
              disabled={isProcessing}
            />
          </div>
          
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < pin.length ? 'bg-paygrow-blue' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </Card>
        
        <Button 
          className="w-full bg-paygrow-blue text-white"
          disabled={pin.length < 6 || isProcessing}
        >
          {isProcessing ? "Processing..." : "Confirm Payment"}
        </Button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Your UPI PIN is secure and encrypted. We do not store your PIN.
        </p>
      </div>
    </div>
  );
};

export default UPIPinScreen;
