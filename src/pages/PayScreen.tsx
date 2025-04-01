
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, QrCode, Users, ArrowRight, CreditCard, Calendar, Clock } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

// Mock contacts data
const contacts = [
  { id: 1, name: 'Arun Kumar', phone: '9876543210', recent: true },
  { id: 2, name: 'Priya Singh', phone: '8765432109', recent: true },
  { id: 3, name: 'Rajesh Verma', phone: '7654321098', recent: true },
  { id: 4, name: 'Sneha Gupta', phone: '6543210987', recent: false },
  { id: 5, name: 'Vishal Sharma', phone: '5432109876', recent: false },
  { id: 6, name: 'Neha Patel', phone: '4321098765', recent: false },
];

const PayScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div className="pb-20"> {/* Add padding at bottom for nav */}
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4">
        <h1 className="text-2xl font-bold mb-4">Pay & Transfer</h1>
        
        {/* Search bar */}
        <div className="relative flex items-center mb-4">
          <Search className="w-5 h-5 absolute left-3 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name, phone, or UPI ID"
            className="pl-10 bg-white rounded-full text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Payment options */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Button 
            variant="outline" 
            className="flex flex-col items-center h-auto py-3 bg-white/10 hover:bg-white/20 text-white border-transparent"
            asChild
          >
            <a href="/scan">
              <QrCode className="w-6 h-6 mb-1" />
              <span className="text-xs">Scan QR</span>
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center h-auto py-3 bg-white/10 hover:bg-white/20 text-white border-transparent"
            asChild
          >
            <a href="/contacts">
              <Users className="w-6 h-6 mb-1" />
              <span className="text-xs">To Contact</span>
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center h-auto py-3 bg-white/10 hover:bg-white/20 text-white border-transparent"
            asChild
          >
            <a href="/upi">
              <ArrowRight className="w-6 h-6 mb-1" />
              <span className="text-xs">UPI ID</span>
            </a>
          </Button>
        </div>
      </div>
      
      {/* Bill & Recharge Section */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">Bill Payments & Recharges</h2>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          <a href="/bills" className="text-center">
            <div className="w-14 h-14 rounded-full bg-paygrow-gray flex items-center justify-center mx-auto mb-1">
              <CreditCard className="w-6 h-6" />
            </div>
            <p className="text-xs">Bills</p>
          </a>
          
          <a href="/recharge" className="text-center">
            <div className="w-14 h-14 rounded-full bg-paygrow-gray flex items-center justify-center mx-auto mb-1">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-xs">Recharge</p>
          </a>
          
          <a href="/electricity" className="text-center">
            <div className="w-14 h-14 rounded-full bg-paygrow-gray flex items-center justify-center mx-auto mb-1">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-xs">Electricity</p>
          </a>
          
          <a href="/more" className="text-center">
            <div className="w-14 h-14 rounded-full bg-paygrow-gray flex items-center justify-center mx-auto mb-1">
              <div className="flex">
                <div className="w-1 h-1 bg-gray-500 rounded-full mx-0.5"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full mx-0.5"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full mx-0.5"></div>
              </div>
            </div>
            <p className="text-xs">More</p>
          </a>
        </div>
      </div>
      
      {/* Recent Contacts */}
      <div className="px-4 mt-2">
        <h2 className="text-lg font-semibold mb-4">Recent Contacts</h2>
        
        <div className="space-y-3">
          {filteredContacts
            .filter(contact => contact.recent)
            .map(contact => (
              <Card key={contact.id} className="p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-paygrow-gray flex items-center justify-center mr-3">
                    <span className="text-lg font-medium text-paygrow-blue">
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.phone}</p>
                  </div>
                </div>
                <Button size="sm" className="paygrow-button-primary">Pay</Button>
              </Card>
            ))}
        </div>
      </div>
      
      {/* All Contacts */}
      {filteredContacts.some(contact => !contact.recent) && (
        <div className="px-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">All Contacts</h2>
          
          <div className="space-y-3">
            {filteredContacts
              .filter(contact => !contact.recent)
              .map(contact => (
                <Card key={contact.id} className="p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-paygrow-gray flex items-center justify-center mr-3">
                      <span className="text-lg font-medium text-paygrow-blue">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.phone}</p>
                    </div>
                  </div>
                  <Button size="sm" className="paygrow-button-primary">Pay</Button>
                </Card>
              ))}
          </div>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default PayScreen;
