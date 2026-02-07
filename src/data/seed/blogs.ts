import { BlogPost } from '../../types';
import { providers } from './providers';

export const blogCategories = [
  { id: 'cat-1', name: 'Mental Health', slug: 'mental-health' },
  { id: 'cat-2', name: 'Wellness', slug: 'wellness' },
  { id: 'cat-3', name: 'Nutrition', slug: 'nutrition' },
  { id: 'cat-4', name: 'Lifestyle', slug: 'lifestyle' },
  { id: 'cat-5', name: 'Design', slug: 'design' },
  { id: 'cat-6', name: 'Product', slug: 'product' }
];

export const blogs: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'science-of-sleep',
    title: 'The Science of Sleep: Why It Matters for Mental Health',
    summary: 'Understanding the bidirectional relationship between sleep quality and emotional regulation. Practical tips for better rest.',
    content: '<p>Sleep is not just a passive state of rest; it is an active period of neurological repair...</p><h3>The REM Cycle</h3><p>During REM sleep, our brains process emotional memories...</p>',
    category: 'Wellness',
    authorName: 'Dr. Sarah Chen',
    authorRole: 'Clinical Psychologist',
    authorImage: providers[1].imageUrl,
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=800',
    publishedAt: 'Oct 12, 2023',
    status: 'APPROVED',
    isFeatured: true,
    providerId: providers[1].id
  },
  {
    id: 'blog-2',
    slug: 'nutrition-and-mood',
    title: 'Gut-Brain Axis: How Food Affects Your Mood',
    summary: 'Exploring the connection between the microbiome and neurotransmitter production. What to eat for better mental clarity.',
    content: '<p>95% of your serotonin is produced in your gastrointestinal tract...</p>',
    category: 'Nutrition',
    authorName: 'James Wilson',
    authorRole: 'Clinical Nutritionist',
    authorImage: providers[4].imageUrl,
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    publishedAt: 'Nov 05, 2023',
    status: 'APPROVED',
    providerId: providers[4].id
  },
  {
    id: 'blog-3',
    slug: 'mindfulness-at-work',
    title: 'Micro-Mindfulness for Busy Professionals',
    summary: 'You don\'t need 20 minutes to meditate. Learn how 30-second resets can lower cortisol levels instantly.',
    content: '<p>Stress in the corporate world is endemic...</p>',
    category: 'Lifestyle',
    authorName: 'Elena Vance',
    authorRole: 'Wellness Coach',
    authorImage: providers[3].imageUrl,
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    publishedAt: 'Dec 01, 2023',
    status: 'PENDING',
    providerId: providers[3].id
  },
  {
    id: 'blog-4',
    slug: 'understanding-trauma',
    title: 'Understanding Complex Trauma',
    summary: 'Distinguishing between PTSD and C-PTSD, and the pathways to recovery through somatic experiencing.',
    content: '<p>Trauma is not just in the event, but in the nervous system...</p>',
    category: 'Mental Health',
    authorName: 'Dr. Marcus Thorne',
    authorRole: 'Psychiatrist',
    authorImage: providers[2].imageUrl,
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1620065406085-7d8d21b5f7e6?auto=format&fit=crop&q=80&w=800',
    publishedAt: 'Jan 10, 2024',
    status: 'APPROVED',
    providerId: providers[2].id
  },
  {
    id: 'blog-5',
    slug: 'benefits-of-coaching',
    title: 'Therapy vs. Coaching: Which Do You Need?',
    summary: 'A breakdown of the differences between clinical therapy and goal-oriented coaching.',
    content: '<p>While therapy often looks back to heal, coaching looks forward to build...</p>',
    category: 'Wellness',
    authorName: 'Elena Vance',
    authorRole: 'Wellness Coach',
    authorImage: providers[3].imageUrl,
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800',
    publishedAt: 'Feb 15, 2024',
    status: 'APPROVED',
    providerId: providers[3].id
  },
  {
    id: 'blog-6',
    slug: 'digital-detox',
    title: 'The Art of the Digital Detox',
    summary: 'Reclaiming your attention span in an economy designed to distract you.',
    content: '<p>Screen time is correlated with higher rates of anxiety...</p>',
    category: 'Lifestyle',
    authorName: 'EvoWell Editorial',
    authorRole: 'Admin',
    authorImage: 'https://i.pravatar.cc/150?u=admin',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=800',
    publishedAt: 'Mar 01, 2024',
    status: 'APPROVED'
  }
];
