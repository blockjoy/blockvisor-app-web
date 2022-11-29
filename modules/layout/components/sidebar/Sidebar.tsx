import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { styles } from './Sidebar.styles';

import { SidebarHeader } from './SidebarHeader';
// import SidebarLeft from "./SidebarLeft";
import SidebarMain from './SidebarMain';
import { useEffect } from 'react';

export default () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  useEffect(() => {
    if (localStorage.getItem('sidebarOpen')) {
      setLayout('sidebar');
    }
  }, []);

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
