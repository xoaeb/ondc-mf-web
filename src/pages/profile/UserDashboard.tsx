
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  BarChart3, 
  FileText, 
  Gift, 
  Share2, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from '@/components/ui/motion';
import { Separator } from "@/components/ui/separator";

const UserDashboard: React.FC = () => {
  // Menu items for the profile sections
  const menuItems = [
    {
      title: 'Bank Accounts',
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
      description: 'Manage your linked bank accounts',
      path: '/profile/bank-accounts',
    },
    {
      title: 'Portfolio',
      icon: <BarChart3 className="h-5 w-5 text-green-500" />,
      description: 'View & manage your investments',
      path: '/invest/portfolio',
    },
    {
      title: 'Transaction History',
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      description: 'View all your transactions',
      path: '/transaction-history',
    },
    {
      title: 'Notifications',
      icon: <Bell className="h-5 w-5 text-amber-500" />,
      description: 'Manage your notification preferences',
      path: '/notifications',
      badge: 3,
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5 text-gray-500" />,
      description: 'App preferences & account settings',
      path: '/settings',
    },
  ];

  // Menu items for additional features
  const additionalMenuItems = [
    {
      title: 'Refer & Earn',
      icon: <Gift className="h-5 w-5 text-pink-500" />,
      description: 'Invite friends and earn rewards',
      path: '/refer',
    },
    {
      title: 'Share App',
      icon: <Share2 className="h-5 w-5 text-blue-500" />,
      description: 'Share PayGrow with friends',
      path: '/share',
    },
    {
      title: 'Help & Support',
      icon: <HelpCircle className="h-5 w-5 text-paygrow-blue" />,
      description: 'Get assistance and raise tickets',
      path: '/support',
    },
  ];

  return (
    <div className="pb-16">
      {/* Dashboard sections */}
      <div className="p-4 space-y-4">
        {/* Quick stats */}
        <Card className="p-4 glass-card">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Investments</p>
              <p className="text-xl font-bold text-gray-900">₹20,450</p>
              <p className="text-xs text-green-600">+8.25% overall</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Wallet Balance</p>
              <p className="text-xl font-bold text-gray-900">₹5,200</p>
              <Button variant="outline" size="sm" className="mt-1 h-7 text-xs rounded-full">
                Add Money
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Menu Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold px-1">Account</h3>
          <Card className="divide-y divide-gray-100">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.div 
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                      {item.icon}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {item.badge && (
                      <div className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center mr-2">
                        {item.badge}
                      </div>
                    )}
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </Card>
        </div>
        
        {/* Additional features */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold px-1">More</h3>
          <Card className="divide-y divide-gray-100">
            {additionalMenuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.div 
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                      {item.icon}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </motion.div>
              </Link>
            ))}
          </Card>
        </div>
        
        {/* Logout button */}
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          
          <div className="text-center mt-4 text-xs text-gray-400">
            <p>App Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
