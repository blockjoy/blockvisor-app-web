import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { TableSkeleton } from '@shared/components';
import {
  SubscriptionCancellation,
  billingAtoms,
  SubscriptionPreview,
} from '@modules/billing';

export const Subscription = () => {
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const [activeView, setActiveView] = useState<'view' | 'cancel'>('view');

  const handleCancellation = () => setActiveView('cancel');
  const handleBack = () => setActiveView('view');

  if (subscriptionLoadingState === 'initializing') return <TableSkeleton />;

  return (
    <>
      <SubscriptionPreview handleCancellation={handleCancellation} />
      {activeView === 'cancel' && (
        <SubscriptionCancellation handleBack={handleBack} />
      )}
    </>
  );
};
