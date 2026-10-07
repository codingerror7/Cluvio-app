import { ClubsListView } from '@/components/clubs/ClubsListView';

export const metadata = {
  title: 'Clubs | Cluvio Admin',
  description: 'Manage and monitor all student clubs across the platform.',
};

export default function ClubsPage() {
  return <ClubsListView />;
}
