import { AppLayout } from '@modules/layout';
import Organization from '@modules/organizations/components/Organization';

const OrganizationPage = () => <Organization />;

OrganizationPage.getLayout = function getLayout(page: any) {
  return (
    <AppLayout breadcrumb={['Organizations', 'View Organization']}>
      {page}
    </AppLayout>
  );
};

export default OrganizationPage;
