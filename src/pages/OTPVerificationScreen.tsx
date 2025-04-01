
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';

const OTPVerificationScreen: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const isResetPassword = location.state?.resetPassword || false;
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(false);
  
  // OTP timer
  useEffect(() => {
    if (timeLeft === 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  // Handle OTP input
  const handleChangeOtp = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting multiple digits
      const chars = value.split('');
      const newOtp = [...otp];
      
      chars.forEach((char, i) => {
        if (index + i < 4) {
          newOtp[index + i] = char;
        }
      });
      
      setOtp(newOtp);
      
      // Focus the next input or last input if all filled
      const nextIndex = Math.min(index + chars.length, 3);
      const nextInput = document.getElementById(`otp-${nextIndex}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    } else {
      // Single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };
  
  // Handle key down events for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };
  
  // Resend OTP
  const handleResend = () => {
    toast({
      title: "OTP Resent",
      description: `A new verification code has been sent to ${email}`,
    });
    setTimeLeft(30);
  };
  
  // Verify OTP
  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit code",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      
      if (isResetPassword) {
        navigate('/new-password');
      } else {
        navigate('/home');
      }
      
      toast({
        title: "Verification Successful",
        description: isResetPassword 
          ? "You can now reset your password"
          : "Your account has been verified successfully",
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto" size="md" />
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Verification Code
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {`We've sent a 4-digit code to ${email || 'your email'}`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <div className="mb-6">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleChangeOtp(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  className="w-12 h-12 text-center text-xl font-bold paygrow-input"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="mb-6 text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-600">
                Resend code in {timeLeft} seconds
              </p>
            ) : (
              <Button 
                variant="link" 
                className="text-paygrow-blue"
                onClick={handleResend}
              >
                Resend Code
              </Button>
            )}
          </div>

          <Button
            onClick={handleVerify}
            className="w-full paygrow-button-primary"
            disabled={loading || otp.join('').length !== 4}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationScreen;
