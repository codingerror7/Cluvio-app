import { Metadata } from 'next';
import { AdminAuthLayout } from '@/components/auth/AdminAuthLayout';
import { AdminLoginForm } from '@/components/auth/AdminLoginForm';

export const metadata: Metadata = {
  title: 'Administrator Sign In | Cluvio Admin Console',
  description: 'Sign in to access the Cluvio platform management console.',
};

export default function AdminLoginPage() {
  return (
    <AdminAuthLayout>
      <AdminLoginForm />
    </AdminAuthLayout>
  );
}
