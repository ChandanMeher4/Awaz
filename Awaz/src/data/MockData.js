// src/data/mockData.js

// --- MOCK ANONYMOUS USER ID ---
export const CURRENT_USER_ID = 'current-user-123';

export const mockComplaints = [
  {
    id: 'C-001',
    userId: 'another-user-456',
    category: 'Ragging',
    description: 'Senior students in B-Hostel are forcing juniors to do tasks. It happened yesterday in room 201.',
    priority: 'High',
    status: 'New',
    date: '2025-10-17',
    chat: [], // <-- ADD THIS
  },
  {
    id: 'C-002',
    userId: 'current-user-123',
    category: 'Campus Issue',
    description: 'The water cooler on the 3rd floor of the library is broken and leaking.',
    priority: 'Medium',
    status: 'In Progress',
    date: '2025-10-17',
    chat: [ // <-- Let's add a sample message here!
      { sender: 'admin', text: 'Thank you for reporting. Can you confirm if this is still an issue?', time: '10:30 AM' }
    ],
  },
  {
    id: 'C-005',
    userId: 'current-user-123',
    category: 'Campus Issue',
    description: 'The hygiene in the mess hall is very poor. Found a hair in my food.',
    priority: 'Medium',
    status: 'Resolved',
    date: '2025-10-15',
    chat: [], // <-- ADD THIS
  },
];

export const mockPosts = [
  // ... (Your mockPosts array is unchanged)
  {
    id: 1,
    userId: 'current-user-123',
    user: 'AnonymousPanda',
    icon: '🐼',
    title: 'Mess food quality is getting worse',
    description: 'Anyone else notice this? The dal has been watery all week...',
    mediaUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1740&auto=format&fit=crop',
    mediaType: 'image',
    likes: 22,
    comments: [
      { user: 'Student42', text: 'Totally agree!' },
      { user: 'AnonymousLion', text: 'I heard they changed the vendor.' },
    ],
    pollOptions: ['Yes, it\'s much worse', 'No, it seems the same', 'It\'s actually better']
  },
  {
    id: 2,
    userId: 'another-user-789',
    user: 'QuietFox',
    icon: '🦊',
    title: 'Wi-Fi in B-Block Hostel',
    description: 'The Wi-Fi has been down for 3 days...',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaType: 'video',
    likes: 45,
    comments: [
      { user: 'Student99', text: 'Same in C-Block!' },
    ],
    pollOptions: []
  }
];