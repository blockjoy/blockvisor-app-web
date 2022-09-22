import { AppLayout } from '@modules/layout';
import { HostAdd } from '@modules/hosts/components/AddHost';

const Page = () => <HostAdd />;

Page.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Hosts', 'Add']}>{page}</AppLayout>;
};

export default Page;
