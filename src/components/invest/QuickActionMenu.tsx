
import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, TrendingUp, Star, Wallet, BarChart, Timer, Calculator, Bookmark } from 'lucide-react';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  path: string;
  bgColor: string;
  textColor: string;
}

interface QuickActionMenuProps {
  actions?: QuickAction[];
}

const QuickActionMenu: React.FC<QuickActionMenuProps> = ({ actions }) => {
  const defaultActions: QuickAction[] = [
    {
      icon: <LineChart className="h-6 w-6" />,
      label: 'Mutual Funds',
      path: '/invest/mutual-funds',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: 'Stocks',
      path: '/stocks',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: <Star className="h-6 w-6" />,
      label: 'Gold',
      path: '/digital-gold',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      label: 'Fixed Deposits',
      path: '/fixed-deposits',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      icon: <Timer className="h-6 w-6" />,
      label: 'SIP',
      path: '/sip',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      label: 'Portfolio',
      path: '/invest/portfolio',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      label: 'SIP Calculator',
      path: '/sip-calculator',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
    },
    {
      icon: <Bookmark className="h-6 w-6" />,
      label: 'Watchlist',
      path: '/watchlist',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  const displayActions = actions || defaultActions;

  return (
    <div className="py-4 px-4 bg-white dark:bg-gray-900 shadow-sm rounded-b-2xl">
      <div className="overflow-x-auto pb-1">
        <div className="grid grid-cols-4 gap-4">
          {displayActions.map((action, index) => (
            <Link 
              key={index} 
              to={action.path} 
              className="flex flex-col items-center space-y-2 transition-transform hover:scale-105"
            >
              <div className={`w-14 h-14 rounded-full ${action.bgColor} flex items-center justify-center ${action.textColor} shadow-sm`}>
                {action.icon}
              </div>
              <span className="text-xs text-center font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionMenu;
