export interface LeadershipMember {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  status: 'Completed' | 'Upcoming' | 'In Progress';
  location: string;
}

export interface ClubMemberPreview {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  joinedDate: string;
  avatar: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'club' | 'president' | 'student' | 'event' | 'alert';
}

export interface Club {
  id: string;
  name: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Literary' | 'Entrepreneurship' | 'Social' | 'Creative' | 'Engineering';
  logo: string;
  president: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  membersCount: number;
  eventsCount: number;
  status: 'Active' | 'Pending' | 'Inactive' | 'Suspended';
  createdDate: string;
  description: string;
  engagementRate: number;
  budgetAllocated: number;
  budgetSpent: number;
  meetingSchedule: string;
  leadership: LeadershipMember[];
  recentEvents: ClubEvent[];
  recentMembers: ClubMemberPreview[];
  recentActivities: ActivityItem[];
}

export interface PresidentPermissions {
  clubManagement: boolean;
  eventManagement: boolean;
  memberManagement: boolean;
  announcements: boolean;
  budgetAccess: boolean;
  analyticsExport: boolean;
}

export interface President {
  id: string;
  name: string;
  email: string;
  avatar: string;
  clubId: string;
  clubName: string;
  studentId: string;
  department: string;
  year: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joinedDate: string;
  clubMembers: number;
  eventsCreated: number;
  announcements: number;
  engagement: string;
  permissions: PresidentPermissions;
  recentActivity: ActivityItem[];
}

export interface StudentClubAffiliation {
  id: string;
  clubId: string;
  clubName: string;
  role: 'General Member' | 'Core Team' | 'Volunteer' | 'Lead Designer' | 'Coordinator';
  joinedDate: string;
}

export interface StudentEventAttendance {
  id: string;
  title: string;
  clubName: string;
  date: string;
  status: 'Attended' | 'Registered' | 'Absent';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  studentId: string;
  department: string;
  year: string;
  clubsJoined: number;
  eventsJoined: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinedDate: string;
  participationRate: string;
  clubs: StudentClubAffiliation[];
  events: StudentEventAttendance[];
  activity: ActivityItem[];
}

