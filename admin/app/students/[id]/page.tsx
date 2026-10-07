import { StudentDetailView } from '@/components/students/StudentDetailView';
import { mockStudents } from '@/lib/mockData';

export const metadata = {
  title: 'Student Dossier | Cluvio Admin',
  description: 'Student extracurricular participation profile, club memberships, and attendance log.',
};

export function generateStaticParams() {
  return mockStudents.map((stu) => ({
    id: stu.id,
  }));
}

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StudentDetailView studentId={id} />;
}
