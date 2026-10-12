import AuthLayout from "@/Components/auth/AuthLayout";
import LoginForm from "@/Components/auth/LoginForm";

export const metadata = {
  title: "Sign In - BroClubs",
  description: "Sign in to continue to your BroClubs account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
