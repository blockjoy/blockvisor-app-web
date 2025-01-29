import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { ROUTES } from '@shared/index';
import { PageTitle, TabNavigation } from '@shared/components';
import { authAtoms } from '@modules/auth';
import { useApiKeys } from '@modules/settings';
import { wrapper } from 'styles/wrapper.styles';
import IconCog from '@public/assets/icons/common/Cog.svg';

type SettingsWrapperProps = {
  children?: ReactNode;
};

const tabs: TabNavItem[] = [
  { href: ROUTES.PROFILE, name: 'Profile' },
  { href: ROUTES.API_KEYS, name: 'API keys' },
];

export const SettingsWrapper = ({ children }: SettingsWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const permissionsLoadingState = useRecoilValue(
    authAtoms.permissionsLoadingState,
  );

  const { listApiKeys } = useApiKeys();

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: pathname?.includes(tab.href),
  }));

  useEffect(() => {
    listApiKeys();
  }, []);

  useEffect(() => {
    if (pathname === ROUTES.SETTINGS) router.replace(tabs[0].href);
  }, [router]);

  return (
    <>
      <PageTitle hideOrgPicker title="Settings" icon={<IconCog />} />
      <div css={wrapper.main}>
        <TabNavigation items={tabItems} gap="32px" />
        {children}
      </div>
    </>
  );
};
