import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
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
import { useRecoilValue } from 'recoil';

export const InvoicesList = () => {
  const subscriptionLoadingState = useRecoilValue(
    billingAtoms.subscriptionLoadingState,
  );

  const router = useRouter();

  const {
    invoices,
    invoicesLoadingState,
    invoicesNextOffset,
    preloadInvoices,
    getInvoices,
  } = useInvoices();

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
    getInvoices(invoicesUIProps.queryParams);
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
    // sleep 300ms for better UX/UI (maybe should be removed)
    await new Promise((r) => setTimeout(r, 300));

    const newCurrentPage =
      invoicesUIProps.queryParams.pagination.currentPage + 1;
    const newQueryParams = {
      ...invoicesUIProps.queryParams,

      pagination: {
        ...invoicesUIProps.queryParams.pagination,
        currentPage: newCurrentPage,
      },
    };

    invoicesUIProps.setQueryParams(newQueryParams);
  };

  if (
    invoicesLoadingState !== 'finished' ||
    subscriptionLoadingState !== 'finished'
  )
    return <TableSkeleton />;

  return invoices?.length ? (
    <InfiniteScroll
      dataLength={invoices?.length}
      next={updateQueryParams}
      hasMore={invoicesNextOffset !== undefined}
      style={{ overflow: 'hidden' }}
      scrollThreshold={1}
      loader={''}
      endMessage={''}
    >
      <Table
        isLoading={invoicesLoadingState}
        headers={headers}
        preload={preloadInvoices}
        rows={rows}
        fixedRowHeight="80px"
        onRowClick={handleRowClicked}
      />
    </InfiniteScroll>
  ) : (
    <EmptyColumn title="Invoices Not Found" description="No invoices exist" />
  );
};
