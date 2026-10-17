import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import College from "./models/College.js";
import User from "./models/User.js";
import Club from "./models/Club.js";
import Membership from "./models/Membership.js";
import Event from "./models/Event.js";
import Activity from "./models/Activity.js";
import Announcement from "./models/Announcement.js";
import PresidentCode from "./models/PresidentCode.js";
import Approval from "./models/Approval.js";
import Notification from "./models/Notification.js";
import AuditLog from "./models/AuditLog.js";
import { UserRole } from "./constants/roles.js";

dotenv.config();

const seed = async () => {
  try {
    console.log("Connecting to database for Multi-Tenant Seeding...");
    await connectDB();

    // Drop legacy index if present
    try {
      await Club.collection.dropIndex("name_1");
      console.log("Dropped legacy unique index name_1 on clubs.");
    } catch (e) {
      // index not present or already dropped
    }

    // 1. Seed Colleges (Tenants)
    let collegeA = await College.findOne({ code: "DTU" });
    if (!collegeA) {
      collegeA = await College.create({
        name: "Delhi Technological University (DTU)",
        code: "DTU",
        address: "Shahbad Daulatpur, Bawana Road, Delhi",
        adminEmail: "admin@campus.edu",
        status: "Active",
      });
    }

    let collegeB = await College.findOne({ code: "IITD" });
    if (!collegeB) {
      collegeB = await College.create({
        name: "Indian Institute of Technology Delhi (IITD)",
        code: "IITD",
        address: "Hauz Khas, New Delhi",
        adminEmail: "admin@iitd.ac.in",
        status: "Active",
      });
    }
    console.log(`Colleges verified: ${collegeA.name} (${collegeA.code}), ${collegeB.name} (${collegeB.code})`);

    // 2. Seed Platform Admin
    let platformAdmin = await User.findOne({ email: "platform.admin@cluvio.internal" });
    if (!platformAdmin) {
      platformAdmin = await User.create({
        name: "Cluvio Platform Ops",
        email: "platform.admin@cluvio.internal",
        password: "PlatformAdmin@123",
        role: UserRole.PLATFORM_ADMIN,
        designation: "Platform Product Owner",
        department: "Core Engineering",
        avatar: "/avatars/avatar-5.svg",
        status: "Active",
        profileStatus: "Approved",
      });
    } else {
      platformAdmin.role = UserRole.PLATFORM_ADMIN;
      await platformAdmin.save();
    }

    // 3. Seed College Admins
    let adminA = await User.findOne({ email: "admin@campus.edu" });
    if (!adminA) {
      adminA = await User.create({
        name: "Dr. Rajiv Sharma",
        email: "admin@campus.edu",
        password: "CollegeAdmin@123",
        role: UserRole.COLLEGE_ADMIN,
        college: collegeA._id,
        collegeName: collegeA.name,
        collegeCode: collegeA.code,
        designation: "Dean of Student Welfare",
        department: "Student Affairs & Clubs",
        avatar: "/avatars/avatar-4.svg",
        status: "Active",
        profileStatus: "Approved",
      });
    } else {
      adminA.college = collegeA._id;
      adminA.collegeName = collegeA.name;
      adminA.collegeCode = collegeA.code;
      adminA.role = UserRole.COLLEGE_ADMIN;
      await adminA.save();
    }

    let adminB = await User.findOne({ email: "admin@iitd.ac.in" });
    if (!adminB) {
      adminB = await User.create({
        name: "Prof. Ananya Sen",
        email: "admin@iitd.ac.in",
        password: "CollegeAdmin@123",
        role: UserRole.COLLEGE_ADMIN,
        college: collegeB._id,
        collegeName: collegeB.name,
        collegeCode: collegeB.code,
        designation: "Dean of Academic Affairs",
        department: "Student Activities Center",
        avatar: "/avatars/avatar-3.svg",
        status: "Active",
        profileStatus: "Approved",
      });
    } else {
      adminB.college = collegeB._id;
      adminB.collegeName = collegeB.name;
      adminB.collegeCode = collegeB.code;
      adminB.role = UserRole.COLLEGE_ADMIN;
      await adminB.save();
    }
    console.log("Platform Admin & College Admins verified.");

    // 4. Seed Club Presidents
    let presA = await User.findOne({ email: "president@campus.edu" });
    if (!presA) {
      presA = await User.create({
        name: "Arjun Mehta",
        email: "president@campus.edu",
        password: "President@123",
        role: UserRole.CLUB_PRESIDENT,
        college: collegeA._id,
        collegeName: collegeA.name,
        collegeCode: collegeA.code,
        enrollmentNumber: "PRES-2024-DEMO",
        studentId: "PRES-2024-DEMO",
        department: "Robotics & Automation",
        course: "B.Tech",
        year: "4th Year",
        phone: "+91 98765 43210",
        bio: "Autonomous systems builder, rover designer, and president of Robotics Society.",
        avatar: "/avatars/avatar-2.svg",
        status: "Active",
        profileStatus: "Approved",
      });
    } else {
      presA.college = collegeA._id;
      presA.collegeName = collegeA.name;
      presA.collegeCode = collegeA.code;
      presA.enrollmentNumber = "PRES-2024-DEMO";
      presA.role = UserRole.CLUB_PRESIDENT;
      presA.profileStatus = "Approved";
      await presA.save();
    }

    let presA2 = await User.findOne({ email: "rahul.sharma@campus.edu" });
    if (!presA2) {
      presA2 = await User.create({
        name: "Rahul Sharma",
        email: "rahul.sharma@campus.edu",
        password: "President@123",
        role: UserRole.CLUB_PRESIDENT,
        college: collegeA._id,
        collegeName: collegeA.name,
        collegeCode: collegeA.code,
        enrollmentNumber: "PRES-2024-001",
        studentId: "PRES-2024-001",
        department: "Computer Science",
        course: "B.Tech",
        year: "3rd Year",
        avatar: "/avatars/avatar-1.svg",
        status: "Active",
        profileStatus: "Approved",
      });
    } else {
      presA2.college = collegeA._id;
      presA2.collegeName = collegeA.name;
      presA2.collegeCode = collegeA.code;
      presA2.enrollmentNumber = "PRES-2024-001";
      presA2.role = UserRole.CLUB_PRESIDENT;
      presA2.profileStatus = "Approved";
      await presA2.save();
    }

    let presB = await User.findOne({ email: "priya.patel@iitd.ac.in" });
    if (!presB) {
      presB = await User.create({
        name: "Priya Patel",
        email: "priya.patel@iitd.ac.in",
        password: "President@123",
        role: UserRole.CLUB_PRESIDENT,
        college: collegeB._id,
        collegeName: collegeB.name,
        collegeCode: collegeB.code,
        enrollmentNumber: "IITD-2024-PRES",
        studentId: "IITD-2024-PRES",
        department: "Aerospace Engineering",
        course: "B.Tech",
        year: "4th Year",
        avatar: "/avatars/avatar-3.svg",
        status: "Active",
        profileStatus: "Approved",
      });
    } else {
      presB.college = collegeB._id;
      presB.collegeName = collegeB.name;
      presB.collegeCode = collegeB.code;
      presB.role = UserRole.CLUB_PRESIDENT;
      presB.profileStatus = "Approved";
      await presB.save();
    }

    // 5. Seed President Codes (College Admin generated 6-digit codes)
    let pCode1 = await PresidentCode.findOne({ code: "482910" });
    if (!pCode1) {
      pCode1 = await PresidentCode.create({
        code: "482910",
        college: collegeA._id,
        assignedStudent: presA._id,
        assignedEmail: "president@campus.edu",
        assignedEnrollment: "PRES-2024-DEMO",
        targetClubName: "Robotics Society",
        status: "Active",
        createdBy: adminA._id,
      });
    }

    let pCode2 = await PresidentCode.findOne({ code: "719342" });
    if (!pCode2) {
      pCode2 = await PresidentCode.create({
        code: "719342",
        college: collegeA._id,
        assignedEmail: "student@campus.edu",
        assignedEnrollment: "STU-2026-0142",
        targetClubName: "Design & UI Guild",
        status: "Active",
        createdBy: adminA._id,
      });
    }
    console.log("President Codes verified (e.g. 482910, 719342).");

    // 6. Seed Students
    let stu1 = await User.findOne({ email: "student@campus.edu" });
    if (!stu1) {
      stu1 = await User.create({
        name: "Aarav Sharma",
        email: "student@campus.edu",
        password: "Student@123",
        role: UserRole.STUDENT,
        college: collegeA._id,
        collegeName: collegeA.name,
        collegeCode: collegeA.code,
        enrollmentNumber: "STU-2026-0142",
        studentId: "STU-2026-0142",
        department: "Computer Science",
        course: "B.Tech",
        year: "3rd Year",
        phone: "+91 99887 76655",
        bio: "Exploring student chapters, competitive coding, and campus leadership.",
        favouriteGenres: ["Technical", "Engineering", "Creative"],
        avatar: "/avatars/avatar-1.svg",
        profileStatus: "Approved",
        status: "Active",
      });
    } else {
      stu1.college = collegeA._id;
      stu1.collegeName = collegeA.name;
      stu1.collegeCode = collegeA.code;
      stu1.enrollmentNumber = "STU-2026-0142";
      stu1.role = UserRole.STUDENT;
      stu1.profileStatus = "Approved";
      await stu1.save();
    }

    let stu2 = await User.findOne({ email: "sneha.r@campus.edu" });
    if (!stu2) {
      stu2 = await User.create({
        name: "Sneha Roy",
        email: "sneha.r@campus.edu",
        password: "Student@123",
        role: UserRole.STUDENT,
        college: collegeA._id,
        collegeName: collegeA.name,
        collegeCode: collegeA.code,
        enrollmentNumber: "STU-2024-002",
        studentId: "STU-2024-002",
        department: "Electronics & Communication",
        course: "B.Tech",
        year: "2nd Year",
        phone: "+91 98112 23344",
        bio: "Interested in robotics and embedded circuitry.",
        avatar: "/avatars/avatar-2.svg",
        profileStatus: "Pending",
        status: "Active",
      });
    } else {
      stu2.college = collegeA._id;
      stu2.collegeName = collegeA.name;
      stu2.collegeCode = collegeA.code;
      stu2.enrollmentNumber = "STU-2024-002";
      stu2.role = UserRole.STUDENT;
      await stu2.save();
    }

    let stuB = await User.findOne({ email: "rohan.m@iitd.ac.in" });
    if (!stuB) {
      stuB = await User.create({
        name: "Rohan Mehra",
        email: "rohan.m@iitd.ac.in",
        password: "Student@123",
        role: UserRole.STUDENT,
        college: collegeB._id,
        collegeName: collegeB.name,
        collegeCode: collegeB.code,
        enrollmentNumber: "IITD-STU-003",
        studentId: "IITD-STU-003",
        department: "Mechanical Engineering",
        course: "B.Tech",
        year: "1st Year",
        avatar: "/avatars/avatar-3.svg",
        profileStatus: "Approved",
        status: "Active",
      });
    } else {
      stuB.college = collegeB._id;
      stuB.collegeName = collegeB.name;
      stuB.collegeCode = collegeB.code;
      stuB.role = UserRole.STUDENT;
      await stuB.save();
    }

    // 7. Seed Clubs (College A & College B)
    let clubA1 = await Club.findOne({ name: "Coding Club" });
    if (!clubA1) {
      clubA1 = await Club.create({
        name: "Coding Club",
        college: collegeA._id,
        collegeName: collegeA.name,
        description: "Empowering software craftsmanship, hackathons, open-source development, and peer code reviews.",
        category: "Technical",
        sector: "Technical & Innovation",
        logo: "💻",
        president: presA2._id,
        membersCount: 42,
        eventsCount: 2,
        status: "Active",
        approvedAt: new Date(),
        approvedBy: adminA._id,
        tags: ["Coding", "Hackathons", "Open Source"],
        meetingSchedule: "Wednesdays at 5:00 PM • CS Lab 3",
      });
    } else {
      clubA1.college = collegeA._id;
      clubA1.collegeName = collegeA.name;
      clubA1.status = "Active";
      await clubA1.save();
    }

    let clubA2 = await Club.findOne({ name: "Robotics Society" });
    if (!clubA2) {
      clubA2 = await Club.create({
        name: "Robotics Society",
        college: collegeA._id,
        collegeName: collegeA.name,
        description: "Designing competitive autonomous rovers, drones, and embedded IoT systems for collegiate leagues.",
        category: "Engineering",
        sector: "Hardware & Robotics",
        logo: "🤖",
        president: presA._id,
        membersCount: 28,
        eventsCount: 1,
        status: "Active",
        approvedAt: new Date(),
        approvedBy: adminA._id,
        tags: ["Robotics", "ROS2", "Hardware"],
        meetingSchedule: "Thursdays at 4:30 PM • Robotics Lab B-204",
      });
    } else {
      clubA2.college = collegeA._id;
      clubA2.collegeName = collegeA.name;
      clubA2.status = "Active";
      await clubA2.save();
    }

    // Pending Club for College Admin approval testing
    let clubPending = await Club.findOne({ name: "Design & UI Guild" });
    if (!clubPending) {
      clubPending = await Club.create({
        name: "Design & UI Guild",
        college: collegeA._id,
        collegeName: collegeA.name,
        description: "Advancing digital product design, typography, micro-interactions, and accessibility standards.",
        category: "Creative",
        sector: "Design & User Experience",
        logo: "🎨",
        president: presA._id,
        membersCount: 1,
        status: "Pending",
        tags: ["UI/UX", "Figma", "Design Systems"],
      });
    } else {
      clubPending.college = collegeA._id;
      clubPending.collegeName = collegeA.name;
      clubPending.status = "Pending";
      await clubPending.save();
    }

    // Club in College B (IITD) to test isolation
    let clubB1 = await Club.findOne({ name: "Aeromodelling Club" });
    if (!clubB1) {
      clubB1 = await Club.create({
        name: "Aeromodelling Club",
        college: collegeB._id,
        collegeName: collegeB.name,
        description: "Designing RC gliders, fixed-wing UAVs, and aerodynamics wind tunnel models.",
        category: "Engineering",
        sector: "Aerospace",
        logo: "✈️",
        president: presB._id,
        membersCount: 19,
        status: "Active",
        approvedAt: new Date(),
        approvedBy: adminB._id,
      });
    } else {
      clubB1.college = collegeB._id;
      clubB1.collegeName = collegeB.name;
      clubB1.status = "Active";
      await clubB1.save();
    }
    console.log("Clubs verified across DTU and IITD.");

    // 8. Seed Memberships
    let mem1 = await Membership.findOne({ student: stu1._id, club: clubA1._id });
    if (!mem1) {
      mem1 = await Membership.create({
        college: collegeA._id,
        student: stu1._id,
        club: clubA1._id,
        role: "General Member",
        status: "Active",
        approvedAt: new Date(),
        approvedBy: adminA._id,
      });
    }

    // Pending membership request for stu2 in Robotics Society
    let memPending = await Membership.findOne({ student: stu2._id, club: clubA2._id });
    if (!memPending) {
      memPending = await Membership.create({
        college: collegeA._id,
        student: stu2._id,
        club: clubA2._id,
        role: "General Member",
        status: "Pending",
        motivation: "Passionate about ROS2 navigation and want to join the hardware team.",
        requestedAt: new Date(),
      });
    }

    // 9. Seed Events
    let event1 = await Event.findOne({ title: "Campus Hackathon 2026", college: collegeA._id });
    if (!event1) {
      event1 = await Event.create({
        college: collegeA._id,
        club: clubA1._id,
        title: "Campus Hackathon 2026",
        description: "24-hour sprint building real-world campus tools and open-source applications.",
        date: "2026-10-25",
        startTime: "10:00 AM",
        endTime: "10:00 AM (Next Day)",
        location: "Auditorium A",
        capacity: 150,
        status: "Approved",
        createdBy: presA2._id,
      });
    }

    // Pending Event for College Admin approval testing
    let eventPending = await Event.findOne({ title: "Autonomous Drone Flight Showcase", college: collegeA._id });
    if (!eventPending) {
      eventPending = await Event.create({
        college: collegeA._id,
        club: clubA2._id,
        title: "Autonomous Drone Flight Showcase",
        description: "Outdoor GPS waypoint flight test of the new student quadcopter rover.",
        date: "2026-10-28",
        startTime: "2:30 PM",
        endTime: "5:00 PM",
        location: "North Campus Quad",
        capacity: 80,
        status: "Pending",
        createdBy: presA._id,
      });
    }

    // 10. Seed Announcements
    let ann1 = await Announcement.findOne({ title: "Hackathon Registrations Open", college: collegeA._id });
    if (!ann1) {
      ann1 = await Announcement.create({
        college: collegeA._id,
        club: clubA1._id,
        title: "Hackathon Registrations Open",
        message: "Submit project proposals by Oct 20 for early mentor reviews and compute credits.",
        priority: "High",
        status: "Approved",
        createdBy: presA2._id,
      });
    }

    // 11. Seed Approval Items in Universal Approval Engine
    // Profile approval item for sneha.r
    await Approval.findOneAndUpdate(
      { resourceId: stu2._id, actionType: "PROFILE_CREATE" },
      {
        college: collegeA._id,
        requestedBy: stu2._id,
        actionType: "PROFILE_CREATE",
        resourceType: "User",
        resourceId: stu2._id,
        status: "Pending",
        metadata: {
          name: stu2.name,
          email: stu2.email,
          department: stu2.department,
          year: stu2.year,
          avatar: stu2.avatar,
        },
      },
      { upsert: true }
    );

    // Club approval item for Design & UI Guild
    await Approval.findOneAndUpdate(
      { resourceId: clubPending._id, actionType: "CLUB_CREATE" },
      {
        college: collegeA._id,
        requestedBy: presA._id,
        actionType: "CLUB_CREATE",
        resourceType: "Club",
        resourceId: clubPending._id,
        status: "Pending",
        metadata: {
          name: clubPending.name,
          category: clubPending.category,
          description: clubPending.description,
          president: presA.name,
        },
      },
      { upsert: true }
    );

    // Membership approval item for stu2 joining Robotics Society
    await Approval.findOneAndUpdate(
      { resourceId: memPending._id, actionType: "MEMBERSHIP_REQUEST" },
      {
        college: collegeA._id,
        requestedBy: stu2._id,
        actionType: "MEMBERSHIP_REQUEST",
        resourceType: "Membership",
        resourceId: memPending._id,
        status: "Pending",
        metadata: {
          clubName: clubA2.name,
          studentName: stu2.name,
          enrollmentNumber: stu2.enrollmentNumber,
          motivation: memPending.motivation,
        },
      },
      { upsert: true }
    );

    // Event approval item for Autonomous Drone Flight Showcase
    await Approval.findOneAndUpdate(
      { resourceId: eventPending._id, actionType: "EVENT_CREATE" },
      {
        college: collegeA._id,
        requestedBy: presA._id,
        actionType: "EVENT_CREATE",
        resourceType: "Event",
        resourceId: eventPending._id,
        status: "Pending",
        metadata: {
          title: eventPending.title,
          clubName: clubA2.name,
          date: eventPending.date,
          location: eventPending.location,
        },
      },
      { upsert: true }
    );

    // 12. Seed Notifications
    await Notification.create({
      recipient: adminA._id,
      college: collegeA._id,
      title: "New Club Charter Request",
      message: `Club President ${presA.name} submitted "${clubPending.name}" for charter approval.`,
      type: "approval",
      relatedResource: { resourceType: "Club", resourceId: clubPending._id },
    });

    await Notification.create({
      recipient: stu1._id,
      college: collegeA._id,
      title: "Profile Approved",
      message: "Your student profile has been verified and approved by the Dean of Student Welfare.",
      type: "approval",
    });

    // 13. Seed Audit Logs
    await AuditLog.create({
      actorId: adminA._id,
      actorName: adminA.name,
      actorEmail: adminA.email,
      actorRole: UserRole.COLLEGE_ADMIN,
      college: collegeA._id,
      collegeName: collegeA.name,
      action: "PRESIDENT_CODE_GENERATED",
      title: "President Code Generated",
      description: `College Admin generated 6-digit code 482910 for Arjun Mehta.`,
      resourceType: "PresidentCode",
      type: "president",
      status: "Success",
    });

    await AuditLog.create({
      actorId: stu1._id,
      actorName: stu1.name,
      actorEmail: stu1.email,
      actorRole: UserRole.STUDENT,
      college: collegeA._id,
      collegeName: collegeA.name,
      action: "MEMBERSHIP_APPROVED",
      title: "Club Membership Activated",
      description: `Aarav Sharma became an official member of Coding Club.`,
      resourceType: "Membership",
      type: "membership",
      status: "Success",
    });

    console.log("Seeding completed successfully with two colleges, all 4 roles, approval workflows, and audit logs.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
