import React, { Suspense } from "react";
import AuthLayout from "@/Components/auth/AuthLayout";
import LoginForm from "@/Components/auth/LoginForm";

export const metadata = {
  title: "Sign In - BroClubs",
  description: "Sign in to continue to your BroClubs account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="w-full h-80 rounded-3xl border border-white/10 bg-[#0c0c0f]/85 flex items-center justify-center">
            <span className="text-xs text-neutral-400">Loading sign in portal...</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
