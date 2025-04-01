
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, AlertCircle, Bell, DollarSign, Calendar, Info } from 'lucide-react';
import { motion } from '@/components/ui/motion';

export interface NotificationItemProps {
  id: string;
  type: 'transaction' | 'investment' | 'alert' | 'reminder' | 'promotion' | 'system';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  link?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  type,
  title,
  description,
  time,
  isRead,
  link
}) => {
  const getIconByType = () => {
    switch(type) {
      case 'transaction':
        return { icon: <DollarSign className="h-6 w-6" />, color: 'bg-green-100 text-green-600' };
      case 'investment':
        return { icon: <TrendingUp className="h-6 w-6" />, color: 'bg-blue-100 text-blue-600' };
      case 'alert':
        return { icon: <AlertCircle className="h-6 w-6" />, color: 'bg-red-100 text-red-600' };
      case 'reminder':
        return { icon: <Calendar className="h-6 w-6" />, color: 'bg-purple-100 text-purple-600' };
      case 'promotion':
        return { icon: <Bell className="h-6 w-6" />, color: 'bg-yellow-100 text-yellow-600' };
      default:
        return { icon: <Info className="h-6 w-6" />, color: 'bg-gray-100 text-gray-600' };
    }
  };
  
  const { icon, color } = getIconByType();
  const ContainerComponent = link ? Link : 'div';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ContainerComponent
        to={link || '#'}
        className={`flex items-start p-4 ${!isRead ? 'bg-blue-50/30' : ''} hover:bg-gray-50 transition-colors`}
      >
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mr-3 flex-shrink-0`}>
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`font-medium ${!isRead ? 'text-black' : 'text-gray-800'}`}>{title}</h4>
            {!isRead && <div className="w-2 h-2 rounded-full bg-paygrow-blue"></div>}
          </div>
          <p className="text-sm text-gray-600 mb-1">{description}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </ContainerComponent>
    </motion.div>
  );
};

export default NotificationItem;
