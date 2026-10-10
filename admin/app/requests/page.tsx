import { RequestsListView } from '@/components/requests/RequestsListView';

export const metadata = {
  title: 'Membership Requests | Cluvio Admin',
  description: 'Manage and review student membership requests for all clubs.',
};

export default function RequestsPage() {
  return <RequestsListView />;
}
