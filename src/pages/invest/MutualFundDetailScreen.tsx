
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, LineChart, TrendingUp, Calendar, Download, BarChart, ArrowUpRight, ArrowDownRight, Share2, BookmarkPlus, Percent, Clock, PieChart } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/BottomNavigation';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart as RePieChart, Pie, Cell } from 'recharts';

// Mock data for the specific mutual fund
const fundDetails = {
  id: 1,
  name: 'Axis Bluechip Fund',
  category: 'Large Cap',
  description: 'An open-ended equity scheme predominantly investing in large cap stocks. The fund aims to achieve long-term capital appreciation by investing in a diversified portfolio primarily consisting of equity and equity related instruments of large-cap companies.',
  riskLevel: 'Moderate',
  nav: 45.67,
  navDate: '07 Jul 2025',
  aum: '23,458 Cr',
  expenseRatio: '1.8%',
  minInvestment: '500',
  sipMinimum: '500',
  exitLoad: '1% for redemption within 1 year',
  fundManager: 'Shreyash Devalkar',
  launchDate: '28 Jan 2013',
  benchmark: 'Nifty 50 TRI',
  returns: {
    oneMonth: 2.4,
    threeMonth: 5.7,
    sixMonth: 8.3,
    oneYear: 12.5,
    threeYear: 15.8,
    fiveYear: 14.2,
  },
  benchmarkReturns: {
    oneMonth: 2.0,
    threeMonth: 4.9,
    sixMonth: 7.8,
    oneYear: 11.2,
    threeYear: 13.6,
    fiveYear: 12.8,
  },
  holdingTypes: [
    { type: 'Equity', percentage: 97.5 },
    { type: 'Debt', percentage: 1.2 },
    { type: 'Cash & Others', percentage: 1.3 },
  ],
  topHoldings: [
    { name: 'HDFC Bank', percentage: 9.8, change: 1.2 },
    { name: 'ICICI Bank', percentage: 8.7, change: 0.7 },
    { name: 'TCS', percentage: 7.5, change: -0.5 },
    { name: 'Reliance Industries', percentage: 7.2, change: 1.8 },
    { name: 'Infosys', percentage: 6.8, change: -0.3 },
    { name: 'Axis Bank', percentage: 5.4, change: 0.9 },
    { name: 'Kotak Mahindra Bank', percentage: 4.9, change: 0.3 },
    { name: 'L&T Ltd', percentage: 4.5, change: 1.1 },
  ],
  sectorAllocation: [
    { name: 'Financial Services', value: 35.6 },
    { name: 'IT', value: 18.2 },
    { name: 'Oil & Gas', value: 12.4 },
    { name: 'Consumer Goods', value: 9.7 },
    { name: 'Automobile', value: 8.3 },
    { name: 'Others', value: 15.8 },
  ],
  navHistory: [
    { date: 'Jan', nav: 38.45 },
    { date: 'Feb', nav: 39.12 },
    { date: 'Mar', nav: 39.87 },
    { date: 'Apr', nav: 41.23 },
    { date: 'May', nav: 42.67 },
    { date: 'Jun', nav: 44.15 },
    { date: 'Jul', nav: 45.67 },
  ],
};

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#839192'];

const MutualFundDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  // In a real app, you'd fetch the fund details based on the ID
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddToWatchlist = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from watchlist" : "Added to watchlist",
      description: isFavorite 
        ? `${fundDetails.name} has been removed from your watchlist.` 
        : `${fundDetails.name} has been added to your watchlist.`,
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "Fund details link has been copied to clipboard.",
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="glass-card animate-pulse mb-4 h-16"></div>
          <div className="h-3 bg-gray-200 rounded-full w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full w-1/2 mb-6"></div>
          <div className="h-40 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-24 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-24 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col pb-20 bg-gray-50 relative">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-14 pb-6 px-5 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <Link to="/invest/mutual-funds" className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 transition-all"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-10 w-10 rounded-full ${
                isFavorite ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-white/15 hover:bg-white/25'
              } transition-all`}
              onClick={handleAddToWatchlist}
            >
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-3">
          <h1 className="text-2xl font-bold">{fundDetails.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none font-medium">
              {fundDetails.category}
            </Badge>
            <Badge className={`
              ${fundDetails.riskLevel === 'Low' ? 'bg-green-500/20 text-green-50' : 
                fundDetails.riskLevel === 'Moderate' ? 'bg-yellow-500/20 text-yellow-50' : 
                'bg-red-500/20 text-red-50'} 
              hover:bg-white/30 border-none font-medium`}
            >
              {fundDetails.riskLevel} Risk
            </Badge>
          </div>
        </div>
        
        <div className="glass-card mt-5 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-white/80 font-medium">Current NAV</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">₹{fundDetails.nav}</p>
                <p className="text-xs ml-2 text-white/80">{fundDetails.navDate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/80 font-medium">1Y Returns</p>
              <p className="text-xl font-medium flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {fundDetails.returns.oneYear}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="bg-white px-5 py-4 flex justify-between shadow-sm -mt-5 mx-4 rounded-xl z-10">
        <Button 
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-[48%] rounded-xl shadow-md"
          onClick={() => navigate(`/invest/sip-setup/${id}`)}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Start SIP
        </Button>
        <Button 
          className="bg-gradient-to-r from-paygrow-blue to-blue-600 hover:from-blue-600 hover:to-paygrow-blue w-[48%] rounded-xl shadow-md"
          onClick={() => navigate(`/invest/sip-setup/${id}?type=onetime`)}
        >
          One-time Invest
        </Button>
      </div>
      
      {/* Fund Details Tabs */}
      <div className="flex-1 px-4 mt-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full p-1 h-12 bg-gray-100 rounded-xl mb-4">
            <TabsTrigger 
              value="overview" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-paygrow-blue data-[state=active]:shadow-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="returns" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-paygrow-blue data-[state=active]:shadow-sm"
            >
              Returns
            </TabsTrigger>
            <TabsTrigger 
              value="holdings" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-paygrow-blue data-[state=active]:shadow-sm"
            >
              Holdings
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-paygrow-blue data-[state=active]:shadow-sm"
            >
              Docs
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="p-0 mt-0">
            <Card className="p-5 mb-4 border border-gray-200 rounded-xl shadow-sm bg-white">
              <h3 className="font-semibold text-lg mb-3">About the Fund</h3>
              <p className={`text-sm text-gray-600 leading-relaxed ${expandedDescription ? '' : 'line-clamp-3'}`}>
                {fundDetails.description}
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="text-paygrow-blue p-0 h-auto text-xs mt-1 font-medium"
                onClick={() => setExpandedDescription(!expandedDescription)}
              >
                {expandedDescription ? 'Show less' : 'Read more'}
              </Button>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <span className="text-xs text-gray-500 block">Fund Category</span>
                  <span className="text-sm font-medium block mt-1">{fundDetails.category}</span>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">Fund Size (AUM)</span>
                  <span className="text-sm font-medium block mt-1">₹{fundDetails.aum}</span>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">Expense Ratio</span>
                  <span className="text-sm font-medium block mt-1">{fundDetails.expenseRatio}</span>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">Min Investment</span>
                  <span className="text-sm font-medium block mt-1">₹{fundDetails.minInvestment}</span>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">SIP Minimum</span>
                  <span className="text-sm font-medium block mt-1">₹{fundDetails.sipMinimum}</span>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">Exit Load</span>
                  <span className="text-sm font-medium block mt-1">{fundDetails.exitLoad}</span>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">Fund Manager</span>
                  <span className="text-sm font-medium block mt-1">{fundDetails.fundManager}</span>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">Launch Date</span>
                  <span className="text-sm font-medium block mt-1">{fundDetails.launchDate}</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 mb-4 border border-gray-200 rounded-xl shadow-sm bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">NAV Chart (6 Months)</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" /> 
                  +{((fundDetails.navHistory[fundDetails.navHistory.length - 1].nav / fundDetails.navHistory[0].nav - 1) * 100).toFixed(2)}%
                </Badge>
              </div>
              
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={fundDetails.navHistory}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tick={{fontSize: 12}} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{fontSize: 12}} 
                      tickLine={false}
                      axisLine={false}
                      domain={['dataMin - 1', 'dataMax + 1']}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                    <Tooltip 
                      formatter={(value) => [`₹${value}`, 'NAV']}
                      labelFormatter={(label) => `Date: ${label}`}
                      contentStyle={{borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="nav" 
                      stroke="#0066FF" 
                      fillOpacity={1} 
                      fill="url(#navGradient)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
          
          {/* Returns Tab */}
          <TabsContent value="returns" className="p-0 mt-0">
            <Card className="p-5 mb-4 border border-gray-200 rounded-xl shadow-sm bg-white">
              <h3 className="font-semibold text-lg mb-3">Returns Comparison</h3>
              <p className="text-xs text-gray-500 mb-4">
                Fund returns vs Benchmark ({fundDetails.benchmark})
              </p>
              
              <div className="space-y-6">
                {Object.entries(fundDetails.returns).map(([period, value], index) => {
                  const benchmarkValue = Object.values(fundDetails.benchmarkReturns)[index];
                  const difference = (value - benchmarkValue).toFixed(2);
                  const isOutperforming = value > benchmarkValue;
                  
                  return (
                    <div key={period} className="mb-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          {period === 'oneMonth' && '1 Month'}
                          {period === 'threeMonth' && '3 Months'}
                          {period === 'sixMonth' && '6 Months'}
                          {period === 'oneYear' && '1 Year'}
                          {period === 'threeYear' && '3 Years'}
                          {period === 'fiveYear' && '5 Years'}
                        </span>
                        <div className="flex items-center text-sm">
                          <span className="mr-6 text-gray-500">
                            {benchmarkValue}%
                          </span>
                          <span className={`font-medium ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {value}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Comparative progress bars */}
                      <div className="relative h-8">
                        {/* Benchmark */}
                        <div className="absolute top-0 left-0 right-0 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-300 rounded-full"
                            style={{ width: `${Math.max(parseFloat(benchmarkValue.toFixed(1)), 0) * 5}%` }}
                          ></div>
                        </div>
                        
                        {/* Fund */}
                        <div className="absolute top-4 left-0 right-0 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-paygrow-blue rounded-full"
                            style={{ width: `${Math.max(parseFloat(value.toFixed(1)), 0) * 5}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs mt-1">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
                          <span className="text-gray-500">Benchmark</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-paygrow-blue mr-1"></div>
                          <span className="text-gray-500">Fund</span>
                        </div>
                        <div className={isOutperforming ? "text-green-600" : "text-red-600"}>
                          {isOutperforming ? "+" : ""}{difference}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            
            <div className="p-4 bg-blue-50 mb-4 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-700 font-medium mb-1">Past Performance Note</p>
                  <p className="text-xs text-blue-600">
                    Past performance is not indicative of future results. Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Holdings Tab */}
          <TabsContent value="holdings" className="p-0 mt-0">
            <Card className="p-5 mb-4 border border-gray-200 rounded-xl shadow-sm bg-white">
              <h3 className="font-semibold text-lg mb-4">Asset Allocation</h3>
              
              <div className="flex items-center h-48">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={fundDetails.holdingTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="percentage"
                        nameKey="type"
                      >
                        {fundDetails.holdingTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-1/2">
                  {fundDetails.holdingTypes.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-sm mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{holding.type}</span>
                      </div>
                      <span className="text-sm font-medium">{holding.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            
            <Card className="p-5 mb-4 border border-gray-200 rounded-xl shadow-sm bg-white">
              <h3 className="font-semibold text-lg mb-4">Sector Allocation</h3>
              
              <div className="flex items-center h-48">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={fundDetails.sectorAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                      >
                        {fundDetails.sectorAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-1/2">
                  {fundDetails.sectorAllocation.map((sector, index) => (
                    <div key={index} className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-sm mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{sector.name}</span>
                      </div>
                      <span className="text-sm font-medium">{sector.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            
            <Card className="p-5 mb-4 border border-gray-200 rounded-xl shadow-sm bg-white">
              <h3 className="font-semibold text-lg mb-4">Top Holdings</h3>
              
              <div className="space-y-4">
                {fundDetails.topHoldings.map((holding, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-sm font-medium bg-paygrow-blue/10 text-paygrow-blue w-6 h-6 flex items-center justify-center rounded-full mr-3">{index + 1}</span>
                      <span className="text-sm font-medium">{holding.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-3">{holding.percentage}%</span>
                      <span className={`text-xs py-1 px-2 rounded-full ${holding.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-center`}>
                        {holding.change > 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-0.5" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-0.5" />
                        )}
                        {Math.abs(holding.change)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="p-0 mt-0">
            <Card className="divide-y mb-4 border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
              <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-medium">Scheme Information Document</h3>
                  <p className="text-xs text-gray-500">Updated: June 2025</p>
                </div>
                <Button variant="outline" size="sm" className="ml-2 flex-shrink-0 rounded-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-medium">Key Information Memorandum</h3>
                  <p className="text-xs text-gray-500">Updated: May 2025</p>
                </div>
                <Button variant="outline" size="sm" className="ml-2 flex-shrink-0 rounded-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-medium">Factsheet</h3>
                  <p className="text-xs text-gray-500">Updated: July 2025</p>
                </div>
                <Button variant="outline" size="sm" className="ml-2 flex-shrink-0 rounded-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-medium">Annual Report</h3>
                  <p className="text-xs text-gray-500">Financial Year 2024-25</p>
                </div>
                <Button variant="outline" size="sm" className="ml-2 flex-shrink-0 rounded-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
            
            <div className="p-4 bg-gray-50 mb-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Info className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Fund Manager Report</span>
                </div>
                <Badge variant="outline" className="bg-gray-100">
                  Coming Soon
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Invest Buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 flex space-x-4 shadow-md">
        <Button 
          variant="outline" 
          className="flex-1 rounded-xl border-gray-300"
          onClick={() => navigate(`/invest/sip-setup/${id}`)}
        >
          <Calendar className="h-5 w-5 mr-2" />
          Start SIP ₹{fundDetails.sipMinimum}
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl shadow-md"
          onClick={() => navigate(`/invest/sip-setup/${id}?type=onetime`)}
        >
          One-time ₹{fundDetails.minInvestment}
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default MutualFundDetailScreen;
