
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, BarChart, Download, X, CheckCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from '@/components/ui/motion';
import { useToast } from '@/hooks/use-toast';

// Mock SIP data
const activeSips = [
  {
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
    status: 'active',
  },
  {
    id: 'sip002',
    fundName: 'HDFC Mid-Cap Opportunities',
    fundCategory: 'Mid Cap • Direct Growth',
    amount: 2500,
    startDate: '15 Feb 2023',
    frequency: 'Monthly',
    nextInstallment: '15 Jul 2023',
    installedAmount: 12500,
    currentValue: 13200,
    returns: 5.6,
    status: 'active',
  }
];

// SIP transaction history
const sipHistory = [
  {
    id: 'trx001',
    date: '05 Jun 2023',
    fundName: 'Axis Bluechip Fund',
    amount: 5000,
    units: 109.5,
    nav: 45.67,
    status: 'success',
  },
  {
    id: 'trx002',
    date: '05 May 2023',
    fundName: 'Axis Bluechip Fund',
    amount: 5000,
    units: 112.3,
    nav: 44.52,
    status: 'success',
  },
  {
    id: 'trx003',
    date: '05 Apr 2023',
    fundName: 'Axis Bluechip Fund',
    amount: 5000,
    units: 116.8,
    nav: 42.81,
    status: 'success',
  },
  {
    id: 'trx004',
    date: '15 Jun 2023',
    fundName: 'HDFC Mid-Cap Opportunities',
    amount: 2500,
    units: 31.9,
    nav: 78.34,
    status: 'success',
  },
  {
    id: 'trx005',
    date: '15 May 2023',
    fundName: 'HDFC Mid-Cap Opportunities',
    amount: 2500,
    units: 32.5,
    nav: 76.92,
    status: 'success',
  }
];

const SIPManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);
  const [selectedSip, setSelectedSip] = useState<typeof activeSips[0] | null>(null);
  const [confirmationStep, setConfirmationStep] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleCancelSip = (sip: typeof activeSips[0]) => {
    setSelectedSip(sip);
    setCancelDialogOpen(true);
    setConfirmationStep(false);
  };
  
  const handleRedeemSip = (sip: typeof activeSips[0]) => {
    setSelectedSip(sip);
    setRedeemDialogOpen(true);
    setConfirmationStep(false);
  };
  
  const confirmCancel = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCancelDialogOpen(false);
      
      toast({
        title: "SIP Cancelled Successfully",
        description: "Your SIP has been cancelled. No further instalments will be processed.",
        variant: "default",
      });
      
      // Navigate to confirmation screen or refresh the page
      navigate('/invest/portfolio');
    }, 1000);
  };
  
  const confirmRedeem = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setRedeemDialogOpen(false);
      
      toast({
        title: "Redemption Initiated",
        description: "Your redemption request has been submitted successfully.",
        variant: "default",
      });
      
      // Navigate to confirmation screen
      navigate('/invest/redemption-confirmation');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4">
        <div className="flex items-center mb-2">
          <Link to="/invest/portfolio" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">SIP Management</h1>
        </div>
        <p className="text-white/80">Manage your SIP investments</p>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-6">
        <Tabs defaultValue="active-sips" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active-sips">Active SIPs</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active-sips">
            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-medium flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Your Active SIPs
              </h2>
              
              {activeSips.map((sip) => (
                <motion.div
                  key={sip.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-paygrow-blue">{sip.fundName}</h3>
                        <p className="text-xs text-gray-500">{sip.fundCategory}</p>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Monthly Investment</p>
                        <p className="font-medium">₹{sip.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium">{sip.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Next Installment</p>
                        <p className="font-medium flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-blue-500" />
                          {sip.nextInstallment}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">SIP Frequency</p>
                        <p className="font-medium">{sip.frequency}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Invested Amount</p>
                        <p className="font-medium">₹{sip.installedAmount.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Current Value</p>
                        <p className="font-medium">₹{sip.currentValue.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Returns</p>
                        <p className={`font-medium ${sip.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {sip.returns >= 0 ? '+' : ''}{sip.returns}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => handleRedeemSip(sip)}
                      >
                        Redeem
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleCancelSip(sip)}
                      >
                        Cancel SIP
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <Link to="/invest/mutual-funds" className="block mt-4">
                <Button className="w-full bg-paygrow-blue">Start a New SIP</Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-medium flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                SIP Transaction History
              </h2>
              
              {sipHistory.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-4"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{transaction.fundName}</h3>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <Badge className={transaction.status === 'success' ? 'bg-green-500' : 'bg-amber-500'}>
                      {transaction.status === 'success' ? 'Successful' : 'Pending'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-medium">₹{transaction.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Units</p>
                      <p className="font-medium">{transaction.units}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">NAV</p>
                      <p className="font-medium">₹{transaction.nav}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      Download Receipt
                    </Button>
                  </div>
                </motion.div>
              ))}
              
              {/* View more button */}
              <Button variant="outline" className="w-full">
                View More
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Cancel SIP Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">
              {confirmationStep ? 'Confirm SIP Cancellation' : 'Cancel SIP'}
            </DialogTitle>
            <DialogDescription>
              {confirmationStep ? 
                'Please review the information before confirming' : 
                'You are about to cancel your SIP for the following fund:'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSip && (
            <>
              {!confirmationStep ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-paygrow-blue">{selectedSip.fundName}</h4>
                    <p className="text-sm text-gray-500">{selectedSip.fundCategory}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Monthly Amount</p>
                        <p className="font-medium">₹{selectedSip.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium">{selectedSip.startDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Important Information</h4>
                        <ul className="text-sm text-amber-700 space-y-1 mt-1 list-disc pl-4">
                          <li>Cancelling the SIP will stop all future installments</li>
                          <li>Your existing units will remain invested</li>
                          <li>You can start a new SIP anytime in the future</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setCancelDialogOpen(false)}
                    >
                      Keep SIP Active
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => setConfirmationStep(true)}
                    >
                      Proceed to Cancel
                    </Button>
                  </DialogFooter>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start">
                      <X className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-800 text-lg">Cancel SIP Confirmation</h4>
                        <p className="text-sm text-red-700 mt-1">
                          You are about to cancel your SIP for {selectedSip.fundName}. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Fund Name</p>
                        <p className="font-medium">{selectedSip.fundName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monthly Amount</p>
                        <p className="font-medium">₹{selectedSip.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium">{selectedSip.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Next Installment Date</p>
                        <p className="font-medium">{selectedSip.nextInstallment}</p>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setConfirmationStep(false)}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={confirmCancel}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Confirm Cancellation'}
                    </Button>
                  </DialogFooter>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Redeem SIP Dialog */}
      <Dialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">
              {confirmationStep ? 'Confirm Redemption' : 'Redeem Investment'}
            </DialogTitle>
            <DialogDescription>
              {confirmationStep ? 
                'Please review the redemption details before confirming' : 
                'You can redeem part or all of your investment in this fund:'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSip && (
            <>
              {!confirmationStep ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-paygrow-blue">{selectedSip.fundName}</h4>
                    <p className="text-sm text-gray-500">{selectedSip.fundCategory}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Current Value</p>
                        <p className="font-medium">₹{selectedSip.currentValue.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Returns</p>
                        <p className={`font-medium ${selectedSip.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedSip.returns >= 0 ? '+' : ''}{selectedSip.returns}%
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Redemption Options</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          You can choose to redeem all or part of your investment. The SIP will continue regardless of redemption.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between border-blue-200 hover:bg-blue-50"
                      onClick={() => setConfirmationStep(true)}
                    >
                      <span>Redeem Entire Amount</span>
                      <span>₹{selectedSip.currentValue.toLocaleString('en-IN')}</span>
                    </Button>
                    
                    <Link to={`/invest/partial-redemption/${selectedSip.id}`}>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                      >
                        <span>Redeem Partial Amount</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setRedeemDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-start">
                      <Info className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-800 text-lg">Redemption Details</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          You are about to redeem your entire investment in {selectedSip.fundName}.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Fund Name</p>
                        <p className="font-medium">{selectedSip.fundName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Redemption Amount</p>
                        <p className="font-medium">₹{selectedSip.currentValue.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">SIP Status</p>
                        <p className="font-medium text-green-600">Will Remain Active</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Estimated Processing Time</p>
                        <p className="font-medium">2-3 business days</p>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setConfirmationStep(false)}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    <Button 
                      className="bg-paygrow-blue"
                      onClick={confirmRedeem}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Confirm Redemption'}
                    </Button>
                  </DialogFooter>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SIPManagementScreen;
