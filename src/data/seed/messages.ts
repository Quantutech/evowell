import { Message } from '../../types';
import { PROV_ID_1, PROV_ID_2, CLIENT_ID_1, CLIENT_ID_2 } from './constants';

export const messages: Message[] = [
  // Thread 1: Alice (Client) <-> Sarah (Provider)
  {
    id: 'msg-1',
    conversation_id: `thread-${[CLIENT_ID_1, PROV_ID_1].sort().join('-')}`,
    sender_id: CLIENT_ID_1,
    receiver_id: PROV_ID_1,
    content: 'Hi Dr. Chen, I am interested in your anxiety relief bundle.',
    created_at: '2024-03-01T09:00:00Z',
    is_read: true
  },
  {
    id: 'msg-2',
    conversation_id: `thread-${[CLIENT_ID_1, PROV_ID_1].sort().join('-')}`,
    sender_id: PROV_ID_1,
    receiver_id: CLIENT_ID_1,
    content: 'Hello Alice, I would be happy to help. Have you had a consultation before?',
    created_at: '2024-03-01T09:30:00Z',
    is_read: true
  },
  {
    id: 'msg-3',
    conversation_id: `thread-${[CLIENT_ID_1, PROV_ID_1].sort().join('-')}`,
    sender_id: CLIENT_ID_1,
    receiver_id: PROV_ID_1,
    content: 'No, this would be my first time.',
    created_at: '2024-03-01T09:35:00Z',
    is_read: true
  },
  {
    id: 'msg-4',
    conversation_id: `thread-${[CLIENT_ID_1, PROV_ID_1].sort().join('-')}`,
    sender_id: PROV_ID_1,
    receiver_id: CLIENT_ID_1,
    content: 'Great. Please book an initial intake session through the calendar.',
    created_at: '2024-03-01T09:40:00Z',
    is_read: false
  },

  // Thread 2: Bob (Client) <-> Marcus (Provider)
  {
    id: 'msg-5',
    conversation_id: `thread-${[CLIENT_ID_2, PROV_ID_2].sort().join('-')}`,
    sender_id: CLIENT_ID_2,
    receiver_id: PROV_ID_2,
    content: 'Dr. Thorne, do you have any evening availability?',
    created_at: '2024-03-05T18:00:00Z',
    is_read: true
  },
  {
    id: 'msg-6',
    conversation_id: `thread-${[CLIENT_ID_2, PROV_ID_2].sort().join('-')}`,
    sender_id: PROV_ID_2,
    receiver_id: CLIENT_ID_2,
    content: 'Hi Bob, I strictly work 1-6pm. I can refer you to a colleague if needed.',
    created_at: '2024-03-06T09:00:00Z',
    is_read: true
  },

  // Thread 3: Sarah (Provider) <-> System (Admin)
  {
    id: 'msg-7',
    conversation_id: `thread-${[PROV_ID_1, 'system'].sort().join('-')}`,
    sender_id: PROV_ID_1,
    receiver_id: 'system',
    content: 'Hello support, I need to update my NPI number.',
    created_at: '2024-02-20T10:00:00Z',
    is_read: true
  },
  {
    id: 'msg-8',
    conversation_id: `thread-${[PROV_ID_1, 'system'].sort().join('-')}`,
    sender_id: 'system',
    receiver_id: PROV_ID_1,
    content: 'Hi Sarah, you can do that in the Settings tab under Business & Compliance.',
    created_at: '2024-02-20T10:05:00Z',
    is_read: true
  },
  {
    id: 'msg-9',
    conversation_id: `thread-${[PROV_ID_1, 'system'].sort().join('-')}`,
    sender_id: PROV_ID_1,
    receiver_id: 'system',
    content: 'Found it, thank you!',
    created_at: '2024-02-20T10:10:00Z',
    is_read: true
  }
];
