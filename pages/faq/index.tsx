import { AppLayout } from '@modules/layout';
import { Faq } from '@modules/faq/Faq';
import { ReactNode } from 'react';

const FaqView = () => <Faq />;

FaqView.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout pageTitle="FAQ">{page}</AppLayout>;
};

export default FaqView;
