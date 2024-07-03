import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { PageTitle, TabNavigation } from '@shared/components';
import { wrapper } from 'styles/wrapper.styles';
import IconPerson from '@public/assets/icons/common/Person.svg';

type ProfileWrapperProps = {
  children?: ReactNode;
};

const tabs: TabNavItem[] = [
  { href: '/profile/personal', name: 'Personal' },
  { href: '/profile/account', name: 'Account' },
];

export const ProfileWrapper = ({ children }: ProfileWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: pathname?.includes(tab.href),
  }));

  useEffect(() => {
    if (pathname === '/profile') router.replace(tabs[0].href);
  }, [router]);

  return (
    <>
      <PageTitle hideOrgPicker title="Profile" icon={<IconPerson />} />
      <div css={wrapper.main}>
        <TabNavigation items={tabItems} gap="32px" />
        {children}
      </div>
    </>
  );
};
