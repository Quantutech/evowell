import React from 'react';
import Pagination from '../../../ui/Pagination';

interface AdminTableLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const AdminTableLayout: React.FC<AdminTableLayoutProps> = ({ 
  header, 
  children, 
  page, 
  totalPages, 
  onPageChange, 
  isLoading 
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 flex flex-col">
      {header}

      <div className="overflow-x-auto min-h-[400px]">
        {children}
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50/30">
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
