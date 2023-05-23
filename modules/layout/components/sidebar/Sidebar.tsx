import { useRecoilValue } from 'recoil';
import { layoutState, sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { styles } from './Sidebar.styles';
import { SidebarHeader } from './SidebarHeader';
import { SidebarOverlay } from './SidebarOverlay';
import SidebarMain from './SidebarMain';

export default () => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);
  const layout = useRecoilValue(layoutState);

  return (
    <>
      <SidebarOverlay />
      <aside
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
      </aside>
    </>
  );
};
