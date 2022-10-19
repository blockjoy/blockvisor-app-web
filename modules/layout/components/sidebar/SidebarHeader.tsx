import { styles } from './SidebarHeader.styles';
import { OrganizationDropdown } from '@modules/organizations';
import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';

export const SidebarHeader = () => {
  return (
    <header css={[styles.wrapper]}>
      <OrganizationDropdown />
      <span css={styles.logoWrapper}>
        <LogoSmall css={[styles.logo]} />
      </span>
    </header>
  );
};
