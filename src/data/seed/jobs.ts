import { JobPosting } from '../../types';

export const jobs: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    postedAt: '2 days ago',
    description: 'We are looking for a Senior React Engineer to lead our frontend architecture.',
    responsibilities: ['Build reusable components', 'Optimize performance', 'Mentor juniors'],
    requirements: ['5+ years React', 'TypeScript mastery', 'Tailwind CSS']
  },
  {
    id: 'job-2',
    title: 'Clinical Operations Manager',
    department: 'Operations',
    location: 'New York, NY',
    type: 'Full-time',
    postedAt: '1 week ago',
    description: 'Oversee our provider network and ensure clinical quality standards.',
    responsibilities: ['Vetting new providers', 'Manage support team', 'Ensure compliance'],
    requirements: ['Clinical background', 'Operations experience', 'Strong communication']
  },
  {
    id: 'job-3',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Contract',
    postedAt: '3 days ago',
    description: 'Help us design the future of tele-wellness interfaces.',
    responsibilities: ['User research', 'UI/UX design', 'Prototyping'],
    requirements: ['Figma expert', 'Healthcare experience preferred', 'Portfolio required']
  }
];
