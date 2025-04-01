
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from '@/components/ui/motion';

interface InvestmentCardProps {
  id: string;
  name: string;
  type: 'mutual_fund' | 'stock' | 'gold' | 'fd';
  units?: number;
  purchaseValue: number;
  currentValue: number;
  change: number;
  changePercentage: number;
  lastUpdated: string;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  id,
  name,
  type,
  units,
  purchaseValue,
  currentValue,
  change,
  changePercentage,
  lastUpdated
}) => {
  const profit = currentValue - purchaseValue;
  const isProfitable = profit >= 0;
  
  // Helper function to get icon & color based on type
  const getTypeDetails = () => {
    switch(type) {
      case 'mutual_fund':
        return { 
          label: 'Mutual Fund', 
          bgColor: 'bg-blue-50', 
          textColor: 'text-blue-600',
          icon: '📊'
        };
      case 'stock':
        return { 
          label: 'Stock', 
          bgColor: 'bg-purple-50', 
          textColor: 'text-purple-600',
          icon: '📈'
        };
      case 'gold':
        return { 
          label: 'Digital Gold', 
          bgColor: 'bg-amber-50', 
          textColor: 'text-amber-600',
          icon: '🏆'
        };
      case 'fd':
        return { 
          label: 'Fixed Deposit', 
          bgColor: 'bg-green-50', 
          textColor: 'text-green-600',
          icon: '🏦'
        };
      default:
        return { 
          label: 'Investment', 
          bgColor: 'bg-gray-50', 
          textColor: 'text-gray-600',
          icon: '💰'
        };
    }
  };
  
  const typeDetails = getTypeDetails();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 hover:shadow-md transition-all duration-300 border-gray-100 relative overflow-hidden">
        {/* Enhanced background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-50"></div>
        
        {/* Card content */}
        <div className="relative">
          {/* Header with type and name */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className={`text-xs ${typeDetails.bgColor} ${typeDetails.textColor} px-2 py-0.5 rounded-full inline-flex items-center`}>
                <span className="mr-1">{typeDetails.icon}</span>
                {typeDetails.label}
              </div>
              <h3 className="font-medium mt-1 text-gray-900">{name}</h3>
            </div>
            <Link to={`/invest/${type}/${id}`}>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Main data section */}
          <div className="flex justify-between mb-2">
            <div>
              <p className="text-xs text-gray-500">Current Value</p>
              <p className="text-xl font-bold">₹{currentValue.toLocaleString('en-IN')}</p>
              
              {units && (
                <p className="text-xs text-gray-500 mt-1">
                  {units.toFixed(3)} {type === 'gold' ? 'gm' : 'units'}
                </p>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-500">Invested</p>
              <p className="font-medium">₹{purchaseValue.toLocaleString('en-IN')}</p>
              
              <div className={`mt-1 inline-flex items-center text-xs ${isProfitable ? 'text-green-600' : 'text-red-600'} rounded-full px-2 py-0.5 ${isProfitable ? 'bg-green-50' : 'bg-red-50'}`}>
                {isProfitable ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {isProfitable ? '+' : ''}{profit.toLocaleString('en-IN')} ({isProfitable ? '+' : ''}{changePercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              asChild
            >
              <Link to={`/invest/${type}/${id}/add`}>Add More</Link>
            </Button>
            
            {/* SIP button for mutual funds */}
            {type === 'mutual_fund' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs border-green-200 text-green-600 hover:bg-green-50"
                asChild
              >
                <Link to={`/invest/sip-setup/${id}`}>Start SIP</Link>
              </Button>
            )}
          </div>
          
          {/* Last updated info */}
          <p className="text-[10px] text-gray-400 mt-2 text-right">
            Last updated: {lastUpdated}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default InvestmentCard;
