import { useRecoilState } from 'recoil';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { styles } from './Sidebar.styles';

import { SidebarHeader } from './SidebarHeader';
import SidebarMain from './SidebarMain';
import { useEffect } from 'react';

export default () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);

  useEffect(() => {
    if (localStorage.getItem('sidebarCollapsed') && window.innerWidth >= 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <div
      css={[
        styles.sidebar,
        isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed,
      ]}
    >
      <SidebarHeader />
      <div css={[styles.wrapper]}>
        <SidebarMain />
      </div>
    </div>
  );
};
