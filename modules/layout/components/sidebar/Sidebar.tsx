import { useLayoutEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutState, sidebarOpen, sidebarOpenMobile } from '@modules/layout';
import { styles } from './Sidebar.styles';
import { SidebarHeader } from './SidebarHeader';
import { SidebarOverlay } from './SidebarOverlay';
import SidebarMain from './SidebarMain';

export default () => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);

  const [isSidebarOpenMobile, setIsSidebarOpenMobile] =
    useRecoilState(sidebarOpenMobile);

  const layout = useRecoilValue(layoutState);

  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (isSidebarOpenMobile) {
        setIsSidebarOpenMobile(false);
      }
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWidth);

    return document.removeEventListener('resize', updateWidth);
  }, []);
  return (
    <>
      <SidebarOverlay />
      <aside
        css={[
          styles.sidebar,
          (width >= 1200 && isSidebarOpen) ||
          (width < 1200 && isSidebarOpenMobile)
            ? styles.sidebarOpen
            : styles.sidebarClosed,
          Boolean(layout) && isSidebarOpenMobile && styles.sidebarDrawerOpen,
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
