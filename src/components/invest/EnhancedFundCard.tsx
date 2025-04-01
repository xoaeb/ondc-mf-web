
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Star, 
  BarChart4, 
  Calendar, 
  Info, 
  ArrowRight, 
  TrendingDown,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "@/components/ui/motion";

interface FundProps {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  nav: number;
  navDate?: string;
  rating: number;
  tags?: string[];
  aum?: string;
  expenseRatio: number;
  minInvestment: number;
  trending?: boolean;
  highlighted?: boolean;
}

const EnhancedFundCard: React.FC<{ fund: FundProps }> = ({ fund }) => {
  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Very High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getReturnsColor = (returnValue: number) => {
    if (returnValue > 15) return 'text-green-600';
    if (returnValue > 10) return 'text-green-500';
    if (returnValue > 0) return 'text-green-400';
    if (returnValue === 0) return 'text-gray-500';
    return 'text-red-500';
  };

  return (
    <Link to={`/invest/mutual-fund/${fund.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={`p-4 border ${fund.highlighted ? 'border-paygrow-blue/30 bg-blue-50/30' : 'border-gray-200 bg-white'} rounded-xl shadow-sm`}>
          {/* Fund header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{fund.name}</h3>
                {fund.trending && (
                  <Badge variant="outline" className="ml-2 bg-red-50 text-red-600 border-red-200 text-[10px]">
                    <TrendingUp className="w-3 h-3 mr-1" /> Trending
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <span>{fund.category}</span>
                {fund.subcategory && (
                  <>
                    <span className="mx-1.5">•</span>
                    <span>{fund.subcategory}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Rating and Risk */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index}
                  className={`h-4 w-4 ${
                    index < fund.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            
            <div className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(fund.riskLevel)}`}>
              {fund.riskLevel} Risk
            </div>
          </div>
          
          {/* Returns Section */}
          <div className="grid grid-cols-3 gap-2 mb-3 bg-gray-50 rounded-lg p-2.5">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">1Y Returns</p>
              <p className={`text-sm font-semibold ${getReturnsColor(fund.returns.oneYear)}`}>
                {fund.returns.oneYear > 0 ? '+' : ''}{fund.returns.oneYear}%
              </p>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <p className="text-xs text-gray-500 mb-1">3Y Returns</p>
              <p className={`text-sm font-semibold ${getReturnsColor(fund.returns.threeYear)}`}>
                {fund.returns.threeYear > 0 ? '+' : ''}{fund.returns.threeYear}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">5Y Returns</p>
              <p className={`text-sm font-semibold ${getReturnsColor(fund.returns.fiveYear)}`}>
                {fund.returns.fiveYear > 0 ? '+' : ''}{fund.returns.fiveYear}%
              </p>
            </div>
          </div>
          
          {/* Fund Details */}
          <div className="space-y-1.5 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Min. Investment</span>
              <span className="font-medium">₹{fund.minInvestment.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">NAV</span>
              <span className="font-medium">₹{fund.nav.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Expense Ratio</span>
              <div className="flex items-center font-medium">
                {fund.expenseRatio}% 
                <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex space-x-2">
            <Link to={`/invest/mutual-fund/${fund.id}`} className="flex items-center justify-center px-4 py-2.5 bg-paygrow-blue text-white rounded-lg flex-1 font-medium hover:bg-blue-700 transition-colors">
              Invest Now <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default EnhancedFundCard;
