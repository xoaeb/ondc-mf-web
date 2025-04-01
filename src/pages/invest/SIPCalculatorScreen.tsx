
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calculator, Info, PieChart, Clock, CreditCard, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import BottomNavigation from '@/components/BottomNavigation';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SIPCalculatorScreen: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  
  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);
  
  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    
    // Calculate using SIP formula: P × ({[1 + i]^n - 1} / i) × (1 + i)
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const investedAmount = monthlyInvestment * months;
    const estReturns = Math.round(futureValue);
    
    setTotalInvestment(investedAmount);
    setTotalReturns(estReturns);
    setWealthGained(estReturns - investedAmount);
  };
  
  const data = [
    { name: 'Investment', value: totalInvestment, color: '#0066FF' },
    { name: 'Returns', value: wealthGained, color: '#00C853' },
  ];
  
  const formatRupees = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹${value.toLocaleString('en-IN')}`;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white pt-12 pb-6 px-4">
        <div className="flex items-center">
          <Link to="/invest" className="mr-3">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              SIP Calculator
            </h1>
            <p className="text-sm text-white/80">Plan your investments and calculate returns</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Results Card */}
        <Card className="p-5 bg-white shadow-md rounded-xl border-0">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Estimated Returns</h2>
          
          <div className="h-[260px] mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatRupees(Number(value))} />
                <Legend />
              </RechartsChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-2 text-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Investment</p>
              <p className="font-bold text-paygrow-blue">{formatRupees(totalInvestment)}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Est. Returns</p>
              <p className="font-bold text-green-600">{formatRupees(totalReturns)}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Wealth Gain</p>
              <p className="font-bold text-purple-600">{formatRupees(wealthGained)}</p>
            </div>
          </div>
          
          <Button className="w-full paygrow-button-primary mt-2">Invest Now</Button>
        </Card>
        
        {/* Calculator Controls */}
        <Card className="p-4 border-0 shadow-md">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium flex items-center">
                  <CreditCard className="w-4 h-4 mr-1 text-paygrow-blue" />
                  Monthly Investment
                </label>
                <div className="flex items-center">
                  <span className="text-xs mr-2">₹</span>
                  <Input 
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    type="number" 
                    className="w-20 h-8 text-right p-1"
                  />
                </div>
              </div>
              <Slider
                value={[monthlyInvestment]}
                min={500}
                max={100000}
                step={500}
                onValueChange={(value) => setMonthlyInvestment(value[0])}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹500</span>
                <span>₹1 Lakh</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-paygrow-blue" />
                  Expected Return (p.a)
                </label>
                <div className="flex items-center">
                  <Input 
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    type="number" 
                    className="w-16 h-8 text-right p-1"
                  />
                  <span className="text-xs ml-2">%</span>
                </div>
              </div>
              <Slider
                value={[expectedReturn]}
                min={1}
                max={30}
                step={0.5}
                onValueChange={(value) => setExpectedReturn(value[0])}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-paygrow-blue" />
                  Time Period
                </label>
                <div className="flex items-center">
                  <Input 
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    type="number" 
                    className="w-16 h-8 text-right p-1"
                  />
                  <span className="text-xs ml-2">Years</span>
                </div>
              </div>
              <Slider
                value={[timePeriod]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setTimePeriod(value[0])}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Information Card */}
        <Card className="p-4 border-0 shadow-md">
          <div className="flex items-start">
            <Info className="w-5 h-5 mr-2 text-paygrow-blue flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-800 mb-1">How is SIP calculated?</h3>
              <p className="text-sm text-gray-600 mb-2">
                The SIP calculator uses the following formula:
              </p>
              <p className="text-xs bg-gray-100 p-2 rounded font-mono">
                M × (((1 + r)^n - 1) / r) × (1 + r)
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Where M is the monthly investment amount, r is the monthly rate of return, and n is the number of months.
              </p>
            </div>
          </div>
        </Card>
        
        {/* Top Performing SIPs */}
        <div className="mt-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <PieChart className="w-4 h-4 mr-2 text-paygrow-blue" />
            Top Performing SIP Plans
          </h3>
          
          <div className="space-y-3">
            <Card className="p-3 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-paygrow-blue">Axis Bluechip Fund</h4>
                  <p className="text-xs text-gray-500">Large Cap • 5★</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">3Y Returns</p>
                  <p className="text-sm font-bold text-green-600">15.8%</p>
                </div>
              </div>
              <Button size="sm" className="w-full mt-2 bg-paygrow-green">Start SIP</Button>
            </Card>
            
            <Card className="p-3 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-paygrow-blue">SBI Small Cap Fund</h4>
                  <p className="text-xs text-gray-500">Small Cap • 4★</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">3Y Returns</p>
                  <p className="text-sm font-bold text-green-600">19.5%</p>
                </div>
              </div>
              <Button size="sm" className="w-full mt-2 bg-paygrow-green">Start SIP</Button>
            </Card>
          </div>
          
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full border-paygrow-blue text-paygrow-blue">
              <Link to="/invest/mutual-funds">Explore All Funds</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SIPCalculatorScreen;
