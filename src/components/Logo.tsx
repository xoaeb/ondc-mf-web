
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full' 
}) => {
  const sizeClasses = {
    sm: variant === 'full' ? 'text-xl' : 'text-xl',
    md: variant === 'full' ? 'text-2xl' : 'text-2xl',
    lg: variant === 'full' ? 'text-3xl' : 'text-3xl',
  };

  return (
    <div className={`font-bold flex items-center ${sizeClasses[size]} ${className}`}>
      <span className="bg-gradient-to-r from-paygrow-blue to-paygrow-green rounded-lg p-1.5 inline-flex items-center justify-center mr-2">
        <span className="text-white">P</span>
      </span>
      {variant === 'full' && (
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-paygrow-blue to-paygrow-green">
          PayGrow
        </span>
      )}
    </div>
  );
};

export default Logo;
