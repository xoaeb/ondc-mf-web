
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Bell, Filter, PlusCircle } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import InvestmentInsights from '@/components/invest/InvestmentInsights';
import InvestmentCard from '@/components/invest/InvestmentCard';
import { Link } from 'react-router-dom';

// Sample investment data
const investments = [
  {
    id: 'mf1',
    name: 'Axis Bluechip Fund Direct Growth',
    type: 'mutual_fund' as const,
    units: 452.387,
    purchaseValue: 12000,
    currentValue: 14500,
    change: 2500,
    changePercentage: 20.83,
    lastUpdated: '10 mins ago'
  },
  {
    id: 'mf2',
    name: 'Parag Parikh Flexi Cap Fund',
    type: 'mutual_fund' as const,
    units: 235.721,
    purchaseValue: 8000,
    currentValue: 9200,
    change: 1200,
    changePercentage: 15.0,
    lastUpdated: '10 mins ago'
  },
  {
    id: 'gold1',
    name: 'Digital Gold',
    type: 'gold' as const,
    units: 2.5,
    purchaseValue: 10000,
    currentValue: 11250,
    change: 1250,
    changePercentage: 12.5,
    lastUpdated: '5 mins ago'
  },
  {
    id: 'fd1',
    name: 'HDFC Fixed Deposit',
    type: 'fd' as const,
    purchaseValue: 5000,
    currentValue: 5250,
    change: 250,
    changePercentage: 5.0,
    lastUpdated: '1 hour ago'
  }
];

const InvestmentDashboard: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-5 px-4 rounded-b-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Investments</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-white p-0 h-9 w-9">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white p-0 h-9 w-9">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content with tabs */}
      <Tabs defaultValue="dashboard" className="mt-4">
        <div className="px-4">
          <TabsList className="grid grid-cols-3 bg-gray-100 p-1">
            <TabsTrigger value="dashboard" className="text-sm">Dashboard</TabsTrigger>
            <TabsTrigger value="investments" className="text-sm">Investments</TabsTrigger>
            <TabsTrigger value="explore" className="text-sm">Explore</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-2">
          <InvestmentInsights />
        </TabsContent>
        
        {/* Investments Tab */}
        <TabsContent value="investments" className="mt-2">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Your Investments</h2>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-1" /> Filter
              </Button>
            </div>
            
            <div className="space-y-3">
              {investments.map((investment) => (
                <InvestmentCard
                  key={investment.id}
                  {...investment}
                />
              ))}
            </div>
            
            {/* Add new investment button */}
            <div className="mt-6">
              <Button 
                className="w-full bg-gradient-to-r from-paygrow-blue to-blue-600 hover:from-blue-600 hover:to-paygrow-blue text-white"
                asChild
              >
                <Link to="/invest/mutual-funds">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add New Investment
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Explore Tab */}
        <TabsContent value="explore" className="mt-2">
          <div className="p-4 space-y-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-xl"></div>
              <div className="relative p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold mb-2">Explore Investments</h3>
                <p className="text-gray-600 text-sm mb-4">Find the best investment options across different categories</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/invest/mutual-funds" className="block p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="text-xl mb-2">📊</div>
                    <p className="font-medium text-gray-900">Mutual Funds</p>
                    <p className="text-xs text-gray-500 mt-1">500+ funds to choose from</p>
                  </Link>
                  
                  <Link to="/digital-gold" className="block p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="text-xl mb-2">🏆</div>
                    <p className="font-medium text-gray-900">Digital Gold</p>
                    <p className="text-xs text-gray-500 mt-1">99.9% pure gold</p>
                  </Link>
                  
                  <Link to="/fixed-deposits" className="block p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="text-xl mb-2">🏦</div>
                    <p className="font-medium text-gray-900">Fixed Deposits</p>
                    <p className="text-xs text-gray-500 mt-1">High interest rates</p>
                  </Link>
                  
                  <Link to="/stocks" className="block p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="text-xl mb-2">📈</div>
                    <p className="font-medium text-gray-900">Stocks</p>
                    <p className="text-xs text-gray-500 mt-1">Zero brokerage</p>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Calculators & Tools */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Calculators & Tools</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <Link to="/sip-calculator">
                  <div className="p-3 bg-gradient-to-r from-paygrow-blue/10 to-blue-200/30 rounded-lg border border-blue-100">
                    <p className="font-medium">SIP Calculator</p>
                    <p className="text-xs text-gray-600 mt-1">Plan your investments</p>
                  </div>
                </Link>
                
                <Link to="/invest/tax-planning">
                  <div className="p-3 bg-gradient-to-r from-paygrow-green/10 to-green-200/30 rounded-lg border border-green-100">
                    <p className="font-medium">Tax Planner</p>
                    <p className="text-xs text-gray-600 mt-1">Save on taxes</p>
                  </div>
                </Link>
                
                <Link to="/invest/compare">
                  <div className="p-3 bg-gradient-to-r from-purple-100/30 to-purple-200/30 rounded-lg border border-purple-100">
                    <p className="font-medium">Compare Funds</p>
                    <p className="text-xs text-gray-600 mt-1">Find the best option</p>
                  </div>
                </Link>
                
                <Link to="/invest/goal-planning">
                  <div className="p-3 bg-gradient-to-r from-amber-100/30 to-amber-200/30 rounded-lg border border-amber-100">
                    <p className="font-medium">Goal Planner</p>
                    <p className="text-xs text-gray-600 mt-1">Plan for your future</p>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Featured Products */}
            <div className="p-4 bg-paygrow-blue/10 rounded-xl border border-blue-100">
              <h3 className="font-semibold mb-2">Featured Products</h3>
              <p className="text-sm text-gray-600 mb-3">Specially curated high performing investments</p>
              
              <Button className="w-full bg-paygrow-blue text-white" asChild>
                <Link to="/invest/featured">Explore Now</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <BottomNavigation />
    </div>
  );
};

export default InvestmentDashboard;
