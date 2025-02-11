import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { Content, PageTitle } from '@shared/components';
import { ROUTES } from '@shared/index';
import { useApiKeys } from '@modules/settings';
import { authSelectors } from '@modules/auth';
import {
  SETTINGS_SIDEBAR_ITEMS,
  SETTINGS_SIDEBAR_ITEMS_ADVANCED,
} from '../constants/settings';
import IconCog from '@public/assets/icons/common/Cog.svg';

type Props = {
  scope?: SettingsScope;
} & React.PropsWithChildren;

export const SettingsWrapper = ({ children, scope = 'user' }: Props) => {
  const router = useRouter();
  const { pathname, push } = router;

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const canGetBillingDetails = useRecoilValue(
    authSelectors.hasPermission('org-billing-get-billing-details'),
  );

  const { listApiKeys } = useApiKeys();

  const items = [...SETTINGS_SIDEBAR_ITEMS];

  if (isSuperUser) {
    items.push(...SETTINGS_SIDEBAR_ITEMS_ADVANCED);
  }

  useEffect(() => {
    listApiKeys();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (pathname === ROUTES.SETTINGS) push(ROUTES.PROFILE);
  }, [router.isReady]);

  const sidebarItems = items.filter((item) => {
    if (item.name === 'billing' && !canGetBillingDetails) return false;
    return true;
  });

  return (
    <>
      <PageTitle
        hideOrgPicker={scope !== 'org'}
        title="Settings"
        icon={<IconCog />}
      />
      <Content sidebarItems={sidebarItems}>{children}</Content>
    </>
  );
};
