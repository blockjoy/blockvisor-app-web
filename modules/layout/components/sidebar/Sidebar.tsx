import { useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { styles } from './Sidebar.styles';

import { SidebarHeader } from './SidebarHeader';
// import SidebarLeft from "./SidebarLeft";
import SidebarMain from './SidebarMain';

export default () => {
  const layout = useRecoilValue(layoutState);

  return (
    <div
      css={[
        styles.sidebar,
        layout === 'sidebar' ? styles.sidebarOpen : styles.sidebarClosed,
      ]}
    >
      <SidebarHeader />
      <div css={[styles.wrapper]}>
        {/* <SidebarLeft /> */}
        <SidebarMain />
      </div>
    </div>
  );
};
