import { AppLayout } from '@modules/layout';
import { Faq } from '@modules/faq/Faq';
import { fetchFAQ } from 'utils/FAQ/fetchFAQ';
import { ReactNode } from 'react';

export type FaqViewProps = {
  data: FAQ[];
};

const FaqView = ({ data }: FaqViewProps) => <Faq faqs={data} />;

FaqView.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="FAQ">{page}</AppLayout>;
};

export async function getServerSideProps() {
  const { data } = await fetchFAQ();

  return { props: { data } };
}

export default FaqView;
