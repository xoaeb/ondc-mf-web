
import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Camera, FileText, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const KYCVerificationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [kycStatus, setKycStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [documentType, setDocumentType] = useState<'aadhar' | 'pan' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDocumentSelect = (type: 'aadhar' | 'pan') => {
    setDocumentType(type);
  };
  
  const handleUpload = () => {
    if (!documentType) {
      toast({
        title: "Select a Document",
        description: "Please select a document type to proceed",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setCurrentStep(2);
      setKycStatus('in-progress');
      
      toast({
        title: "Document Uploaded",
        description: "Your document has been uploaded successfully",
      });
    }, 2000);
  };
  
  const handleSelfie = () => {
    // Simulate selfie capture
    setTimeout(() => {
      setCurrentStep(3);
      setKycStatus('completed');
      
      toast({
        title: "Selfie Captured",
        description: "Your verification is being processed",
      });
    }, 1500);
  };
  
  const getStepProgress = () => {
    if (currentStep === 1) return 33;
    if (currentStep === 2) return 66;
    return 100;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/profile" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">KYC Verification</h1>
          <p className="text-white/80">Complete your verification to access all features</p>
        </div>
      </div>
      
      {/* Progress Tracker */}
      <div className="bg-white p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Step {currentStep} of 3</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            kycStatus === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {kycStatus === 'pending' ? 'Pending' :
             kycStatus === 'in-progress' ? 'In Progress' :
             'Completed'}
          </span>
        </div>
        <Progress value={getStepProgress()} className="h-2" />
      </div>
      
      {/* KYC Content */}
      <div className="flex-1 p-4">
        {currentStep === 1 && (
          <>
            <Card className="p-4 mb-6">
              <h3 className="font-medium flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2 text-paygrow-blue" />
                Upload Document
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                Please upload a clear image of any one of the following documents for verification
              </p>
              
              <div className="space-y-3">
                <Card 
                  className={`p-3 border-2 ${documentType === 'aadhar' ? 'border-paygrow-blue' : 'border-gray-200'}`}
                  onClick={() => handleDocumentSelect('aadhar')}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Aadhar Card</h4>
                      <p className="text-xs text-gray-500">Upload front and back of your Aadhar card</p>
                    </div>
                    {documentType === 'aadhar' && (
                      <CheckCircle className="h-5 w-5 text-paygrow-blue" />
                    )}
                  </div>
                </Card>
                
                <Card 
                  className={`p-3 border-2 ${documentType === 'pan' ? 'border-paygrow-blue' : 'border-gray-200'}`}
                  onClick={() => handleDocumentSelect('pan')}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">PAN Card</h4>
                      <p className="text-xs text-gray-500">Upload a clear image of your PAN card</p>
                    </div>
                    {documentType === 'pan' && (
                      <CheckCircle className="h-5 w-5 text-paygrow-blue" />
                    )}
                  </div>
                </Card>
              </div>
            </Card>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex">
              <AlertCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700 mb-1">Important</p>
                <p className="text-xs text-blue-600">
                  Make sure your document is clearly visible and all details are readable. Blurred or incomplete images will be rejected.
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-paygrow-blue h-12 mb-4"
              onClick={handleUpload}
              disabled={!documentType || isUploading}
            >
              {isUploading ? (
                'Uploading...'
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Document
                </>
              )}
            </Button>
          </>
        )}
        
        {currentStep === 2 && (
          <>
            <Card className="p-4 mb-6">
              <h3 className="font-medium flex items-center mb-4">
                <Camera className="h-5 w-5 mr-2 text-paygrow-blue" />
                Take a Selfie
              </h3>
              
              <p className="text-sm text-gray-600 mb-6">
                To verify your identity, we need a clear selfie of your face
              </p>
              
              <div className="h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center mb-4">
                <Camera className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500">Tap to take a selfie</p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Ensure your face is clearly visible
                </p>
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Good lighting conditions
                </p>
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Remove sunglasses or any face covering
                </p>
              </div>
            </Card>
            
            <Button 
              className="w-full bg-paygrow-blue h-12 mb-4"
              onClick={handleSelfie}
            >
              Capture Selfie
            </Button>
          </>
        )}
        
        {currentStep === 3 && (
          <>
            <div className="text-center py-8">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Verification Submitted</h2>
              <p className="text-gray-600 mb-6">
                Your KYC documents have been submitted for verification. This process typically takes 24-48 hours.
              </p>
              
              <Card className="p-4 mb-6">
                <h3 className="font-medium mb-4">Verification Status</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Document Upload</span>
                    <span className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Selfie Verification</span>
                    <span className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Document Verification</span>
                    <span className="text-sm text-yellow-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Pending
                    </span>
                  </div>
                </div>
              </Card>
            </div>
            
            <Button 
              className="w-full bg-paygrow-blue h-12 mb-4"
              onClick={() => navigate('/profile')}
            >
              Back to Profile
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default KYCVerificationScreen;
