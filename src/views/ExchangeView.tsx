import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '@/services/api';
import { Resource, ResourceType } from '@/types';
import ResourceCard from '@/components/home/ResourceCard';

const RESOURCE_TYPES: { value: ResourceType; label: string }[] = [
  { value: 'course', label: 'Course' },
  { value: 'template', label: 'Template' },
  { value: 'worksheet', label: 'Worksheet' },
  { value: 'mood_board', label: 'Mood Board' },
  { value: 'toolkit', label: 'Toolkit' },
  { value: 'guide', label: 'Guide' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'audio', label: 'Audio' }
];

const ExchangeView: React.FC = () => {
  const location = useLocation();
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedAccess, setSelectedAccess] = useState<string>('');
  
  useEffect(() => {
    const loadAll = async () => {
        setIsLoading(true);
        try {
            const data = await api.getAllResources();
            setAllResources(data.filter(r => r.status === 'published' && r.visibility === 'public'));
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    loadAll();
  }, []);

  const filteredResources = useMemo(() => {
      return allResources.filter(r => {
          const matchesQuery = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesType = !selectedType || r.type === selectedType;
          const matchesAccess = !selectedAccess || r.accessType === selectedAccess;
          return matchesQuery && matchesType && matchesAccess;
      });
  }, [allResources, searchQuery, selectedType, selectedAccess]);

  const featuredResources = useMemo(() => {
      // Logic for featured: e.g. highest downloads or specific flag
      return [...allResources].sort((a, b) => b.downloads - a.downloads).slice(0, 3);
  }, [allResources]);

  const isFiltering = !!searchQuery || !!selectedType || !!selectedAccess;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar and Footer are handled by PublicLayout */}
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-32 pb-24 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Provider Exchange</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Professional tools, clinical templates, and courses created by verified specialists for the EvoWell community.
            </p>
            
            <div className="max-w-2xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search worksheets, guides, courses..." 
                    className="relative w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none backdrop-blur-xl transition-all font-bold text-lg"
                />
                <svg className="w-6 h-6 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>
      </section>

      {/* Sticky Filters Bar */}
      <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
          <div className="max-w-[1440px] mx-auto px-6 py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Horizontal Scrollable Filters */}
                  <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                      <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Type</span>
                          <button 
                            onClick={() => setSelectedType('')}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${selectedType === '' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                          >
                            All
                          </button>
                          {RESOURCE_TYPES.map(type => (
                              <button 
                                key={type.value}
                                onClick={() => setSelectedType(type.value)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${selectedType === type.value ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                              >
                                {type.label}
                              </button>
                          ))}
                      </div>

                      <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

                      <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Access</span>
                          <button 
                            onClick={() => setSelectedAccess('')}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${selectedAccess === '' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                          >
                            Any
                          </button>
                          <button 
                            onClick={() => setSelectedAccess('free')}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${selectedAccess === 'free' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                          >
                            Free
                          </button>
                          <button 
                            onClick={() => setSelectedAccess('paid')}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${selectedAccess === 'paid' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                          >
                            Paid
                          </button>
                      </div>
                  </div>

                  {isFiltering && (
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedType(''); setSelectedAccess(''); }} 
                        className="text-[10px] font-black text-slate-400 hover:text-brand-600 uppercase tracking-widest transition-colors flex items-center gap-2"
                      >
                        Reset Filters
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                  )}
              </div>
          </div>
      </div>

      {/* Main Container matching Navbar width */}
      <div className="max-w-[1440px] mx-auto w-full px-6 py-16">
          
          {!isFiltering && !isLoading && (
              <div className="mb-20 space-y-24">
                  {/* Featured Row */}
                  <section>
                      <div className="flex items-end justify-between mb-10">
                          <div>
                              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Featured Tools</h2>
                              <p className="text-slate-500 font-medium mt-1">Most popular resources this month</p>
                          </div>
                          <button 
                            onClick={() => {
                                // Since we don't have a "featured" filter, we just reset others to show all sorted
                                setSelectedType('');
                                setSelectedAccess('');
                                window.scrollTo({ top: 600, behavior: 'smooth' });
                            }}
                            className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] hover:underline"
                          >
                            Browse All &rarr;
                          </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {featuredResources.map(r => <ResourceCard key={r.id} resource={r} />)}
                      </div>
                  </section>

                  {/* Clinical Templates (Horizontal Row) */}
                  <section>
                      <div className="flex items-end justify-between mb-10 border-b border-slate-100 pb-6">
                          <div>
                              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Clinical Templates</h2>
                              <p className="text-slate-500 font-medium mt-1">Ready-to-use intake forms and mental status exams</p>
                          </div>
                          <button 
                            onClick={() => {
                                setSelectedType('template');
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] hover:underline"
                          >
                            View All &rarr;
                          </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {allResources.filter(r => r.type === 'template').slice(0, 4).map(r => <ResourceCard key={r.id} resource={r} />)}
                      </div>
                  </section>

                  {/* Worksheets & Guides */}
                  <section>
                      <div className="flex items-end justify-between mb-10 border-b border-slate-100 pb-6">
                          <div>
                              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Worksheets & Guides</h2>
                              <p className="text-slate-500 font-medium mt-1">Evidence-based handouts for your clients</p>
                          </div>
                          <button 
                            onClick={() => {
                                setSelectedType('worksheet');
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] hover:underline"
                          >
                            View All &rarr;
                          </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {allResources.filter(r => r.type === 'worksheet' || r.type === 'guide').slice(0, 4).map(r => <ResourceCard key={r.id} resource={r} />)}
                      </div>
                  </section>
              </div>
          )}

          <main>
            {/* Resources Grid */}
            <div className="mt-8">
                {isFiltering && (
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-900">Search Results ({filteredResources.length})</h2>
                        <button onClick={() => { setSearchQuery(''); setSelectedType(''); setSelectedAccess(''); }} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Reset All</button>
                    </div>
                )}
                
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-[4/3] bg-white rounded-3xl border border-slate-100 animate-pulse shadow-sm"></div>
                        ))}
                    </div>
                ) : filteredResources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResources.map(resource => (
                            <ResourceCard key={resource.id} resource={resource} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-200 border-dashed shadow-sm">
                        <p className="text-slate-400 font-bold mb-4">No resources match your current selection.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedType(''); setSelectedAccess(''); }} className="bg-slate-900 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all">Clear Filters</button>
                    </div>
                )}
            </div>
          </main>
      </div>
    </div>
  );
};

export default ExchangeView;
