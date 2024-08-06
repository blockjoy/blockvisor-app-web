import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { DetailsTable, Heading, TableSkeleton } from '@shared/components';
import {
  billingAtoms,
  mapSubscriptionToDetails,
  SubscriptionLifecycle,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './SubscriptionInfo.styles';
import { containers } from 'styles/containers.styles';

export const SubscriptionInfo = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);

  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const [activeView, setActiveView] = useState<SubscriptionView>('preview');

  const handleActiveView = (view: SubscriptionView) => setActiveView(view);

  const subscriptionData = mapSubscriptionToDetails(subscription!);

  if (subscriptionLoadingState === 'initializing') return <TableSkeleton />;

  return (
    <>
      {/* <Heading>Details</Heading> */}
      <div
        css={[
          styles.tableRows,
          containers.mediumSmall /*spacing.bottom.large*/,
        ]}
      >
        <DetailsTable bodyElements={subscriptionData} />
      </div>

      {/* <Heading>Settings</Heading>
      <SubscriptionLifecycle
        activeView={activeView}
        handleActiveView={handleActiveView}
      /> */}
    </>
  );
};
