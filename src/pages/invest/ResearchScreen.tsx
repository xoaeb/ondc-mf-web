
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, TrendingUp, BarChart4, Clock, FileText, Gem, PiggyBank, Book, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from '@/components/BottomNavigation';

const ResearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const researchCategories = [
    {
      title: "Market Insights",
      icon: <BarChart4 className="h-6 w-6 text-blue-500" />,
      description: "Latest market analysis and reports",
      path: "/invest/research/market-insights"
    },
    {
      title: "Fund Manager Interviews",
      icon: <FileText className="h-6 w-6 text-purple-500" />,
      description: "Exclusive interviews with top fund managers",
      path: "/invest/research/fund-manager-interviews"
    },
    {
      title: "Sector Analysis",
      icon: <PiggyBank className="h-6 w-6 text-green-500" />,
      description: "Deep dive into different sectors",
      path: "/invest/research/sector-analysis"
    },
    {
      title: "Investment Strategies",
      icon: <Gem className="h-6 w-6 text-amber-500" />,
      description: "Expert strategies for wealth creation",
      path: "/invest/research/investment-strategies"
    },
    {
      title: "Financial Education",
      icon: <Book className="h-6 w-6 text-red-500" />,
      description: "Learn about investing fundamentals",
      path: "/invest/research/financial-education"
    },
    {
      title: "IPO Analysis",
      icon: <DollarSign className="h-6 w-6 text-cyan-500" />,
      description: "Upcoming IPOs and their potential",
      path: "/invest/research/ipo-analysis"
    }
  ];
  
  const recentArticles = [
    {
      id: 1,
      title: "How to build a balanced portfolio in volatile markets",
      category: "Investment Strategies",
      date: "Today",
      readTime: "5 min read",
      image: "https://source.unsplash.com/random/300x200/?finance"
    },
    {
      id: 2,
      title: "Top 5 mutual funds to watch this quarter",
      category: "Fund Analysis",
      date: "Yesterday",
      readTime: "8 min read",
      image: "https://source.unsplash.com/random/300x200/?business"
    },
    {
      id: 3,
      title: "Understanding the impact of RBI policies on debt funds",
      category: "Market Insights",
      date: "2 days ago",
      readTime: "10 min read",
      image: "https://source.unsplash.com/random/300x200/?chart"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4">
        <div className="flex items-center mb-4">
          <Link to="/invest" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Research & Analysis</h1>
        </div>
        <p className="text-white/80 mb-4">Make informed investment decisions with expert insights</p>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            placeholder="Search for insights, articles, analysis"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Research Categories */}
      <div className="px-4 py-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">Research Categories</h2>
        <div className="grid grid-cols-2 gap-4">
          {researchCategories.map((category, index) => (
            <Link to={category.path} key={index}>
              <Card className="p-4 hover:shadow-md transition-all border border-gray-100 h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-2">{category.icon}</div>
                  <h3 className="font-medium text-gray-900">{category.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Recent Articles */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Articles</h2>
          <Button variant="link" className="text-paygrow-blue p-0">View All</Button>
        </div>
        
        <div className="space-y-4">
          {recentArticles.map(article => (
            <Card key={article.id} className="overflow-hidden hover:shadow-md transition-all border border-gray-100">
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-3">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{article.date}</span>
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">{article.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Market Updates */}
      <div className="px-4 py-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Market Updates</h2>
          <Button variant="link" className="text-paygrow-blue p-0">More</Button>
        </div>
        
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-none mb-4">
          <div className="flex items-start">
            <TrendingUp className="w-10 h-10 text-blue-500 mr-3" />
            <div>
              <h3 className="font-medium">Today's Market Overview</h3>
              <p className="text-sm text-gray-600 mt-1">
                Nifty and Sensex closed higher today with IT and banking stocks leading the gains. FIIs remained net buyers.
              </p>
              <Button variant="link" size="sm" className="text-blue-600 p-0 mt-2">
                Read Full Analysis
              </Button>
            </div>
          </div>
        </Card>
        
        <Tabs defaultValue="daily">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-3">
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-sm">IT sector outperforms broader market</h4>
              <p className="text-xs text-gray-500 mt-1">
                IT stocks rallied on the back of strong quarterly results and positive global cues.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-sm">RBI keeps repo rate unchanged</h4>
              <p className="text-xs text-gray-500 mt-1">
                The central bank maintained status quo on interest rates in its bi-monthly policy review.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm">Consumer goods stocks under pressure</h4>
              <p className="text-xs text-gray-500 mt-1">
                FMCG stocks faced selling pressure due to concerns over rural demand and input cost inflation.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="space-y-3">
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-sm">Market registers 2% weekly gain</h4>
              <p className="text-xs text-gray-500 mt-1">
                Benchmark indices posted their best weekly performance in the last two months.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-sm">Midcap stocks outperform large caps</h4>
              <p className="text-xs text-gray-500 mt-1">
                The midcap index surged 3.5% this week, outperforming the benchmark indices.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-3">
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-sm">Market consolidates after rally</h4>
              <p className="text-xs text-gray-500 mt-1">
                After a strong rally last month, markets are in a consolidation phase.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm">FII flows turn positive</h4>
              <p className="text-xs text-gray-500 mt-1">
                Foreign institutional investors turned net buyers this month after three consecutive months of selling.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ResearchScreen;
