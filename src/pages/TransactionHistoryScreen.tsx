
import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, Download, ArrowUpRight, ArrowDownLeft, Filter, ChevronRight, Info, AlignJustify } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from '@/components/BottomNavigation';

// Mock data for transactions with enhanced details
const transactions = [
  {
    id: 1,
    type: 'payment',
    direction: 'outgoing',
    amount: 500,
    recipient: 'Rahul Sharma',
    date: '2025-07-10T14:32:00',
    status: 'completed',
    category: 'friends',
    bankAccount: 'HDFC Bank ****5678',
    referenceId: 'PAY123456789',
    notes: 'Dinner payment',
  },
  {
    id: 2,
    type: 'investment',
    direction: 'outgoing',
    amount: 5000,
    recipient: 'Axis Bluechip Fund',
    date: '2025-07-08T10:15:00',
    status: 'completed',
    category: 'mutual-fund',
    fundType: 'Large Cap',
    navValue: 45.67,
    units: 109.48,
    bankAccount: 'SBI Bank ****1234',
    referenceId: 'ORD987654321',
    sipId: 'SIP00123456',
    folioNumber: '12345678/90',
  },
  {
    id: 3,
    type: 'payment',
    direction: 'incoming',
    amount: 1200,
    recipient: 'Priya Verma',
    date: '2025-07-05T18:45:00',
    status: 'completed',
    category: 'friends',
    bankAccount: 'HDFC Bank ****5678',
    referenceId: 'PAY987654321',
    notes: 'Trip expenses',
  },
  {
    id: 4,
    type: 'bill',
    direction: 'outgoing',
    amount: 1499,
    recipient: 'Jio Fiber',
    date: '2025-07-02T09:30:00',
    status: 'completed',
    category: 'bills',
    bankAccount: 'ICICI Bank ****4321',
    referenceId: 'BILL456789123',
    billNumber: 'JIO78912345',
    period: 'July 2025',
  },
  {
    id: 5,
    type: 'payment',
    direction: 'outgoing',
    amount: 850,
    recipient: 'Swiggy',
    date: '2025-06-28T20:15:00',
    status: 'completed',
    category: 'food',
    bankAccount: 'HDFC Bank ****5678',
    referenceId: 'SWGY45678912',
    orderNumber: 'OD123456789',
  },
  {
    id: 6,
    type: 'investment',
    direction: 'outgoing',
    amount: 1000,
    recipient: 'SBI Small Cap Fund',
    date: '2025-06-21T11:20:00',
    status: 'completed',
    category: 'mutual-fund',
    fundType: 'Small Cap',
    navValue: 92.34,
    units: 10.83,
    bankAccount: 'SBI Bank ****1234',
    referenceId: 'ORD123789456',
    sipId: 'SIP00123457',
    folioNumber: '12345678/91',
  },
  {
    id: 7,
    type: 'investment',
    direction: 'incoming',
    amount: 6200,
    recipient: 'HDFC Mid Cap Opportunities Fund',
    date: '2025-06-15T09:10:00',
    status: 'completed',
    category: 'mutual-fund-redemption',
    fundType: 'Mid Cap',
    navValue: 78.23,
    units: 79.25,
    bankAccount: 'HDFC Bank ****5678',
    referenceId: 'RED123456789',
    folioNumber: '87654321/01',
    redemptionType: 'Partial',
  },
  {
    id: 8,
    type: 'withdrawal',
    direction: 'outgoing',
    amount: 10000,
    recipient: 'Bank Account',
    date: '2025-06-10T16:45:00',
    status: 'completed',
    category: 'withdrawal',
    bankAccount: 'HDFC Bank ****5678',
    referenceId: 'WTH123456789',
  },
];

const TransactionHistoryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Filter transactions based on search query and active tab
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().includes(searchQuery) ||
      (transaction.referenceId && transaction.referenceId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.category && transaction.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'payments' && transaction.type === 'payment') ||
      (activeTab === 'investments' && transaction.type === 'investment') ||
      (activeTab === 'withdrawals' && transaction.type === 'withdrawal') ||
      (activeTab === 'bills' && transaction.type === 'bill');
    
    return matchesSearch && matchesTab;
  });
  
  // Group transactions by date for display
  const groupedTransactions: Record<string, typeof transactions> = {};
  
  filteredTransactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!groupedTransactions[dateKey]) {
      groupedTransactions[dateKey] = [];
    }
    
    groupedTransactions[dateKey].push(transaction);
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleTransactionClick = (transaction: typeof transactions[0]) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'mutual-fund':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Mutual Fund</Badge>;
      case 'mutual-fund-redemption':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Redemption</Badge>;
      case 'friends':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Friends</Badge>;
      case 'bills':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Bills</Badge>;
      case 'food':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Food</Badge>;
      case 'withdrawal':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Withdrawal</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{category.replace('-', ' ')}</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/profile" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </div>
      
      {/* Search & Filters */}
      <div className="px-4 py-4 bg-white sticky top-0 z-10 shadow-sm border-b">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-gray-50 border-gray-200"
            placeholder="Search transactions, amounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px] h-9 bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Period</SelectLabel>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center h-9 border-gray-200 bg-gray-50"
              onClick={() => setViewMode(viewMode === 'list' ? 'table' : 'list')}
            >
              {viewMode === 'list' ? 
                <AlignJustify className="h-4 w-4 mr-2" /> : 
                <Calendar className="h-4 w-4 mr-2" />
              }
              {viewMode === 'list' ? 'Table View' : 'List View'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center h-9 border-gray-200 bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center h-9 border-gray-200 bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs">Payments</TabsTrigger>
            <TabsTrigger value="investments" className="text-xs">Investments</TabsTrigger>
            <TabsTrigger value="bills" className="text-xs">Bills</TabsTrigger>
            <TabsTrigger value="withdrawals" className="text-xs">Withdrawals</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Table View */}
      {viewMode === 'table' && (
        <div className="px-4 py-4 overflow-x-auto">
          <Card className="border-0 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-xs font-semibold">Date</TableHead>
                  <TableHead className="text-xs font-semibold">Transaction</TableHead>
                  <TableHead className="text-xs font-semibold">Category</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Amount</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map(transaction => (
                  <TableRow 
                    key={transaction.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <TableCell className="text-xs text-gray-600">
                      {new Date(transaction.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short'
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{transaction.recipient}</div>
                      <div className="text-xs text-gray-500">
                        {transaction.referenceId ? transaction.referenceId.substring(0, 10) : '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(transaction.category)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={`font-medium ${
                        transaction.direction === 'incoming' ? 'text-green-600' : 'text-gray-800'
                      }`}>
                        {transaction.direction === 'incoming' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className={`${getStatusColor(transaction.status)} h-2 w-2 rounded-full mt-1`}></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}
      
      {/* List View */}
      {viewMode === 'list' && (
        <div className="flex-1 px-4 py-4">
          {Object.keys(groupedTransactions).length > 0 ? (
            Object.keys(groupedTransactions)
              .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
              .map(dateKey => (
                <div key={dateKey} className="mb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-3">{formatDate(dateKey)}</h3>
                  
                  <div className="space-y-3">
                    {groupedTransactions[dateKey].map(transaction => (
                      <Card 
                        key={transaction.id} 
                        className="p-3.5 flex items-center shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border-0"
                        onClick={() => handleTransactionClick(transaction)}
                      >
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3.5 ${
                          transaction.direction === 'incoming' ? 'bg-green-100' : 
                          transaction.type === 'investment' ? 'bg-blue-100' : 
                          transaction.type === 'bill' ? 'bg-red-100' : 
                          'bg-gray-100'
                        }`}>
                          {transaction.direction === 'incoming' ? (
                            <ArrowDownLeft className={`h-5 w-5 ${
                              transaction.direction === 'incoming' ? 'text-green-600' : 'text-red-600'
                            }`} />
                          ) : (
                            <ArrowUpRight className={`h-5 w-5 ${
                              transaction.type === 'investment' ? 'text-blue-600' : 
                              transaction.type === 'bill' ? 'text-red-600' : 
                              'text-gray-600'
                            }`} />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{transaction.recipient}</p>
                          <div className="flex items-center mt-0.5">
                            <p className="text-xs text-gray-500 truncate">
                              {transaction.type === 'investment' && transaction.fundType ? transaction.fundType : ''}
                              {transaction.type === 'investment' && transaction.sipId ? ' • SIP' : ''}
                              {transaction.referenceId ? 
                                (transaction.type === 'investment' && transaction.fundType ? ' • ' : '') + 
                                `Ref: ${transaction.referenceId.substring(0, 8)}` : 
                                ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className={`font-medium ${
                            transaction.direction === 'incoming' ? 'text-green-600' : 
                            transaction.type === 'investment' ? 'text-blue-600' : 'text-gray-800'
                          }`}>
                            {transaction.direction === 'incoming' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(transaction.date).toLocaleTimeString('en-IN', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true
                            })}
                          </p>
                        </div>
                        
                        <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
                      </Card>
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No transactions found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
      
      {/* Transaction Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-4 pt-5 pb-4 bg-gradient-to-r from-paygrow-blue to-blue-600 text-white">
            <DialogTitle className="text-lg font-semibold">Transaction Details</DialogTitle>
            <DialogDescription className="text-white/80">
              {selectedTransaction ? formatDate(selectedTransaction.date) : ''}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  selectedTransaction.direction === 'incoming' ? 'bg-green-100' : 
                  selectedTransaction.type === 'investment' ? 'bg-blue-100' : 
                  selectedTransaction.type === 'bill' ? 'bg-red-100' : 
                  'bg-gray-100'
                }`}>
                  {selectedTransaction.direction === 'incoming' ? (
                    <ArrowDownLeft className={`h-6 w-6 ${
                      selectedTransaction.direction === 'incoming' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  ) : (
                    <ArrowUpRight className={`h-6 w-6 ${
                      selectedTransaction.type === 'investment' ? 'text-blue-600' : 
                      selectedTransaction.type === 'bill' ? 'text-red-600' : 
                      'text-gray-600'
                    }`} />
                  )}
                </div>
                
                <div className="text-right">
                  <p className={`text-xl font-bold ${
                    selectedTransaction.direction === 'incoming' ? 'text-green-600' : 
                    selectedTransaction.type === 'investment' ? 'text-blue-600' : 'text-gray-800'
                  }`}>
                    {selectedTransaction.direction === 'incoming' ? '+' : '-'}₹{selectedTransaction.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedTransaction.date).toLocaleString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-4 mb-4">
                <p className="font-semibold text-gray-800 mb-1">{selectedTransaction.recipient}</p>
                {selectedTransaction.type === 'investment' && (
                  <div className="flex items-center">
                    {getCategoryBadge(selectedTransaction.category)}
                    {selectedTransaction.fundType && (
                      <span className="text-xs text-gray-500 ml-2">{selectedTransaction.fundType}</span>
                    )}
                  </div>
                )}
                {selectedTransaction.type !== 'investment' && (
                  <div className="flex items-center">
                    {getCategoryBadge(selectedTransaction.category)}
                  </div>
                )}
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="text-sm font-medium flex items-center">
                    <div className={`${getStatusColor(selectedTransaction.status)} h-2 w-2 rounded-full mr-2`}></div>
                    <span className="capitalize">{selectedTransaction.status}</span>
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Transaction ID</span>
                  <span className="text-sm font-medium">{selectedTransaction.referenceId || '-'}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Payment Method</span>
                  <span className="text-sm font-medium">{selectedTransaction.bankAccount || '-'}</span>
                </div>
                
                {selectedTransaction.type === 'investment' && (
                  <>
                    <Separator />
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">NAV</span>
                      <span className="text-sm font-medium">₹{selectedTransaction.navValue?.toFixed(2) || '-'}</span>
                    </div>
                    
                    <Separator />
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">Units</span>
                      <span className="text-sm font-medium">{selectedTransaction.units?.toFixed(3) || '-'}</span>
                    </div>
                    
                    <Separator />
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">Folio Number</span>
                      <span className="text-sm font-medium">{selectedTransaction.folioNumber || '-'}</span>
                    </div>
                    
                    {selectedTransaction.sipId && (
                      <>
                        <Separator />
                        <div className="flex justify-between py-2">
                          <span className="text-sm text-gray-500">SIP ID</span>
                          <span className="text-sm font-medium">{selectedTransaction.sipId}</span>
                        </div>
                      </>
                    )}
                  </>
                )}
                
                {selectedTransaction.notes && (
                  <>
                    <Separator />
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">Notes</span>
                      <span className="text-sm font-medium">{selectedTransaction.notes}</span>
                    </div>
                  </>
                )}
                
                {selectedTransaction.category === 'bills' && selectedTransaction.billNumber && (
                  <>
                    <Separator />
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">Bill Number</span>
                      <span className="text-sm font-medium">{selectedTransaction.billNumber}</span>
                    </div>
                    
                    {selectedTransaction.period && (
                      <>
                        <Separator />
                        <div className="flex justify-between py-2">
                          <span className="text-sm text-gray-500">Billing Period</span>
                          <span className="text-sm font-medium">{selectedTransaction.period}</span>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              
              <div className="flex gap-3 mt-5">
                <Button
                  className="w-full bg-paygrow-blue"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                
                {selectedTransaction.type === 'investment' && (
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={() => {
                      setIsDetailsOpen(false);
                      // Navigate to fund details - in a real app we would use the actual fund ID
                    }}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Fund Details
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default TransactionHistoryScreen;
