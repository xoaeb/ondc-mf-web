
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Plus, Filter, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ComparisonTable from '@/components/invest/ComparisonTable';
import BottomNavigation from '@/components/BottomNavigation';

// Mock fund data with detailed metrics
const fundsData = [
  {
    id: 1,
    name: 'Axis Bluechip Fund',
    category: 'Large Cap',
    amc: 'Axis Mutual Fund',
    oneYearReturn: 12.5,
    threeYearReturn: 15.8,
    fiveYearReturn: 14.2,
    expenseRatio: 1.8,
    nav: 45.67,
    aum: '23,458 Cr',
    rating: 5,
    riskLevel: 'Moderate',
    minInvestment: 500,
    exitLoad: '1% if redeemed within 1 year',
    features: {
      sipAvailable: true,
      lumpSumAvailable: true,
      instantRedemption: false,
      taxSaving: false,
    },
  },
  {
    id: 2,
    name: 'HDFC Mid-Cap Opportunities',
    category: 'Mid Cap',
    amc: 'HDFC Mutual Fund',
    oneYearReturn: 18.2,
    threeYearReturn: 16.9,
    fiveYearReturn: 15.7,
    expenseRatio: 1.9,
    nav: 78.34,
    aum: '28,712 Cr',
    rating: 4,
    riskLevel: 'High',
    minInvestment: 1000,
    exitLoad: '1% if redeemed within 1 year',
    features: {
      sipAvailable: true,
      lumpSumAvailable: true,
      instantRedemption: false,
      taxSaving: false,
    },
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    category: 'Small Cap',
    amc: 'SBI Mutual Fund',
    oneYearReturn: 22.7,
    threeYearReturn: 19.5,
    fiveYearReturn: 18.2,
    expenseRatio: 2.1,
    nav: 112.45,
    aum: '15,890 Cr',
    rating: 4,
    riskLevel: 'Very High',
    minInvestment: 500,
    exitLoad: '1% if redeemed within 1 year',
    features: {
      sipAvailable: true,
      lumpSumAvailable: true,
      instantRedemption: false,
      taxSaving: false,
    },
  },
  {
    id: 4,
    name: 'Kotak Equity Hybrid Fund',
    category: 'Hybrid',
    amc: 'Kotak Mutual Fund',
    oneYearReturn: 9.8,
    threeYearReturn: 12.4,
    fiveYearReturn: 11.6,
    expenseRatio: 1.7,
    nav: 34.67,
    aum: '8,456 Cr',
    rating: 3,
    riskLevel: 'Moderate',
    minInvestment: 500,
    exitLoad: '1% if redeemed within 1 year',
    features: {
      sipAvailable: true,
      lumpSumAvailable: true,
      instantRedemption: false,
      taxSaving: false,
    },
  },
  {
    id: 5,
    name: 'ICICI Prudential Value Discovery',
    category: 'Value',
    amc: 'ICICI Prudential',
    oneYearReturn: 14.9,
    threeYearReturn: 13.7,
    fiveYearReturn: 12.9,
    expenseRatio: 1.8,
    nav: 67.23,
    aum: '19,234 Cr',
    rating: 5,
    riskLevel: 'Moderate',
    minInvestment: 1000,
    exitLoad: '1% if redeemed within 1 year',
    features: {
      sipAvailable: true,
      lumpSumAvailable: true,
      instantRedemption: false,
      taxSaving: false,
    },
  },
  {
    id: 6,
    name: 'Aditya Birla Sun Life Tax Relief 96',
    category: 'ELSS',
    amc: 'Aditya Birla Sun Life',
    oneYearReturn: 13.2,
    threeYearReturn: 14.5,
    fiveYearReturn: 13.8,
    expenseRatio: 1.9,
    nav: 45.12,
    aum: '12,678 Cr',
    rating: 4,
    riskLevel: 'High',
    minInvestment: 500,
    exitLoad: 'Nil (3 year lock-in)',
    features: {
      sipAvailable: true,
      lumpSumAvailable: true,
      instantRedemption: false,
      taxSaving: true,
    },
  },
];

