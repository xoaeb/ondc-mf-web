
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, Lock, Info, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from '@/components/ui/motion';

const ScanScreen = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate scanning effect
    const timer = setTimeout(() => {
      setIsScanning(false);
      
      toast({
        title: "QR code detected",
        description: "Processing payment to Rahul Sharma",
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  // Function to handle manual QR code scan
  const handleScanQR = () => {
    setIsScanning(true);
    
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      
      toast({
        title: "QR code detected",
        description: "Processing payment to Rahul Sharma",
      });
    }, 2000);
  };
  
  // Function to handle camera permission request
  const requestCameraPermission = () => {
    setHasPermission(true);
    
    toast({
      title: "Camera access granted",
      description: "You can now scan QR codes",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-4 px-4 flex items-center">
        <Link to="/pay" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Scan & Pay</h1>
      </div>
      
      {/* Scanner Area */}
      <div className="relative">
        <div className="aspect-square max-w-md mx-auto p-4 relative">
          {hasPermission ? (
            <div className="w-full h-full relative bg-black rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://source.unsplash.com/random/500x500/?store" 
                  alt="Camera view" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              
              {/* Scan animation overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                {/* Scanner frame */}
                <div className="relative w-64 h-64 rounded-lg border-2 border-white">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-paygrow-blue rounded-tl"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-paygrow-blue rounded-tr"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-paygrow-blue rounded-bl"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-paygrow-blue rounded-br"></div>
                  
                  {isScanning && (
                    <>
                      {/* Pulsing animation */}
                      <motion.div 
                        className="absolute inset-0 bg-blue-500/10 border border-blue-400/30 rounded-lg"
                        animate={{
                          scale: 1.5,
                          opacity: 0.2
                        }}
                        transition={{
                          duration: 2,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-full h-full"></div>
                      </motion.div>
                      
                      {/* Scanner line animation */}
                      <motion.div 
                        className="absolute left-0 right-0 h-0.5 bg-paygrow-blue"
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ 
                          duration: 3, 
                          ease: "easeInOut" 
                        }}
                      >
                        <div className="w-full h-full"></div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Instructional overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-4 text-center">
                <p className="text-sm font-medium">
                  {isScanning ? 'Scanning for QR code...' : 'QR code detected!'}
                </p>
              </div>
              
              {/* Security badge */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full py-1 px-3 flex items-center">
                <Lock className="h-3 w-3 text-green-400 mr-1" />
                <p className="text-xs text-white">Secure</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-8 text-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Camera Access Required</h3>
              <p className="text-sm text-gray-500 mb-6">We need camera access to scan QR codes for payments.</p>
              <Button onClick={requestCameraPermission}>
                Allow Camera Access
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="px-4 mt-4">
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-white text-paygrow-blue border border-paygrow-blue hover:bg-blue-50"
            onClick={handleScanQR}
          >
            {isScanning ? "Scanning..." : "Scan Again"}
          </Button>
          <Link to="/payment/contacts" className="flex-1">
            <Button className="w-full bg-paygrow-blue text-white">
              Enter Manually
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Recent Payments */}
      <div className="mt-8 px-4">
        <h3 className="text-base font-medium mb-3">Recent Payments</h3>
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
          {[
            { name: "Rahul Sharma", phone: "9876543210", date: "2 days ago", amount: "₹500" },
            { name: "Priya Patel", phone: "9456789023", date: "1 week ago", amount: "₹1,200" },
            { name: "Amit Singh", phone: "8765432109", date: "2 weeks ago", amount: "₹750" }
          ].map((payment, i) => (
            <Link key={i} to={`/payment/transaction-detail/${i}`}>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-lg font-medium text-blue-700 mr-3">
                    {payment.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{payment.name}</p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                </div>
                <span className="font-medium text-green-600">{payment.amount}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Help tip */}
      <div className="mt-6 p-4 mx-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-700">Need to pay someone not nearby?</p>
          <p className="text-xs text-blue-600 mt-1">
            You can send money using phone number or bank details directly from your PayGrow account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanScreen;
