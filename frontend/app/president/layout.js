import PresidentLayout from "@/Components/president/PresidentLayout";

export const metadata = {
  title: "President Console | BroClubs",
  description: "Club leadership dashboard, membership administration, and event management.",
};

export default function Layout({ children }) {
  return <PresidentLayout>{children}</PresidentLayout>;
}
