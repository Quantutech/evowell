import { seedUsers, seedProviders, seedBlogs, seedSpecialties, seedTestimonials } from '../seed/core';
import { generateMockData } from '../mock/factories';

const isProd = (import.meta as any).env?.PROD;
const isDev = (import.meta as any).env?.DEV;

export const loadInitialData = () => {
  // Check if we already have data in localStorage
  const stored = localStorage.getItem('evowell_mock_store');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Auto-clear on 1 week in production
      if (isProd && parsed.lastUpdated) {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - parsed.lastUpdated > oneWeek) {
          console.log('🕒 Production data expired, resetting...');
          localStorage.removeItem('evowell_mock_store');
        } else {
          return parsed;
        }
      } else {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse stored mock data', e);
    }
  }

  console.log(`🌱 Loading initial data (${isProd ? 'Production' : 'Development'} mode)...`);

  let users = [...seedUsers];
  let providers = [...seedProviders];
  let blogs = [...seedBlogs];

  if (isDev) {
    // In Dev, add 25-30 realistic mock records
    const mock = generateMockData(25);
    users = [...users, ...mock.users];
    providers = [...providers, ...mock.providers];
    blogs = [...blogs, ...mock.blogs];
  } else {
    // In Prod/Staging, keep it minimal as requested (5 providers, 3 blogs)
    // We already have some in seed, add a few more from factory if needed
    const extraMock = generateMockData(4); // To reach ~5 providers total
    users = [...users, ...extraMock.users.slice(0, 4)];
    providers = [...providers, ...extraMock.providers.slice(0, 4)];
    blogs = [...blogs, ...extraMock.blogs.slice(0, 2)];
  }

  const initialStore = {
    users,
    providers,
    blogs,
    specialties: seedSpecialties,
    testimonials: seedTestimonials,
    lastUpdated: Date.now(),
    isDemoMode: true
  };

  localStorage.setItem('evowell_mock_store', JSON.stringify(initialStore));
  return initialStore;
};
