import AuthLayout from "@/Components/auth/AuthLayout";
import RegisterForm from "@/Components/auth/RegisterForm";

export const metadata = {
  title: "Register - Cluvio",
  description: "Create your Cluvio account as a Student or Club President.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
