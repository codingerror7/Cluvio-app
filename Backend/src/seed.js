import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import User from "./models/User.js";
import Club from "./models/Club.js";
import Membership from "./models/Membership.js";
import MembershipRequest from "./models/MembershipRequest.js";
import ActivityLog from "./models/ActivityLog.js";

dotenv.config();

const seed = async () => {
  try {
    console.log("Connecting to database for seeding...");
    await connectDB();

    // 1. Check or create Admin
    let admin = await User.findOne({ email: "admin@cluvio.edu" });
    if (!admin) {
      admin = await User.create({
        name: "Campus Administrator",
        email: "admin@cluvio.edu",
        password: "Admin@123",
        role: "admin",
        department: "Dean of Student Affairs",
        year: "Faculty / Admin",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      });
      console.log("Created initial Admin account: admin@cluvio.edu / Admin@123");
    } else {
      console.log("Admin account already exists.");
    }

    // 2. Check or create Presidents
    const presidentsData = [
      {
        name: "Rahul Sharma",
        email: "rahul.sharma@campus.edu",
        password: "President@123",
        role: "president",
        studentId: "PRES-2024-001",
        enrollmentNumber: "PRES-2024-001",
        department: "Computer Science",
        year: "3rd Year",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Priya Patel",
        email: "priya.patel@campus.edu",
        password: "President@123",
        role: "president",
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
        role: "president",
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
        role: "president",
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
      }
      createdPresidents.push(pres);
    }
    console.log(`Verified ${createdPresidents.length} president accounts.`);

    // 3. Check or create Clubs
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
        meetingSchedule: "Wednesdays & Fridays at 5:30 PM (CS Lab 3)",
        budgetAllocated: 45000,
        budgetSpent: 38200,
        engagementRate: 94,
        eventsCount: 18,
        status: "Active",
      },
      {
        name: "Robotics Club",
        description:
          "Hardware prototyping, autonomous systems, ROS2 programming, and robotic combat tournaments.",
        category: "Engineering",
        logo: "🤖",
        president: createdPresidents[1]._id,
        objectives: "Design autonomous bots and participate in national championships.",
        activities: "Embedded C bootcamps, RoboWars, drone assembly workshops.",
        meetingSchedule: "Tuesdays & Thursdays at 6:00 PM (Robotics Lab)",
        budgetAllocated: 60000,
        budgetSpent: 52000,
        engagementRate: 91,
        eventsCount: 14,
        status: "Active",
      },
      {
        name: "AI & ML Community",
        description:
          "Deep learning research, LLM application development, Kaggle competitions, and computer vision workshops.",
        category: "Technical",
        logo: "🧠",
        president: createdPresidents[2]._id,
        objectives: "Research paper publications and building state-of-the-art AI systems.",
        activities: "Fine-tuning workshops, paper discussions, Kaggle team challenges.",
        meetingSchedule: "Mondays at 5:00 PM (AI Research Lab)",
        budgetAllocated: 50000,
        budgetSpent: 34000,
        engagementRate: 89,
        eventsCount: 16,
        status: "Active",
      },
      {
        name: "Photography Club",
        description:
          "Visual storytelling, darkroom printing, digital post-production, campus media coverage, and photo walks.",
        category: "Creative",
        logo: "📸",
        president: createdPresidents[3]._id,
        objectives: "Campus storytelling through fine arts and digital photography.",
        activities: "Weekend photo walks, Lightroom tutorials, annual photo exhibition.",
        meetingSchedule: "Saturdays at 7:00 AM (Outdoor/Amphitheatre)",
        budgetAllocated: 30000,
        budgetSpent: 22000,
        engagementRate: 86,
        eventsCount: 11,
        status: "Active",
      },
      {
        name: "Drama Society",
        description:
          "Street play, stage drama, scriptwriting, voice modulation, and inter-collegiate theatre festivals.",
        category: "Cultural",
        logo: "🎭",
        president: createdPresidents[0]._id,
        objectives: "Performing arts excellence and thought-provoking street theatre.",
        activities: "Rehearsals, scriptwriting labs, one-act play competitions.",
        meetingSchedule: "Daily at 6:30 PM (Amphitheatre Stage)",
        budgetAllocated: 35000,
        budgetSpent: 31000,
        engagementRate: 82,
        eventsCount: 9,
        status: "Active",
      },
      {
        name: "Entrepreneurship Cell",
        description:
          "Pitch startup ideas, network with founders, venture incubation, and angel investor summits.",
        category: "Entrepreneurship",
        logo: "🚀",
        president: createdPresidents[1]._id,
        objectives: "Nurturing student-led ventures and campus startups.",
        activities: "E-Summit, Pitch Fest, Founder AMA sessions.",
        meetingSchedule: "Fridays at 4:00 PM (Incubation Center)",
        budgetAllocated: 75000,
        budgetSpent: 40000,
        engagementRate: 95,
        eventsCount: 12,
        status: "Active",
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
    console.log(`Verified ${createdClubs.length} clubs.`);

    // 4. Check or create Students
    const studentsData = [
      {
        name: "Aarav Sharma",
        email: "aarav.s@campus.edu",
        password: "Student@123",
        role: "student",
        studentId: "STU-2024-001",
        enrollmentNumber: "STU-2024-001",
        department: "Computer Science",
        year: "2nd Year",
        age: 20,
        bio: "Passionate full-stack developer and open source enthusiast.",
        favouriteGenres: ["Technical", "Engineering"],
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Sneha Roy",
        email: "sneha.r@campus.edu",
        password: "Student@123",
        role: "student",
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
        role: "student",
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
        role: "student",
        studentId: "STU-2024-004",
        enrollmentNumber: "STU-2024-004",
        department: "Business Administration",
        year: "3rd Year",
        age: 21,
        bio: "Startup operator, community organizer, and public speaker.",
        favouriteGenres: ["Entrepreneurship", "Social"],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
        status: "Active",
      },
    ];

    const createdStudents = [];
    for (const s of studentsData) {
      let stu = await User.findOne({ email: s.email });
      if (!stu) {
        stu = await User.create(s);
      }
      createdStudents.push(stu);
    }
    console.log(`Verified ${createdStudents.length} student accounts.`);

    // 5. Seed some initial memberships
    const codingClub = createdClubs[0];
    const roboticsClub = createdClubs[1];
    const aimlClub = createdClubs[2];

    if (codingClub && createdStudents[0]) {
      await Membership.findOneAndUpdate(
        { student: createdStudents[0]._id, club: codingClub._id },
        { student: createdStudents[0]._id, club: codingClub._id, role: "Core Team", status: "Active" },
        { upsert: true }
      );
    }

    if (roboticsClub && createdStudents[1]) {
      await Membership.findOneAndUpdate(
        { student: createdStudents[1]._id, club: roboticsClub._id },
        { student: createdStudents[1]._id, club: roboticsClub._id, role: "General Member", status: "Active" },
        { upsert: true }
      );
    }

    // 6. Seed a pending request for demonstration
    if (codingClub && createdStudents[2]) {
      await MembershipRequest.findOneAndUpdate(
        { student: createdStudents[2]._id, club: codingClub._id },
        {
          student: createdStudents[2]._id,
          club: codingClub._id,
          status: "Pending",
          note: "Eager to contribute to web projects and learn React!",
          requestDate: new Date(),
        },
        { upsert: true }
      );
    }

    // 7. Seed activity log entries
    const logs = [
      {
        title: "Coding Club Semester Sprints",
        description: "Coding Club finalized the HackSprint 2026 hackathon guidelines.",
        type: "club",
      },
      {
        title: "President Verified",
        description: "Rahul Sharma confirmed as Coding Club President.",
        type: "president",
      },
      {
        title: "Student Membership Request",
        description: "Rohan Mehra requested to join Coding Club.",
        type: "student",
      },
    ];

    for (const l of logs) {
      const existing = await ActivityLog.findOne({ title: l.title });
      if (!existing) {
        await ActivityLog.create(l);
      }
    }

    // Update membersCount on clubs
    for (const club of createdClubs) {
      const count = await Membership.countDocuments({ club: club._id });
      club.membersCount = Math.max(count, 1);
      await club.save();
    }

    console.log("Seeding complete! Platform is ready for demo.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
