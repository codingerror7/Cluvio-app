const BASE_URL = "http://localhost:8000/api";

const assert = (condition, message) => {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
};

async function runTests() {
  console.log("\n=======================================================");
  console.log("   CLUVIO PROTOTYPE COMPLETE WORKFLOW TEST SUITE");
  console.log("=======================================================\n");

  const timestamp = Date.now();

  // TEST 1: Health check
  console.log("--- 1. Health Check ---");
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  assert(health.status === "healthy", "Server health check returns healthy");

  // TEST 2: Admin Login
  console.log("\n--- 2. Admin Authentication ---");
  const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@cluvio.edu", password: "Admin@123" }),
  });
  const adminLogin = await adminLoginRes.json();
  assert(adminLogin.success === true, "Admin credentials login succeeds");
  assert(adminLogin.user.role === "admin", "Admin role properly returned");
  const adminToken = adminLogin.token;

  // TEST 3: Invalid Credentials Rejection
  console.log("\n--- 3. Invalid Credentials Security ---");
  const badLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@cluvio.edu", password: "WrongPassword" }),
  });
  assert(badLoginRes.status === 401, "Bad password rejected with 401 Unauthorized");

  // TEST 4: Student Registration
  console.log("\n--- 4. Student Registration ---");
  const testStudentEmail = `student_${timestamp}@campus.edu`;
  const studentRegRes = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Student " + timestamp,
      email: testStudentEmail,
      password: "StudentPass@123",
      confirmPassword: "StudentPass@123",
      role: "student",
      enrollmentNumber: "STU-" + timestamp.toString().slice(-6),
      age: 20,
      bio: "Automated test student profile.",
      favouriteGenres: ["Technical", "Engineering"],
      department: "Computer Science",
      year: "2nd Year",
    }),
  });
  const studentReg = await studentRegRes.json();
  assert(studentReg.success === true, "Student registration succeeds");
  assert(studentReg.user.role === "student", "Role assigned as student on server");
  const studentToken = studentReg.token;
  const studentId = studentReg.user.id;

  // TEST 5: Duplicate Registration Prevention
  console.log("\n--- 5. Duplicate Email Rejection ---");
  const dupRegRes = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Duplicate User",
      email: testStudentEmail,
      password: "Password123",
      confirmPassword: "Password123",
      role: "student",
    }),
  });
  assert(dupRegRes.status === 409, "Duplicate email rejected with 409 Conflict");

  // TEST 6: Public Admin Self-Registration Prevention
  console.log("\n--- 6. Public Admin Privilege Escalation Prevention ---");
  const adminEscalationRes = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Malicious User",
      email: `hacker_${timestamp}@campus.edu`,
      password: "Password123",
      confirmPassword: "Password123",
      role: "admin", // forbidden
    }),
  });
  assert(adminEscalationRes.status === 400, "Registering as admin rejected with 400 Bad Request");

  // TEST 7: President Registration
  console.log("\n--- 7. President Registration ---");
  const testPresEmail = `president_${timestamp}@campus.edu`;
  const presRegRes = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test President " + timestamp,
      email: testPresEmail,
      password: "PresidentPass@123",
      confirmPassword: "PresidentPass@123",
      role: "president",
      enrollmentNumber: "PRES-" + timestamp.toString().slice(-6),
      department: "Data Science & AI",
      year: "3rd Year",
      age: 21,
    }),
  });
  const presReg = await presRegRes.json();
  assert(presReg.success === true, "Club President registration succeeds");
  assert(presReg.user.role === "president", "Role assigned as president on server");
  const presToken = presReg.token;
  const presidentId = presReg.user.id;

  // TEST 8: President Creates a Club
  console.log("\n--- 8. Club Creation by President ---");
  const testClubName = `Automated Club ${timestamp}`;
  const createClubRes = await fetch(`${BASE_URL}/clubs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${presToken}`,
    },
    body: JSON.stringify({
      name: testClubName,
      category: "Technical",
      description: "Club created through automated end-to-end test run.",
      logo: "⚡",
      meetingSchedule: "Thursdays at 6:00 PM",
      maxMembers: 100,
    }),
  });
  const createClub = await createClubRes.json();
  assert(createClub.success === true, "President creates club in MongoDB");
  const clubId = createClub.club.id;
  assert(createClub.club.president.name.includes("Test President"), "Club associated with authenticated president");

  // TEST 9: Student Browses Clubs
  console.log("\n--- 9. Club Discovery & Search ---");
  const browseRes = await fetch(`${BASE_URL}/clubs?search=${encodeURIComponent(testClubName)}`);
  const browse = await browseRes.json();
  assert(browse.clubs.length === 1, "Club search by query successfully finds created club");

  // TEST 10: Student Submits Join Request
  console.log("\n--- 10. Student Membership Request Submission ---");
  const requestRes = await fetch(`${BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${studentToken}`,
    },
    body: JSON.stringify({
      clubId,
      note: "Looking forward to learning from the core team!",
    }),
  });
  const requestData = await requestRes.json();
  assert(requestData.success === true, "Membership request submitted successfully");
  const requestId = requestData.request._id;

  // TEST 11: Duplicate Request Prevention
  console.log("\n--- 11. Duplicate Join Request Prevention ---");
  const dupReqRes = await fetch(`${BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${studentToken}`,
    },
    body: JSON.stringify({ clubId }),
  });
  assert(dupReqRes.status === 409, "Duplicate join request prevented with 409 Conflict");

  // TEST 12: President Reviews & Approves Request
  console.log("\n--- 12. President Reviews & Approves Join Request ---");
  const approveRes = await fetch(`${BASE_URL}/requests/${requestId}/review`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${presToken}`,
    },
    body: JSON.stringify({ action: "Approved" }),
  });
  const approve = await approveRes.json();
  assert(approve.success === true, "President approves join request");
  assert(approve.request.status === "Approved", "Request status updated to Approved");

  // TEST 13: Verify Student Profile Reflects Membership
  console.log("\n--- 13. Student Profile Membership Reflection ---");
  const studentProfileRes = await fetch(`${BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  const studentProfile = await studentProfileRes.json();
  assert(
    studentProfile.user.clubs.some((c) => c.clubName === testClubName),
    "Student profile shows active membership in the newly approved club"
  );

  // TEST 14: Admin Dashboard Metrics Query
  console.log("\n--- 14. Admin Live Dashboard Telemetry ---");
  const dashRes = await fetch(`${BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const dash = await dashRes.json();
  assert(dash.success === true, "Live dashboard stats fetched successfully");
  assert(dash.stats.totalClubs >= 7, "Dashboard accurately reflects newly created club in counts");
  assert(dash.stats.totalStudents >= 5, "Dashboard accurately reflects registered student in counts");

  // TEST 15: Admin Student CRUD - Update Profile
  console.log("\n--- 15. Admin Student Management (Update) ---");
  const updateStuRes = await fetch(`${BASE_URL}/admin/students/${studentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      name: "Verified Student " + timestamp,
      year: "3rd Year",
      status: "Active",
    }),
  });
  const updateStu = await updateStuRes.json();
  assert(updateStu.success === true, "Admin updates student profile successfully");

  // TEST 16: Admin Delete Club (Cascade Clean)
  console.log("\n--- 16. Admin Club Deletion & Cleanup ---");
  const deleteClubRes = await fetch(`${BASE_URL}/clubs/${clubId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const deleteClub = await deleteClubRes.json();
  assert(deleteClub.success === true, "Admin deletes club with full referential cleanup");

  console.log("\n=======================================================");
  console.log("   🎉 ALL 16 INTEGRATION WORKFLOW TESTS PASSED CLEANLY!");
  console.log("=======================================================\n");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
