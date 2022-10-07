import { AppLayout } from '@modules/layout';
import { OrganizationsPage } from '@modules/organisations';

const Organizations = () => <OrganizationsPage />;

Organizations.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Organizations', 'All']}>{page}</AppLayout>;
};

export default Organizations;
