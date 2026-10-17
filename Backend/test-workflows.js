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
  console.log("   BROCLUBS TWO-ROLE ARCHITECTURE WORKFLOW TEST SUITE");
  console.log("   Strict Roles: 'student' & 'club_president'");
  console.log("=======================================================\n");

  const timestamp = Date.now();

  // TEST 1: Health check
  console.log("--- 1. Health Check ---");
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  assert(health.status === "healthy", "Server health check returns healthy");

  // TEST 2: Invalid Role Rejection Tests
  console.log("\n--- 2. Invalid Role Rejections (admin, teacher, moderator, etc.) ---");
  const invalidRoles = ["admin", "teacher", "moderator", "club member", "college-admin", "superadmin"];
  for (const invRole of invalidRoles) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Invalid User",
        email: `invalid_${invRole}_${timestamp}@campus.edu`,
        password: "Password123",
        confirmPassword: "Password123",
        role: invRole,
      }),
    });
    assert(res.status === 400, `Role '${invRole}' is rejected with 400 Bad Request`);
  }

  // TEST 3: Student Registration
  console.log("\n--- 3. Student Registration ---");
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
    }),
  });
  const studentReg = await studentRegRes.json();
  assert(studentReg.success === true, "Student registration succeeds");
  assert(studentReg.user.role === "student", "Role assigned as student on server");
  const studentToken = studentReg.token;
  const studentId = studentReg.user.id;

  // TEST 4: Student Login
  console.log("\n--- 4. Student Login ---");
  const studentLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testStudentEmail,
      password: "StudentPass@123",
      role: "student",
    }),
  });
  const studentLogin = await studentLoginRes.json();
  assert(studentLogin.success === true, "Student credentials login succeeds");
  assert(studentLogin.user.role === "student", "Role returned is strictly 'student'");

  // TEST 5: Club President Registration
  console.log("\n--- 5. Club President Registration ---");
  const testPresEmail = `president_${timestamp}@campus.edu`;
  const presRegRes = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test President " + timestamp,
      email: testPresEmail,
      password: "PresidentPass@123",
      confirmPassword: "PresidentPass@123",
      role: "club_president",
      enrollmentNumber: "PRES-" + timestamp.toString().slice(-6),
      department: "Data Science & AI",
      year: "3rd Year",
      age: 21,
    }),
  });
  const presReg = await presRegRes.json();
  assert(presReg.success === true, "Club President registration succeeds");
  assert(presReg.user.role === "club_president", "Role assigned as 'club_president' on server");
  const presToken = presReg.token;
  const presidentId = presReg.user.id;

  // TEST 6: Club President Login
  console.log("\n--- 6. Club President Login ---");
  const presLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testPresEmail,
      password: "PresidentPass@123",
      role: "club_president",
    }),
  });
  const presLogin = await presLoginRes.json();
  assert(presLogin.success === true, "Club President credentials login succeeds");
  assert(presLogin.user.role === "club_president", "Role returned is strictly 'club_president'");

  // TEST 7: Cross-Role Protection - Student Attempting to Create a Club
  console.log("\n--- 7. Cross-Role Protection: Student cannot create club ---");
  const unauthorizedClubRes = await fetch(`${BASE_URL}/clubs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${studentToken}`,
    },
    body: JSON.stringify({
      name: `Forbidden Club ${timestamp}`,
      description: "Should fail.",
    }),
  });
  assert(unauthorizedClubRes.status === 403, "Student cannot create club (403 Forbidden)");

  // TEST 8: Club President Creates a Club
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
  assert(createClub.success === true, "Club President successfully creates club");
  const clubId = createClub.club.id;

  // TEST 9: Student Browses Clubs
  console.log("\n--- 9. Club Discovery ---");
  const browseRes = await fetch(`${BASE_URL}/clubs?search=${encodeURIComponent(testClubName)}`);
  const browse = await browseRes.json();
  assert(browse.clubs.length === 1, "Club search successfully returns created club");

  // TEST 10: Student Submits Join Request
  console.log("\n--- 10. Student Submits Join Request ---");
  const requestRes = await fetch(`${BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${studentToken}`,
    },
    body: JSON.stringify({
      clubId,
      preferredDomain: "Technical & Coding",
      motivation: "Passionate about building.",
    }),
  });
  const requestJson = await requestRes.json();
  assert(requestJson.success === true, "Student successfully submits membership request");
  const requestId = requestJson.request.id;

  // TEST 11: President Reviews Request
  console.log("\n--- 11. President Reviews Request ---");
  const reviewRes = await fetch(`${BASE_URL}/requests/${requestId}/review`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${presToken}`,
    },
    body: JSON.stringify({
      action: "Approved",
      feedback: "Welcome to the club!",
    }),
  });
  const reviewJson = await reviewRes.json();
  assert(reviewJson.success === true, "President successfully reviews and approves request");

  // TEST 12: Verify Student Role Remains 'student' (Not mutated to 'club member')
  console.log("\n--- 12. Student Role Stability Verification ---");
  const studentProfileRes = await fetch(`${BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  const studentProfile = await studentProfileRes.json();
  assert(
    studentProfile.user.role === "student",
    "Student user role remains strictly 'student' after joining club"
  );
  assert(
    studentProfile.user.clubsJoined === 1,
    "Membership recorded properly in clubsJoined"
  );

  console.log("\n=======================================================");
  console.log("   🎉 ALL 12 TWO-ROLE WORKFLOW TESTS PASSED!");
  console.log("=======================================================\n");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
