import React from 'react';
import { Resource } from '@/types';
import { useNavigation } from '@/App';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { navigate } = useNavigation();

  return (
    <div 
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`#/exchange/${resource.slug || resource.id}`)}
    >
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img 
            src={resource.thumbnailUrl || 'https://via.placeholder.com/400x300'} 
            alt={resource.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            {resource.accessType === 'paid' ? (
                <span className="text-slate-900">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: resource.currency }).format((resource.price || 0) / 100)}
                </span>
            ) : (
                <span className="text-green-600">Free</span>
            )}
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="bg-slate-900/80 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                {resource.type}
            </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2 flex items-center gap-2">
           {/* Provider Avatar Mini */}
           <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
             {/* If we have provider info in resource, show it. Otherwise placeholder */}
             <div className="w-full h-full bg-brand-500 flex items-center justify-center text-[8px] text-white font-bold">
                P
             </div>
           </div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Provider Resource</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
            {resource.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
            {resource.shortDescription}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-2">
                {resource.categories.slice(0, 2).map(c => (
                    <span key={c} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-md">
                        {c.replace('cat-', 'Category ')}
                    </span>
                ))}
            </div>
            <button className="text-xs font-black uppercase tracking-widest text-brand-600 group-hover:underline">
                View
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
