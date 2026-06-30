import "./globals.css";

export const metadata = {
  title: "Cluvio - Modern Club Management Workspace",
  description:
    "Cluvio helps colleges, universities, and organizations manage members, events, announcements, registrations, and communications from a single, beautiful workspace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
