import { mapInvoicesToRows, useInvoices } from '@modules/billing/';
import { EmptyColumn, ROUTES, Table, TableSkeleton } from '@shared/index';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const InvoicesTable = () => {
  const router = useRouter();

  const { invoices, getInvoices, invoicesLoadingState } = useInvoices();

  useEffect(() => {
    getInvoices();
  }, []);

  const { headers, rows } = mapInvoicesToRows(invoices);

  const handleRowClicked = (id: any) => {
    router.push(ROUTES.INVOICE(id.key));
  };

  return (
    <>
      {invoicesLoadingState === 'finished' ? (
        <>
          {invoices?.length ? (
            <Table
              isLoading={invoicesLoadingState}
              onRowClick={handleRowClicked}
              headers={headers}
              rows={rows}
            />
          ) : (
            <EmptyColumn
              title="Invoices Not Found"
              description="No invoices exist"
            />
          )}
        </>
      ) : (
        <TableSkeleton />
      )}
    </>
  );
};
