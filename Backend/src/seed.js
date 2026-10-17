import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import User from "./models/User.js";
import Club from "./models/Club.js";
import Membership from "./models/Membership.js";
import MembershipRequest from "./models/MembershipRequest.js";
import ActivityLog from "./models/ActivityLog.js";
import { UserRole } from "./constants/roles.js";

dotenv.config();

const seed = async () => {
  try {
    console.log("Connecting to database for seeding (Two-Role Architecture)...");
    await connectDB();

    // 1. Seed Club Presidents (role: 'club_president')
    const presidentsData = [
      {
        name: "Rahul Sharma",
        email: "rahul.sharma@campus.edu",
        password: "President@123",
        role: UserRole.CLUB_PRESIDENT,
        studentId: "PRES-2024-001",
        enrollmentNumber: "PRES-2024-001",
        department: "Computer Science",
        year: "3rd Year",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Arjun Mehta",
        email: "president@campus.edu",
        password: "President@123",
        role: UserRole.CLUB_PRESIDENT,
        studentId: "PRES-2024-DEMO",
        enrollmentNumber: "PRES-2024-DEMO",
        department: "Robotics & Automation",
        year: "4th Year",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Priya Patel",
        email: "priya.patel@campus.edu",
        password: "President@123",
        role: UserRole.CLUB_PRESIDENT,
        studentId: "PRES-2024-002",
        enrollmentNumber: "PRES-2024-002",
        department: "Mechanical Engineering",
        year: "4th Year",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Devansh Mehta",
        email: "devansh.m@campus.edu",
        password: "President@123",
        role: UserRole.CLUB_PRESIDENT,
        studentId: "PRES-2024-003",
        enrollmentNumber: "PRES-2024-003",
        department: "Data Science & AI",
        year: "3rd Year",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Ananya Verma",
        email: "ananya.v@campus.edu",
        password: "President@123",
        role: UserRole.CLUB_PRESIDENT,
        studentId: "PRES-2024-004",
        enrollmentNumber: "PRES-2024-004",
        department: "Design & Visual Arts",
        year: "2nd Year",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
    ];

    const createdPresidents = [];
    for (const p of presidentsData) {
      let pres = await User.findOne({ email: p.email });
      if (!pres) {
        pres = await User.create(p);
      } else if (pres.role !== UserRole.CLUB_PRESIDENT) {
        pres.role = UserRole.CLUB_PRESIDENT;
        await pres.save();
      }
      createdPresidents.push(pres);
    }
    console.log(`Verified ${createdPresidents.length} club president accounts.`);

    // 2. Seed Clubs
    const clubsData = [
      {
        name: "Coding Club",
        description:
          "Empowering software craftsmanship, hackathons, open-source development, and peer code reviews across departments.",
        category: "Technical",
        logo: "💻",
        president: createdPresidents[0]._id,
        objectives: "Hands-on engineering, national hackathon wins, and peer mentoring.",
        activities: "Weekly algorithmic challenges, full-stack workshops, open source sprints.",
        meetingSchedule: "Wednesdays at 5:00 PM • CS Lab 3",
        membersCount: 42,
        eventsCount: 3,
        status: "Active",
        recruitmentOpen: true,
        hiringDomains: [
          { domainName: "Technical & Coding", slotsAvailable: 10, isHiring: true },
          { domainName: "Design & UI/UX", slotsAvailable: 4, isHiring: true },
          { domainName: "PR & Social Media", slotsAvailable: 2, isHiring: false },
        ],
        recentEvents: [
          {
            title: "Campus Hackathon 2026",
            date: "2026-10-25",
            time: "10:00 AM",
            location: "Auditorium A",
            description: "24-hour sprint building real-world campus tools.",
            attendees: 120,
            status: "Upcoming",
          },
          {
            title: "Open Source Git Masterclass",
            date: "2026-10-12",
            time: "4:00 PM",
            location: "CS Lab 1",
            description: "Branching strategies, CI/CD pipelines, and pull request reviews.",
            attendees: 65,
            status: "Completed",
          },
        ],
        announcements: [
          {
            title: "Hackathon Registrations Open",
            message: "Submit team proposals by Oct 20 for early review.",
            priority: "High",
            date: "14/10/2026",
          },
        ],
      },
      {
        name: "Robotics Society",
        description:
          "Designing competitive autonomous rovers, drones, and embedded IoT systems for collegiate leagues.",
        category: "Engineering",
        logo: "🤖",
        president: createdPresidents[1]._id,
        objectives: "ROS2 robotics excellence and national championship podiums.",
        activities: "Microcontroller hacking, circuit soldering, simulation.",
        meetingSchedule: "Thursdays at 4:30 PM • Robotics Lab B-204",
        membersCount: 28,
        eventsCount: 2,
        status: "Active",
        recruitmentOpen: true,
        hiringDomains: [
          { domainName: "Hardware & Embedded", slotsAvailable: 8, isHiring: true },
          { domainName: "Operations & Logistics", slotsAvailable: 3, isHiring: true },
        ],
        recentEvents: [
          {
            title: "Autonomous Quadcopter Flight Demo",
            date: "2026-10-28",
            time: "2:30 PM",
            location: "North Campus Quad",
            description: "Outdoor GPS waypoint flight test of student drone.",
            attendees: 45,
            status: "Upcoming",
          },
        ],
        announcements: [
          {
            title: "Lab Access Hours Extended",
            message: "Lab B-204 open till 9 PM on sprint nights.",
            priority: "Normal",
            date: "15/10/2026",
          },
        ],
      },
    ];

    const createdClubs = [];
    for (const c of clubsData) {
      let club = await Club.findOne({ name: c.name });
      if (!club) {
        club = await Club.create(c);
      }
      createdClubs.push(club);
    }
    console.log(`Verified ${createdClubs.length} active campus clubs.`);

    // 3. Seed Students (role: 'student')
    const studentsData = [
      {
        name: "Aarav Sharma",
        email: "student@campus.edu",
        password: "Student@123",
        role: UserRole.STUDENT,
        studentId: "STU-2026-0142",
        enrollmentNumber: "STU-2026-0142",
        department: "Computer Science",
        year: "3rd Year",
        age: 20,
        bio: "Exploring student clubs and eager to participate in campus events.",
        favouriteGenres: ["Technical", "Engineering", "Creative"],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Sneha Roy",
        email: "sneha.r@campus.edu",
        password: "Student@123",
        role: UserRole.STUDENT,
        studentId: "STU-2024-002",
        enrollmentNumber: "STU-2024-002",
        department: "Electronics & Communication",
        year: "3rd Year",
        age: 21,
        bio: "Hardware tinkerer, robotics designer, and IoT builder.",
        favouriteGenres: ["Engineering", "Robotics"],
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Rohan Mehra",
        email: "rohan.m@campus.edu",
        password: "Student@123",
        role: UserRole.STUDENT,
        studentId: "STU-2024-003",
        enrollmentNumber: "STU-2024-003",
        department: "Mechanical Engineering",
        year: "1st Year",
        age: 19,
        bio: "Excited to join campus communities and explore photography.",
        favouriteGenres: ["Creative", "Cultural"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Ishita Gupta",
        email: "ishita.g@campus.edu",
        password: "Student@123",
        role: UserRole.STUDENT,
        studentId: "STU-2024-004",
        enrollmentNumber: "STU-2024-004",
        department: "Business Administration",
        year: "3rd Year",
        age: 21,
        bio: "Startup operator, community organizer, and public speaker.",
        favouriteGenres: ["Social"],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
    ];

    const createdStudents = [];
    for (const s of studentsData) {
      let student = await User.findOne({ email: s.email });
      if (!student) {
        student = await User.create(s);
      } else if (student.role !== UserRole.STUDENT) {
        student.role = UserRole.STUDENT;
        await student.save();
      }
      createdStudents.push(student);
    }
    console.log(`Verified ${createdStudents.length} student accounts.`);

    console.log("Two-Role Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();
