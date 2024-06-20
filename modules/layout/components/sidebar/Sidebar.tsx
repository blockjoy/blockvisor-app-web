import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { layoutAtoms, layoutSelectors } from '@modules/layout';
import { styles } from './Sidebar.styles';
import { SidebarHeader } from './SidebarHeader';
import { SidebarOverlay } from './SidebarOverlay';
import SidebarMain from './SidebarMain';
import { useViewport } from '@shared/index';

export default () => {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useRecoilState(
    layoutAtoms.isSidebarOpenMobile,
  );

  const { isXlrg } = useViewport();

  useEffect(() => {
    if (isXlrg) setIsSidebarOpenMobile(false);
  }, [isXlrg]);

  return (
    <>
      <SidebarOverlay />
      <aside
        css={[
          styles.sidebar,
          (!isXlrg && isSidebarOpen) || (isXlrg && isSidebarOpenMobile)
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
