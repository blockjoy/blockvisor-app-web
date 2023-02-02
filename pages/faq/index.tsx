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

export async function getStaticProps() {
  const { data } = await fetchFAQ();

  return { props: { data } };
}

export default FaqView;
