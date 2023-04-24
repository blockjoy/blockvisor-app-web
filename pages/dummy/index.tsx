import { useCustomer } from '@modules/billing/hooks/useCustomer';
import { AppLayout } from '@modules/layout';
import { PageSection, PageTitle } from '@shared/index';

const Dummy = () => {
  const { createCustomer }: any = useCustomer();

  return (
    <>
      <PageTitle hasOrgPicker title="Dummy" />
      <PageSection bottomBorder={false}>
        <div>
          <button
            onClick={() =>
              createCustomer('dragan@blockjoy.com', 'Dragan', 'Rakita')
            }
          >
            Create Customer
          </button>
        </div>
      </PageSection>
    </>
  );
};

Dummy.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Billing">{page}</AppLayout>;
};

export default Dummy;
