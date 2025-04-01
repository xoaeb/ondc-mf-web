
import React from 'react';
import { CheckCircle, ArrowRight, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PaymentConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const handleDone = () => {
    navigate('/home');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Success Animation */}
      <div className="bg-paygrow-blue text-white pt-16 pb-20 px-4 flex flex-col items-center rounded-b-3xl">
        <CheckCircle className="h-20 w-20 text-white mb-4" />
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-white/80 text-lg">₹500.00 sent successfully</p>
      </div>
      
      {/* Payment Details */}
      <div className="px-4 -mt-12">
        <Card className="p-6 mb-6 shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <span className="text-xl font-bold text-paygrow-blue">RS</span>
            </div>
            <h2 className="text-xl font-semibold">Rahul Sharma</h2>
            <p className="text-gray-500">9876543210@upi</p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount</span>
              <span className="font-semibold">₹500.00</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-semibold text-sm">UPI123456789012</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Date & Time</span>
              <span className="font-semibold">{new Date().toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Note</span>
              <span className="font-semibold">Dinner payment</span>
            </div>
          </div>
        </Card>
        
        <div className="flex gap-4 mb-6">
          <Button variant="outline" className="flex-1 h-12">
            <Download className="mr-2 h-5 w-5" />
            Download
          </Button>
          <Button variant="outline" className="flex-1 h-12">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
        
        <Button 
          className="w-full bg-paygrow-blue text-white h-12 mb-4"
          onClick={handleDone}
        >
          Done
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full text-paygrow-blue"
          onClick={() => navigate('/payment/contacts')}
        >
          Make Another Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentConfirmationScreen;
