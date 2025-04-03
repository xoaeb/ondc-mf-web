import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Wallet, TrendingUp, Calculator, Crown, ArrowRight, Menu, ChevronRight, Bell, BarChart4, Percent, TrendingDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BottomNavigation from '@/components/BottomNavigation';
import InvestmentInsights from '@/components/invest/InvestmentInsights';
import FundCategoryScroller from '@/components/invest/FundCategoryScroller';
import FeaturedFundsSection from '@/components/invest/FeaturedFundsSection';
import MarketIndicators from '@/components/invest/MarketIndicators';
import { motion } from "@/components/ui/motion";

// Quick access buttons data
const quickAccessItems = [
  { label: 'All Funds', icon: <Menu className="h-5 w-5" />, route: '/invest/mutual-funds' },
  { label: 'Trending', icon: <TrendingUp className="h-5 w-5" />, route: '/invest/mutual-funds?category=trending' },
  { label: 'Portfolio', icon: <Wallet className="h-5 w-5" />, route: '/invest/portfolio' },
  { label: 'Calculator', icon: <Calculator className="h-5 w-5" />, route: '/sip-calculator' },
];

// Market indices mock data
const marketIndices = [
  {
    name: 'NIFTY 50',
    value: '22,650.75',
    change: 0.42,
  },
  {
    name: 'SENSEX',
    value: '74,572.30',
    change: 0.38,
  },
  {
    name: 'BANK NIFTY',
    value: '48,124.80',
    change: -0.21,
  }
];

const InvestScreen = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'portfolio'>('explore');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-paygrow-blue to-blue-700 text-white pt-12 pb-12 px-4 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full -translate-x-16 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-x-8 translate-y-16 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1000x500/?finance,chart')] bg-cover opacity-10 mix-blend-overlay"></div>
          
          {/* Animated gradient line */}
          <svg className="absolute bottom-0 left-0 w-full h-24 fill-none" viewBox="0 0 400 150" preserveAspectRatio="none">
            <motion.path 
              d="M0,100 C50,130 150,50 200,80 C250,110 300,70 400,100 L400,150 L0,150 Z"
              fill="url(#gradient)"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Header content */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <motion.h1 
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Invest
              </motion.h1>
              <motion.p 
                className="text-white/80 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Grow your wealth with mutual funds
              </motion.p>
            </div>
            <div className="flex items-center">
              <Link to="/invest/portfolio" className="relative bg-white/10 p-2 rounded-full mr-4 hover:bg-white/20 transition-all">
                <Wallet className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-700"></span>
              </Link>
              <Link to="/notifications" className="relative bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-blue-700"></span>
              </Link>
            </div>
          </div>

          {/* Market Stats Bar */}
          <motion.div 
            className="flex justify-between py-2 px-3 bg-white/10 backdrop-blur-sm rounded-lg mb-4 overflow-x-auto scrollbar-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mr-5">
              <BarChart4 className="h-4 w-4 text-green-400 mr-2" />
              <div>
                <span className="text-xs text-white/70">Sensex</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">74,572</span>
                  <span className="text-xs text-green-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> 0.38%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mr-5">
              <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
              <div>
                <span className="text-xs text-white/70">Nifty</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">22,650</span>
                  <span className="text-xs text-green-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> 0.42%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Percent className="h-4 w-4 text-red-400 mr-2" />
              <div>
                <span className="text-xs text-white/70">Bank Nifty</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">48,124</span>
                  <span className="text-xs text-red-400 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-0.5" /> 0.21%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* <motion.div 
            className="relative mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
            <Input
              placeholder="Search mutual funds, stocks..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 backdrop-blur-md shadow-sm hover:bg-white/20 transition-colors rounded-xl h-11"
            />
          </motion.div> */}
        </div>

        <motion.div
          className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-medium">Your Portfolio</h3>
            <Link to="/invest/portfolio" className="text-xs text-white/80 flex items-center">
              View Details <ChevronRight className="h-3 w-3 ml-0.5" />
            </Link>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-white/70">Current Value</p>
              <p className="text-xl font-bold">₹32,450</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded-full">+8.64%</span>
                <span className="text-xs text-white/70 ml-2">+₹2,580</span>
              </div>
            </div>
            {/* <div className="w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="62.8" />
              </svg>
            </div> */}
          </div>
        </motion.div>

        {/* Quick access buttons */}
      </div>
        <div className="mt-2 px-4">
          <Card className="grid grid-cols-4 gap-1 p-1 shadow-sm border-0 rounded-xl overflow-hidden">
            {quickAccessItems.map((item, index) => (
              <Link to={item.route} key={index} className="text-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-50 text-paygrow-blue p-2 rounded-full mb-1">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              </Link>
            ))}
          </Card>
        </div>
      
      {/* Main Content */}
      <div className="mt-0 px-4">
        <div className="flex justify-between mb-6">
          <div 
            className={`flex-1 text-center py-3 font-medium ${activeTab === 'explore' ? 'text-paygrow-blue border-b-2 border-paygrow-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore
          </div>
          <div 
            className={`flex-1 text-center py-3 font-medium ${activeTab === 'portfolio' ? 'text-paygrow-blue border-b-2 border-paygrow-blue' : 'text-gray-500'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </div>
        </div>
        
        {activeTab === 'explore' ? (
          <div className="space-y-6">
            {/* <Link to="/invest/mutual-funds?category=featured">
              <motion.div 
                className="glass-card bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5 overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Crown className="h-6 w-6 text-yellow-300" />
                  <h3 className="text-lg font-bold">Hand-picked Top Funds</h3>
                </div>
                <p className="text-sm text-white/80 mb-3">Pre-screened quality funds with consistent performance</p>
                <Button className="bg-white text-blue-700 hover:bg-white/90">
                  View Top Funds <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <div className="absolute right-0 bottom-0 opacity-20">
                  <TrendingUp className="h-32 w-32 -rotate-12 translate-x-6 translate-y-6" />
                </div>
              </motion.div>
            </Link> */}
            
            <MarketIndicators indices={marketIndices} />
            
            <FundCategoryScroller />
            
            <FeaturedFundsSection />
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link to="/invest/featured">
                <motion.div
                  className="p-4 bg-gradient-to-br from-paygrow-blue to-blue-700 text-white rounded-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold mb-1">Featured Collections</h3>
                  <p className="text-xs text-white/80">Best funds for different goals</p>
                </motion.div>
              </Link>
              <Link to="/invest/tax-planning">
                <motion.div
                  className="p-4 bg-gradient-to-br from-paygrow-green to-green-700 text-white rounded-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold mb-1">Tax Planning</h3>
                  <p className="text-xs text-white/80">Save tax with ELSS funds</p>
                </motion.div>
              </Link>
            </div>
            
          </div>
        ) : (
          <InvestmentInsights />
        )}
      </div>
      
      <BottomNavigation activeTab="invest" />
    </div>
  );
};

export default InvestScreen;
