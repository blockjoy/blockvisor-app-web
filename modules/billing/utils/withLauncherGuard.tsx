import { useEffect, useState } from 'react';
import {
  LAUNCH_ERRORS,
  PaymentRequired,
  SubscriptionActivation,
  billingAtoms,
  billingSelectors,
} from '@modules/billing';
import { useDefaultOrganization } from '@modules/organization';
import { usePermissions } from '@modules/auth';
import { useRecoilValue } from 'recoil';

type LauncherView = 'payment-required' | 'confirm-subscription' | 'launcher';

type WithLauncherGuardProps = {
  type: 'launch-host' | 'launch-node';
  isPermittedToCreate: boolean;
};

export type WithLauncherGuardPermissions = {
  disabled: boolean;
  permitted: boolean;
  superUser: boolean;
  message: string;
};

export type LauncherWithGuardProps = {
  fulfilReqs: boolean;
  resetFulfilReqs: VoidFunction;
  onCreateClick: VoidFunction;
  permissions: WithLauncherGuardPermissions;
};

export const withLauncherGuard = (Component: any) => {
  const withLauncherGuard = ({ ...props }: WithLauncherGuardProps) => {
    const { type, isPermittedToCreate } = props;

    const { defaultOrganization } = useDefaultOrganization();
    const { isSuperUser } = usePermissions();

    const canCreateResources = useRecoilValue(
      billingSelectors.canCreateResources,
    );
    const isSuperUserBilling = useRecoilValue(
      billingAtoms.isSuperUserBilling(isSuperUser),
    );
    const hasPaymentMethod = useRecoilValue(billingSelectors.hasPaymentMethod);

    const [activeView, setActiveView] = useState<LauncherView>('launcher');
    const [fulfilRequirements, setFulfilRequirements] = useState(false);

    useEffect(() => {
      if (fulfilRequirements) setFulfilRequirements(false);
    }, [defaultOrganization?.id]);

    const isPermittedAsSuperUser = isSuperUser && isSuperUserBilling;
    const isDisabledAdding =
      (!canCreateResources || !isPermittedToCreate) && !isPermittedAsSuperUser;

    const handleDefaultView = () => {
      setActiveView('launcher');
    };

    const handleCancelAction = () => {
      handleDefaultView();
    };
    const handleSubmitPayment = () => {
      handleDefaultView();
      setFulfilRequirements(true);
    };

    const handleActivateSubscription = () => {
      handleDefaultView();
      setFulfilRequirements(true);
    };

    const handleCreateClicked = () => {
      if (!canCreateResources && !isPermittedAsSuperUser) {
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

    console.group('withLauncherGuard');
    console.log({ isSuperUser, isSuperUserBilling });
    console.log({ hasPaymentMethod, canCreateResources });
    console.log({ isDisabledAdding });
    console.groupEnd();

    const warningMessage =
      isDisabledAdding && !isPermittedAsSuperUser
        ? !isPermittedToCreate
          ? LAUNCH_ERRORS.NO_PERMISSION
          : !hasPaymentMethod
          ? LAUNCH_ERRORS.NO_BILLING
          : LAUNCH_ERRORS.NO_ACTIVE_SUBSCRIPTION
        : '';

    return (
      <>
        {activeView === 'launcher' && (
          <Component
            fulfilReqs={fulfilRequirements}
            resetFulfilReqs={resetFulfilReqs}
            onCreateClick={handleCreateClicked}
            permissions={{
              disabled: isDisabledAdding,
              permitted: isPermittedToCreate,
              superUser: isPermittedAsSuperUser,
              message: warningMessage,
            }}
          />
        )}
        {activeView === 'payment-required' && (
          <PaymentRequired
            warningMessage={`Creating a ${name} requires a payment method.`}
            handleCancel={handleCancelAction}
            handleSubmit={handleSubmitPayment}
            handleBack={handleDefaultView}
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
