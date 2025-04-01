
import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Key, Bell, Shield, Smartphone, Languages, HelpCircle, Info, Lock, LogOut, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const SettingsScreen: React.FC = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Light Mode Enabled" : "Dark Mode Enabled",
      description: "Your app theme preference has been updated",
    });
  };
  
  const toggleBiometricAuth = () => {
    setBiometricAuth(!biometricAuth);
    toast({
      title: biometricAuth ? "Biometric Authentication Disabled" : "Biometric Authentication Enabled",
      description: "Your security settings have been updated",
    });
  };
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? "Notifications Disabled" : "Notifications Enabled",
      description: "Your notification preferences have been updated",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-paygrow-blue text-white sticky top-0 z-10">
        <div className="flex items-center pt-12 pb-4 px-5">
          <Link to="/profile" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>
      
      {/* Settings Sections */}
      <div className="px-5 py-6 space-y-6">
        {/* Appearance */}
        <div>
          <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-3 px-1">Appearance</h3>
          
          <Card className="rounded-xl overflow-hidden border-none shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                  {darkMode ? 
                    <Moon className="w-5 h-5 text-purple-600" /> : 
                    <Sun className="w-5 h-5 text-amber-500" />
                  }
                </div>
                <div>
                  <span className="font-medium">Dark Mode</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Change app appearance</p>
                </div>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </Card>
        </div>
        
        {/* Account Settings */}
        <div>
          <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-3 px-1">Account Settings</h3>
          
          <Card className="rounded-xl overflow-hidden border-none shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
            <Link to="/settings/profile" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <Key className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="font-medium">Personal Information</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage your profile details</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/settings/security" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="font-medium">Security</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage passwords & security</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-3">
                  <Smartphone className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="font-medium">Biometric Authentication</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Use fingerprint to login</p>
                </div>
              </div>
              <Switch 
                checked={biometricAuth} 
                onCheckedChange={toggleBiometricAuth}
              />
            </div>
          </Card>
        </div>
        
        {/* Notifications */}
        <div>
          <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-3 px-1">Notifications</h3>
          
          <Card className="rounded-xl overflow-hidden border-none shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <span className="font-medium">Push Notifications</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about updates</p>
                </div>
              </div>
              <Switch 
                checked={notificationsEnabled} 
                onCheckedChange={toggleNotifications}
              />
            </div>
            
            <Link to="/settings/notifications" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="font-medium">Notification Preferences</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Customize notification types</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </Card>
        </div>
        
        {/* More */}
        <div>
          <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-3 px-1">More</h3>
          
          <Card className="rounded-xl overflow-hidden border-none shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
            <Link to="/settings/language" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <Languages className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="font-medium">Language</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">English (US)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/help" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-3">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="font-medium">Help & Support</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">FAQ, contact support</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link to="/about" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                  <Info className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="font-medium">About PayGrow</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">App info, legal & policies</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </Card>
        </div>
        
        {/* Logout Button */}
        <div className="pt-4">
          <Link to="/login">
            <button className="w-full py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 font-medium flex items-center justify-center">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </Link>
        </div>
        
        <div className="text-center text-gray-500 dark:text-gray-400 text-xs mt-6">
          <p>PayGrow v2.0.0</p>
          <p className="mt-1">© 2025 PayGrow Financial Services</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
