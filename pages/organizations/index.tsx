import { AppLayout } from '@modules/layout';
import { OrganisationsPage } from '@modules/organisations';

const Organizations = () => <OrganisationsPage />;

Organizations.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Organizations', 'All']}>{page}</AppLayout>;
};

export default Organizations;
