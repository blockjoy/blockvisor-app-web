import { useSubscription } from '@modules/billing';
import { AppLayout } from '@modules/layout';
import { Button, PageSection, PageTitle } from '@shared/index';
import { flex } from 'styles/utils.flex.styles';
import { typo } from 'styles/utils.typography.styles';
import { containers } from 'styles/containers.styles';

const Dummy = () => {
  const { createSubscription, updateSubscription } = useSubscription();

  return (
    <>
      <PageTitle hasOrgPicker title="Dummy" />
      <PageSection bottomBorder={false}>
        <div css={[containers.buttons]}>
          <Button
            onClick={() =>
              createSubscription({
                planId: 'single-node',
              })
            }
          >
            Create Subscription
          </Button>
          <Button
            onClick={() =>
              updateSubscription({
                type: 'create',
                payload: {
                  item: 'polygon-pruned-apac-USD-Monthly',
                },
              })
            }
          >
            Update Subscription (ADD)
          </Button>
          <Button
            onClick={() =>
              updateSubscription({
                type: 'delete',
                payload: {
                  item: 'polygon-pruned-apac-USD-Monthly',
                },
              })
            }
          >
            Update Subscription (DELETE)
          </Button>
        </div>
      </PageSection>
    </>
  );
};

Dummy.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="Billing">{page}</AppLayout>;
};

export default Dummy;
