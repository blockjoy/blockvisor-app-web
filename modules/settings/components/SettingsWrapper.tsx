import { useEffect } from 'react';
import { Content, PageTitle } from '@shared/components';
import { useApiKeys } from '@modules/settings';
import { SETTINGS_SIDEBAR_ITEMS } from '../constants/settings';
import IconCog from '@public/assets/icons/common/Cog.svg';

type Props = {
  hideOrgPicker?: boolean;
} & React.PropsWithChildren;

export const SettingsWrapper = ({ children, hideOrgPicker = true }: Props) => {
  const { listApiKeys } = useApiKeys();

  useEffect(() => {
    listApiKeys();
  }, []);

  return (
    <>
      <PageTitle
        hideOrgPicker={hideOrgPicker}
        title="Settings"
        icon={<IconCog />}
      />
      <Content sidebarItems={SETTINGS_SIDEBAR_ITEMS}>{children}</Content>
    </>
  );
};
