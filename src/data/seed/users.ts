import { User, UserRole } from '../../types';
import { ADMIN_ID, PROV_ID_1, PROV_ID_2, PROV_ID_3, PROV_ID_4, CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3, TEST_ADMIN_ID, TEST_PROV_ID, TEST_CLIENT_ID } from './constants';

export const users: User[] = [
  // --- TEST USERS (For Manual Testing) ---
  {
    id: TEST_ADMIN_ID,
    email: 'admin-test@evowell.com',
    firstName: 'Test',
    lastName: 'Admin',
    role: UserRole.ADMIN,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false
  },
  {
    id: TEST_PROV_ID,
    email: 'provider@evowell.com',
    firstName: 'Test',
    lastName: 'Provider',
    role: UserRole.PROVIDER,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false
  },
  {
    id: TEST_CLIENT_ID,
    email: 'client@evowell.com',
    firstName: 'Test',
    lastName: 'Client',
    role: UserRole.CLIENT,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false
  },
  // --- END TEST USERS ---

  {
    id: ADMIN_ID,
    email: 'admin@evowell.com',
    firstName: 'System',
    lastName: 'Admin',
    role: UserRole.ADMIN,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    isDeleted: false
  },
  {
    id: PROV_ID_1,
    email: 'sarah.chen@evowell.com',
    firstName: 'Sarah',
    lastName: 'Chen',
    role: UserRole.PROVIDER,
    createdAt: '2023-02-15T10:00:00Z',
    updatedAt: '2023-11-20T14:30:00Z',
    isDeleted: false
  },
  {
    id: PROV_ID_2,
    email: 'marcus.thorne@evowell.com',
    firstName: 'Marcus',
    lastName: 'Thorne',
    role: UserRole.PROVIDER,
    createdAt: '2023-03-10T09:00:00Z',
    updatedAt: '2023-12-01T11:00:00Z',
    isDeleted: false
  },
  {
    id: PROV_ID_3,
    email: 'elena.vance@evowell.com',
    firstName: 'Elena',
    lastName: 'Vance',
    role: UserRole.PROVIDER,
    createdAt: '2023-01-20T15:00:00Z',
    updatedAt: '2023-10-05T16:20:00Z',
    isDeleted: false
  },
  {
    id: PROV_ID_4,
    email: 'james.wilson@evowell.com',
    firstName: 'James',
    lastName: 'Wilson',
    role: UserRole.PROVIDER,
    createdAt: '2023-05-12T08:00:00Z',
    updatedAt: '2023-09-15T09:45:00Z',
    isDeleted: false
  },
  {
    id: CLIENT_ID_1,
    email: 'alice.m@gmail.com',
    firstName: 'Alice',
    lastName: 'Miller',
    role: UserRole.CLIENT,
    createdAt: '2023-06-01T12:00:00Z',
    updatedAt: '2023-06-01T12:00:00Z',
    isDeleted: false
  },
  {
    id: CLIENT_ID_2,
    email: 'bob.davis@yahoo.com',
    firstName: 'Bob',
    lastName: 'Davis',
    role: UserRole.CLIENT,
    createdAt: '2023-07-15T14:30:00Z',
    updatedAt: '2023-08-20T10:00:00Z',
    isDeleted: false
  },
  {
    id: CLIENT_ID_3,
    email: 'charlie.t@outlook.com',
    firstName: 'Charlie',
    lastName: 'Thompson',
    role: UserRole.CLIENT,
    createdAt: '2023-08-01T09:15:00Z',
    updatedAt: '2023-08-01T09:15:00Z',
    isDeleted: false
  }
];
