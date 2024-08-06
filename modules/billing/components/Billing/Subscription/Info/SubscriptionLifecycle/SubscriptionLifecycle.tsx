import {
  SubscriptionActions,
  SubscriptionActivation,
  SubscriptionCancellation,
} from '@modules/billing';

type SubscriptionLifecycleProps = {
  activeView: SubscriptionView;
  handleActiveView: (view: SubscriptionView) => void;
};

export const SubscriptionLifecycle = ({
  activeView,
  handleActiveView,
}: SubscriptionLifecycleProps) => {
  const handleBack = () => handleActiveView('preview');

  return (
    <>
      <SubscriptionActions handleActiveView={handleActiveView} />

      {activeView === 'cancel-subscription' && (
        <SubscriptionCancellation handleBack={handleBack} />
      )}
      {(activeView === 'reactivate-subscription' ||
        activeView === 'restore-subscription') && (
        <SubscriptionActivation handleBack={handleBack} type={activeView} />
      )}
    </>
  );
};
