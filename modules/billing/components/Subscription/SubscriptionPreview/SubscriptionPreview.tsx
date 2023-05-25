import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { DetailsView, TableSkeleton } from '@shared/components';
import { styles } from './SubscriptionPreview.styles';
import { SubscriptionInfo } from './SubscriptionInfo/SubscriptionInfo';
import { SubscriptionItems } from './SubscriptionItems/SubscriptionItems';
import { useEstimates, SubscriptionCancellation } from '@modules/billing';
import { billingAtoms } from '@modules/billing/store/billingAtoms';

export const SubscriptionPreview = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const { estimateLoadingState, getEstimate } = useEstimates();
  const [activeView, setActiveView] = useState<'list' | 'action'>('list');

  useEffect(() => {
    if (subscription?.status === 'active') getEstimate();
  }, []);

  const handleCancellation = () => setActiveView('action');
  const handleBack = () => setActiveView('list');

  return (
    <div css={styles.wrapper}>
      {estimateLoadingState !== 'finished' ||
      subscriptionLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : activeView === 'list' ? (
        <>
          <DetailsView headline="Info">
            <SubscriptionInfo handleCancellation={handleCancellation} />
          </DetailsView>
          {subscription?.status === 'active' && (
            <DetailsView headline="Items">
              <SubscriptionItems />
            </DetailsView>
          )}
        </>
      ) : (
        <>
          <SubscriptionCancellation handleBack={handleBack} />
        </>
      )}
    </div>
  );
};
