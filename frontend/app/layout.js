import "./globals.css";
import SessionManager from "@/Components/auth/SessionManager";

export const metadata = {
  title: "BroClubs - Campus Club Platform | A BroCodes Technologies Product",
  description:
    "BroClubs is a next-generation college club operations system engineered by BroCodes Technologies (brocodestech.in). Connect students, manage memberships, and empower club leaders.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionManager />
        {children}
      </body>
    </html>
  );
}
