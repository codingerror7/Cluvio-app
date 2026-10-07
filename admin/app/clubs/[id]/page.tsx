import { ClubDetailView } from '@/components/clubs/ClubDetailView';
import { mockClubs } from '@/lib/mockData';

export const metadata = {
  title: 'Club Dossier | Cluvio Admin',
  description: 'Detailed view and leadership management for student club organization.',
};

export function generateStaticParams() {
  return mockClubs.map((club) => ({
    id: club.id,
  }));
}

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClubDetailView clubId={id} />;
}
