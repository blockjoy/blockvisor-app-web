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
} from '@modules/billing';
import { useRouter } from 'next/router';

export const SubscriptionPreview = () => {
  const {
    query: { id },
  } = useRouter();

  const subscription = useRecoilValue(
    billingSelectors.subscriptions[id as string],
  );
  const subscriptionsLoadingState = useRecoilValue(
    billingAtoms.subscriptionsLoadingState,
  );
  const { estimateLoadingState, getEstimate } = useEstimates(subscription?.id!);
  const [activeView, setActiveView] = useState<'list' | 'action'>('list');

  useEffect(() => {
    if (subscription?.status === 'active') getEstimate();
  }, []);

  const handleCancellation = () => setActiveView('action');
  const handleBack = () => setActiveView('list');

  return (
    <div css={styles.wrapper}>
      {estimateLoadingState !== 'finished' ||
      subscriptionsLoadingState !== 'finished' ? (
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
