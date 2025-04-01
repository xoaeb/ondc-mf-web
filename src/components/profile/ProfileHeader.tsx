
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Shield, Award, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from '@/components/ui/motion';

interface ProfileHeaderProps {
  name: string;
  email: string;
  phoneNumber: string;
  kycStatus: 'verified' | 'pending' | 'incomplete';
  avatarUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  phoneNumber,
  kycStatus,
  avatarUrl
}) => {
  return (
    <motion.div
      className="bg-gradient-to-r from-paygrow-blue to-blue-600 text-white rounded-b-3xl shadow-lg pt-14 pb-6 px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center mb-5">
        <Avatar className="h-16 w-16 border-2 border-white/60 shadow-md">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback className="bg-blue-400 text-white text-lg">
              {name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{name}</h2>
            <Link to="/profile/edit">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full">
                <Edit2 className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-white/80">{email}</p>
          <p className="text-sm text-white/80">{phoneNumber}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 backdrop-blur-sm">
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-white/90" />
          <div>
            <p className="text-sm font-medium">KYC Status</p>
            <div className="flex items-center mt-0.5">
              <Badge className={`${
                kycStatus === 'verified' ? 'bg-green-500' : 
                kycStatus === 'pending' ? 'bg-amber-500' : 'bg-red-500'
              } rounded-full text-xs`}>
                {kycStatus === 'verified' ? 'Verified' : 
                 kycStatus === 'pending' ? 'Pending' : 'Incomplete'}
              </Badge>
              
              {kycStatus !== 'verified' && (
                <Link to="/profile/kyc" className="ml-2 text-xs underline text-white/80">
                  Complete now
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {kycStatus === 'verified' && (
          <div className="flex items-center bg-green-500/20 px-2 py-1 rounded-full">
            <Award className="h-3.5 w-3.5 mr-1 text-green-200" />
            <span className="text-xs">Verified User</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
