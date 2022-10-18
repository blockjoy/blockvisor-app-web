import { PageSection } from '@modules/app/components/shared';
import { AppLayout } from '@modules/layout';
import { ChangePassword, EditUser, PageTitle } from '@modules/profile';
import { Tabs } from '@shared/components';
import { useTabs } from '@shared/index';
import { useRouter } from 'next/router';
import { spacing } from 'styles/utils.spacing.styles';

const items = [
  {
    label: 'Personal Information',
    value: '1',
    component: <EditUser />,
  },
  {
    label: 'Account',
    value: '2',
    component: (
      <>
        <h2 css={spacing.bottom.large}>Change Password</h2>
        <ChangePassword />
      </>
    ),
  },
];
const Profile = () => {
  const { push } = useRouter();
  const { activeTab, setActiveTab } = useTabs(items.length);

  const handleClick = (tabValue: string) => {
    setActiveTab(tabValue);
    push(
      {
        pathname: '/profile/settings',
        query: { tab: tabValue },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <>
      <PageTitle title="Settings" />
      <PageSection>
        <Tabs activeTab={activeTab} onTabClick={handleClick} tabItems={items} />
      </PageSection>
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};
