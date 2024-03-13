import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  billingAtoms,
  billingSelectors,
  ItemPriceSimple,
  PaymentRequired,
  SubscriptionActivation,
  LAUNCH_ERRORS,
} from '@modules/billing';
import { useDefaultOrganization } from '@modules/organization';
import { authAtoms } from '@modules/auth';

type LauncherView = 'payment-required' | 'confirm-subscription' | 'launcher';

type WithLauncherGuardBasicProps = {
  type: 'launch-host' | 'launch-node';
  hasPermissionsToCreate: boolean;
};

export type WithLauncherGuardAdditionalProps = {
  itemPrices?: ItemPriceSimple[];
};

type WithLauncherGuardProps = WithLauncherGuardBasicProps &
  Partial<WithLauncherGuardAdditionalProps>;

export type WithLauncherGuardPermissions = {
  disabled: boolean;
  permitted: boolean;
  superUser: boolean;
  message: string;
};

type LauncherWithGuardBasicProps = {
  fulfilReqs: boolean;
  resetFulfilReqs: VoidFunction;
  onCreateClick: VoidFunction;
  permissions: WithLauncherGuardPermissions;
} & Partial<WithLauncherGuardAdditionalProps>;

export type LauncherWithGuardProps = LauncherWithGuardBasicProps &
  Partial<WithLauncherGuardAdditionalProps>;

export const withLauncherGuard = (Component: any) => {
  const withLauncherGuard = ({ ...props }: WithLauncherGuardProps) => {
    const { type, hasPermissionsToCreate, ...aditionalProps } = props;

    const { defaultOrganization } = useDefaultOrganization();
    const isSuperUser = useRecoilValue(authAtoms.isSuperUser);
    const isEnabledBillingPreview = useRecoilValue(
      billingAtoms.isEnabledBillingPreview(isSuperUser),
    );
    const hasAuthorizedBilling = useRecoilValue(
      billingSelectors.hasAuthorizedBilling,
    );
    const bypassBillingForSuperUser = useRecoilValue(
      billingAtoms.bypassBillingForSuperUser(isSuperUser),
    );
    const hasPaymentMethod = useRecoilValue(billingSelectors.hasPaymentMethod);

    const [activeView, setActiveView] = useState<LauncherView>('launcher');
    const [fulfilRequirements, setFulfilRequirements] = useState(false);

    useEffect(() => {
      setFulfilRequirements(false);
    }, [defaultOrganization?.id]);

    const isPermittedAsSuperUser =
      isSuperUser && (!isEnabledBillingPreview || bypassBillingForSuperUser);

    const isDisabledAdding =
      (!hasAuthorizedBilling || !hasPermissionsToCreate) &&
      !isPermittedAsSuperUser;

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
      if (
        isEnabledBillingPreview &&
        !hasAuthorizedBilling &&
        !isPermittedAsSuperUser
      ) {
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

    const warningMessage = isDisabledAdding
      ? !hasPermissionsToCreate
        ? LAUNCH_ERRORS.NO_PERMISSION
        : !hasPaymentMethod
        ? LAUNCH_ERRORS.NO_BILLING
        : LAUNCH_ERRORS.NO_ACTIVE_SUBSCRIPTION
      : '';

    return (
      <>
        <Component
          fulfilReqs={fulfilRequirements}
          resetFulfilReqs={resetFulfilReqs}
          onCreateClick={handleCreateClicked}
          permissions={{
            disabled: isDisabledAdding,
            permitted: hasPermissionsToCreate,
            superUser: isPermittedAsSuperUser,
            message: warningMessage,
          }}
          {...aditionalProps}
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
