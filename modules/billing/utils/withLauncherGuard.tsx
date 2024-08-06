import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  billingSelectors,
  PaymentRequired,
  SubscriptionActivation,
} from '@modules/billing';
import { organizationSelectors } from '@modules/organization';
import { authSelectors } from '@modules/auth';

type LauncherView = 'payment-required' | 'confirm-subscription' | 'launcher';

type WithLauncherGuardProps = {
  type: 'launch-host' | 'launch-node';
  hasPermissionsToCreate: boolean;
};

type LauncherWithGuardBasicProps = {
  fulfilReqs: boolean;
  resetFulfilReqs: VoidFunction;
  onCreateClick: VoidFunction;
} & Partial<WithLauncherGuardProps>;

export type LauncherWithGuardProps = LauncherWithGuardBasicProps &
  Partial<WithLauncherGuardProps>;

export const withLauncherGuard = (Component: any) => {
  const withLauncherGuard = ({ ...props }: WithLauncherGuardProps) => {
    const { type, hasPermissionsToCreate, ...additionalProps } = props;

    const defaultOrganization = useRecoilValue(
      organizationSelectors.defaultOrganization,
    );
    const { isAdmin, isOwner } = useRecoilValue(
      organizationSelectors.organizationRole,
    );
    const hasPaymentMethod = useRecoilValue(billingSelectors.hasPaymentMethod);
    /**
     * Determines if a resource can be created.
     * Conditions:
     * - User has a subscription
     * - User has a payment method
     * - User is an admin or the owner
     */
    const canCreateResource = useRecoilValue(
      billingSelectors.canCreateResource,
    );
    const billingExempt = useRecoilValue(
      authSelectors.hasPermission('billing-exempt'),
    );

    const [activeView, setActiveView] = useState<LauncherView>('launcher');
    const [fulfilRequirements, setFulfilRequirements] = useState(false);

    useEffect(() => {
      setFulfilRequirements(false);
    }, [defaultOrganization?.id]);

    const handleDefaultView = () => {
      setActiveView('launcher');
    };

    const handleCancelAction = () => {
      handleDefaultView();
    };
    const handleSubmittedPayment = () => {
      handleDefaultView();
      setFulfilRequirements(true);
    };

    const handleActivateSubscription = () => {
      handleDefaultView();
      setFulfilRequirements(true);
    };

    const handleCreateClicked = () => {
      if (!canCreateResource && !billingExempt) {
        const newActiveView: LauncherView = !hasPaymentMethod
          ? 'payment-required'
          : 'confirm-subscription';

        setActiveView(newActiveView);

        setFulfilRequirements(false);
        return;
      }

      setFulfilRequirements(true);
    };

    const resetFulfilReqs = () => {
      setFulfilRequirements(false);
    };

    return (
      <>
        <Component
          fulfilReqs={fulfilRequirements}
          resetFulfilReqs={resetFulfilReqs}
          onCreateClick={handleCreateClicked}
          hasPermissionsToCreate={
            hasPermissionsToCreate && (isAdmin || isOwner)
          }
          {...additionalProps}
        />
        {activeView === 'payment-required' && (
          <PaymentRequired
            warningMessage={`Launching a ${
              type === 'launch-node'
                ? 'Node'
                : type === 'launch-host'
                ? 'Host'
                : 'Resource'
            } requires a payment method.`}
            handleCancel={handleCancelAction}
            handleSubmit={handleSubmittedPayment}
          />
        )}
        {activeView === 'confirm-subscription' && (
          <SubscriptionActivation
            handleSubmit={handleActivateSubscription}
            handleBack={handleDefaultView}
          />
        )}
      </>
    );
  };

  withLauncherGuard.displayName = `withLauncherGuard(${
    Component.displayName || Component.name || 'Component'
  })`;

  return withLauncherGuard;
};
