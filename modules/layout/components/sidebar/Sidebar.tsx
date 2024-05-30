import { useLayoutEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutAtoms, layoutSelectors } from '@modules/layout';
import { styles } from './Sidebar.styles';
import { SidebarHeader } from './SidebarHeader';
import { SidebarOverlay } from './SidebarOverlay';
import SidebarMain from './SidebarMain';

export default () => {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useRecoilState(
    layoutAtoms.isSidebarOpenMobile,
  );

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
