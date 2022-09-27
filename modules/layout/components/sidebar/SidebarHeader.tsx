import { styles } from './SidebarHeader.styles';
import { OrganizationDropdown } from '@modules/organisations';
import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';

export const SidebarHeader = () => {
  return (
    <header css={[styles.wrapper]}>
      <OrganizationDropdown />
      <LogoSmall css={[styles.logo]} />
    </header>
  );
};
