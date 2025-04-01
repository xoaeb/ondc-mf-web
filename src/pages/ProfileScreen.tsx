
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  BarChart3,
  Star,
  Gift,
  Zap,
  Share2,
  Moon,
  MessageSquare,
  Banknote,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import BottomNavigation from '@/components/BottomNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ProfileScreen: React.FC = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out from your account"
    });
    
    // Navigate to login screen after logout
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };
  
  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen"> 
      {/* Header */}
      <div className="bg-gradient-to-r from-paygrow-blue to-blue-500 text-white pt-14 pb-8 px-5 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex space-x-2">
            <Link to="/settings" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5" />
            </Link>
            <Link to="/notifications" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </Link>
          </div>
        </div>
        
        {/* User Profile Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white p-5 rounded-2xl">
          <div className="flex items-start">
            <Avatar className="h-16 w-16 border-2 border-white/30">
              <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=Rahul" alt="Rahul Sharma" />
              <AvatarFallback className="bg-blue-600">RS</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold flex items-center">
                    Rahul Sharma 
                    <Badge className="ml-2 bg-blue-600/50 hover:bg-blue-600/70 text-white text-xs py-1">Premium</Badge>
                  </h2>
                  <p className="opacity-80 text-sm">rahul.sharma@gmail.com</p>
                  <p className="opacity-80 text-sm">+91 9876 543210</p>
                </div>
              </div>
              <div className="mt-3 flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/20 hover:bg-white/10 text-white rounded-xl"
                  asChild
                >
                  <Link to="/profile/edit">
                    Edit Profile
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/20 hover:bg-white/10 text-white rounded-xl"
                  asChild
                >
                  <Link to="/profile/kyc">
                    KYC Status
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Quick Stats */}
      <div className="px-5 -mt-5">
        <Card className="grid grid-cols-3 divide-x divide-gray-100 shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 dark:divide-gray-700">
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-paygrow-blue">₹48,550</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Balance</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-green-500">₹27,840</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Investments</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-orange-500">12</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Transactions</span>
          </div>
        </Card>
      </div>
      
      {/* Profile Sections */}
      <div className="px-5 mt-6 space-y-6">
        {/* Account Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-1">Account Settings</h3>
          
          <Card className="divide-y divide-gray-100 rounded-2xl overflow-hidden dark:divide-gray-700 dark:bg-gray-800">
            <Link to="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <Settings className="w-5 h-5 text-paygrow-blue" />
                </div>
                <span className="font-medium">Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/notifications" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <span className="font-medium">Notifications</span>
              </div>
              <div className="flex items-center">
                <Badge variant="destructive" className="mr-2">3</Badge>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
            
            <Link to="/payment-methods" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <CreditCard className="w-5 h-5 text-green-500" />
                </div>
                <span className="font-medium">Payment Methods</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link to="/theme" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                  <Moon className="w-5 h-5 text-purple-500" />
                </div>
                <span className="font-medium">App Theme</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </Card>
        </div>
        
        {/* Transactions & Finance */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-1">Finance & Transactions</h3>
          
          <Card className="divide-y divide-gray-100 rounded-2xl overflow-hidden dark:divide-gray-700 dark:bg-gray-800">
            <Link to="/transaction-history" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                  <Clock className="w-5 h-5 text-purple-500" />
                </div>
                <span className="font-medium">Transaction History</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/portfolio" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <span className="font-medium">Investment Portfolio</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link to="/rewards" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-3">
                  <Gift className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-medium">Rewards & Referrals</span>
              </div>
              <Badge className="bg-amber-500">New</Badge>
            </Link>

            <Link to="/tax-reports" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <Banknote className="w-5 h-5 text-green-500" />
                </div>
                <span className="font-medium">Tax Reports</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </Card>
        </div>
        
        {/* Security & Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-1">Security & Support</h3>
          
          <Card className="divide-y divide-gray-100 rounded-2xl overflow-hidden dark:divide-gray-700 dark:bg-gray-800">
            <Link to="/profile/kyc" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">KYC Verification</span>
                  <Badge variant="outline" className="text-yellow-800 border-yellow-300 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30">Pending</Badge>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/security" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-red-500" />
                </div>
                <span className="font-medium">Security Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/help" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                  <HelpCircle className="w-5 h-5 text-purple-500" />
                </div>
                <span className="font-medium">Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link to="/chat" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Chat with Support</span>
                  <Badge className="bg-green-500">Online</Badge>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center justify-between p-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <span className="font-medium text-red-500">Logout</span>
              </div>
            </button>
          </Card>
        </div>

        {/* More Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-1">More Features</h3>
          
          <Card className="divide-y divide-gray-100 rounded-2xl overflow-hidden dark:divide-gray-700 dark:bg-gray-800">
            <Link to="/rate-app" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center mr-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <span className="font-medium">Rate our App</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/refer" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <Share2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Refer & Earn</span>
                  <Badge className="bg-blue-500">₹100 Bonus</Badge>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </Card>
        </div>
        
        {/* App Info */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm pb-4 mt-6">
          <p>PayGrow v2.0.0</p>
          <p className="mt-1">© 2025 PayGrow Financial Services</p>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfileScreen;
