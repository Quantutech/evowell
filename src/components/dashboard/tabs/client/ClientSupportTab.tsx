import React from 'react';
import { User } from '@/types';
import SupportChat from '@/components/dashboard/shared/SupportChat';

interface ClientSupportTabProps {
  user: User;
}

const ClientSupportTab: React.FC<ClientSupportTabProps> = ({ user }) => {
  return (
    <SupportChat 
      user={user} 
      title="Patient Support" 
      statusLabel="Live Help" 
      activeColor="blue" 
    />
  );
};

export default ClientSupportTab;
