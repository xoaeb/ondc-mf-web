
import React from 'react';
import { ArrowLeft, CheckCircle, Download, Copy, Share2, Clock, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { motion } from '@/components/ui/motion';
import BottomNavigation from '@/components/BottomNavigation';

// Mock transaction data - in a real app this would come from API
const transactionData = {
  id: "TX123456789",
  status: "success", // success, pending, failed
  amount: 5000,
  type: "debit", // credit or debit
  recipient: {
    name: "HDFC Mutual Fund",
    upi: "hdfcmf@hdfcbank",
    image: "https://example.com/hdfc.png"
  },
  description: "SIP Investment - HDFC Mid Cap Opportunities",
  date: "Jun 15, 2023",
  time: "11:45 AM",
  referenceId: "REF987654321",
  bankAccount: "HDFC Bank ••••6789",
  category: "Investments"
};

const TransactionDetailScreen: React.FC = () => {
  const { toast } = useToast();
  const { id } = useParams();
  
  // In a real app, you would fetch transaction details based on the ID
  const transaction = transactionData;
  
  const handleCopyReferenceId = () => {
    navigator.clipboard.writeText(transaction.referenceId);
    toast({
      title: "Copied to clipboard",
      description: "Reference ID copied successfully",
    });
  };
  
  const getStatusColor = () => {
    switch(transaction.status) {
      case "success": return "text-green-600 bg-green-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "failed": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pb-20 min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-20 px-4">
        <div className="flex items-center mb-6">
          <Link to="/transaction-history" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Transaction Details</h1>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mb-2">
            {transaction.status === "success" ? (
              <CheckCircle className="h-16 w-16 text-green-400" />
            ) : transaction.status === "pending" ? (
              <Clock className="h-16 w-16 text-yellow-400" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-red-400 flex items-center justify-center">
                <span className="text-white text-2xl">✕</span>
              </div>
            )}
          </div>
          <p className="text-3xl font-bold mb-1">₹{transaction.amount.toLocaleString('en-IN')}</p>
          <p className={`text-sm px-3 py-1 rounded-full ${getStatusColor()}`}>
            {transaction.status === "success" ? "Payment Successful" : 
             transaction.status === "pending" ? "Payment Pending" : "Payment Failed"}
          </p>
        </div>
      </div>
      
      {/* Transaction Card */}
      <div className="px-4 -mt-14">
        <Card className="p-5 border-0 shadow-lg rounded-xl">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-paygrow-blue font-bold text-xl">{transaction.recipient.name.charAt(0)}</span>
            </div>
            <div>
              <p className="font-semibold">{transaction.recipient.name}</p>
              <p className="text-xs text-gray-500">{transaction.recipient.upi}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Date & Time</p>
              <p className="text-sm font-medium">{transaction.date}, {transaction.time}</p>
            </div>
            
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Reference ID</p>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">{transaction.referenceId}</p>
                <button onClick={handleCopyReferenceId}>
                  <Copy className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Category</p>
              <p className="text-sm font-medium">{transaction.category}</p>
            </div>
            
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Paid from</p>
              <p className="text-sm font-medium">{transaction.bankAccount}</p>
            </div>
            
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">Description</p>
              <p className="text-sm font-medium">{transaction.description}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1 border-gray-200" asChild>
              <Link to="/transaction-history">
                <ArrowRight className="h-4 w-4 mr-2" />
                View All
              </Link>
            </Button>
            <Button variant="outline" className="flex-1 border-gray-200">
              <Download className="h-4 w-4 mr-2" />
              Receipt
            </Button>
            <Button variant="outline" className="flex-1 border-gray-200">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </Card>
        
        {/* Similar transactions */}
        {transaction.status === "success" && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Similar Transactions</h3>
            <Card className="p-3 mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-paygrow-blue font-bold">H</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">HDFC Mutual Fund</p>
                  <p className="text-xs text-gray-500">May 15, 2023</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹5,000</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-paygrow-blue font-bold">H</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">HDFC Mutual Fund</p>
                  <p className="text-xs text-gray-500">Apr 15, 2023</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹5,000</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* Help option */}
        <div className="mt-6 mb-8 text-center">
          <Button variant="link" className="text-paygrow-blue">
            Need help with this transaction?
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </motion.div>
  );
};

export default TransactionDetailScreen;
