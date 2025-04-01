
import React from 'react';
import { Check, Star, Info, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Fund {
  id: number;
  name: string;
  category: string;
  amc: string;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  expenseRatio: number;
  nav: number;
  aum: string;
  rating: number;
  riskLevel: string;
  minInvestment: number;
  exitLoad: string;
  features: {
    sipAvailable: boolean;
    lumpSumAvailable: boolean;
    instantRedemption: boolean;
    taxSaving: boolean;
  };
}

interface ComparisonTableProps {
  funds: Fund[];
  onRemoveFund: (id: number) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ funds, onRemoveFund }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={`h-3.5 w-3.5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`} 
      />
    ));
  };
  
  const bestPerformer = (metric: 'oneYearReturn' | 'threeYearReturn' | 'fiveYearReturn' | 'expenseRatio') => {
    if (funds.length <= 1) return null;
    
    if (metric === 'expenseRatio') {
      return Math.min(...funds.map(fund => fund[metric]));
    } else {
      return Math.max(...funds.map(fund => fund[metric]));
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-1/5 px-4 py-3 text-left font-medium text-gray-700 sticky left-0 bg-gray-50">Comparison Metrics</TableHead>
            {funds.map(fund => (
              <TableHead key={fund.id} className="px-4 py-2 text-center">
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-gray-500 hover:bg-red-100 hover:text-red-600"
                    onClick={() => onRemoveFund(fund.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                  <div className="font-medium text-paygrow-blue">{fund.name}</div>
                  <div className="text-xs text-gray-500">{fund.category}</div>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {/* AMC */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              Fund House
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center text-sm">
                {fund.amc}
              </TableCell>
            ))}
          </TableRow>
          
          {/* 1Y Return */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              <div className="flex items-center">
                1 Year Return
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Annualized returns for the last 1 year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            {funds.map(fund => (
              <TableCell 
                key={fund.id} 
                className={`px-4 py-3 text-center font-medium text-sm ${
                  fund.oneYearReturn === bestPerformer('oneYearReturn') && funds.length > 1
                    ? 'text-green-600 bg-green-50'
                    : ''
                }`}
              >
                {fund.oneYearReturn}%
              </TableCell>
            ))}
          </TableRow>
          
          {/* 3Y Return */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              <div className="flex items-center">
                3 Year Return
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Annualized returns for the last 3 years</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            {funds.map(fund => (
              <TableCell 
                key={fund.id} 
                className={`px-4 py-3 text-center font-medium text-sm ${
                  fund.threeYearReturn === bestPerformer('threeYearReturn') && funds.length > 1
                    ? 'text-green-600 bg-green-50'
                    : ''
                }`}
              >
                {fund.threeYearReturn}%
              </TableCell>
            ))}
          </TableRow>
          
          {/* 5Y Return */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              <div className="flex items-center">
                5 Year Return
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Annualized returns for the last 5 years</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            {funds.map(fund => (
              <TableCell 
                key={fund.id} 
                className={`px-4 py-3 text-center font-medium text-sm ${
                  fund.fiveYearReturn === bestPerformer('fiveYearReturn') && funds.length > 1
                    ? 'text-green-600 bg-green-50'
                    : ''
                }`}
              >
                {fund.fiveYearReturn}%
              </TableCell>
            ))}
          </TableRow>
          
          {/* Expense Ratio */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              <div className="flex items-center">
                Expense Ratio
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Annual fee charged by the fund (lower is better)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            {funds.map(fund => (
              <TableCell 
                key={fund.id} 
                className={`px-4 py-3 text-center text-sm ${
                  fund.expenseRatio === bestPerformer('expenseRatio') && funds.length > 1
                    ? 'text-green-600 bg-green-50'
                    : ''
                }`}
              >
                {fund.expenseRatio}%
              </TableCell>
            ))}
          </TableRow>
          
          {/* NAV */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              NAV
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center text-sm">
                ₹{fund.nav.toFixed(2)}
              </TableCell>
            ))}
          </TableRow>
          
          {/* AUM */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              <div className="flex items-center">
                AUM
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Assets Under Management</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center text-sm">
                ₹{fund.aum}
              </TableCell>
            ))}
          </TableRow>
          
          {/* Rating */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              Rating
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  {renderStars(fund.rating)}
                </div>
              </TableCell>
            ))}
          </TableRow>
          
          {/* Risk Level */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              Risk Level
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  fund.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                  fund.riskLevel === 'Moderate' ? 'bg-blue-100 text-blue-800' :
                  fund.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {fund.riskLevel}
                </span>
              </TableCell>
            ))}
          </TableRow>
          
          {/* Min Investment */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              Min Investment
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center text-sm">
                ₹{fund.minInvestment}
              </TableCell>
            ))}
          </TableRow>
          
          {/* Exit Load */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              <div className="flex items-center">
                Exit Load
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Fee charged on redemption before a specified period</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center text-sm">
                {fund.exitLoad}
              </TableCell>
            ))}
          </TableRow>
          
          {/* Features */}
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              SIP Available
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center">
                {fund.features.sipAvailable ? 
                  <Check className="h-5 w-5 text-green-600 mx-auto" /> : 
                  <X className="h-5 w-5 text-red-500 mx-auto" />
                }
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              Lump Sum Available
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center">
                {fund.features.lumpSumAvailable ? 
                  <Check className="h-5 w-5 text-green-600 mx-auto" /> : 
                  <X className="h-5 w-5 text-red-500 mx-auto" />
                }
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              Instant Redemption
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center">
                {fund.features.instantRedemption ? 
                  <Check className="h-5 w-5 text-green-600 mx-auto" /> : 
                  <X className="h-5 w-5 text-red-500 mx-auto" />
                }
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow className="border-b border-gray-100">
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 text-sm sticky left-0 bg-white">
              Tax Saving (ELSS)
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center">
                {fund.features.taxSaving ? 
                  <Check className="h-5 w-5 text-green-600 mx-auto" /> : 
                  <X className="h-5 w-5 text-red-500 mx-auto" />
                }
              </TableCell>
            ))}
          </TableRow>
          
          {/* Action Buttons */}
          <TableRow>
            <TableCell className="px-4 py-3 text-left font-medium text-gray-700 sticky left-0 bg-white">
              Actions
            </TableCell>
            {funds.map(fund => (
              <TableCell key={fund.id} className="px-4 py-3 text-center">
                <div className="flex flex-col space-y-2">
                  <Button 
                    size="sm" 
                    className="w-full bg-paygrow-blue hover:bg-blue-700"
                  >
                    Invest
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-paygrow-blue border-paygrow-blue"
                  >
                    View Details
                  </Button>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
