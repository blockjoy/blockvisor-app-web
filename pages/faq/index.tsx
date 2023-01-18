import { AppLayout } from '@modules/layout';
import { Faq } from '@modules/faq/Faq';

const FaqView = () => <Faq />;

FaqView.getLayout = function getLayout(page: any) {
  return <AppLayout pageTitle="FAQ">{page}</AppLayout>;
};

export default FaqView;
