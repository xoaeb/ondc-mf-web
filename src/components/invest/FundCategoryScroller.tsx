
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, Briefcase, PiggyBank, Lightbulb, Percent, ArrowRight } from 'lucide-react';
import { motion } from '@/components/ui/motion';

// Fund categories data
const categories = [
  {
    name: 'Large Cap',
    description: 'Stable returns',
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    route: '/invest/mutual-funds?category=large-cap',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Mid Cap',
    description: 'Growth focused',
    icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    route: '/invest/mutual-funds?category=mid-cap',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    name: 'Small Cap',
    description: 'High growth potential',
    icon: <Briefcase className="h-6 w-6 text-orange-600" />,
    route: '/invest/mutual-funds?category=small-cap',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    name: 'ELSS',
    description: 'Tax saving',
    icon: <Percent className="h-6 w-6 text-purple-600" />,
    route: '/invest/mutual-funds?category=elss',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    name: 'Index Funds',
    description: 'Market tracking',
    icon: <Lightbulb className="h-6 w-6 text-yellow-600" />,
    route: '/invest/mutual-funds?category=index',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    name: 'Debt Funds',
    description: 'Lower risk',
    icon: <PiggyBank className="h-6 w-6 text-cyan-600" />,
    route: '/invest/mutual-funds?category=debt',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
  },
];

const FundCategoryScroller: React.FC = () => {
  return (
    
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Fund Categories</h3>
        <Link to="/invest/mutual-funds" className="text-sm text-paygrow-blue flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

        {/* Updated Grid Layout */}
  <div className="grid grid-cols-3 gap-4 sm:gap-6">
    {categories.map((category, index) => (
      <motion.div 
        key={index}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        <Link to={category.route}>
          <Card className={`p-3 border ${category.borderColor} hover:border-paygrow-blue hover:shadow-md transition-all relative overflow-hidden`}>
            {/* Add subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-80"></div>

            <div className="relative flex flex-col items-center text-center">
              <div className={`${category.bgColor} rounded-full p-2 w-12 h-12 flex items-center justify-center mb-2`}>
                {category.icon}
              </div>
              <h4 className="font-medium text-sm">{category.name}</h4>
              {/* <p className="text-xs text-gray-500">{category.description}</p> */}
            </div>
          </Card>
        </Link>
      </motion.div>
    ))}
  </div>

      
      {/* <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex space-x-3">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={category.route}>
                <Card className={`w-32 p-3 border ${category.borderColor} hover:border-paygrow-blue hover:shadow-md transition-all relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-80"></div>
                  
                  <div className="relative">
                    <div className={`${category.bgColor} rounded-full p-2 w-12 h-12 flex items-center justify-center mb-2`}>
                      {category.icon}
                    </div>
                    <h4 className="font-medium text-sm">{category.name}</h4>
                    <p className="text-xs text-gray-500">{category.description}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default FundCategoryScroller;
