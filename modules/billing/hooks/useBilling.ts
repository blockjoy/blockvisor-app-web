import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  billingAtoms,
  useBillingAddress,
  useInvoices,
  usePaymentMethods,
  useSubscription,
} from '@modules/billing';
import { organizationSelectors } from '@modules/organization';
import { authAtoms } from '@modules/auth';

export const useBilling = () => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const permissionsLoadingState = useRecoilValue(
    authAtoms.permissionsLoadingState,
  );
  const hasCreatedPaymentMethod = useRecoilValue(
    billingAtoms.hasCreatedPaymentMethod,
  );

  const { getPaymentMethods } = usePaymentMethods();
  const { getBillingAddress } = useBillingAddress();
  const { subscription, getSubscription } = useSubscription();
  const { getInvoices } = useInvoices();

  const currentOrgId = useRef<string>();

  useEffect(() => {
    if (
      currentOrgId &&
      currentOrgId.current !== defaultOrganization?.id &&
      permissionsLoadingState === 'finished'
    ) {
      getPaymentMethods();
      getBillingAddress();
      getInvoices();
      getSubscription();

      currentOrgId.current = defaultOrganization?.id;
    }
  }, [defaultOrganization?.id, permissionsLoadingState]);

  useEffect(() => {
    if (!subscription && hasCreatedPaymentMethod) {
      getSubscription();
      getInvoices();
    }
  }, [hasCreatedPaymentMethod]);
};
