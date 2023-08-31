import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { _subscription } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import { TableSkeleton } from '@shared/components';
import {
  SubscriptionCancellation,
  billingAtoms,
  SubscriptionUpdate,
  SubscriptionPreview,
} from '@modules/billing';

type SubscriptionProps = {
  itemPrices: ItemPrice[];
};

export const Subscription = ({ itemPrices }: SubscriptionProps) => {
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const [activeView, setActiveView] =
    useState<'view' | 'cancel' | 'update'>('view');

  const handleCancellation = () => setActiveView('cancel');
  const handleUpdate = () => setActiveView('update');
  const handleBack = () => setActiveView('view');

  if (subscriptionLoadingState !== 'finished') return <TableSkeleton />;

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
