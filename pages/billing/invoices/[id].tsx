import { ReactNode } from 'react';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import { InvoiceView } from '@modules/billing';
import { AppLayout } from '@modules/layout';
import { ParsedUrlQuery } from 'querystring';

const Invoice = () => <InvoiceView />;

Invoice.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="Invoice">{page}</AppLayout>;
};

export const getServerSideProps = <
  Q extends ParsedUrlQuery,
  D extends PreviewData,
>(
  context: GetServerSidePropsContext<Q, D>,
) => {
  let { slug } = context.query;
  if (!slug) {
    slug = undefined;
  }

  return { props: { slug: slug || null } };
};

export default Invoice;
