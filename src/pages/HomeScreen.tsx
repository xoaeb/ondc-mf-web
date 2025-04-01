
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, QrCodeIcon, CreditCardIcon, WalletIcon, BarChartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import Logo from '@/components/Logo';

// Quick action buttons for the home screen
const quickActions = [
  { icon: <QrCodeIcon className="w-6 h-6" />, label: 'Scan & Pay', path: '/scan' },
  { icon: <CreditCardIcon className="w-6 h-6" />, label: 'Pay Bills', path: '/bills' },
  { icon: <WalletIcon className="w-6 h-6" />, label: 'Add Money', path: '/add-funds' },
  { icon: <BarChartIcon className="w-6 h-6" />, label: 'Invest', path: '/invest' },
];

// Recent transaction mock data
const recentTransactions = [
  { 
    id: 1, 
    name: 'Starbucks Coffee', 
    amount: -320, 
    date: '2 hours ago', 
    type: 'payment',
  },
  { 
    id: 2, 
    name: 'Salary Deposit', 
    amount: 48000, 
    date: 'Yesterday', 
    type: 'credit',
  },
  { 
    id: 3, 
    name: 'Amazon.in', 
    amount: -1450, 
    date: '2 days ago', 
    type: 'payment',
  },
  { 
    id: 4, 
    name: 'Axis Bluechip Fund', 
    amount: -5000, 
    date: '3 days ago', 
    type: 'investment',
  },
];

const HomeScreen: React.FC = () => {
  return (
    <div className="pb-20"> {/* Add padding at bottom for the nav */}
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-500 text-white pt-12 pb-6 px-4 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <Logo variant="full" className="text-white" />
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Balance card */}
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white mx-2 p-4 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm opacity-80">Total Balance</p>
              <h2 className="text-3xl font-bold">₹48,550.75</h2>
            </div>
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white"
              asChild
            >
              <Link to="/add-funds">Add Money</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-white/10 rounded-lg">
              <p className="text-sm opacity-80">Payments</p>
              <p className="font-semibold">₹28,550.75</p>
            </div>
            <div className="text-center p-2 bg-white/10 rounded-lg">
              <p className="text-sm opacity-80">Investments</p>
              <p className="font-semibold">₹20,000.00</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Quick Actions Section */}
      <div className="p-4 mt-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path} className="text-center">
              <div className="w-14 h-14 rounded-full bg-paygrow-gray flex items-center justify-center mx-auto mb-1 hover:bg-gray-200 transition-colors">
                {action.icon}
              </div>
              <p className="text-xs">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Investment Summary */}
      <Card className="mx-4 my-6 p-4 paygrow-gradient-green text-white rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Investment Portfolio</h3>
          <Link to="/invest" className="text-xs bg-white/20 px-3 py-1 rounded-full">View All</Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Current Value</p>
            <p className="text-xl font-bold">₹27,840.50</p>
            <p className="text-xs bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">
              +8.4% <span className="opacity-80">all time</span>
            </p>
          </div>
          <div className="h-12 w-24 bg-white/10 rounded-lg">
            {/* Placeholder for a small chart */}
            <div className="h-full w-full flex items-end p-1">
              <div className="h-50% w-2 bg-white rounded-t-sm mx-0.5"></div>
              <div className="h-70% w-2 bg-white rounded-t-sm mx-0.5"></div>
              <div className="h-40% w-2 bg-white rounded-t-sm mx-0.5"></div>
              <div className="h-90% w-2 bg-white rounded-t-sm mx-0.5"></div>
              <div className="h-60% w-2 bg-white rounded-t-sm mx-0.5"></div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Recent Transactions */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <Link to="/transactions" className="text-sm text-paygrow-blue">See All</Link>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  transaction.type === 'payment' 
                    ? 'bg-red-100' 
                    : transaction.type === 'credit' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                }`}>
                  {transaction.type === 'payment' && <CreditCardIcon className="w-5 h-5 text-red-500" />}
                  {transaction.type === 'credit' && <WalletIcon className="w-5 h-5 text-green-500" />}
                  {transaction.type === 'investment' && <BarChartIcon className="w-5 h-5 text-blue-500" />}
                </div>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.amount < 0 
                  ? 'text-red-500' 
                  : 'text-green-500'
              }`}>
                {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;
