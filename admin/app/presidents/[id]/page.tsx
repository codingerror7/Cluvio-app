import { PresidentDetailView } from '@/components/presidents/PresidentDetailView';
import { mockPresidents } from '@/lib/mockData';

export const metadata = {
  title: 'President Dossier | Cluvio Admin',
  description: 'Detailed profile, permissions, and leadership telemetry for club president.',
};

export function generateStaticParams() {
  return mockPresidents.map((pres) => ({
    id: pres.id,
  }));
}

export default async function PresidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PresidentDetailView presidentId={id} />;
}
