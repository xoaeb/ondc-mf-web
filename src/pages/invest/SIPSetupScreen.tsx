
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const SIPSetupScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isOneTime = searchParams.get('type') === 'onetime';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState(isOneTime ? '5000' : '1000');
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Default to 7 days from now
  const [isLoading, setIsLoading] = useState(false);
  
  // Quick amount suggestions
  const quickAmounts = isOneTime 
    ? ['1000', '5000', '10000', '25000']
    : ['500', '1000', '2500', '5000'];
  
  const handleProceed = () => {
    if (!amount || parseFloat(amount) < (isOneTime ? 1000 : 500)) {
      toast({
        title: "Invalid amount",
        description: `Minimum investment amount is ₹${isOneTime ? 1000 : 500}`,
        variant: "destructive"
      });
      return;
    }

    if (!isOneTime && !date) {
      toast({
        title: "SIP Date Required",
        description: "Please select a date for your monthly SIP",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call, but proceed to order summary screen
    setTimeout(() => {
      setIsLoading(false);
      navigate('/invest/order-summary');
    }, 500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-green to-green-400 text-white pt-12 pb-6 px-4 flex items-center">
        <Link to={`/invest/mutual-fund/${id}`} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">
          {isOneTime ? 'One-time Investment' : 'Setup SIP'}
        </h1>
      </div>
      
      {/* Fund Info */}
      <div className="bg-white p-4 border-b shadow-sm">
        <h2 className="font-semibold">Axis Bluechip Fund</h2>
        <p className="text-sm text-gray-500">Large Cap • Direct Growth</p>
      </div>
      
      {/* Investment Form */}
      <div className="flex-1 p-4 bg-gray-50">
        <Card className="p-4 mb-6 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-800">
            {isOneTime ? 'Investment Amount' : 'Monthly SIP Amount'}
          </h3>
          
          <div className="flex items-baseline mb-6">
            <span className="text-xl font-semibold mr-2">₹</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold border-none focus-visible:ring-0 p-0 h-auto text-paygrow-green"
              placeholder="0"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                onClick={() => setAmount(quickAmount)}
                className={`flex-grow ${amount === quickAmount ? 'bg-paygrow-green/10 border-paygrow-green text-paygrow-green' : ''}`}
              >
                ₹{quickAmount}
              </Button>
            ))}
          </div>
          
          {!isOneTime && (
            <>
              <h3 className="font-medium mb-4 text-gray-800">SIP Date</h3>
              <div className="mb-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select SIP date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto p-3"
                      disabled={(d) => 
                        d < new Date() || 
                        d > new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // Not more than 60 days in future
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-xs text-gray-500 mb-4 flex items-center">
                <Info className="h-3 w-3 mr-1 text-paygrow-blue" />
                Your SIP will be processed on the {date ? format(date, "do") : ""} of every month
              </p>
            </>
          )}
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                {isOneTime ? 'Investment Amount' : 'Monthly Investment'}
              </span>
              <span className="text-sm font-medium">₹{amount}</span>
            </div>
            
            {!isOneTime && date && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">SIP Date</span>
                <span className="text-sm font-medium">{format(date, "do MMMM")}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Minimum Investment</span>
              <span className="text-sm font-medium">₹{isOneTime ? '1,000' : '500'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">NAV Applicability</span>
              <span className="text-sm font-medium">Same day (before 2 PM)</span>
            </div>
          </div>
        </Card>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex shadow-sm">
          <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700 mb-1">Important Information</p>
            <p className="text-xs text-blue-600">
              {isOneTime 
                ? 'Investments made before 2 PM will be processed at same day NAV.' 
                : 'Your SIP will be auto-debited from your registered bank account on the selected date every month.'}
            </p>
          </div>
        </div>
        
        {!isOneTime && (
          <div className="bg-green-50 p-4 rounded-lg mb-6 flex shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-700 mb-1">Manage Your SIPs</p>
              <p className="text-xs text-green-600 mb-2">
                You can view, modify or cancel your SIPs anytime from the SIP Management section.
              </p>
              <Link to="/invest/sip-management" className="text-xs text-green-700 underline">
                View active SIPs
              </Link>
            </div>
          </div>
        )}
        
        <div className="flex items-start mb-6">
          <CheckCircle2 className="h-5 w-5 text-paygrow-green mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            I have read and understood the scheme related documents and agree to the terms and conditions of the scheme.
          </p>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-paygrow-green to-green-400 text-white h-12 shadow-md hover:shadow-lg transition-all"
          onClick={handleProceed}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default SIPSetupScreen;
