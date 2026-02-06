import React, { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../services/api';
import { useNavigation } from '../App';
import { BlogPost } from '../types';
import Breadcrumb from '../components/Breadcrumb';
import { sanitizeHTML } from '../utils/content-sanitizer';
import { Section, Container } from '../components/layout';
import { Heading, Text, Label } from '../components/typography';
import { Button, Card, Badge, Tag } from '../components/ui';

/* ─── Reading progress bar ───────────────────────────────────────────── */

const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent pointer-events-none">
      <div
        className="h-full bg-brand-500 transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

/* ─── Loading skeleton ───────────────────────────────────────────────── */

const ArticleSkeleton: React.FC = () => (
  <div className="bg-white min-h-screen animate-pulse">
    <div className="pt-32 pb-12">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
        <div className="flex justify-center gap-3"><div className="h-6 w-20 bg-slate-100 rounded-full" /><div className="h-6 w-28 bg-slate-50 rounded-full" /></div>
        <div className="h-10 w-3/4 mx-auto bg-slate-100 rounded-xl" />
        <div className="h-10 w-1/2 mx-auto bg-slate-100 rounded-xl" />
        <div className="h-5 w-2/3 mx-auto bg-slate-50 rounded-lg" />
        <div className="flex justify-center items-center gap-3 pt-4"><div className="w-11 h-11 bg-slate-100 rounded-full" /><div className="h-4 w-24 bg-slate-50 rounded-lg" /></div>
      </div>
    </div>
    <div className="max-w-5xl mx-auto px-6"><div className="aspect-[21/9] bg-slate-100 rounded-[3rem]" /></div>
    <div className="max-w-3xl mx-auto px-6 pt-16 space-y-4">
      {[...Array(8)].map((_, i) => <div key={i} className={`h-4 bg-slate-50 rounded-lg ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/5'}`} />)}
    </div>
  </div>
);

/* ─── Share helpers ───────────────────────────────────────────────────── */

const shareActions = [
  {
    label: 'Copy link',
    icon: '🔗',
    action: () => {
      navigator.clipboard?.writeText(window.location.href);
    },
  },
  {
    label: 'Twitter',
    icon: '𝕏',
    action: (title: string) => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    },
  },
  {
    label: 'LinkedIn',
    icon: 'in',
    action: () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
    },
  },
  {
    label: 'Email',
    icon: '✉',
    action: (title: string) => {
      window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`, '_self');
    },
  },
];

/* ─── Main view ──────────────────────────────────────────────────────── */

const BlogDetailsView: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useNavigation();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [latest, setLatest] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [sanitizedContent, setSanitizedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    Promise.all([
      api.getBlogBySlug(slug),
      api.getAllBlogs({ limit: 100 }),
    ]).then(([b, allResponse]) => {
      const all = allResponse.data || [];
      setBlog(b || null);
      if (b && b.content) {
        setSanitizedContent(sanitizeHTML(b.content));
      }
      // Related: same category first, then others, exclude current
      const others = all.filter(x => x.slug !== slug && x.status === 'APPROVED');
      const sameCategory = others.filter(x => x.category === b?.category);
      const different = others.filter(x => x.category !== b?.category);
      setLatest([...sameCategory, ...different].slice(0, 3));
      setLoading(false);
    });
  }, [slug]);

  const formatDate = useCallback((dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }, []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleSubscribe = useCallback(() => {
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  }, [email]);

  if (loading) return <ArticleSkeleton />;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
        <span className="text-5xl">📄</span>
        <Heading level={2}>Article not found</Heading>
        <Text color="muted" className="text-center max-w-md">
          This article may have been removed or the link might be incorrect.
        </Text>
        <Button variant="secondary" onClick={() => navigate('#/blog')}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <ReadingProgressBar />
      <Breadcrumb items={[{ label: 'Blog', href: '#/blog' }, { label: blog.category || 'Article' }]} />

      <Section spacing="sm">
        <Container size="content">
          {/* ── Article header ────────────────────────────────── */}
          <header className="max-w-3xl mx-auto text-center mb-12 pt-4">
            <div className="flex items-center gap-3 mb-6 justify-center flex-wrap">
              <Badge variant="brand">{blog.category}</Badge>
              {blog.readTime && <Label variant="badge" color="muted">{blog.readTime}</Label>}
              <Label variant="badge" color="muted">{formatDate(blog.publishedAt)}</Label>
            </div>

            <Heading level={1} size="display" className="mb-8 leading-[1.15]">{blog.title}</Heading>

            {blog.summary && (
              <Text variant="lead" color="secondary" className="mb-10 max-w-2xl mx-auto">{blog.summary}</Text>
            )}

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
               {blog.authorImage && (
                 <img src={blog.authorImage} className="w-12 h-12 rounded-full border-2 border-slate-50 shadow-sm object-cover" alt={blog.authorName || ''} />
               )}
               <div className="text-left">
                  <Text variant="small" weight="bold">{blog.authorName}</Text>
                  {blog.authorRole && <Text variant="caption" color="muted">{blog.authorRole}</Text>}
               </div>
            </div>
          </header>

          {/* ── Hero image ────────────────────────────────────── */}
          {blog.imageUrl && (
            <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-20 shadow-xl border border-slate-100 max-w-5xl mx-auto">
               <img src={blog.imageUrl} className="w-full h-full object-cover" alt={blog.title} />
            </div>
          )}

          {/* ── Body ──────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-16 items-start max-w-5xl mx-auto">

            {/* Share sidebar */}
            <aside className="hidden lg:block w-14 shrink-0 sticky top-28">
              <div className="flex flex-col items-center gap-3">
                <Label variant="overline" color="muted" className="mb-1 text-[9px] text-center">Share</Label>
                {shareActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (action.label === 'Copy link') {
                        handleCopyLink();
                      } else {
                        action.action(blog.title);
                      }
                    }}
                    title={action.label}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm transition-all ${
                      action.label === 'Copy link' && copied
                        ? 'bg-brand-50 border-brand-200 text-brand-600'
                        : 'border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    {action.label === 'Copy link' && copied ? '✓' : action.icon}
                  </button>
                ))}
              </div>
            </aside>

            {/* Article content */}
            <article ref={articleRef} className="flex-grow max-w-3xl min-w-0">
              <div
                className="prose prose-slate prose-lg max-w-none
                  prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                  prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed
                  prose-a:text-brand-600 hover:prose-a:text-brand-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-brand-300 prose-blockquote:bg-brand-50/30 prose-blockquote:rounded-r-2xl prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic
                  prose-img:rounded-2xl prose-img:shadow-md
                  prose-li:marker:text-brand-400
                  prose-strong:text-slate-800
                  prose-code:text-brand-600 prose-code:bg-brand-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />

              {/* ── Mobile share row ─────────────────────────── */}
              <div className="flex items-center gap-3 mt-12 pt-8 border-t border-slate-100 lg:hidden">
                <Label variant="overline" color="muted" className="mr-2">Share</Label>
                {shareActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (action.label === 'Copy link') handleCopyLink();
                      else action.action(blog.title);
                    }}
                    className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all"
                  >
                    {action.icon}
                  </button>
                ))}
              </div>

              {/* ── Tags ─────────────────────────────────────── */}
              {(blog as any).tags && (blog as any).tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-8 mt-10 border-t border-slate-100">
                  {(blog as any).tags.map((tag: string) => (
                    <Tag key={tag} onSelect={() => navigate(`#/blog?category=${encodeURIComponent(tag)}`)}>{tag}</Tag>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 pt-8 mt-10 border-t border-slate-100">
                  {[blog.category, 'Wellness', 'Mental Health'].filter(Boolean).map((tag, i) => (
                    <Tag key={i}>{tag}</Tag>
                  ))}
                </div>
              )}

              {/* ── Newsletter CTA ───────────────────────────── */}
              <div className="mt-16 relative rounded-[2rem] overflow-hidden border border-slate-200 bg-white">
                {/* Accent strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-emerald-400 to-brand-500" />
                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <div className="relative z-10 p-8 lg:p-10">
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                    {/* Icon + text */}
                    <div className="flex gap-4 items-start flex-1">
                      <div className="hidden sm:flex w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 mb-1">Enjoyed this article?</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">Get evidence-based wellness strategies delivered weekly.</p>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="w-full sm:w-auto sm:min-w-[320px]">
                      {subscribed ? (
                        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-center">
                          <p className="text-brand-800 font-bold text-sm">✓ You're on the list!</p>
                        </div>
                      ) : (
                        <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-200 focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all">
                           <input
                              type="email"
                              placeholder="you@email.com"
                              className="flex-grow bg-transparent border-none text-slate-800 px-4 py-2.5 placeholder:text-slate-400 focus:ring-0 outline-none text-sm font-medium min-w-0"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                           />
                           <button
                             onClick={handleSubscribe}
                             className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-sm whitespace-nowrap"
                           >
                             Subscribe
                           </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* ── Related articles ──────────────────────────────── */}
          {latest.length > 0 && (
            <div className="mt-28 pt-16 border-t border-slate-100 max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-10">
                <Heading level={2}>More to read</Heading>
                <Button variant="ghost" onClick={() => navigate('#/blog')}>View All →</Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {latest.map(post => (
                  <div
                    key={post.id}
                    onClick={() => navigate(`#/blog/${post.slug}`)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[16/10] rounded-[1.75rem] overflow-hidden mb-5 shadow-sm border border-slate-100 bg-slate-50 relative">
                       <img
                         src={post.imageUrl}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         alt={post.title}
                         loading="lazy"
                       />
                       <div className="absolute top-3 left-3">
                          <Badge variant="neutral" className="bg-white/90 backdrop-blur-md shadow-sm text-[10px]">{post.category}</Badge>
                       </div>
                    </div>
                    <Label variant="badge" color="muted" className="mb-2">{formatDate(post.publishedAt)}</Label>
                    <Heading level={4} className="mb-2 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </Heading>
                    <Text variant="small" color="muted" className="line-clamp-2">{post.summary}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default BlogDetailsView;