// --------------------------------------------------------------------------
// MOCK DATA: CLUBS
// --------------------------------------------------------------------------
export const mockClubs: Club[] = [
  {
    id: 'coding-club',
    name: 'Coding Club',
    category: 'Technical',
    logo: '💻',
    president: {
      id: 'pres-1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 284,
    eventsCount: 18,
    status: 'Active',
    createdDate: '12 Sep 2024',
    description: 'Empowering software craftsmanship, hackathons, open-source development, and peer code reviews across departments.',
    engagementRate: 94,
    budgetAllocated: 45000,
    budgetSpent: 38200,
    meetingSchedule: 'Wednesdays & Fridays at 5:30 PM (CS Lab 3)',
    leadership: [
      { name: 'Rahul Sharma', role: 'President', email: 'rahul.sharma@campus.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { name: 'Aditya Verma', role: 'Vice President', email: 'aditya.v@campus.edu', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Sneha Roy', role: 'Technical Lead', email: 'sneha.r@campus.edu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
      { name: 'Karthik Rao', role: 'Operations & Events', email: 'karthik.r@campus.edu', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    ],
    recentEvents: [
      { id: 'ev-1', title: 'HackSprint 2026: 24h Hackathon', date: '28 Sep 2026', time: '10:00 AM', attendees: 180, status: 'Completed', location: 'Main Auditorium' },
      { id: 'ev-2', title: 'Fullstack Next.js 16 Workshop', date: '04 Oct 2026', time: '04:00 PM', attendees: 120, status: 'Completed', location: 'Lab 4' },
      { id: 'ev-3', title: 'Google Summer of Code Info Session', date: '15 Oct 2026', time: '05:30 PM', attendees: 95, status: 'Upcoming', location: 'Seminar Hall 2' },
    ],
    recentMembers: [
      { id: 'mem-1', name: 'Tanmay Bhat', email: 'tanmay.b@campus.edu', department: 'Computer Science', year: '2nd Year', joinedDate: '01 Oct 2026', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { id: 'mem-2', name: 'Ishita Gupta', email: 'ishita.g@campus.edu', department: 'Information Tech', year: '3rd Year', joinedDate: '28 Sep 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' },
      { id: 'mem-3', name: 'Rohan Mehra', email: 'rohan.m@campus.edu', department: 'Electronics', year: '1st Year', joinedDate: '25 Sep 2026', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
    ],
    recentActivities: [
      { id: 'act-1', title: 'Annual HackSprint Concluded', description: 'Awarded 3 top student teams with ₹50,000 in sponsor prizes.', timestamp: '2 hours ago', type: 'event' },
      { id: 'act-2', title: 'New Core Team Member Appointed', description: 'Sneha Roy promoted to Technical Lead.', timestamp: '1 day ago', type: 'club' },
      { id: 'act-3', title: 'Semester Budget Request Approved', description: 'Budget of ₹45,000 validated by Student Council.', timestamp: '3 days ago', type: 'alert' },
    ],
  },
  {
    id: 'robotics-club',
    name: 'Robotics Club',
    category: 'Engineering',
    logo: '🤖',
    president: {
      id: 'pres-2',
      name: 'Priya Patel',
      email: 'priya.patel@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 231,
    eventsCount: 14,
    status: 'Active',
    createdDate: '18 Aug 2024',
    description: 'Hardware prototyping, autonomous systems, ROS2 programming, and robotic combat tournaments.',
    engagementRate: 91,
    budgetAllocated: 60000,
    budgetSpent: 52000,
    meetingSchedule: 'Tuesdays & Thursdays at 6:00 PM (Robotics Lab)',
    leadership: [
      { name: 'Priya Patel', role: 'President', email: 'priya.patel@campus.edu', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Kunal Deshmukh', role: 'Hardware Lead', email: 'kunal.d@campus.edu', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
    ],
    recentEvents: [
      { id: 'ev-4', title: 'RoboWars Campus Championship', date: '20 Sep 2026', time: '11:00 AM', attendees: 210, status: 'Completed', location: 'Indoor Sports Arena' },
      { id: 'ev-5', title: 'Embedded C & Arduino Bootcamp', date: '18 Oct 2026', time: '04:00 PM', attendees: 80, status: 'Upcoming', location: 'ECE Seminar Room' },
    ],
    recentMembers: [
      { id: 'mem-4', name: 'Varun Joshi', email: 'varun.j@campus.edu', department: 'Mechanical', year: '2nd Year', joinedDate: '02 Oct 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    ],
    recentActivities: [
      { id: 'act-4', title: 'National Championship Qualification', description: 'Robotics team qualified for Top 10 Nationals.', timestamp: '5 hours ago', type: 'event' },
    ],
  },
  {
    id: 'ai-ml-club',
    name: 'AI & ML Club',
    category: 'Technical',
    logo: '🧠',
    president: {
      id: 'pres-3',
      name: 'Devansh Mehta',
      email: 'devansh.m@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 245,
    eventsCount: 16,
    status: 'Active',
    createdDate: '05 Jan 2025',
    description: 'Deep learning research, LLM application development, Kaggle competitions, and computer vision workshops.',
    engagementRate: 89,
    budgetAllocated: 50000,
    budgetSpent: 34000,
    meetingSchedule: 'Mondays at 5:00 PM (AI Research Lab)',
    leadership: [
      { name: 'Devansh Mehta', role: 'President', email: 'devansh.m@campus.edu', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    ],
    recentEvents: [
      { id: 'ev-6', title: 'Fine-tuning Open Source LLMs Hands-on', date: '01 Oct 2026', time: '03:00 PM', attendees: 140, status: 'Completed', location: 'Virtual & Lab 2' },
    ],
    recentMembers: [],
    recentActivities: [
      { id: 'act-5', title: 'Paper accepted at IEEE Student Track', description: 'Collaborative club project published successfully.', timestamp: '1 day ago', type: 'club' },
    ],
  },
  {
    id: 'photography-club',
    name: 'Photography Club',
    category: 'Creative',
    logo: '📸',
    president: {
      id: 'pres-4',
      name: 'Ananya Verma',
      email: 'ananya.v@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 198,
    eventsCount: 11,
    status: 'Active',
    createdDate: '10 Feb 2025',
    description: 'Visual storytelling, darkroom printing, digital post-production, campus media coverage, and photo walks.',
    engagementRate: 86,
    budgetAllocated: 30000,
    budgetSpent: 22000,
    meetingSchedule: 'Saturdays at 7:00 AM (Outdoor/Campus Amphitheatre)',
    leadership: [
      { name: 'Ananya Verma', role: 'President', email: 'ananya.v@campus.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    ],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
  {
    id: 'drama-society',
    name: 'Drama Society',
    category: 'Cultural',
    logo: '🎭',
    president: {
      id: 'pres-5',
      name: 'Arjun Reddy',
      email: 'arjun.r@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 176,
    eventsCount: 9,
    status: 'Active',
    createdDate: '15 Mar 2025',
    description: 'Street play, stage drama, scriptwriting, voice modulation, and inter-collegiate theatre festivals.',
    engagementRate: 82,
    budgetAllocated: 35000,
    budgetSpent: 31000,
    meetingSchedule: 'Daily 6:30 PM (Amphitheatre Stage)',
    leadership: [
      { name: 'Arjun Reddy', role: 'President', email: 'arjun.r@campus.edu', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    ],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
  {
    id: 'entrepreneurship-cell',
    name: 'Entrepreneurship Cell',
    category: 'Entrepreneurship',
    logo: '🚀',
    president: {
      id: 'pres-6',
      name: 'Meera Nair',
      email: 'meera.n@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 165,
    eventsCount: 12,
    status: 'Active',
    createdDate: '22 Apr 2025',
    description: 'Fostering campus startups, angel investor demo days, pitch decks, and legal incubation support.',
    engagementRate: 88,
    budgetAllocated: 55000,
    budgetSpent: 42000,
    meetingSchedule: 'Fridays at 4:00 PM (Incubation Centre)',
    leadership: [
      { name: 'Meera Nair', role: 'President', email: 'meera.n@campus.edu', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
    ],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
  {
    id: 'music-club',
    name: 'Music Club (Symphony)',
    category: 'Cultural',
    logo: '🎵',
    president: {
      id: 'pres-7',
      name: 'Rohan Gupta',
      email: 'rohan.g@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 142,
    eventsCount: 8,
    status: 'Active',
    createdDate: '01 Jun 2025',
    description: 'Vocal training, acoustic jam sessions, campus rock shows, and indie music recording.',
    engagementRate: 80,
    budgetAllocated: 28000,
    budgetSpent: 19500,
    meetingSchedule: 'Mondays & Thursdays at 7:00 PM (Music Studio)',
    leadership: [],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
  {
    id: 'debate-society',
    name: 'Debate Society',
    category: 'Literary',
    logo: '🎙️',
    president: {
      id: 'pres-8',
      name: 'Kavya Iyer',
      email: 'kavya.i@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 118,
    eventsCount: 7,
    status: 'Active',
    createdDate: '14 Jul 2025',
    description: 'Parliamentary debates, MUN delegations, policy analysis, and rhetoric development.',
    engagementRate: 78,
    budgetAllocated: 20000,
    budgetSpent: 14000,
    meetingSchedule: 'Tuesdays at 5:00 PM (Council Hall)',
    leadership: [],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
  {
    id: 'sports-club',
    name: 'Sports & Athletics Club',
    category: 'Sports',
    logo: '⚽',
    president: {
      id: 'pres-9',
      name: 'Siddharth Sen',
      email: 'siddharth.s@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 310,
    eventsCount: 15,
    status: 'Active',
    createdDate: '08 Aug 2025',
    description: 'Inter-department leagues, athletic fitness camps, badminton, football, and cricket tournaments.',
    engagementRate: 85,
    budgetAllocated: 65000,
    budgetSpent: 59000,
    meetingSchedule: 'Daily 6:00 AM & 5:00 PM (Sports Complex)',
    leadership: [],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
  {
    id: 'aeromodelling-club',
    name: 'Aeromodelling Club',
    category: 'Engineering',
    logo: '✈️',
    president: {
      id: 'pres-10',
      name: 'Tanvi Joshi',
      email: 'tanvi.j@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 92,
    eventsCount: 5,
    status: 'Pending',
    createdDate: '14 Sep 2026',
    description: 'RC plane fabrication, drone mapping, quadcopter telemetry, and aerodynamics simulation.',
    engagementRate: 72,
    budgetAllocated: 40000,
    budgetSpent: 8000,
    meetingSchedule: 'Sundays at 8:00 AM (Campus Ground)',
    leadership: [],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
  {
    id: 'social-impact-cell',
    name: 'Social Impact Cell',
    category: 'Social',
    logo: '🌱',
    president: {
      id: 'pres-11',
      name: 'Nikhil Rathi',
      email: 'nikhil.r@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 135,
    eventsCount: 6,
    status: 'Active',
    createdDate: '20 Oct 2025',
    description: 'Community volunteering, rural teaching drives, blood donation camps, and eco-sustainability drives.',
    engagementRate: 75,
    budgetAllocated: 25000,
    budgetSpent: 16500,
    meetingSchedule: 'Weekends (Off-campus / Common Hall)',
    leadership: [],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
  {
    id: 'crypto-web3-guild',
    name: 'Web3 & Blockchain Guild',
    category: 'Technical',
    logo: '⛓️',
    president: {
      id: 'pres-12',
      name: 'Aakash Singhania',
      email: 'aakash.s@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    },
    membersCount: 78,
    eventsCount: 4,
    status: 'Inactive',
    createdDate: '15 Nov 2025',
    description: 'Smart contract development, Solidity audit sessions, and decentralized protocol research.',
    engagementRate: 54,
    budgetAllocated: 20000,
    budgetSpent: 4000,
    meetingSchedule: 'Bi-weekly on Saturdays (Virtual)',
    leadership: [],
    recentEvents: [],
    recentMembers: [],
    recentActivities: [],
  },
];

// --------------------------------------------------------------------------
// MOCK DATA: PRESIDENTS
// --------------------------------------------------------------------------
export const mockPresidents: President[] = [
  {
    id: 'pres-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    clubId: 'coding-club',
    clubName: 'Coding Club',
    studentId: 'STU-2023-014',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    status: 'Active',
    joinedDate: '01 Aug 2024',
    clubMembers: 284,
    eventsCreated: 18,
    announcements: 42,
    engagement: '94%',
    permissions: {
      clubManagement: true,
      eventManagement: true,
      memberManagement: true,
      announcements: true,
      budgetAccess: true,
      analyticsExport: true,
    },
    recentActivity: [
      { id: 'pa-1', title: 'Submitted Event Proposal', description: 'Filed authorization for HackSprint 2026', timestamp: '1 day ago', type: 'event' },
      { id: 'pa-2', title: 'Approved 14 New Member Applications', description: 'Batch induction review completed', timestamp: '3 days ago', type: 'student' },
      { id: 'pa-3', title: 'Updated Club Constitution', description: 'Added peer code guidelines to charter', timestamp: '1 week ago', type: 'club' },
    ],
  },
  {
    id: 'pres-2',
    name: 'Priya Patel',
    email: 'priya.patel@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    clubId: 'robotics-club',
    clubName: 'Robotics Club',
    studentId: 'STU-2023-088',
    department: 'Electronics & Communication',
    year: '4th Year',
    status: 'Active',
    joinedDate: '15 Aug 2024',
    clubMembers: 231,
    eventsCreated: 14,
    announcements: 31,
    engagement: '91%',
    permissions: {
      clubManagement: true,
      eventManagement: true,
      memberManagement: true,
      announcements: true,
      budgetAccess: true,
      analyticsExport: true,
    },
    recentActivity: [
      { id: 'pa-4', title: 'Secured Component Lab Sponsorship', description: 'Acquired 10 microcontroller evaluation kits', timestamp: '2 days ago', type: 'club' },
    ],
  },
  {
    id: 'pres-3',
    name: 'Devansh Mehta',
    email: 'devansh.m@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    clubId: 'ai-ml-club',
    clubName: 'AI & ML Club',
    studentId: 'STU-2024-003',
    department: 'Data Science & AI',
    year: '2nd Year',
    status: 'Active',
    joinedDate: '05 Jan 2025',
    clubMembers: 245,
    eventsCreated: 16,
    announcements: 28,
    engagement: '89%',
    permissions: {
      clubManagement: true,
      eventManagement: true,
      memberManagement: true,
      announcements: true,
      budgetAccess: false,
      analyticsExport: true,
    },
    recentActivity: [],
  },
  {
    id: 'pres-4',
    name: 'Ananya Verma',
    email: 'ananya.v@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    clubId: 'photography-club',
    clubName: 'Photography Club',
    studentId: 'STU-2023-112',
    department: 'Design & Visual Arts',
    year: '3rd Year',
    status: 'Active',
    joinedDate: '10 Feb 2025',
    clubMembers: 198,
    eventsCreated: 11,
    announcements: 19,
    engagement: '86%',
    permissions: {
      clubManagement: true,
      eventManagement: true,
      memberManagement: true,
      announcements: true,
      budgetAccess: true,
      analyticsExport: false,
    },
    recentActivity: [],
  },
  {
    id: 'pres-5',
    name: 'Arjun Reddy',
    email: 'arjun.r@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    clubId: 'drama-society',
    clubName: 'Drama Society',
    studentId: 'STU-2022-045',
    department: 'Humanities & Social Sciences',
    year: '4th Year',
    status: 'Active',
    joinedDate: '15 Mar 2025',
    clubMembers: 176,
    eventsCreated: 9,
    announcements: 25,
    engagement: '82%',
    permissions: {
      clubManagement: true,
      eventManagement: true,
      memberManagement: true,
      announcements: true,
      budgetAccess: true,
      analyticsExport: false,
    },
    recentActivity: [],
  },
  {
    id: 'pres-6',
    name: 'Meera Nair',
    email: 'meera.n@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    clubId: 'entrepreneurship-cell',
    clubName: 'Entrepreneurship Cell',
    studentId: 'STU-2023-201',
    department: 'Management & Business Studies',
    year: '3rd Year',
    status: 'Active',
    joinedDate: '22 Apr 2025',
    clubMembers: 165,
    eventsCreated: 12,
    announcements: 38,
    engagement: '88%',
    permissions: {
      clubManagement: true,
      eventManagement: true,
      memberManagement: true,
      announcements: true,
      budgetAccess: true,
      analyticsExport: true,
    },
    recentActivity: [],
  },
  {
    id: 'pres-10',
    name: 'Tanvi Joshi',
    email: 'tanvi.j@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    clubId: 'aeromodelling-club',
    clubName: 'Aeromodelling Club',
    studentId: 'STU-2024-118',
    department: 'Aeronautical Engineering',
    year: '2nd Year',
    status: 'Pending',
    joinedDate: '14 Sep 2026',
    clubMembers: 92,
    eventsCreated: 5,
    announcements: 8,
    engagement: '72%',
    permissions: {
      clubManagement: false,
      eventManagement: true,
      memberManagement: false,
      announcements: true,
      budgetAccess: false,
      analyticsExport: false,
    },
    recentActivity: [],
  },
  {
    id: 'pres-12',
    name: 'Aakash Singhania',
    email: 'aakash.s@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    clubId: 'crypto-web3-guild',
    clubName: 'Web3 & Blockchain Guild',
    studentId: 'STU-2023-339',
    department: 'Computer Science',
    year: '3rd Year',
    status: 'Suspended',
    joinedDate: '15 Nov 2025',
    clubMembers: 78,
    eventsCreated: 4,
    announcements: 6,
    engagement: '54%',
    permissions: {
      clubManagement: false,
      eventManagement: false,
      memberManagement: false,
      announcements: false,
      budgetAccess: false,
      analyticsExport: false,
    },
    recentActivity: [],
  },
];

// --------------------------------------------------------------------------
// MOCK DATA: STUDENTS
// --------------------------------------------------------------------------
export const mockStudents: Student[] = [
  {
    id: 'stu-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    studentId: 'CS-2023-042',
    department: 'Computer Science',
    year: '3rd Year',
    clubsJoined: 3,
    eventsJoined: 12,
    status: 'Active',
    joinedDate: '15 Sep 2024',
    participationRate: '94%',
    clubs: [
      { id: 'sc-1', clubId: 'coding-club', clubName: 'Coding Club', role: 'Core Team', joinedDate: '15 Sep 2024' },
      { id: 'sc-2', clubId: 'ai-ml-club', clubName: 'AI & ML Club', role: 'General Member', joinedDate: '10 Oct 2024' },
      { id: 'sc-3', clubId: 'photography-club', clubName: 'Photography Club', role: 'General Member', joinedDate: '02 Feb 2025' },
    ],
    events: [
      { id: 'se-1', title: 'HackSprint 2026', clubName: 'Coding Club', date: '28 Sep 2026', status: 'Attended' },
      { id: 'se-2', title: 'Fine-tuning Open Source LLMs', clubName: 'AI & ML Club', date: '01 Oct 2026', status: 'Attended' },
      { id: 'se-3', title: 'Campus Photo Walk', clubName: 'Photography Club', date: '22 Aug 2026', status: 'Attended' },
      { id: 'se-4', title: 'RoboWars Championship', clubName: 'Robotics Club', date: '20 Sep 2026', status: 'Registered' },
    ],
    activity: [
      { id: 'sa-1', title: 'Checked in at HackSprint 2026', description: 'Verified via QR scanner at Entrance A', timestamp: '2 days ago', type: 'event' },
      { id: 'sa-2', title: 'Joined AI & ML Club Discussion', description: 'Participated in Research Round', timestamp: '4 days ago', type: 'student' },
      { id: 'sa-3', title: 'Earned Open Source Contributor Badge', description: 'Completed 5 pull requests in club repo', timestamp: '1 week ago', type: 'alert' },
    ],
  },
  {
    id: 'stu-2',
    name: 'Diya Sengupta',
    email: 'diya.s@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    studentId: 'EC-2023-109',
    department: 'Electronics & Communication',
    year: '3rd Year',
    clubsJoined: 2,
    eventsJoined: 9,
    status: 'Active',
    joinedDate: '20 Sep 2024',
    participationRate: '88%',
    clubs: [
      { id: 'sc-4', clubId: 'robotics-club', clubName: 'Robotics Club', role: 'Coordinator', joinedDate: '20 Sep 2024' },
      { id: 'sc-5', clubId: 'debate-society', clubName: 'Debate Society', role: 'General Member', joinedDate: '15 Jan 2025' },
    ],
    events: [
      { id: 'se-5', title: 'RoboWars Campus Championship', clubName: 'Robotics Club', date: '20 Sep 2026', status: 'Attended' },
    ],
    activity: [],
  },
  {
    id: 'stu-3',
    name: 'Kabir Nair',
    email: 'kabir.n@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    studentId: 'ME-2024-055',
    department: 'Mechanical Engineering',
    year: '2nd Year',
    clubsJoined: 2,
    eventsJoined: 7,
    status: 'Active',
    joinedDate: '01 Nov 2024',
    participationRate: '82%',
    clubs: [
      { id: 'sc-6', clubId: 'robotics-club', clubName: 'Robotics Club', role: 'Volunteer', joinedDate: '01 Nov 2024' },
      { id: 'sc-7', clubId: 'sports-club', clubName: 'Sports & Athletics Club', role: 'General Member', joinedDate: '15 Dec 2024' },
    ],
    events: [],
    activity: [],
  },
  {
    id: 'stu-4',
    name: 'Ishaan Malhotra',
    email: 'ishaan.m@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    studentId: 'DS-2024-012',
    department: 'Data Science & AI',
    year: '2nd Year',
    clubsJoined: 3,
    eventsJoined: 11,
    status: 'Active',
    joinedDate: '10 Oct 2024',
    participationRate: '91%',
    clubs: [
      { id: 'sc-8', clubId: 'ai-ml-club', clubName: 'AI & ML Club', role: 'Core Team', joinedDate: '10 Oct 2024' },
      { id: 'sc-9', clubId: 'coding-club', clubName: 'Coding Club', role: 'General Member', joinedDate: '12 Nov 2024' },
      { id: 'sc-10', clubId: 'entrepreneurship-cell', clubName: 'Entrepreneurship Cell', role: 'General Member', joinedDate: '05 Mar 2025' },
    ],
    events: [],
    activity: [],
  },
  {
    id: 'stu-5',
    name: 'Sanya Kapoor',
    email: 'sanya.k@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studentId: 'BA-2023-078',
    department: 'Business Administration',
    year: '3rd Year',
    clubsJoined: 2,
    eventsJoined: 8,
    status: 'Active',
    joinedDate: '15 Jan 2025',
    participationRate: '86%',
    clubs: [
      { id: 'sc-11', clubId: 'entrepreneurship-cell', clubName: 'Entrepreneurship Cell', role: 'Lead Designer', joinedDate: '15 Jan 2025' },
      { id: 'sc-12', clubId: 'drama-society', clubName: 'Drama Society', role: 'General Member', joinedDate: '20 Feb 2025' },
    ],
    events: [],
    activity: [],
  },
  {
    id: 'stu-6',
    name: 'Rishi Patel',
    email: 'rishi.p@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    studentId: 'BT-2025-021',
    department: 'Biotechnology',
    year: '1st Year',
    clubsJoined: 1,
    eventsJoined: 3,
    status: 'Active',
    joinedDate: '01 Sep 2026',
    participationRate: '75%',
    clubs: [
      { id: 'sc-13', clubId: 'social-impact-cell', clubName: 'Social Impact Cell', role: 'General Member', joinedDate: '01 Sep 2026' },
    ],
    events: [],
    activity: [],
  },
  {
    id: 'stu-7',
    name: 'Aditi Rao',
    email: 'aditi.r@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    studentId: 'EE-2022-099',
    department: 'Electrical Engineering',
    year: '4th Year',
    clubsJoined: 2,
    eventsJoined: 14,
    status: 'Active',
    joinedDate: '10 Aug 2023',
    participationRate: '95%',
    clubs: [
      { id: 'sc-14', clubId: 'robotics-club', clubName: 'Robotics Club', role: 'Core Team', joinedDate: '10 Aug 2023' },
      { id: 'sc-15', clubId: 'music-club', clubName: 'Music Club (Symphony)', role: 'General Member', joinedDate: '01 Oct 2023' },
    ],
    events: [],
    activity: [],
  },
  {
    id: 'stu-8',
    name: 'Vikramaditya Roy',
    email: 'vikram.r@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    studentId: 'CV-2024-041',
    department: 'Civil Engineering',
    year: '2nd Year',
    clubsJoined: 1,
    eventsJoined: 4,
    status: 'Inactive',
    joinedDate: '12 Jan 2025',
    participationRate: '45%',
    clubs: [
      { id: 'sc-16', clubId: 'sports-club', clubName: 'Sports & Athletics Club', role: 'General Member', joinedDate: '12 Jan 2025' },
    ],
    events: [],
    activity: [],
  },
  {
    id: 'stu-9',
    name: 'Neha Joshi',
    email: 'neha.j@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    studentId: 'CS-2025-104',
    department: 'Computer Science',
    year: '1st Year',
    clubsJoined: 2,
    eventsJoined: 5,
    status: 'Active',
    joinedDate: '18 Aug 2026',
    participationRate: '88%',
    clubs: [
      { id: 'sc-17', clubId: 'coding-club', clubName: 'Coding Club', role: 'General Member', joinedDate: '18 Aug 2026' },
      { id: 'sc-18', clubId: 'debate-society', clubName: 'Debate Society', role: 'General Member', joinedDate: '02 Sep 2026' },
    ],
    events: [],
    activity: [],
  },
  {
    id: 'stu-10',
    name: 'Ayushmaan Bose',
    email: 'ayush.b@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    studentId: 'CH-2023-018',
    department: 'Chemical Engineering',
    year: '3rd Year',
    clubsJoined: 1,
    eventsJoined: 2,
    status: 'Suspended',
    joinedDate: '05 Mar 2025',
    participationRate: '20%',
    clubs: [
      { id: 'sc-19', clubId: 'crypto-web3-guild', clubName: 'Web3 & Blockchain Guild', role: 'General Member', joinedDate: '05 Mar 2025' },
    ],
    events: [],
    activity: [],
  },
];

// --------------------------------------------------------------------------
// MOCK DATA: RECENT PLATFORM ACTIVITY
// --------------------------------------------------------------------------
export const mockPlatformActivity: ActivityItem[] = [
  {
    id: 'act-feed-1',
    title: 'New club created',
    description: 'Photography Club submitted charter for verification',
    timestamp: '12 minutes ago',
    type: 'club',
  },
  {
    id: 'act-feed-2',
    title: 'Club president approved',
    description: 'Rahul Sharma verified as Coding Club President',
    timestamp: '35 minutes ago',
    type: 'president',
  },
  {
    id: 'act-feed-3',
    title: 'New student joined',
    description: 'Priya Patel joined Robotics Club Core Team',
    timestamp: '1 hour ago',
    type: 'student',
  },
  {
    id: 'act-feed-4',
    title: 'Club profile updated',
    description: 'Coding Club updated semester event schedule and lab allocation',
    timestamp: '2 hours ago',
    type: 'club',
  },
  {
    id: 'act-feed-5',
    title: 'Event registration milestone',
    description: 'HackSprint 2026 reached 180 registered student attendees',
    timestamp: '4 hours ago',
    type: 'event',
  },
  {
    id: 'act-feed-6',
    title: 'Budget clearance issued',
    description: 'Student Council approved ₹50,000 grant for Robotics Lab equipment',
    timestamp: '7 hours ago',
    type: 'alert',
  },
];

// --------------------------------------------------------------------------
// MOCK DATA: DASHBOARD & ANALYTICS CHARTS
// --------------------------------------------------------------------------
export const mockAnalytics = {
  kpis: {
    totalClubs: { value: 48, change: '+8.2%', trend: 'positive', label: 'vs last month' },
    clubPresidents: { value: 46, change: '+4.5%', trend: 'positive', label: 'vs last month' },
    totalStudents: { value: '2,846', change: '+12.4%', trend: 'positive', label: 'vs last month' },
    activeClubs: { value: 42, change: '87.5%', trend: 'neutral', label: 'of total clubs active' },
    pendingApprovals: 3,
    avgClubsPerStudent: 2.4,
    engagementRate: '84.6%',
    totalEvents: 142,
    avgAttendance: '76.2%',
  },
  participationWeekly: [
    { label: 'Mon', students: 480, events: 6 },
    { label: 'Tue', students: 620, events: 8 },
    { label: 'Wed', students: 890, events: 14 },
    { label: 'Thu', students: 780, events: 10 },
    { label: 'Fri', students: 950, events: 16 },
    { label: 'Sat', students: 1120, events: 22 },
    { label: 'Sun', students: 640, events: 9 },
  ],
  participationMonthly: [
    { label: 'May', students: 1820, events: 28 },
    { label: 'Jun', students: 1940, events: 32 },
    { label: 'Jul', students: 2150, events: 36 },
    { label: 'Aug', students: 2480, events: 45 },
    { label: 'Sep', students: 2790, events: 54 },
    { label: 'Oct', students: 2846, events: 58 },
  ],
  participationYearly: [
    { label: '2022', students: 1200, events: 85 },
    { label: '2023', students: 1850, events: 130 },
    { label: '2024', students: 2240, events: 168 },
    { label: '2025', students: 2680, events: 210 },
    { label: '2026', students: 2846, events: 242 },
  ],
  clubGrowth: [
    { month: 'Apr', count: 28 },
    { month: 'May', count: 32 },
    { month: 'Jun', count: 35 },
    { month: 'Jul', count: 38 },
    { month: 'Aug', count: 42 },
    { month: 'Sep', count: 45 },
    { month: 'Oct', count: 48 },
  ],
  categoriesBreakdown: [
    { name: 'Technical', percentage: 32, count: 15, color: '#2563EB' },
    { name: 'Cultural', percentage: 24, count: 11, color: '#8B5CF6' },
    { name: 'Sports', percentage: 18, count: 9, color: '#10B981' },
    { name: 'Literary', percentage: 12, count: 6, color: '#F59E0B' },
    { name: 'Social', percentage: 8, count: 4, color: '#EC4899' },
    { name: 'Other', percentage: 6, count: 3, color: '#64748B' },
  ],
  topClubsRanking: [
    { name: 'Coding Club', category: 'Technical', members: 284, events: 18, engagement: 94, avatar: '💻' },
    { name: 'Robotics Club', category: 'Engineering', members: 231, events: 14, engagement: 91, avatar: '🤖' },
    { name: 'Photography Club', category: 'Creative', members: 198, events: 11, engagement: 86, avatar: '📸' },
    { name: 'Drama Society', category: 'Cultural', members: 176, events: 9, engagement: 82, avatar: '🎭' },
    { name: 'AI & ML Club', category: 'Technical', members: 245, events: 16, engagement: 89, avatar: '🧠' },
  ],
  departmentBreakdown: [
    { department: 'Computer Science', students: 860, participationRate: '92%' },
    { department: 'Electronics & Comm.', students: 540, participationRate: '86%' },
    { department: 'Mechanical Eng.', students: 430, participationRate: '79%' },
    { department: 'Management & Business', students: 380, participationRate: '84%' },
    { department: 'Design & Visual Arts', students: 290, participationRate: '88%' },
    { department: 'Biotechnology & Others', students: 346, participationRate: '74%' },
  ],
};
