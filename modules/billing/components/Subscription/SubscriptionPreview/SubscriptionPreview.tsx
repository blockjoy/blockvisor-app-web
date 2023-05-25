import { Button, DetailsView, TableSkeleton } from '@shared/index';
import { styles } from './SubscriptionPreview.styles';
import { SubscriptionInfo } from './SubscriptionInfo/SubscriptionInfo';
import { SubscriptionItems } from './SubscriptionItems/SubscriptionItems';
import { useEstimates } from '@modules/billing/hooks/useEstimates';
import { useEffect, useState } from 'react';
import { SubscriptionCancellation } from '../SubscriptionCancellation/SubscriptionCancellation';
import { useSubscription } from '@modules/billing/hooks/useSubscription';

export const SubscriptionPreview = () => {
  const { subscriptionLoadingState } = useSubscription();
  const { estimateLoadingState, getEstimate } = useEstimates();
  const [activeView, setActiveView] = useState<'list' | 'action'>('list');

  useEffect(() => {
    getEstimate();
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
          <DetailsView headline="Items">
            <SubscriptionItems />
          </DetailsView>
        </>
      ) : (
        <>
          <SubscriptionCancellation handleBack={handleBack} />
        </>
      )}
    </div>
  );
};
