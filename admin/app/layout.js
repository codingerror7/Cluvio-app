import "./globals.css";


export const metadata = {
  title: "Club management system",
  description: "management system for complete management of clubs in campus",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"  >
      <body>{children}</body>
    </html>
  );
}
