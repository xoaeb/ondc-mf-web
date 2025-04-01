
import React, { useState } from 'react';
import { ArrowLeft, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

// Mock SIP data to match selected SIP
const sipDetails = {
  id: 'sip001',
  fundName: 'Axis Bluechip Fund',
  fundCategory: 'Large Cap • Direct Growth',
  amount: 5000,
  startDate: '05 Jan 2023',
  frequency: 'Monthly',
  nextInstallment: '05 Jul 2023',
  installedAmount: 30000,
  currentValue: 32540,
  returns: 8.5,
  totalUnits: 710.37,
  status: 'active',
};

const PartialRedemptionScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [amountPercent, setAmountPercent] = useState(50);
  const [redeemOption, setRedeemOption] = useState<'amount' | 'units'>('amount');
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate the redemption amount based on percentage
  const redemptionAmount = (sipDetails.currentValue * amountPercent) / 100;
  const redemptionUnits = (sipDetails.totalUnits * amountPercent) / 100;
  
  const handleProceed = () => {
    if (amountPercent <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please select a redemption amount greater than zero",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Redemption Initiated",
        description: "Your partial redemption request has been submitted successfully",
        variant: "default",
      });
      
      navigate('/invest/redemption-confirmation');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/invest/sip-management" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">
          Partial Redemption
        </h1>
      </div>
      
      {/* Fund Info */}
      <div className="bg-white p-4 border-b shadow-sm">
        <h2 className="font-semibold">{sipDetails.fundName}</h2>
        <p className="text-sm text-gray-500">{sipDetails.fundCategory}</p>
      </div>
      
      {/* Redemption Form */}
      <div className="flex-1 p-4">
        <Card className="p-4 mb-6 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-800">
            Select Redemption Amount
          </h3>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-700">Current Value:</span>
              <span className="text-sm font-medium">₹{sipDetails.currentValue.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Redemption Percentage</span>
                  <span className="text-sm font-semibold text-paygrow-blue">{amountPercent}%</span>
                </div>
                <Slider
                  value={[amountPercent]}
                  onValueChange={(value) => setAmountPercent(value[0])}
                  max={100}
                  step={1}
                  className="mb-4"
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="flex items-baseline mb-2">
                <span className="text-xl font-semibold mr-2">₹</span>
                <Input
                  type="number"
                  value={Math.round(redemptionAmount).toString()}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      const newPercent = Math.min(100, Math.max(0, (value / sipDetails.currentValue) * 100));
                      setAmountPercent(newPercent);
                    }
                  }}
                  className="text-2xl font-bold border-none focus-visible:ring-0 p-0 h-auto text-paygrow-blue"
                  placeholder="0"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setAmountPercent(25)}
                  className={`${amountPercent === 25 ? 'bg-paygrow-blue/10 border-paygrow-blue text-paygrow-blue' : ''}`}
                >
                  25%
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAmountPercent(50)}
                  className={`${amountPercent === 50 ? 'bg-paygrow-blue/10 border-paygrow-blue text-paygrow-blue' : ''}`}
                >
                  50%
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAmountPercent(75)}
                  className={`${amountPercent === 75 ? 'bg-paygrow-blue/10 border-paygrow-blue text-paygrow-blue' : ''}`}
                >
                  75%
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAmountPercent(100)}
                  className={`${amountPercent === 100 ? 'bg-paygrow-blue/10 border-paygrow-blue text-paygrow-blue' : ''}`}
                >
                  100%
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Redemption Amount
              </span>
              <span className="text-sm font-medium">₹{Math.round(redemptionAmount).toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Approximate Units
              </span>
              <span className="text-sm font-medium">{redemptionUnits.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                SIP Status After Redemption
              </span>
              <span className="text-sm font-medium text-green-600">Will Remain Active</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Estimated Processing Time
              </span>
              <span className="text-sm font-medium">2-3 business days</span>
            </div>
          </div>
        </Card>
        
        <div className="bg-amber-50 p-4 rounded-lg mb-6 flex">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 mb-1">Important Information</p>
            <p className="text-xs text-amber-700">
              The redemption amount will be credited to your registered bank account. The final amount may vary based on the applicable NAV on the date of processing.
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex">
          <Info className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 mb-1">SIP Continuation</p>
            <p className="text-xs text-blue-700">
              Your monthly SIP of ₹{sipDetails.amount.toLocaleString('en-IN')} will continue as scheduled. Redemption affects only your existing investments.
            </p>
          </div>
        </div>
        
        <div className="flex items-start mb-6">
          <CheckCircle2 className="h-5 w-5 text-paygrow-green mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            I understand that redemption is subject to exit load and capital gains tax as applicable. The final redemption amount will be based on the NAV on the date of processing.
          </p>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-paygrow-blue to-blue-600 text-white h-12 shadow-md hover:shadow-lg transition-all"
          onClick={handleProceed}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Proceed with Redemption'}
        </Button>
      </div>
    </div>
  );
};

export default PartialRedemptionScreen;
