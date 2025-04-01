
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Camera, CheckCircle2, X, Lock, Mail, Phone, User, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditProfileScreen: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    dob: '1990-01-01',
    gender: 'Male',
    address: '123 Main Street, Bangalore, Karnataka',
    pincode: '560001',
    pan: 'ABCDE1234F',
    aadhaar: '1234 5678 9012'
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile details have been successfully updated.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Link to="/profile" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </Link>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
          <Button onClick={handleSave} size="sm" className="bg-paygrow-blue text-white">
            Save
          </Button>
        </div>
      </div>
      
      {/* Profile Picture Section */}
      <div className="bg-white p-6 flex flex-col items-center border-b">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-paygrow-blue text-white text-xl">JD</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 bg-paygrow-blue text-white p-1.5 rounded-full cursor-pointer shadow-md">
            <Camera className="h-4 w-4" />
          </div>
        </div>
        <h2 className="mt-3 font-medium text-lg">{formData.name}</h2>
        <p className="text-sm text-gray-500">{formData.email}</p>
      </div>
      
      {/* Tabs */}
      <div className="px-4 pb-20">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="kyc">KYC & Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="pt-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <User className="mr-2 h-4 w-4 text-paygrow-blue" />
                Basic Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => handleChange('name', e.target.value)} 
                    className="bg-gray-50 border-gray-200" 
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email</label>
                  <div className="flex">
                    <Input 
                      value={formData.email} 
                      onChange={(e) => handleChange('email', e.target.value)} 
                      className="bg-gray-50 border-gray-200" 
                      disabled
                    />
                    <Button size="sm" variant="outline" className="ml-2 whitespace-nowrap">
                      Verify
                    </Button>
                  </div>
                  <div className="flex items-center text-green-600 text-xs mt-1">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
                  <div className="flex">
                    <Input 
                      value={formData.phone} 
                      onChange={(e) => handleChange('phone', e.target.value)} 
                      className="bg-gray-50 border-gray-200" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Date of Birth</label>
                  <Input 
                    type="date"
                    value={formData.dob} 
                    onChange={(e) => handleChange('dob', e.target.value)} 
                    className="bg-gray-50 border-gray-200" 
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Gender</label>
                  <Select 
                    value={formData.gender}
                    onValueChange={(value) => handleChange('gender', value)}
                  >
                    <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <Mail className="mr-2 h-4 w-4 text-paygrow-blue" />
                Address Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Address</label>
                  <Input 
                    value={formData.address} 
                    onChange={(e) => handleChange('address', e.target.value)} 
                    className="bg-gray-50 border-gray-200" 
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Pincode</label>
                  <Input 
                    value={formData.pincode} 
                    onChange={(e) => handleChange('pincode', e.target.value)} 
                    className="bg-gray-50 border-gray-200" 
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="kyc" className="pt-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <Lock className="mr-2 h-4 w-4 text-paygrow-blue" />
                KYC Documents
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">PAN Card Number</label>
                  <div className="flex">
                    <Input 
                      value={formData.pan} 
                      onChange={(e) => handleChange('pan', e.target.value)} 
                      className="bg-gray-50 border-gray-200" 
                    />
                    <Button size="sm" variant="outline" className="ml-2 whitespace-nowrap">
                      Verify
                    </Button>
                  </div>
                  <div className="flex items-center text-green-600 text-xs mt-1">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Aadhaar Number</label>
                  <div className="flex">
                    <Input 
                      value={formData.aadhaar} 
                      onChange={(e) => handleChange('aadhaar', e.target.value)} 
                      className="bg-gray-50 border-gray-200" 
                    />
                    <Button size="sm" variant="outline" className="ml-2 whitespace-nowrap">
                      Verify
                    </Button>
                  </div>
                  <div className="flex items-center text-orange-600 text-xs mt-1">
                    <X className="h-3 w-3 mr-1" />
                    Verification Pending
                  </div>
                </div>
                
                <div className="pt-3">
                  <Button className="w-full bg-paygrow-blue">Complete KYC Verification</Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <Phone className="mr-2 h-4 w-4 text-paygrow-blue" />
                Bank Account Details
              </h3>
              
              <div className="p-6 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-center mb-3">
                  Add your bank account to start investing
                </p>
                <Button variant="outline">+ Add Bank Account</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditProfileScreen;
