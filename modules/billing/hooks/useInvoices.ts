import { useRecoilState, useRecoilValue } from 'recoil';
import { Invoice } from '@modules/grpc/library/blockjoy/v1/org';
import { billingAtoms } from '@modules/billing';
import { organizationClient } from '@modules/grpc';
import { organizationSelectors } from '@modules/organization';

interface IInvoicesHook {
  invoices: Invoice[];
  invoicesLoadingState: LoadingState;
  getInvoices: () => Promise<void>;
}

export const useInvoices = (): IInvoicesHook => {
  const [invoices, setInvoices] = useRecoilState(billingAtoms.invoices);
  const [invoicesLoadingState, setInvoicesLoadingState] = useRecoilState(
    billingAtoms.invoicesLoadingState,
  );

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const getInvoices = async () => {
    setInvoicesLoadingState('initializing');

    try {
      const data = await organizationClient.getInvoices(
        defaultOrganization?.id!,
      );

      console.log('%cGetInvoices', 'color: #bff589', data);
      setInvoices(data);
    } catch (error) {
      console.error('Failed to fetch Invoices', error);
      setInvoices([]);
    } finally {
      setInvoicesLoadingState('finished');
    }
  };

  return {
    invoices,
    invoicesLoadingState,

    getInvoices,
  };
};
