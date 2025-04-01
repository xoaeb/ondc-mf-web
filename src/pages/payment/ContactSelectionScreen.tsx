
import React, { useState } from 'react';
import { ArrowLeft, Search, UserRound, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock data for contacts
const contacts = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210', favorite: true },
  { id: 2, name: 'Anjali Singh', phone: '9876543211', favorite: true },
  { id: 3, name: 'Vikram Patel', phone: '9876543212', favorite: false },
  { id: 4, name: 'Neha Gupta', phone: '9876543213', favorite: false },
  { id: 5, name: 'Aditya Kumar', phone: '9876543214', favorite: false },
  { id: 6, name: 'Priya Verma', phone: '9876543215', favorite: false },
  { id: 7, name: 'Sanjay Joshi', phone: '9876543216', favorite: false },
  { id: 8, name: 'Meera Desai', phone: '9876543217', favorite: false },
];

const ContactSelectionScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );
  
  const favoriteContacts = filteredContacts.filter(contact => contact.favorite);
  const otherContacts = filteredContacts.filter(contact => !contact.favorite);
  
  return (
    <div className="pb-6 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-paygrow-blue text-white pt-12 pb-6 px-4 flex items-center">
        <Link to="/pay" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Pay to Contact</h1>
      </div>
      
      {/* Search */}
      <div className="px-4 py-4 bg-white sticky top-0 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-gray-100"
            placeholder="Search name or phone number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full justify-start"
            variant="outline"
            asChild
          >
            <Link to="/payment/amount">
              <span>Enter UPI ID / Phone Number</span>
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Contacts List */}
      <div className="flex-1 px-4 mt-4">
        {/* Favorites */}
        {favoriteContacts.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-gray-500 mb-2">FAVORITES</h3>
            <div className="space-y-3 mb-6">
              {favoriteContacts.map(contact => (
                <Link to="/payment/amount" key={contact.id}>
                  <Card className="p-3 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <UserRound className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  </Card>
                </Link>
              ))}
            </div>
            <Separator className="my-4" />
          </>
        )}
        
        {/* All Contacts */}
        {otherContacts.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-gray-500 mb-2">ALL CONTACTS</h3>
            <div className="space-y-3">
              {otherContacts.map(contact => (
                <Link to="/payment/amount" key={contact.id}>
                  <Card className="p-3 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <UserRound className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
        
        {filteredContacts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSelectionScreen;
