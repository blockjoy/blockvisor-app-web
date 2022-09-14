import { OrganizationsPage } from '@modules/app/components/organizations/OrganizationsPage';
import { AppLayout } from '@modules/layout';

const Organizations = () => <OrganizationsPage />;

Organizations.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Organizations', 'All']}>{page}</AppLayout>;
};

export default Organizations;
