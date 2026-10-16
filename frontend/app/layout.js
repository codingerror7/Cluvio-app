import "./globals.css";
import SessionManager from "@/Components/auth/SessionManager";

export const metadata = {
  title: "BroClubs - Campus Club Platform | A BroCodes Technologies Product",
  description:
    "BroClubs is a next-generation college club operations system engineered by BroCodes Technologies (brocodestech.in). Connect students, manage memberships, and empower club leaders.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('broclubs_theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <SessionManager />
        {children}
      </body>
    </html>
  );
}
