
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight, ArrowUpRight, TrendingUp, Shield, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MutualFundProps {
  id: number;
  name: string;
  category: string;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  riskLevel: string;
  nav: number;
  navChange?: number;
  aum: string;
  expenseRatio: number;
  rating: number;
  minInvestment?: number;
  tags?: string[];
  trending?: boolean;
}

const MutualFundCard: React.FC<MutualFundProps> = ({
  id,
  name,
  category,
  returns,
  riskLevel,
  nav,
  navChange = 0,
  aum,
  expenseRatio,
  rating,
  minInvestment = 500,
  tags = [],
  trending = false,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={`h-3.5 w-3.5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`} 
      />
    ));
  };

  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReturnsColor = (returnValue: number) => {
    if (returnValue > 15) return 'text-green-600';
    if (returnValue > 10) return 'text-green-500';
    if (returnValue > 5) return 'text-blue-500';
    return 'text-orange-500';
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white rounded-xl overflow-hidden relative">
      {trending && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-red-600 text-white text-xs py-1 px-3 rounded-bl-lg font-medium flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" /> Trending
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <Link to={`/invest/mutual-fund/${id}`}>
            <h4 className="font-semibold text-paygrow-blue hover:text-blue-700 transition-colors">{name}</h4>
          </Link>
          <div className="flex items-center flex-wrap mt-1">
            <p className="text-xs text-gray-500 mr-2">{category}</p>
            <div className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(riskLevel)}`}>
              {riskLevel} Risk
            </div>
          </div>
        </div>
        <Link to={`/invest/mutual-fund/${id}`} className="text-gray-400 hover:text-paygrow-blue transition-colors">
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
      
      <div className="flex items-center mb-2">
        <div className="flex">{renderStars(rating)}</div>
        {tags.length > 0 && (
          <div className="ml-2 flex gap-1">
            {tags.slice(0, 1).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-[10px] bg-blue-50 text-blue-600 border-blue-200">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2 my-3 p-2 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-xs text-gray-500">1Y Returns</p>
          <p className={`text-sm font-bold ${getReturnsColor(returns.oneYear)}`}>
            {returns.oneYear}%
          </p>
        </div>
        <div className="text-center border-x border-gray-200">
          <p className="text-xs text-gray-500">3Y Returns</p>
          <p className={`text-sm font-bold ${getReturnsColor(returns.threeYear)}`}>
            {returns.threeYear}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">5Y Returns</p>
          <p className={`text-sm font-bold ${getReturnsColor(returns.fiveYear)}`}>
            {returns.fiveYear}%
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-3 text-sm">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600">
                <p className="text-xs">NAV:</p>
                <p className="font-medium ml-1">₹{nav.toFixed(2)}</p>
                {navChange !== 0 && (
                  <span className={`text-xs ml-1 flex items-center ${navChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {navChange > 0 && <ArrowUpRight className="h-3 w-3" />}
                    {navChange >= 0 ? '+' : ''}{navChange}%
                  </span>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Net Asset Value</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600">
                <p className="text-xs">Min:</p>
                <p className="font-medium ml-1">₹{minInvestment}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Minimum Investment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center text-gray-600">
                <p className="text-xs">Expense:</p>
                <p className="font-medium ml-1">{expenseRatio}%</p>
                <Info className="w-3 h-3 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Annual fund management fee</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <Button 
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          asChild
        >
          <Link to={`/invest/sip-setup/${id}`}>Invest Now</Link>
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          asChild
        >
          <Link to={`/invest/mutual-fund/${id}`}>Details</Link>
        </Button>
      </div>
    </Card>
  );
};

export default MutualFundCard;
