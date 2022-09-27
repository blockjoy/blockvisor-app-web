import { AppLayout } from '@modules/layout';
import Organisation from '@modules/organisations/components/Organisation';

const OrganisationPage = () => <Organisation />;

OrganisationPage.getLayout = function getLayout(page: any) {
  return (
    <AppLayout breadcrumb={['Organisations', 'View Organisation']}>
      {page}
    </AppLayout>
  );
};

export default OrganisationPage;
