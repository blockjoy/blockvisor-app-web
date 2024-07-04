import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import InfiniteScroll from 'react-infinite-scroll-component';
import isEqual from 'lodash/isEqual';
import { ROUTES } from '@shared/index';
import { EmptyColumn, Table, TableSkeleton } from '@shared/components';
import {
  billingAtoms,
  mapInvoicesToRows,
  useInvoices,
  useInvoicesUIContext,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';

export const InvoicesList = () => {
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const router = useRouter();

  const { invoices, invoicesLoadingState, invoicesNextOffset, getInvoices } =
    useInvoices();

  const invoicesUIContext = useInvoicesUIContext();
  const invoicesUIProps = useMemo(() => {
    return {
      queryParams: invoicesUIContext.queryParams,
      setQueryParams: invoicesUIContext.setQueryParams,
    };
  }, [invoicesUIContext]);

  const currentQueryParams = useRef(invoicesUIProps.queryParams);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isEqual(currentQueryParams.current, invoicesUIProps.queryParams)) {
      getInvoices(invoicesUIProps.queryParams);
      currentQueryParams.current = invoicesUIProps.queryParams;
    }
  }, [invoicesUIProps.queryParams]);

  const { headers, rows } = mapInvoicesToRows(invoices);

  const handleRowClicked = (id: string) => {
    router.push(ROUTES.INVOICE(id));
  };

  const updateQueryParams = async () => {
    const newCurrentPage =
      invoicesUIProps.queryParams.pagination.currentPage + 1;
    const newQueryParams = {
      ...invoicesUIProps.queryParams,

      pagination: {
        ...invoicesUIProps.queryParams.pagination,
        currentPage: newCurrentPage,
      },
      filter: {
        ...invoicesUIProps.queryParams.filter,
        offset: invoicesNextOffset,
      },
    };

    invoicesUIProps.setQueryParams(newQueryParams);
  };

  if (
    invoicesLoadingState === 'initializing' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return invoices?.length ? (
    <InfiniteScroll
      dataLength={invoices?.length}
      next={updateQueryParams}
      hasMore={!!invoicesNextOffset}
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
