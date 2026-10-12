import AuthLayout from "@/Components/auth/AuthLayout";
import RegisterForm from "@/Components/auth/RegisterForm";

export const metadata = {
  title: "Register - BroClubs",
  description: "Create your BroClubs account as a Student or Club President.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
