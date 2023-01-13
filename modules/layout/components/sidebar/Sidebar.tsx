import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutState, sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { styles } from './Sidebar.styles';

import { SidebarHeader } from './SidebarHeader';
import SidebarMain from './SidebarMain';
import { useEffect } from 'react';

export default () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);
  const layout = useRecoilValue(layoutState);

  useEffect(() => {
    if (window.innerWidth >= 1200) {
      setIsSidebarOpen(!Boolean(localStorage.getItem('sidebarCollapsed')));
    }
  }, []);

  return (
    <div
      css={[
        styles.sidebar,
        isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed,
        Boolean(layout) && styles.sidebarDrawerOpen,
      ]}
    >
      <SidebarHeader />
      <div css={[styles.wrapper]}>
        <SidebarMain />
      </div>
    </div>
  );
};
