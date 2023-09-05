import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { TableSkeleton } from '@shared/components';
import {
  SubscriptionCancellation,
  billingAtoms,
  SubscriptionPreview,
} from '@modules/billing';

type SubscriptionProps = {
  itemPrices: ItemPrice[];
};

export const Subscription = ({ itemPrices }: SubscriptionProps) => {
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const [activeView, setActiveView] = useState<'view' | 'cancel'>('view');

  const handleCancellation = () => setActiveView('cancel');
  const handleBack = () => setActiveView('view');

  if (subscriptionLoadingState === 'initializing') return <TableSkeleton />;

  return (
    <>
      <SubscriptionPreview
        itemPrices={itemPrices}
        handleCancellation={handleCancellation}
      />
      {activeView === 'cancel' && (
        <SubscriptionCancellation handleBack={handleBack} />
      )}
    </>
  );
};
