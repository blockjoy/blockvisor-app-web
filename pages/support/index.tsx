import { authAtoms } from '@modules/auth';
import { AppLayout } from '@modules/layout';
import { ChangePassword, EditUser } from '@modules/profile';
import { PageTitle, PageSection, Tabs } from '@shared/components';
import { useTabs } from '@shared/index';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';

const Support = () => {
  return (
    <>
      <PageTitle title="Support" />
      <PageSection>Support</PageSection>
    </>
  );
};

export default Support;

Support.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};