const FundComparisonScreen: React.FC = () => {
  const [selectedFunds, setSelectedFunds] = useState(fundsData.slice(0, 2));
  const [searchQuery, setSearchQuery] = useState('');
  const [availableFunds, setAvailableFunds] = useState(fundsData.filter(fund => !selectedFunds.some(f => f.id === fund.id)));
  const [showAddFundDialog, setShowAddFundDialog] = useState(false);
  
  useEffect(() => {
    setAvailableFunds(fundsData.filter(fund => !selectedFunds.some(f => f.id === fund.id)));
  }, [selectedFunds]);
  
  const handleRemoveFund = (id: number) => {
    const removedFund = selectedFunds.find(fund => fund.id === id);
    setSelectedFunds(selectedFunds.filter(fund => fund.id !== id));
    if (removedFund) {
      setAvailableFunds([...availableFunds, removedFund]);
    }
  };
  
  const handleAddFund = (fund: typeof fundsData[0]) => {
    if (selectedFunds.length < 3) {
      setSelectedFunds([...selectedFunds, fund]);
      setAvailableFunds(availableFunds.filter(f => f.id !== fund.id));
      setShowAddFundDialog(false);
    }
  };
  
  const filteredAvailableFunds = availableFunds.filter(fund => 
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4">
        <div className="flex items-center mb-4">
          <Link to="/invest/mutual-funds" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Compare Mutual Funds</h1>
        </div>
        <p className="text-white/80 mb-6">Compare up to 3 funds side by side</p>
      </div>
      
      {/* Add Fund Button */}
      <div className="px-4 py-4 bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Comparing {selectedFunds.length} funds</h2>
            <p className="text-xs text-gray-500">You can compare up to 3 funds</p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={showAddFundDialog} onOpenChange={setShowAddFundDialog}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-paygrow-blue" 
                  disabled={selectedFunds.length >= 3 || availableFunds.length === 0}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Fund
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Fund to Compare</DialogTitle>
                  <DialogDescription>
                    Select a fund to add to your comparison
                  </DialogDescription>
                </DialogHeader>
                
                <div className="relative my-4">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-10 bg-gray-100 border-gray-200"
                    placeholder="Search funds by name or category"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {filteredAvailableFunds.length > 0 ? (
                  <div className="space-y-3 mt-4">
                    {filteredAvailableFunds.map(fund => (
                      <Card 
                        key={fund.id} 
                        className="p-3 hover:bg-blue-50 cursor-pointer border border-gray-100"
                        onClick={() => handleAddFund(fund)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-paygrow-blue">{fund.name}</h3>
                            <p className="text-xs text-gray-500">{fund.category} • {fund.amc}</p>
                          </div>
                          <div className={`px-2 py-0.5 rounded text-xs ${
                            fund.oneYearReturn > 15 
                              ? 'bg-green-100 text-green-800' 
                              : fund.oneYearReturn > 10 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-orange-100 text-orange-800'
                          }`}>
                            {fund.oneYearReturn}% (1Y)
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No more funds available to compare</p>
                  </div>
                )}
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddFundDialog(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="bg-white">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            
            <Button variant="outline" className="bg-white">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      {/* Comparison Table */}
      <div className="px-4 py-4">
        {selectedFunds.length > 0 ? (
          <ComparisonTable funds={selectedFunds} onRemoveFund={handleRemoveFund} />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No funds selected for comparison</p>
            <p className="text-sm text-gray-400">Add funds to start comparing</p>
            <Button 
              className="mt-4 bg-paygrow-blue"
              onClick={() => setShowAddFundDialog(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Fund
            </Button>
          </div>
        )}
      </div>
      
      {/* Recommendations */}
      {selectedFunds.length > 0 && (
        <div className="px-4 py-6 bg-white mt-4">
          <h2 className="text-lg font-semibold mb-4">Similar Funds You Might Like</h2>
          
          <div className="space-y-3">
            {availableFunds.slice(0, 2).map(fund => (
              <Card key={fund.id} className="p-3 border border-gray-100 hover:border-blue-200 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-paygrow-blue">{fund.name}</h3>
                    <p className="text-xs text-gray-500">{fund.category} • {fund.amc}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-200 text-blue-600"
                    onClick={() => handleAddFund(fund)}
                    disabled={selectedFunds.length >= 3}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">1Y Return</p>
                    <p className="font-medium text-green-600">{fund.oneYearReturn}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expense Ratio</p>
                    <p className="font-medium">{fund.expenseRatio}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Risk Level</p>
                    <p className="font-medium">{fund.riskLevel}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default FundComparisonScreen;
