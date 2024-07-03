import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  useEstimates,
  useInvoices,
  usePaymentMethods,
  useSubscription,
} from '@modules/billing';
import { organizationSelectors } from '@modules/organization';

export const useBilling = () => {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const { getPaymentMethods } = usePaymentMethods();
  const { subscription, getSubscription } = useSubscription();
  const { getEstimates } = useEstimates();
  const { getInvoices } = useInvoices();

  const currentOrgId = useRef<string | undefined>(defaultOrganization?.id);
  // TODO: change to ID
  const currentSubId = useRef<Date | undefined>(
    subscription?.currentPeriodStart,
  );

  useEffect(() => {
    if (currentOrgId && currentOrgId.current !== defaultOrganization?.id) {
      getPaymentMethods();
      getSubscription();

      currentOrgId.current = defaultOrganization?.id;
    }
  }, [defaultOrganization?.id]);

  useEffect(() => {
    if (
      currentSubId &&
      currentOrgId.current !== subscription?.currentPeriodStart
    ) {
      getEstimates();
      getInvoices();

      currentSubId.current = subscription?.currentPeriodStart;
    }
  }, [subscription?.createdAt]);
};
