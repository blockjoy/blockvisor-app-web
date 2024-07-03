import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TableSkeleton } from '@shared/components';
import {
  SubscriptionCancellation,
  billingAtoms,
  SubscriptionPreview,
  SubscriptionActivation,
} from '@modules/billing';

export type ActiveView =
  | 'preview'
  | 'cancel-subscription'
  | 'reactivate-subscription'
  | 'restore-subscription';

export const Subscription = () => {
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const [activeView, setActiveView] = useState<ActiveView>('preview');

  const handleBack = () => setActiveView('preview');

  if (subscriptionLoadingState === 'initializing') return <TableSkeleton />;

  return (
    <>
      <SubscriptionPreview onViewChange={setActiveView} />
      {/* {activeView === 'cancel-subscription' && (
        <SubscriptionCancellation handleBack={handleBack} />
      )}
      {(activeView === 'reactivate-subscription' ||
        activeView === 'restore-subscription') && (
        <SubscriptionActivation handleBack={handleBack} type={activeView} />
      )} */}
    </>
  );
};
