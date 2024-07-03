import { ReactNode } from 'react';
import { AppLayout } from '@modules/layout';
import { ProfileWrapper } from '@modules/profile';

const Component = () => <ProfileWrapper />;

Component.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout isPageFlex>{page}</AppLayout>;
};

export default Component;
