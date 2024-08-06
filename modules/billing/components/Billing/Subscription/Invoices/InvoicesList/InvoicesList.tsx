import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ROUTES } from '@shared/index';
import { EmptyColumn, Table, TableSkeleton } from '@shared/components';
import { billingAtoms, mapInvoicesToRows } from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';

export const InvoicesList = () => {
  const router = useRouter();

  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );
  const invoices = useRecoilValue(billingAtoms.invoices);
  const invoicesLoadingState = useRecoilValue(
    billingAtoms.invoicesLoadingState,
  );

  const { headers, rows } = mapInvoicesToRows(invoices);

  const handleRowClicked = (id: string) => {
    router.push(ROUTES.INVOICE(id));
  };

  if (
    invoicesLoadingState === 'initializing' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return invoices?.length ? (
    <InfiniteScroll
      dataLength={invoices?.length}
      next={() => {}}
      hasMore={false}
      style={{ overflow: 'hidden' }}
      scrollThreshold={0.75}
      loader={
        <div css={[spacing.top.medium, flex.display.flex, flex.justify.center]}>
          <p>Loading...</p>
        </div>
      }
    >
      <Table
        isLoading={invoicesLoadingState}
        headers={headers}
        preload={0}
        rows={rows}
        fixedRowHeight="80px"
        onRowClick={handleRowClicked}
      />
    </InfiniteScroll>
  ) : (
    <EmptyColumn title="Invoices Not Found" description="No invoices exist" />
  );
};
