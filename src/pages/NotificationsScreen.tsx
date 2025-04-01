
import React, { useState } from 'react';
import { ArrowLeft, Bell, CheckCircle, Trash2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import BottomNavigation from '@/components/BottomNavigation';
import NotificationItem, { NotificationItemProps } from '@/components/notifications/NotificationItem';
import { useToast } from '@/components/ui/use-toast';

// Mock notifications data
const allNotifications: NotificationItemProps[] = [
  {
    id: '1',
    type: 'transaction',
    title: 'Payment Successful',
    description: 'Your payment of ₹5,000 to HDFC Mutual Fund was successful.',
    time: '2 hours ago',
    isRead: false,
    link: '/payment/transaction-detail/tx1'
  },
  {
    id: '2',
    type: 'investment',
    title: 'SIP Invested Successfully',
    description: 'Your SIP of ₹5,000 in HDFC Mid Cap Opportunities Fund has been invested.',
    time: 'Yesterday',
    isRead: false,
    link: '/invest/mutual-fund/2'
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Upcoming SIP Payment',
    description: 'Your SIP payment of ₹2,500 for Axis Bluechip Fund is due on 20th July.',
    time: '2 days ago',
    isRead: true,
    link: '/invest/sip-management'
  },
  {
    id: '4',
    type: 'alert',
    title: 'Market Alert',
    description: 'Nifty 50 is down by 2.5% today. Check your portfolio.',
    time: '3 days ago',
    isRead: true,
    link: '/invest/portfolio'
  },
  {
    id: '5',
    type: 'system',
    title: 'App Update Available',
    description: 'A new version of PayGrow app is available with exciting features.',
    time: '1 week ago',
    isRead: true
  },
  {
    id: '6',
    type: 'promotion',
    title: 'New Fund Launch',
    description: 'Parag Parikh Conservative Hybrid Fund NFO is now open for subscription.',
    time: '1 week ago',
    isRead: true,
    link: '/invest/mutual-funds'
  }
];

const NotificationsScreen: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeTab, setActiveTab] = useState('all');
  
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification,
        isRead: true
      }))
    );
    
    toast({
      title: "Marked all as read",
      description: "All notifications have been marked as read",
    });
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared",
    });
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    if (activeTab === 'transactions') return notification.type === 'transaction';
    if (activeTab === 'investments') return notification.type === 'investment';
    if (activeTab === 'alerts') return notification.type === 'alert' || notification.type === 'reminder';
    return true;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white pt-12 pb-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/profile" className="mr-4">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="text-white h-9 w-9">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-paygrow-blue mr-2" />
            <h2 className="text-lg font-semibold">Your Notifications</h2>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-paygrow-blue h-8"
              onClick={markAllAsRead}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Read all
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-red-600 h-8"
              onClick={clearAllNotifications}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mt-2" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full mb-4 bg-gray-100">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="transactions">Payments</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredNotifications.length > 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {filteredNotifications.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    {...notification} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No notifications</h3>
                <p className="text-gray-400">You're all caught up!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation activeTab="Profile" />
    </div>
  );
};

export default NotificationsScreen;
