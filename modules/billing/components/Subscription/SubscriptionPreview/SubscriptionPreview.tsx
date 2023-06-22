import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { DetailsView, TableSkeleton } from '@shared/components';
import { styles } from './SubscriptionPreview.styles';
import {
  useEstimates,
  SubscriptionCancellation,
  billingAtoms,
  billingSelectors,
  SubscriptionInfo,
  SubscriptionItems,
  SubscriptionUpdate,
} from '@modules/billing';

export const SubscriptionPreview = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const { estimateLoadingState, getEstimate } = useEstimates(subscription?.id!);
  const [activeView, setActiveView] =
    useState<'view' | 'cancel' | 'update'>('view');

  useEffect(() => {
    if (subscription?.status === 'active') getEstimate();
  }, []);

  const handleCancellation = () => setActiveView('cancel');
  const handleUpdate = () => setActiveView('update');
  const handleBack = () => setActiveView('view');

  return (
    <div css={styles.wrapper}>
      {estimateLoadingState !== 'finished' ||
      subscriptionLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : activeView === 'view' ? (
        <>
          <DetailsView headline="Info">
            <SubscriptionInfo
              handleCancellation={handleCancellation}
              handleUpdate={handleUpdate}
            />
          </DetailsView>
          {subscription?.status === 'active' && (
            <DetailsView headline="Estimates">
              <SubscriptionItems />
            </DetailsView>
          )}
        </>
      ) : activeView === 'update' ? (
        <>
          <SubscriptionUpdate handleBack={handleBack} />
        </>
      ) : (
        <>
          <SubscriptionCancellation handleBack={handleBack} />
        </>
      )}
    </div>
  );
};
