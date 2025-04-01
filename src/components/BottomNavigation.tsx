
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, BarChart, User, Scan } from 'lucide-react';

interface BottomNavigationProps {
  activeTab?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab: propActiveTab }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Home',
      path: '/home',
      matches: ['/home'],
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      label: 'Pay',
      path: '/pay',
      matches: ['/pay', '/payment', '/scan'],
    },
    {
      icon: <Scan className="w-5 h-5" />,
      label: 'Scan',
      path: '/scan',
      matches: ['/scan'],
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      label: 'Invest',
      path: '/invest',
      matches: ['/invest', '/digital-gold', '/fixed-deposits', '/stocks', '/watchlist', '/sip', '/sip-calculator'],
    },
    {
      icon: <User className="w-5 h-5" />,
      label: 'Profile',
      path: '/profile',
      matches: ['/profile', '/settings', '/transaction-history', '/notifications'],
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (propActiveTab) {
      return item.label.toLowerCase() === propActiveTab.toLowerCase();
    }
    
    if (item.matches.some(match => match === currentPath)) {
      return true;
    }
    
    return item.matches.some(match => 
      currentPath.startsWith(match + '/') || 
      (match.includes('/') && currentPath.startsWith(match))
    );
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-t from-gray-200 to-transparent"></div>
      
      <div className="bg-white dark:bg-gray-900 shadow-lg border-t border-gray-100 dark:border-gray-800 rounded-t-2xl">
        <div className="flex justify-between items-center px-3 py-2 mx-auto max-w-md">
          {navItems.map((item) => {
            const active = isActive(item);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center py-1 px-3 transition-all duration-300"
              >
                <div className={`p-1.5 rounded-full ${
                  active 
                    ? 'bg-gradient-to-br from-paygrow-blue/15 to-blue-500/15' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  <span className={`${
                    active 
                      ? 'text-paygrow-blue' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {item.icon}
                  </span>
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  active 
                    ? 'text-paygrow-blue' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute -bottom-0.5 w-10 h-1 bg-paygrow-blue rounded-full animate-pulse-subtle" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
