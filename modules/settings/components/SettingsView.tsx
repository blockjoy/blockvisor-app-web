import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PageTitle } from '@shared/components';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { SettingsTabs } from './SettingsTabs';
import { wrapper } from 'styles/wrapper.styles';

type SettingsViewProps = {
  children?: ReactNode;
};

export const SettingsView = ({ children }: SettingsViewProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/settings') router.replace('/settings/profile');
  }, [router]);

  return (
    <>
      <PageTitle hideOrgPicker title="Settings" icon={<IconCog />} />

      <SettingsTabs />

      <div css={wrapper.main}>{children}</div>
    </>
  );
};
