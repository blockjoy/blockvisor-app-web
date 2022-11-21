import { styles } from './SidebarHeader.styles';
import { OrganizationDropdown } from '@modules/organizations';
import { TopbarBurger } from '../topbar/TopbarBurger';

export const SidebarHeader = () => {
  return (
    <header css={[styles.wrapper]}>
      <span css={styles.burgerWrapper}>
        <TopbarBurger />
      </span>
      <OrganizationDropdown />
    </header>
  );
};
