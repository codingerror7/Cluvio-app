import AuthLayout from "@/Components/auth/AuthLayout";
import LoginForm from "@/Components/auth/LoginForm";

export const metadata = {
  title: "Sign In - Cluvio",
  description: "Sign in to continue to your Cluvio account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
