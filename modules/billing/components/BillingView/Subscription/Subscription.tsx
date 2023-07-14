import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { TableSkeleton } from '@shared/components';
import {
  useEstimates,
  SubscriptionCancellation,
  billingAtoms,
  billingSelectors,
  SubscriptionUpdate,
  SubscriptionPreview,
} from '@modules/billing';

type SubscriptionProps = {
  itemPrices: ItemPrice[];
};

export const Subscription = ({ itemPrices }: SubscriptionProps) => {
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

  if (
    estimateLoadingState !== 'finished' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return (
    <>
      {activeView === 'view' ? (
        <SubscriptionPreview
          handleCancellation={handleCancellation}
          handleUpdate={handleUpdate}
        />
      ) : activeView === 'update' ? (
        <SubscriptionUpdate handleBack={handleBack} itemPrices={itemPrices} />
      ) : (
        <SubscriptionCancellation handleBack={handleBack} />
      )}
    </>
  );
};
