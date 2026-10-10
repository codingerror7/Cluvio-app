import "./globals.css";

export const metadata = {
  title: "Cluvio - Campus Club Platform | A BroCodes Technologies Product",
  description:
    "Cluvio is a next-generation college club operations system engineered by BroCodes Technologies (brocodestech.in). Connect students, manage memberships, and empower club leaders.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
