
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, ChevronRight, PieChart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PortfolioAllocation {
  type: string;
  percentage: number;
  color: string;
}

interface PortfolioSummaryProps {
  totalValue: number;
  invested: number;
  returns: number;
  returnsPercent: number;
  allocation: PortfolioAllocation[];
}

const PortfolioSummaryCard: React.FC<PortfolioSummaryProps> = ({
  totalValue,
  invested,
  returns,
  returnsPercent,
  allocation
}) => {
  return (
    <Card className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border-none text-white p-5 rounded-2xl shadow-lg animate-fade-in overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Portfolio Overview
          </h3>
          <Link to="/invest/portfolio">
            <Button variant="ghost" className="h-8 text-white hover:bg-white/20 px-2" size="sm">
              View Details <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div className="bg-white/10 p-3 rounded-xl">
            <p className="text-sm text-white/80 mb-1">Current Value</p>
            <p className="text-2xl font-bold">₹{totalValue.toLocaleString('en-IN')}</p>
            <div className="mt-1 flex items-center">
              <div className="bg-green-500/20 rounded-full px-2 py-0.5 text-xs inline-flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                <span>+{returnsPercent}%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 p-3 rounded-xl">
            <p className="text-sm text-white/80 mb-1">Invested Amount</p>
            <p className="text-2xl font-bold">₹{invested.toLocaleString('en-IN')}</p>
            <div className="mt-1 flex items-center">
              <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                Profit: ₹{returns.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
        
        {/* Portfolio Allocation */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Asset Allocation</p>
            <Link to="/invest/portfolio" className="text-xs text-white/80 underline">
              Details
            </Link>
          </div>
          
          {allocation.map((asset, index) => (
            <div key={asset.type} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{asset.type}</span>
                <span>{asset.percentage}%</span>
              </div>
              <Progress 
                value={asset.percentage} 
                className="h-1.5 bg-white/20"
                indicatorClassName={asset.color}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PortfolioSummaryCard;
