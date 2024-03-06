import { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { PageTitle } from '@shared/components';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { SettingsTabs } from './SettingsTabs';
import { wrapper } from 'styles/wrapper.styles';
import { authAtoms } from '@modules/auth';
import { billingAtoms } from '@modules/billing';
import { ROUTES } from '@shared/index';

type SettingsViewProps = {
  children?: ReactNode;
};

export const SettingsView = ({ children }: SettingsViewProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isSuperUser = useRecoilValue(authAtoms.isSuperUser);
  const isEnabledBillingPreview = useRecoilValue(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );

  useEffect(() => {
    if (pathname === '/settings') router.replace('/settings/profile');

    if (!isEnabledBillingPreview && pathname === '/settings/billing')
      router.push(ROUTES.NOT_FOUND);
  }, [router, isEnabledBillingPreview]);

  if (!isEnabledBillingPreview && pathname === '/settings/billing') return null;

  return (
    <>
      <PageTitle hideOrgPicker title="Settings" icon={<IconCog />} />

      <SettingsTabs />

      <div css={wrapper.main}>{children}</div>
    </>
  );
};
