import { users } from './users';
import { providers } from './providers';
import { specialties } from './specialties';
import { insurance } from './insurance';
import { blogs, blogCategories } from './blogs';
import { testimonials } from './testimonials';
import { appointments } from './appointments';
import { tickets } from './tickets';
import { messages } from './messages';
import { jobs } from './jobs';
import { resources } from './resources';
import { clientProfiles } from './clientProfiles';

export const SEED_DATA = {
  users,
  providers,
  clientProfiles,
  specialties,
  insurance,
  blogs,
  testimonials,
  appointments,
  tickets,
  messages,
  jobs,
  categories: blogCategories,
  resources
};
