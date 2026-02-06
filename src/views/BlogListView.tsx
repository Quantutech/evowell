import React, { useState, useEffect, useRef, useMemo } from 'react';
import { api } from '../services/api';
import { useNavigation, useAuth } from '../App';
import { BlogPost, UserRole } from '../types';
import Breadcrumb from '../components/Breadcrumb';
import { PageHero, Section, Container, Grid } from '../components/layout';
import { Button, Card, CardBody, Badge, Tag } from '../components/ui';
import { Heading, Text, Label } from '../components/typography';

/* ─── Loading skeleton ───────────────────────────────────────────────── */

const BlogSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-16">
    {/* Featured skeleton */}
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="aspect-video lg:aspect-auto bg-slate-100" />
        <div className="p-10 lg:p-16 space-y-4">
          <div className="flex gap-3"><div className="h-6 w-20 bg-slate-100 rounded-full" /><div className="h-6 w-32 bg-slate-50 rounded-full" /></div>
          <div className="h-8 w-3/4 bg-slate-100 rounded-xl" />
          <div className="h-8 w-1/2 bg-slate-100 rounded-xl" />
          <div className="h-4 w-full bg-slate-50 rounded-lg" />
          <div className="h-4 w-5/6 bg-slate-50 rounded-lg" />
          <div className="flex items-center gap-3 pt-4"><div className="w-10 h-10 bg-slate-100 rounded-full" /><div className="h-4 w-24 bg-slate-50 rounded-lg" /></div>
        </div>
      </div>
    </div>
    {/* Grid skeleton */}
    <div className="grid md:grid-cols-3 gap-8">
      {[0, 1, 2].map(i => (
        <div key={i} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
          <div className="aspect-[4/3] bg-slate-100" />
          <div className="p-6 space-y-3"><div className="h-4 w-24 bg-slate-50 rounded-full" /><div className="h-5 w-full bg-slate-100 rounded-lg" /><div className="h-4 w-3/4 bg-slate-50 rounded-lg" /></div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Main view ──────────────────────────────────────────────────────── */

const BlogListView: React.FC = () => {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('View all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    api.getAllBlogs().then(data => {
      const visibleBlogs = data.filter(b => b.status === 'APPROVED' || user?.role === UserRole.ADMIN);
      setBlogs(visibleBlogs);
      setLoading(false);
    });
  }, [user]);

  // Reveal animation
  useEffect(() => {
    if (loading) return;
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 },
    );
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observerRef.current?.observe(el));
    }, 100);
    return () => { clearTimeout(timer); observerRef.current?.disconnect(); };
  }, [loading, activeCategory, searchQuery]);

  // ── Derived data ────────────────────────────────────────────

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    const approved = blogs.filter(b => b.status === 'APPROVED');
    approved.forEach(b => {
      if (b.category) counts.set(b.category, (counts.get(b.category) || 0) + 1);
    });
    return counts;
  }, [blogs]);

  const categories = useMemo(() => {
    const cats = Array.from(categoryCounts.keys()).sort();
    return ['View all', ...cats];
  }, [categoryCounts]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const matchesCategory = activeCategory === 'View all' || b.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesQuery = !q ||
        b.title.toLowerCase().includes(q) ||
        (b.summary || '').toLowerCase().includes(q) ||
        (b.authorName || '').toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [blogs, activeCategory, searchQuery]);

  const featured = useMemo(
    () => filteredBlogs.find(b => b.isFeatured && b.status === 'APPROVED') || filteredBlogs[0],
    [filteredBlogs],
  );

  const regularPosts = useMemo(
    () => filteredBlogs.filter(b => b.id !== featured?.id),
    [filteredBlogs, featured],
  );

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const handleNewsletterSubmit = () => {
    if (!newsletterEmail) return;
    setNewsletterSent(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSent(false), 4000);
  };

  return (
    <div className="bg-[#fbfcff] min-h-screen">
      <Breadcrumb items={[{ label: 'Wellness Blog' }]} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        overline="Our Blog"
        title="Resources & Insights"
        description="The latest clinical news, wellness strategies, and community stories."
        variant="left-aligned"
        actions={
          user?.role === UserRole.ADMIN ? (
            <Button variant="primary" onClick={() => navigate('#/dashboard')}>Admin Console</Button>
          ) : undefined
        }
      />

      <Section spacing="md" background="default">
        <Container>
          {loading ? (
            <BlogSkeleton />
          ) : (
            <>
              {/* ── Featured post ─────────────────────────────── */}
              {featured && (
                <Card
                  variant="default"
                  size="lg"
                  className="mb-16 p-0 overflow-hidden cursor-pointer group reveal"
                  onClick={() => navigate(`#/blog/${featured.slug}`)}
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="aspect-video lg:aspect-auto overflow-hidden relative bg-slate-100">
                      <img
                        src={featured.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        alt={featured.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {/* Featured badge */}
                      {featured.isFeatured && (
                        <div className="absolute top-5 left-5">
                          <Badge variant="brand" className="bg-brand-500 text-white shadow-lg">✦ Featured</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-10 lg:p-14 flex flex-col justify-center relative bg-white">
                      <div className="flex items-center gap-3 mb-5 flex-wrap">
                         <Badge variant="brand">{featured.category}</Badge>
                         <Label variant="badge" color="muted">{featured.readTime}</Label>
                         <Label variant="badge" color="muted">{formatDate(featured.publishedAt)}</Label>
                         {featured.status && featured.status !== 'APPROVED' && (
                           <Badge variant="warning">{featured.status}</Badge>
                         )}
                      </div>
                      <Heading level={2} className="mb-5 group-hover:text-brand-600 transition-colors leading-tight">
                        {featured.title}
                      </Heading>
                      <Text variant="lead" className="mb-8 line-clamp-3 text-slate-500">{featured.summary}</Text>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                           <img src={featured.authorImage} className="w-11 h-11 rounded-full border-2 border-slate-50 shadow-sm object-cover" alt="" />
                           <div>
                              <Text variant="small" weight="bold">{featured.authorName}</Text>
                              <Text variant="caption" color="muted">{featured.authorRole}</Text>
                           </div>
                        </div>
                        <span className="text-brand-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          Read article →
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* ── Filter bar ────────────────────────────────── */}
              <div className="flex flex-col lg:flex-row justify-between gap-4 mb-10 sticky top-20 z-20 bg-[#fbfcff]/95 backdrop-blur-sm py-3 -mx-2 px-2 reveal">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
                  {categories.map(cat => {
                    const count = cat === 'View all' ? blogs.filter(b => b.status === 'APPROVED').length : categoryCounts.get(cat) || 0;
                    return (
                      <Tag
                        key={cat}
                        selected={activeCategory === cat}
                        onSelect={() => setActiveCategory(cat)}
                      >
                        {cat}
                        {count > 0 && (
                          <span className={`ml-1.5 text-[10px] ${activeCategory === cat ? 'opacity-70' : 'text-slate-400'}`}>
                            {count}
                          </span>
                        )}
                      </Tag>
                    );
                  })}
                </div>
                <div className="relative w-full lg:w-72 group shrink-0">
                   <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                   <input
                      type="text"
                      placeholder="Search articles…"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-700 placeholder:font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-300 outline-none shadow-sm transition-all"
                   />
                   {searchQuery && (
                     <button
                       onClick={() => setSearchQuery('')}
                       className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-xs transition-colors"
                     >
                       ×
                     </button>
                   )}
                </div>
              </div>

              {/* ── Results summary ───────────────────────────── */}
              {(searchQuery || activeCategory !== 'View all') && (
                <div className="flex items-center gap-3 mb-6 reveal">
                  <Text variant="small" color="muted" className="font-semibold">
                    {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
                    {searchQuery && <> matching "<span className="text-slate-700">{searchQuery}</span>"</>}
                    {activeCategory !== 'View all' && <> in <span className="text-slate-700">{activeCategory}</span></>}
                  </Text>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('View all'); }}
                    className="text-xs font-bold text-brand-500 hover:text-brand-700 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* ── Post grid ─────────────────────────────────── */}
              {regularPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 reveal">
                  {regularPosts.map(post => (
                    <Card
                      key={post.id}
                      className="cursor-pointer group flex flex-col h-full p-0 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      onClick={() => navigate(`#/blog/${post.slug}`)}
                    >
                      <div className="aspect-[4/3] overflow-hidden relative border-b border-slate-100 bg-slate-50">
                         <img
                           src={post.imageUrl}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                           alt={post.title}
                           loading="lazy"
                         />
                         <div className="absolute top-4 left-4">
                            <Badge variant="neutral" className="bg-white/90 backdrop-blur-md shadow-sm">{post.category}</Badge>
                         </div>
                         {post.status && post.status !== 'APPROVED' && (
                           <div className="absolute top-4 right-4">
                             <Badge variant="warning">{post.status}</Badge>
                           </div>
                         )}
                      </div>
                      <CardBody className="p-6 flex flex-col flex-1">
                        <Label variant="badge" color="muted" className="mb-3">
                          {formatDate(post.publishedAt)}{post.readTime ? ` · ${post.readTime}` : ''}
                        </Label>
                        <Heading level={4} className="mb-3 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </Heading>
                        <Text variant="small" color="muted" className="line-clamp-2 mb-6">{post.summary}</Text>
                        <div className="flex items-center gap-3 pt-4 border-t border-slate-50 mt-auto">
                           <img src={post.authorImage} className="w-8 h-8 rounded-full border border-slate-100 object-cover" alt="" />
                           <div className="min-w-0">
                              <Text variant="caption" weight="bold" className="truncate">{post.authorName}</Text>
                              <Text variant="caption" color="muted" className="text-[10px] truncate">{post.authorRole}</Text>
                           </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : featured === undefined ? (
                <div className="text-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 reveal">
                  <span className="text-4xl block mb-4">📝</span>
                  <Text color="muted" weight="bold" className="mb-2">No articles match your criteria.</Text>
                  <Text variant="small" color="muted" className="mb-6">Try a different category or clear your search.</Text>
                  <Button variant="secondary" size="sm" onClick={() => { setSearchQuery(''); setActiveCategory('View all'); }}>
                    Clear Filters
                  </Button>
                </div>
              ) : null}

              {/* ── Newsletter CTA ────────────────────────────── */}
              <div className="mt-24 reveal">
                <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white">
                  {/* Accent strip */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-emerald-400 to-brand-500" />
                  {/* Subtle dot pattern */}
                  <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  <div className="relative z-10 p-10 lg:p-14 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
                    {/* Left: icon + text */}
                    <div className="flex-1 flex gap-5 items-start">
                      <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-2">Stay ahead of the curve</h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                          Evidence-based wellness strategies, provider spotlights, and new resources — delivered weekly.
                        </p>
                      </div>
                    </div>

                    {/* Right: input */}
                    <div className="w-full lg:w-auto lg:min-w-[380px]">
                      {newsletterSent ? (
                        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 text-center">
                          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-2">
                            <span className="text-brand-600 text-lg">✓</span>
                          </div>
                          <p className="text-brand-800 font-bold text-sm">You're on the list!</p>
                          <p className="text-brand-600 text-xs mt-1">Check your inbox for a confirmation.</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-200 focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all">
                             <input
                                type="email"
                                placeholder="you@email.com"
                                className="flex-grow bg-transparent border-none text-slate-800 px-4 py-3 placeholder:text-slate-400 focus:ring-0 outline-none text-sm font-medium min-w-0"
                                value={newsletterEmail}
                                onChange={e => setNewsletterEmail(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleNewsletterSubmit()}
                             />
                             <button
                               onClick={handleNewsletterSubmit}
                               className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-sm whitespace-nowrap"
                             >
                               Subscribe
                             </button>
                          </div>
                          <p className="text-slate-400 text-[11px] pl-2">No spam. Unsubscribe anytime.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default BlogListView;