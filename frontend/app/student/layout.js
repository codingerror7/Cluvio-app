import StudentLayout from "@/Components/student/StudentLayout";

export const metadata = {
  title: "Student Hub | BroClubs",
  description: "Explore campus clubs, manage memberships, and participate in campus activities.",
};

export default function Layout({ children }) {
  return <StudentLayout>{children}</StudentLayout>;
}
