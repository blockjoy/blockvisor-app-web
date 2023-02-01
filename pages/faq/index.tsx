import { AppLayout } from '@modules/layout';
import { Faq } from '@modules/faq/Faq';
import { fetchFAQ } from 'utils/FAQ/fetchFAQ';
import { ReactNode } from 'react';
import { NextPageContext } from 'next';

export type FaqViewProps = {
  data: FAQ[];
};

const FaqView = ({ data }: FaqViewProps) => <Faq faqs={data} />;

FaqView.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="FAQ">{page}</AppLayout>;
};

export async function getServerSideProps({ res }: NextPageContext) {
  res!.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  const { data } = await fetchFAQ();

  return { props: { data } };
}

export default FaqView;
