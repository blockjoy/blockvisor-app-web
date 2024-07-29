import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
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
  const { getPaymentMethods } = usePaymentMethods();
  const { getBillingAddress } = useBillingAddress();
  const { getSubscription } = useSubscription();
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
};
