import { styles } from './SidebarHeader.styles';
import { OrganizationDropdown } from '@modules/organizations';
import { TopbarBurger } from '../topbar/TopbarBurger';
import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const SidebarHeader = () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  return (
    <header css={[styles.wrapper]}>
      <span css={styles.burgerWrapper}>{/* <TopbarBurger /> */}</span>
      {layout === 'sidebar' && <OrganizationDropdown />}
    </header>
  );
};
