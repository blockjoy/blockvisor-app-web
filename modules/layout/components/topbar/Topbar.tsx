import { TopbarUser } from './TopbarUser';
// import {TopbarSearch} from "./TopbarSearch";
import { TopbarBlockvisor } from './TopbarBlockvisor';
import { TopbarBurger } from './TopbarBurger';
import { OrganizationDropdown } from '@modules/organisations';
import { styles } from './Topbar.styles';

export const Topbar = () => {
  return (
    <div css={[styles.wrapper]}>
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
