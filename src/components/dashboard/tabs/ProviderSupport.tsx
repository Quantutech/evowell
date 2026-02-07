import React from 'react';
import { User } from '@/types';
import SupportChat from '@/components/dashboard/shared/SupportChat';

interface ProviderSupportProps {
  user: User;
}

const ProviderSupport: React.FC<ProviderSupportProps> = ({ user }) => {
  return (
    <SupportChat 
      user={user} 
      title="Live Support" 
      statusLabel="Online" 
      activeColor="brand" 
    />
  );
};

export default ProviderSupport;
