
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, ExternalLink } from 'lucide-react';
import { motion } from '@/components/ui/motion';
import { Link } from 'react-router-dom';

export interface MarketIndicator {
  name: string;
  value: string;
  change: number;
}

export interface MarketIndicatorsProps {
  indices: MarketIndicator[];
}

const MarketIndicators: React.FC<MarketIndicatorsProps> = ({ indices }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-paygrow-blue" />
          Market Indices
        </h3>
        <Link to="/invest/research" className="text-sm text-paygrow-blue flex items-center">
          View All <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {indices.map((index, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-3 border border-gray-200 bg-white hover:shadow-md transition-all relative overflow-hidden">
              {/* Add subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-80"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start">
                  <p className="text-xs text-gray-500 mb-1">{index.name}</p>
                  {index.change >= 0 ? (
                    <span className="px-1.5 py-0.5 text-[10px] bg-green-50 text-green-600 rounded-full">+{index.change}%</span>
                  ) : (
                    <span className="px-1.5 py-0.5 text-[10px] bg-red-50 text-red-600 rounded-full">{index.change}%</span>
                  )}
                </div>
                <p className="font-semibold">{index.value}</p>
                <div className={`flex items-center text-xs mt-1 ${
                  index.change >= 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {index.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  <span>{Math.abs(index.change)}%</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketIndicators;
