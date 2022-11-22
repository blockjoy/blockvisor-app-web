import { TopbarUser } from './TopbarUser';
// import {TopbarSearch} from "./TopbarSearch";
import { TopbarBlockvisor } from './TopbarBlockvisor';
import { TopbarBurger } from './TopbarBurger';
import { OrganizationDropdown } from '@modules/organizations';
import { styles } from './Topbar.styles';
import { useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const Topbar = () => {
  const layout = useRecoilValue(layoutState);

  return (
    <div
      css={[styles.wrapper, layout === 'sidebar' && styles.wrapperSidebarOpen]}
    >
      <div css={[styles.actionsLeft]}>
        <TopbarBurger />
        <OrganizationDropdown hideName />
      </div>
      <TopbarBlockvisor />
      {/* <TopbarSearch /> */}
      <TopbarUser />
    </div>
  );
};
