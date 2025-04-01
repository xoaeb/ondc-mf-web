
import React, { useState } from 'react';
import { ArrowLeft, Calculator, FileText, Info, CheckCircle, HelpCircle, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import BottomNavigation from '@/components/BottomNavigation';

const TaxPlanningScreen: React.FC = () => {
  const [taxSaved, setTaxSaved] = useState(35000);
  const [taxSavingPotential, setTaxSavingPotential] = useState(150000);
  
  const taxSavingInvestments = [
    {
      id: 1,
      name: "ELSS Mutual Funds",
      description: "Equity Linked Savings Scheme with 3 year lock-in",
      potential: 150000,
      currentInvestment: 25000,
      scheme: "Section 80C",
      returnPotential: "High",
      risk: "Moderate to High",
      path: "/invest/mutual-funds?category=ELSS"
    },
    {
      id: 2,
      name: "NPS - National Pension System",
      description: "Government-backed retirement scheme",
      potential: 50000,
      currentInvestment: 10000,
      scheme: "Section 80CCD(1B)",
      returnPotential: "Moderate",
      risk: "Low to Moderate",
      path: "/invest/nps"
    },
    {
      id: 3,
      name: "Tax Saving Fixed Deposits",
      description: "Bank FDs with 5 year lock-in period",
      potential: 150000,
      currentInvestment: 0,
      scheme: "Section 80C",
      returnPotential: "Low",
      risk: "Low",
      path: "/fixed-deposits?category=tax-saving"
    },
    {
      id: 4,
      name: "Health Insurance Premium",
      description: "Medical insurance for self and family",
      potential: 25000,
      currentInvestment: 0,
      scheme: "Section 80D",
      returnPotential: "N/A",
      risk: "N/A",
      path: "/insurance/health"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white pt-12 pb-6 px-4">
        <div className="flex items-center mb-4">
          <Link to="/invest" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Tax Planning</h1>
        </div>
        <p className="text-white/80 mb-6">Optimize your investments to save taxes</p>
        
        {/* Tax Savings Summary */}
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Your Tax Savings</h3>
            <Calculator className="h-5 w-5" />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Current Tax Saved</span>
              <span className="font-bold">₹{taxSaved.toLocaleString()}</span>
            </div>
            <Progress value={(taxSaved/taxSavingPotential)*100} className="h-2 bg-white/20" indicatorClassName="bg-green-400" />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span>Additional Tax Saving Potential</span>
            <span className="font-bold text-green-300">₹{(taxSavingPotential - taxSaved).toLocaleString()}</span>
          </div>
          
          <Button 
            className="w-full mt-4 bg-white text-purple-700 hover:bg-white/90"
            asChild
          >
            <Link to="/invest/tax-calculator">
              Calculate Your Tax
            </Link>
          </Button>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tax Saving Investments</h2>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Tax Guide
          </Button>
        </div>
        
        <div className="space-y-4 mb-6">
          {taxSavingInvestments.map(investment => (
            <Card key={investment.id} className="p-4 hover:shadow-md transition-all border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-purple-700">{investment.name}</h3>
                  <p className="text-xs text-gray-500">{investment.description}</p>
                </div>
                <div className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded">
                  {investment.scheme}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="text-gray-600">Investment Progress</span>
                  <span className="font-medium">
                    ₹{investment.currentInvestment.toLocaleString()} / ₹{investment.potential.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(investment.currentInvestment/investment.potential)*100} 
                  className="h-2"
                  indicatorClassName={investment.currentInvestment > 0 ? "bg-purple-600" : "bg-gray-300"}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Return Potential</p>
                  <p className="font-medium">{investment.returnPotential}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Risk Level</p>
                  <p className="font-medium">{investment.risk}</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                asChild
              >
                <Link to={investment.path}>
                  Invest Now
                </Link>
              </Button>
            </Card>
          ))}
        </div>
        
        {/* Tax Information Tabs */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Tax Knowledge Center</h2>
          
          <Tabs defaultValue="deductions">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="deductions">Deductions</TabsTrigger>
              <TabsTrigger value="filing">Filing Tips</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="deductions" className="space-y-3">
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Section 80C - Up to ₹1.5 Lakh</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      ELSS, PPF, EPF, Home Loan Principal, Tax-saving FDs, NSC, ULIP
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Section 80D - Up to ₹25,000</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Health Insurance Premium for self and family
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Section 80CCD(1B) - Up to ₹50,000</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Additional deduction for NPS contribution over and above 80C limit
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="filing" className="space-y-3">
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">File early to get faster refunds</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Early filing helps you get tax refunds processed faster
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Verify your return within 30 days</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Income tax return is considered complete only after verification
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Choose the right ITR form</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Different forms apply based on your sources of income
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-3">
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">What is the difference between old and new tax regime?</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      The new regime offers lower tax rates but removes most exemptions and deductions
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">When is the last date to make tax-saving investments?</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      March 31st of the financial year for which you are claiming deductions
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Are ELSS funds better than tax-saving FDs?</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      ELSS funds have potential for higher returns but carry market risk, and have a shorter lock-in period
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Tax Calculators */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-3">Tax Calculators</h2>
          
          <Card className="p-4 border border-gray-100">
            <Link to="/invest/tax-calculator" className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Income Tax Calculator</h3>
                  <p className="text-xs text-gray-500">Compare old vs new tax regime</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </Card>
          
          <Card className="p-4 border border-gray-100">
            <Link to="/invest/capital-gains-calculator" className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <Calculator className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Capital Gains Calculator</h3>
                  <p className="text-xs text-gray-500">Calculate tax on your investment gains</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </Card>
          
          <Card className="p-4 border border-gray-100">
            <Link to="/invest/income-adjustment-calculator" className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Calculator className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Tax-saving Investment Calculator</h3>
                  <p className="text-xs text-gray-500">Find how much to invest to optimize tax</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </Card>
        </div>
      </div>
      
      {/* Consult a Tax Expert */}
      <div className="px-4 py-6 bg-white">
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Need personalized tax advice?</h3>
              <p className="text-sm text-gray-600 mt-1">Connect with a certified tax expert</p>
              <Button className="mt-3 bg-purple-600 hover:bg-purple-700">
                Book Consultation
              </Button>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <ExternalLink className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default TaxPlanningScreen;
