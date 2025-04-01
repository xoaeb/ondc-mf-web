
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Star } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Featured funds data
const featuredFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 14.2,
    },
    risk: 'Moderate',
    minInvestment: 500,
    ratings: 5,
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap',
    returns: {
      oneYear: 18.2,
      threeYear: 16.9,
      fiveYear: 15.7,
    },
    risk: 'High',
    minInvestment: 1000,
    ratings: 4,
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    category: 'Small Cap',
    returns: {
      oneYear: 22.7,
      threeYear: 19.5,
      fiveYear: 18.2,
    },
    risk: 'Very High',
    minInvestment: 500,
    ratings: 4,
  },
];

// Risk level colors
const getRiskColor = (risk: string) => {
  switch(risk) {
    case 'Low': return 'bg-green-100 text-green-800';
    case 'Moderate': return 'bg-blue-100 text-blue-800';
    case 'High': return 'bg-orange-100 text-orange-800';
    case 'Very High': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const FeaturedFundsSection: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Featured Funds</h3>
        <Link to="/invest/mutual-funds" className="text-sm text-paygrow-blue flex items-center">
          View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {featuredFunds.map((fund) => (
          <Link to={`/invest/mutual-fund/${fund.id}`} key={fund.id}>
            <Card className="p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h4 className="font-medium text-paygrow-blue">{fund.name}</h4>
                  <div className="flex items-center">
                    <p className="text-xs text-gray-500 mr-2">{fund.category}</p>
                    <div className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(fund.risk)}`}>
                      {fund.risk} Risk
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < fund.ratings ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-3 mb-1">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-500">1Y Returns</span>
                  <span className={`font-medium ${fund.returns.oneYear > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                    {fund.returns.oneYear}%
                  </span>
                </div>
                <Progress value={fund.returns.oneYear * 4} className="h-1.5" />
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div>
                  <p className="text-xs text-gray-500">Min Investment</p>
                  <p className="font-medium">₹{fund.minInvestment}</p>
                </div>
                
                <Button size="sm" className="bg-paygrow-blue">
                  Invest
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFundsSection;
