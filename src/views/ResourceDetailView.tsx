import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { Resource, UserRole } from '@/types';
import ResourceCard from '@/components/home/ResourceCard';
import SEO from '@/components/SEO';

// Icons
const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
);
const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
);
const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const Verified = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

const ResourceDetailView: React.FC<{ resourceId?: string }> = ({ resourceId: propId }) => {
  const params = useParams<{ slugOrId: string }>();
  const navigate = useNavigate();
  const resolvedId = propId || params.slugOrId || '';
  
  const [resource, setResource] = useState<Resource | null>(null);
  const [related, setRelated] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (resolvedId) {
      loadData(resolvedId);
    }
    window.scrollTo(0, 0);
  }, [resolvedId]);

  const loadData = async (resourceId: string) => {
    setLoading(true);
    try {
      const data = await api.fetchResourceBySlugOrId(resourceId);
      if (data) {
          // Double check provider data enrichment
          if (!data.provider) {
             const prov = await api.getProviderByUserId(data.providerId) || await api.getProviderById(data.providerId);
             if (prov) {
                data.provider = {
                    firstName: prov.firstName || 'Unknown',
                    lastName: prov.lastName || 'Provider',
                    professionalTitle: prov.professionalTitle || 'Specialist',
                    imageUrl: prov.imageUrl || '',
                    bio: prov.bio || '',
                    email: prov.email || 'provider@evowell.com'
                };
             }
          }
          setResource(data);
          // Fetch related
          const all = await api.searchResources({ category: data.categories[0] });
          setRelated(all.filter(r => r.id !== data.id && r.status === 'published').slice(0, 4));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAccess = () => {
      if (!resource) return;
      if (resource.accessType === 'free') {
          if (resource.deliveryType === 'external_link' && resource.externalUrl) {
              window.open(resource.externalUrl, '_blank');
          } else if (resource.deliveryType === 'download' && resource.fileUrl) {
              const link = document.createElement('a');
              link.href = resource.fileUrl;
              link.setAttribute('download', `${resource.title.replace(/\s+/g, '-').toLowerCase()}`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          } else {
              alert("Resource content is not available.");
          }
      } else {
          alert("Secure checkout integration coming soon.");
      }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col">
          <h1 className="text-2xl font-bold text-slate-900">Resource Not Found</h1>
          <p className="text-slate-500 mt-2">The resource you are looking for does not exist.</p>
          <button onClick={() => navigate('/exchange')} className="mt-6 text-brand-600 font-bold hover:underline font-black uppercase text-xs tracking-widest">&larr; Back to Exchange</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <SEO 
        title={resource.title}
        description={resource.shortDescription}
        type="product"
        image={resource.thumbnailUrl}
        url={`/exchange/${resource.slug || resource.id}`}
      />
      {/* Dark Hero Section */}
      <section className="bg-slate-900 text-white pt-40 pb-72 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                <button onClick={() => navigate('/exchange')} className="hover:text-brand-400 transition-colors">Exchange</button>
                <span className="text-slate-800">/</span>
                <span className="text-brand-500 truncate max-w-[300px]">{resource.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
                <div>
                    <div className="flex flex-wrap items-center gap-4 mb-10">
                        <span className="bg-brand-500 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-500/30">
                            {resource.type}
                        </span>
                        {resource.categories.map(c => (
                            <span key={c} className="bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                                {c.replace('cat-', 'Category ')}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.9] filter drop-shadow-2xl">
                        {resource.title}
                    </h1>
                    <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl border-l-4 border-brand-500 pl-8 py-2">
                        {resource.shortDescription}
                    </p>
                </div>

                {/* Integrated Provider Section in Hero */}
                {resource.provider && (
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-2xl">
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 rounded-3xl bg-slate-100 overflow-hidden border-4 border-white/20 shadow-2xl rotate-3">
                                <img src={resource.provider.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-500 text-white rounded-xl flex items-center justify-center shadow-xl border-2 border-slate-900">
                                <Verified className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em] mb-2">Developed By</h3>
                            <p className="text-2xl font-black text-white mb-1">{resource.provider.firstName} {resource.provider.lastName}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{resource.provider.professionalTitle}</p>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed italic line-clamp-3 mb-6">
                                {resource.provider.bio || `"Specializing in evidence-based tools for mental health professionals and clients seeking long-term resilience."`}
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <button 
                                    onClick={() => navigate(`/provider/${resource.providerId}`)}
                                    className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-brand-500 hover:text-white"
                                >
                                    View Expert Profile
                                </button>
                                <a 
                                    href={`mailto:${resource.provider.email || 'provider@evowell.com'}`}
                                    className="px-6 py-3 bg-white/10 text-white border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/20"
                                >
                                    Email Provider
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </section>

      <main className="flex-grow pb-32 relative z-10 -mt-40">
        <div className="max-w-[1440px] mx-auto px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left: Main Content */}
                <div className="lg:col-span-8 space-y-24">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-slate-800 rounded-3xl overflow-hidden border-[10px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative group">
                        <img src={resource.thumbnailUrl} alt={resource.title} className="w-full h-full object-cover transition-transform duration-[3000ms] scale-105 group-hover:scale-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        
                        {/* Play button overlay if course/audio */}
                        {(resource.type === 'course' || resource.type === 'audio') && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/30 text-white transform group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                    <svg className="w-10 h-10 translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-16">
                        <div className="bg-white p-12 md:p-24 rounded-3xl border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px]"></div>
                            <h2 className="relative text-4xl font-black text-slate-900 uppercase tracking-tighter mb-12 pb-8 border-b border-slate-100 flex items-center gap-6">
                                <span className="w-12 h-1 bg-brand-500 rounded-full"></span>
                                Overview
                            </h2>
                            <div className="relative prose prose-slate max-w-none prose-p:text-xl prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:text-slate-900 prose-headings:font-black prose-strong:text-brand-600 prose-blockquote:border-brand-500 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-2xl">
                                {resource.fullDescription.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-4 px-8">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] w-full mb-2">Discovery Tags</span>
                            {resource.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-black text-slate-400 bg-white border border-slate-100 px-8 py-4 rounded-xl shadow-sm hover:border-brand-500 hover:text-brand-600 hover:shadow-lg hover:shadow-brand-500/10 transition-all cursor-default uppercase tracking-widest border-dashed">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar */}
                <div className="lg:col-span-4">
                    
                    {/* Access Card */}
                    <div className="bg-slate-900 p-12 rounded-3xl text-white shadow-[0_48px_96px_-24px_rgba(15,23,42,0.5)] sticky top-32 group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full -translate-y-8 translate-x-8 blur-2xl group-hover:bg-brand-500/30 transition-colors"></div>
                        
                        <div className="relative">
                            <div className="flex flex-col gap-2 mb-12">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Investment</span>
                                {resource.accessType === 'paid' ? (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-7xl font-black tracking-tighter">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: resource.currency, maximumFractionDigits: 0 }).format((resource.price || 0) / 100)}
                                        </span>
                                        <span className="text-xl text-slate-500 font-bold">.{String((resource.price || 0) % 100).padStart(2, '0')}</span>
                                    </div>
                                ) : (
                                    <span className="text-7xl font-black tracking-tighter text-brand-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">Free</span>
                                )}
                            </div>

                            <button 
                                onClick={handleAccess}
                                className="w-full py-8 bg-brand-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:bg-brand-600 transition-all shadow-2xl shadow-brand-500/40 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-4 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/10 -translate-x-full hover:translate-x-0 transition-transform duration-500"></div>
                                <span className="relative">{resource.accessType === 'paid' ? 'Purchase Now' : 'Access Material'}</span>
                                {resource.deliveryType === 'download' ? <Download className="w-6 h-6 relative" /> : <ExternalLink className="w-6 h-6 relative" />}
                            </button>

                            <div className="mt-16 space-y-8 pt-12 border-t border-white/5">
                                <div className="flex justify-between items-center group/meta">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset Format</span>
                                    <span className="text-xs font-bold text-white bg-white/5 px-4 py-2 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors uppercase">{resource.deliveryType.replace('_', ' ')}</span>
                                </div>
                                <div className="flex justify-between items-center group/meta">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Language</span>
                                    <span className="text-xs font-bold text-slate-200">{resource.languages.join(', ')}</span>
                                </div>
                                <div className="flex justify-between items-center group/meta">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Published</span>
                                    <span className="text-xs font-bold text-slate-200">{new Date(resource.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Slider / Grid */}
            {related.length > 0 && (
                <div className="mt-48">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-slate-200 pb-12">
                        <div>
                            <span className="text-[10px] font-black text-brand-600 uppercase tracking-[0.5em] mb-4 block">Expand your toolkit</span>
                            <h2 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">Related Resources</h2>
                        </div>
                        <button onClick={() => navigate('/exchange')} className="text-[11px] font-black text-slate-400 hover:text-brand-600 uppercase tracking-[0.3em] transition-colors flex items-center gap-4 group">
                            Browse all assets
                            <div className="w-12 h-px bg-slate-200 group-hover:bg-brand-500 transition-all group-hover:w-20"></div>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {related.map(r => (
                            <ResourceCard key={r.id} resource={r} />
                        ))}
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default ResourceDetailView;
