
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, CalendarClock, Info, ChevronDown, ChevronUp, Edit2, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const OrderSummaryScreen: React.FC = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showDisclaimers, setShowDisclaimers] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleConfirmOrder = () => {
    if (!agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Terms not accepted",
        description: "Please agree to the terms and conditions to proceed",
      });
      return;
    }
    
    toast({
      title: "Order placed successfully",
      description: "Your investment has been processed",
      variant: "default",
    });
    
    // Navigate to confirmation screen
    setTimeout(() => {
      navigate('/invest/payment-method');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4">
        <div className="flex items-center mb-2">
          <Link to="/invest/sip-setup/1" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Order Summary</h1>
        </div>
        <p className="text-white/80">Review and confirm your investment</p>
      </div>
      
      {/* Investment Summary */}
      <div className="px-4 py-6">
        <Card className="p-4 border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Investment Details</h2>
            <Link to="/invest/sip-setup/1" className="text-blue-600 flex items-center text-sm">
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Fund Name</p>
              <p className="font-medium">Axis Bluechip Fund - Direct Growth</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Investment Type</p>
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 mr-1 text-blue-600" />
                  <p className="font-medium">Systematic Investment Plan (SIP)</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Monthly Amount</p>
                <p className="font-medium">₹5,000</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">SIP Start Date</p>
                <p className="font-medium">5th July, 2023</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">SIP End Date</p>
                <p className="font-medium">Until Cancelled</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">SIP Frequency</p>
                <p className="font-medium">Monthly</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Expected Unit Allotment</p>
                <p className="font-medium">~109.5 units</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">One-time setup charges</p>
                </div>
                <p className="font-medium text-green-600">₹0</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">Tax & Processing fees</p>
                  <Info className="h-3.5 w-3.5 text-gray-400 ml-1" />
                </div>
                <p className="font-medium">₹0</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <p className="font-medium">First Payment Total</p>
              <p className="font-semibold text-xl">₹5,000</p>
            </div>
          </div>
        </Card>
        
        {/* Timeline */}
        <Card className="p-4 border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold mb-4">Investment Timeline</h2>
          
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            <div className="mb-6 relative">
              <div className="absolute left-[-21px] top-0 h-5 w-5 rounded-full bg-green-600 text-white flex items-center justify-center">
                <CheckCircle className="h-3 w-3" />
              </div>
              <p className="font-medium">Today</p>
              <p className="text-sm text-gray-500">SIP setup and first payment</p>
            </div>
            
            <div className="mb-6 relative">
              <div className="absolute left-[-20px] top-0 h-4 w-4 rounded-full bg-blue-100 border border-blue-600" />
              <p className="font-medium">Within 3 business days</p>
              <p className="text-sm text-gray-500">Units will be allocated to your account</p>
            </div>
            
            <div className="relative">
              <div className="absolute left-[-20px] top-0 h-4 w-4 rounded-full bg-blue-100 border border-blue-600" />
              <p className="font-medium">5th of every month</p>
              <p className="text-sm text-gray-500">Auto-debit and unit allocation</p>
            </div>
          </div>
        </Card>
        
        {/* Terms & Disclaimers */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => setShowDisclaimers(!showDisclaimers)}
          >
            <h3 className="font-medium">Terms & Disclaimers</h3>
            {showDisclaimers ? 
              <ChevronUp className="h-5 w-5 text-gray-500" /> : 
              <ChevronDown className="h-5 w-5 text-gray-500" />
            }
          </div>
          
          {showDisclaimers && (
            <div className="p-4 bg-gray-50 rounded-b-lg text-sm text-gray-600 space-y-2">
              <p>• Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.</p>
              <p>• The NAV prices are subject to change as per market conditions.</p>
              <p>• Past performance is not indicative of future returns.</p>
              <p>• There is no assurance or guarantee of returns.</p>
              <p>• Investors should consult their financial advisors if in doubt about whether the product is suitable for them.</p>
            </div>
          )}
          
          <div className="flex items-start mt-4 space-x-2">
            <Checkbox 
              id="terms" 
              className="mt-1"
              checked={agreedToTerms}
              onCheckedChange={(checked) => {
                setAgreedToTerms(checked as boolean);
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 leading-tight"
            >
              I have read and agree to the Terms & Conditions, Privacy Policy, and Disclaimers. I confirm that I am investing based on my own judgment.
            </label>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1 border-gray-300"
            asChild
          >
            <Link to="/invest/sip-setup/1">
              Back
            </Link>
          </Button>
          
          <Button 
            className="flex-1 bg-paygrow-blue hover:bg-blue-700"
            onClick={handleConfirmOrder}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryScreen;
