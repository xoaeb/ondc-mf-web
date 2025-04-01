
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Info, TrendingUp, Star, ChevronRight, Percent, BarChart4, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Enhanced mock data for mutual funds
const mutualFunds = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 14.2,
    },
    riskLevel: 'Moderate',
    nav: 45.67,
    rating: 5,
    tags: ['Top Performer', 'Popular'],
    aum: '23,458 Cr',
    expenseRatio: 1.8,
    minInvestment: 500,
    trending: true,
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
    riskLevel: 'High',
    nav: 78.34,
    rating: 4,
    tags: ['High Returns'],
    aum: '28,712 Cr',
    expenseRatio: 1.9,
    minInvestment: 1000,
    trending: true,
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
    riskLevel: 'Very High',
    nav: 112.45,
    rating: 4,
    tags: ['Sector Leader'],
    aum: '15,890 Cr',
    expenseRatio: 2.1,
    minInvestment: 500,
    trending: true,
  },
  {
    id: 4,
    name: 'Kotak Equity Hybrid Fund',
    category: 'Hybrid',
    returns: {
      oneYear: 9.8,
      threeYear: 12.4,
      fiveYear: 11.6,
    },
    riskLevel: 'Moderate',
    nav: 34.67,
    rating: 3,
    tags: ['Balanced'],
    aum: '8,456 Cr',
    expenseRatio: 1.7,
    minInvestment: 500,
    trending: false,
  },
  {
    id: 5,
    name: 'ICICI Prudential Value Discovery',
    category: 'Value',
    returns: {
      oneYear: 14.9,
      threeYear: 13.7,
      fiveYear: 12.9,
    },
    riskLevel: 'Moderate',
    nav: 67.23,
    rating: 5,
    tags: ['Value Pick'],
    aum: '19,234 Cr',
    expenseRatio: 1.8,
    minInvestment: 1000,
    trending: false,
  },
  {
    id: 6,
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'ELSS',
    returns: {
      oneYear: 13.2,
      threeYear: 14.5,
      fiveYear: 13.8,
    },
    riskLevel: 'High',
    nav: 45.12,
    rating: 4,
    tags: ['Tax Saving'],
    aum: '12,678 Cr',
    expenseRatio: 1.9,
    minInvestment: 500,
    trending: false,
  },
  {
    id: 7,
    name: 'DSP Equity Opportunities Fund',
    category: 'Multi Cap',
    returns: {
      oneYear: 16.8,
      threeYear: 15.2,
      fiveYear: 14.1,
    },
    riskLevel: 'High',
    nav: 89.76,
    rating: 4,
    tags: ['Diversified'],
    aum: '17,543 Cr',
    expenseRatio: 1.8,
    minInvestment: 500,
    trending: true,
  },
  {
    id: 8,
    name: 'Mirae Asset Large Cap Fund',
    category: 'Large Cap',
    returns: {
      oneYear: 11.9,
      threeYear: 14.8,
      fiveYear: 13.5,
    },
    riskLevel: 'Moderate',
    nav: 65.32,
    rating: 5,
    tags: ['Consistent'],
    aum: '29,876 Cr',
    expenseRatio: 1.7,
    minInvestment: 1000,
    trending: true,
  },
];

// Categories for filter
const categories = [
  'All',
  'Large Cap',
  'Mid Cap',
  'Small Cap',
  'Multi Cap',
  'ELSS',
  'Hybrid',
  'Value',
];

const MutualFundListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortedFunds, setSortedFunds] = useState(mutualFunds);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let filtered = mutualFunds.filter(fund => 
      fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Filter based on active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(fund => {
        if (activeTab === 'high-return') return fund.returns.oneYear > 15;
        if (activeTab === 'low-risk') return fund.riskLevel === 'Low' || fund.riskLevel === 'Moderate';
        if (activeTab === 'tax-saving') return fund.category === 'ELSS';
        if (activeTab === 'trending') return fund.trending;
        return true;
      });
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(fund => fund.category === selectedCategory);
    }
    
    // Sort by returns (default)
    filtered.sort((a, b) => b.returns.oneYear - a.returns.oneYear);
    
    setSortedFunds(filtered);
  }, [searchQuery, activeTab, selectedCategory]);
  
  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-500 text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/invest" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Explore Mutual Funds</h1>
          <p className="text-sm text-white/80">Discover high-performing funds with low fees</p>
        </div>
      </div>
      
      {/* Search & Filters */}
      <div className="px-4 py-4 bg-white sticky top-0 z-10 border-b shadow-sm">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-gray-100 border-gray-200"
            placeholder="Search funds by name or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full mb-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="high-return">High Return</TabsTrigger>
            <TabsTrigger value="low-risk">Low Risk</TabsTrigger>
            <TabsTrigger value="tax-saving">Tax Saver</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-paygrow-blue text-white" 
                    : "bg-white"
                }`}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mutual Funds List */}
      <div className="flex-1 px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">{sortedFunds.length} funds found</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilterModal(!showFilterModal)}
            className="bg-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter & Sort
          </Button>
        </div>
        
        {loading ? (
          // Skeleton loaders for funds
          <div className="space-y-4">
            {[1, 2, 3].map((idx) => (
              <Card key={idx} className="p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedFunds.map(fund => (
              <Link to={`/invest/mutual-fund/${fund.id}`} key={fund.id}>
                <Card className="p-4 hover:shadow-md transition-shadow border border-gray-200 bg-white">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-paygrow-blue">{fund.name}</h3>
                        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                      
                      <div className="flex items-center flex-wrap mt-1">
                        <p className="text-xs text-gray-500 mr-2">{fund.category}</p>
                        <div className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(fund.riskLevel)}`}>
                          {fund.riskLevel} Risk
                        </div>
                        
                        {fund.trending && (
                          <Badge variant="outline" className="ml-2 bg-red-50 text-red-600 border-red-200 text-[10px]">
                            <TrendingUp className="w-3 h-3 mr-1" /> Trending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center mb-1">
                      <div className="text-xs text-gray-500 w-16">Rating</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star 
                            key={index}
                            className={`h-3.5 w-3.5 ${
                              index < fund.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-1">
                      <div className="text-xs text-gray-500 w-16">Returns</div>
                      <div className={`text-sm font-medium flex items-center ${
                          fund.returns.oneYear > 15 
                            ? 'text-green-600' 
                            : fund.returns.oneYear > 10 
                              ? 'text-green-500'
                              : 'text-orange-600'
                        }`}
                      >
                        {fund.returns.oneYear}% <span className="text-xs text-gray-500 ml-1">(1Y)</span>
                        <span className="ml-3 text-xs text-gray-500">{fund.returns.threeYear}% (3Y)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-1">
                      <div className="text-xs text-gray-500 w-16">Min Invest</div>
                      <div className="text-sm">₹{fund.minInvestment}</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-xs text-gray-500 w-16">Expense</div>
                      <div className="text-sm flex items-center">
                        <Percent className="h-3 w-3 mr-1" />
                        {fund.expenseRatio}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button className="flex-1 bg-paygrow-green hover:bg-green-600">
                      Invest
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Compare
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
            
            {sortedFunds.length === 0 && (
              <div className="text-center py-10">
                <Info className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No mutual funds found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Filter Modal - Would be better as a proper modal component */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-2xl w-full p-5 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Filter & Sort</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setShowFilterModal(false)}
              >
                ✕
              </Button>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Sort By</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Returns (High to Low)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Newest First
                </Button>
                <Button variant="outline" className="justify-start">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  AUM (High to Low)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Rating (High to Low)
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Risk Level</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">Low</Button>
                <Button variant="outline" className="justify-start">Moderate</Button>
                <Button variant="outline" className="justify-start">High</Button>
                <Button variant="outline" className="justify-start">Very High</Button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                className="w-full bg-paygrow-blue"
                onClick={() => setShowFilterModal(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MutualFundListScreen;
