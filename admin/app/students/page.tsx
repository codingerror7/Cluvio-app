import { StudentsListView } from '@/components/students/StudentsListView';

export const metadata = {
  title: 'Students | Cluvio Admin',
  description: 'Manage students and their campus club participation.',
};

export default function StudentsPage() {
  return <StudentsListView />;
}
