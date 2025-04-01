
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, SlidersHorizontal, X, Check, ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import BottomNavigation from '@/components/BottomNavigation';

// Mock data - same as MutualFundListScreen
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
    amc: 'Axis Mutual Fund'
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
    amc: 'HDFC Mutual Fund'
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
    amc: 'SBI Mutual Fund'
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
    amc: 'Kotak Mutual Fund'
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
    amc: 'ICICI Prudential'
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
    amc: 'Aditya Birla Sun Life'
  },
];

const FundScreenerScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [filteredFunds, setFilteredFunds] = useState(mutualFunds);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<string[]>([]);
  const [returnRange, setReturnRange] = useState([0, 25]);
  const [expenseRatioRange, setExpenseRatioRange] = useState([0, 3]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [minInvestmentMax, setMinInvestmentMax] = useState<number | null>(null);
  const [selectedAmcs, setSelectedAmcs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('returns-high');
  
  // Unique values for filters
  const categories = Array.from(new Set(mutualFunds.map(fund => fund.category)));
  const riskLevels = Array.from(new Set(mutualFunds.map(fund => fund.riskLevel)));
  const amcs = Array.from(new Set(mutualFunds.map(fund => fund.amc)));
  
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
      fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.amc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(fund => selectedCategories.includes(fund.category));
    }
    
    // Apply risk level filter
    if (selectedRiskLevels.length > 0) {
      filtered = filtered.filter(fund => selectedRiskLevels.includes(fund.riskLevel));
    }
    
    // Apply return range filter
    filtered = filtered.filter(
      fund => fund.returns.oneYear >= returnRange[0] && fund.returns.oneYear <= returnRange[1]
    );
    
    // Apply expense ratio filter
    filtered = filtered.filter(
      fund => fund.expenseRatio >= expenseRatioRange[0] && fund.expenseRatio <= expenseRatioRange[1]
    );
    
    // Apply rating filter
    if (selectedRating !== null) {
      filtered = filtered.filter(fund => fund.rating >= selectedRating);
    }
    
    // Apply min investment filter
    if (minInvestmentMax !== null) {
      filtered = filtered.filter(fund => fund.minInvestment <= minInvestmentMax);
    }
    
    // Apply AMC filter
    if (selectedAmcs.length > 0) {
      filtered = filtered.filter(fund => selectedAmcs.includes(fund.amc));
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'returns-high':
        filtered.sort((a, b) => b.returns.oneYear - a.returns.oneYear);
        break;
      case 'returns-low':
        filtered.sort((a, b) => a.returns.oneYear - b.returns.oneYear);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-high':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'expense-low':
        filtered.sort((a, b) => a.expenseRatio - b.expenseRatio);
        break;
      default:
        break;
    }
    
    setFilteredFunds(filtered);
  }, [
    searchQuery, 
    selectedCategories, 
    selectedRiskLevels, 
    returnRange, 
    expenseRatioRange, 
    selectedRating,
    minInvestmentMax,
    selectedAmcs,
    sortBy
  ]);
  
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRiskLevels([]);
    setReturnRange([0, 25]);
    setExpenseRatioRange([0, 3]);
    setSelectedRating(null);
    setMinInvestmentMax(null);
    setSelectedAmcs([]);
    setSortBy('returns-high');
  };
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleRiskLevel = (level: string) => {
    setSelectedRiskLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  const toggleAmc = (amc: string) => {
    setSelectedAmcs(prev => 
      prev.includes(amc)
        ? prev.filter(a => a !== amc)
        : [...prev, amc]
    );
  };
  
  const getTotalActiveFilters = () => {
    let count = 0;
    if (selectedCategories.length > 0) count++;
    if (selectedRiskLevels.length > 0) count++;
    if (returnRange[0] > 0 || returnRange[1] < 25) count++;
    if (expenseRatioRange[0] > 0 || expenseRatioRange[1] < 3) count++;
    if (selectedRating !== null) count++;
    if (minInvestmentMax !== null) count++;
    if (selectedAmcs.length > 0) count++;
    return count;
  };
  
  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index}
        className={`h-3.5 w-3.5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`} 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4 flex flex-col">
        <div className="flex items-center mb-4">
          <Link to="/invest" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Fund Screener</h1>
        </div>
        <p className="text-white/80 mb-6">Find the perfect fund that matches your criteria</p>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            placeholder="Search by fund name, category, or AMC"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Filter Summary & Sort */}
      <div className="px-4 py-4 bg-white sticky top-0 z-10 border-b shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
              onClick={() => setShowFilterDrawer(true)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {getTotalActiveFilters() > 0 && (
                <Badge className="ml-1 bg-paygrow-blue">{getTotalActiveFilters()}</Badge>
              )}
            </Button>
            
            <div className="ml-3 flex flex-wrap gap-2">
              {selectedCategories.map(category => (
                <Badge key={category} variant="outline" className="flex items-center">
                  {category}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => toggleCategory(category)}
                  />
                </Badge>
              ))}
              
              {selectedRiskLevels.map(level => (
                <Badge key={level} variant="outline" className="flex items-center">
                  {level} Risk
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => toggleRiskLevel(level)}
                  />
                </Badge>
              ))}
              
              {(returnRange[0] > 0 || returnRange[1] < 25) && (
                <Badge variant="outline" className="flex items-center">
                  Returns: {returnRange[0]}%-{returnRange[1]}%
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setReturnRange([0, 25])}
                  />
                </Badge>
              )}
            </div>
          </div>
          
          <div className="relative">
            <select
              className="appearance-none pl-2 pr-8 py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="returns-high">Returns: High to Low</option>
              <option value="returns-low">Returns: Low to High</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="rating-high">Rating: High to Low</option>
              <option value="expense-low">Expense: Low to High</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{filteredFunds.length} funds found</p>
          
          {getTotalActiveFilters() > 0 && (
            <Button 
              variant="link" 
              size="sm" 
              className="text-red-600 p-0 h-auto"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Results List */}
      <div className="flex-1 px-4 py-4">
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
            {filteredFunds.map(fund => (
              <Link to={`/invest/mutual-fund/${fund.id}`} key={fund.id}>
                <Card className="p-4 hover:shadow-md transition-shadow border border-gray-200 bg-white">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-paygrow-blue">{fund.name}</h3>
                      </div>
                      
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-gray-500 mr-2">{fund.amc}</p>
                        <div className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(fund.riskLevel)}`}>
                          {fund.riskLevel} Risk
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`text-sm font-medium flex items-center ${
                        fund.returns.oneYear > 15 
                          ? 'text-green-600' 
                          : fund.returns.oneYear > 10 
                            ? 'text-green-500'
                            : 'text-orange-600'
                      }`}>
                        {fund.returns.oneYear}% <span className="text-xs text-gray-500 ml-1">(1Y)</span>
                      </div>
                      <div className="flex mt-1">{renderStars(fund.rating)}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">3Y Returns</p>
                      <p className="text-sm font-medium">{fund.returns.threeYear}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium">{fund.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Min Invest</p>
                      <p className="text-sm font-medium">₹{fund.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Expense</p>
                      <p className="text-sm font-medium">{fund.expenseRatio}%</p>
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
            
            {filteredFunds.length === 0 && (
              <div className="text-center py-10">
                <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No funds match your criteria</p>
                <p className="text-sm text-gray-400">Try adjusting your filters</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Filter Drawer */}
      {showFilterDrawer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="w-full md:w-96 bg-white ml-auto h-full overflow-y-auto animate-slide-in-right">
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filter Funds</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => setShowFilterDrawer(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-3">Fund Category</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <label 
                      key={category}
                      className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${
                        selectedCategories.includes(category)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <Checkbox 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="data-[state=checked]:bg-blue-500"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Risk Level Filter */}
              <div>
                <h3 className="font-medium mb-3">Risk Level</h3>
                <div className="grid grid-cols-2 gap-2">
                  {riskLevels.map((level) => (
                    <label 
                      key={level}
                      className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${
                        selectedRiskLevels.includes(level)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <Checkbox 
                        checked={selectedRiskLevels.includes(level)}
                        onCheckedChange={() => toggleRiskLevel(level)}
                        className="data-[state=checked]:bg-blue-500"
                      />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Return Range Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">1 Year Returns</h3>
                  <p className="text-sm text-gray-600">{returnRange[0]}% - {returnRange[1]}%</p>
                </div>
                <Slider 
                  min={0}
                  max={25}
                  step={1}
                  value={returnRange}
                  onValueChange={setReturnRange}
                  className="mb-2"
                />
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">0%</span>
                  <span className="text-xs text-gray-500">25%+</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Expense Ratio Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Expense Ratio</h3>
                  <p className="text-sm text-gray-600">{expenseRatioRange[0]}% - {expenseRatioRange[1]}%</p>
                </div>
                <Slider 
                  min={0}
                  max={3}
                  step={0.1}
                  value={expenseRatioRange}
                  onValueChange={setExpenseRatioRange}
                  className="mb-2"
                />
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">0%</span>
                  <span className="text-xs text-gray-500">3%+</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Rating Filter */}
              <div>
                <h3 className="font-medium mb-3">Minimum Rating</h3>
                <RadioGroup value={selectedRating?.toString() || ''} onValueChange={(val) => setSelectedRating(val ? parseInt(val) : null)}>
                  <div className="grid grid-cols-5 gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                          <label htmlFor={`rating-${rating}`} className="text-sm">
                            {rating}+
                          </label>
                        </div>
                        <div className="flex mt-1">
                          {Array.from({ length: rating }).map((_, idx) => (
                            <svg 
                              key={idx}
                              className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              {/* Min Investment Filter */}
              <div>
                <h3 className="font-medium mb-3">Minimum Investment</h3>
                <RadioGroup 
                  value={minInvestmentMax?.toString() || ''} 
                  onValueChange={(val) => setMinInvestmentMax(val ? parseInt(val) : null)}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="500" id="min-500" />
                      <label htmlFor="min-500" className="text-sm">
                        Up to ₹500
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1000" id="min-1000" />
                      <label htmlFor="min-1000" className="text-sm">
                        Up to ₹1,000
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5000" id="min-5000" />
                      <label htmlFor="min-5000" className="text-sm">
                        Up to ₹5,000
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10000" id="min-10000" />
                      <label htmlFor="min-10000" className="text-sm">
                        Up to ₹10,000
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              {/* AMC Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Fund House (AMC)</h3>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto"
                    onClick={() => setSelectedAmcs([])}
                  >
                    Clear
                  </Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {amcs.map((amc) => (
                    <label 
                      key={amc}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <Checkbox 
                        checked={selectedAmcs.includes(amc)}
                        onCheckedChange={() => toggleAmc(amc)}
                        className="data-[state=checked]:bg-blue-500"
                      />
                      <span className="text-sm">{amc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t sticky bottom-0 bg-white">
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
                <Button 
                  className="flex-1 bg-paygrow-blue"
                  onClick={() => setShowFilterDrawer(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default FundScreenerScreen;
