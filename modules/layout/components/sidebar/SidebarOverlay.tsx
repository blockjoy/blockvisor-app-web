import { sidebarOpenMobile } from '@modules/layout';
import { useRecoilState } from 'recoil';
import { styles } from './SidebarOverlay.styles';

export const SidebarOverlay = () => {
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] =
    useRecoilState(sidebarOpenMobile);

  return (
    <div
      onClick={() => setIsSidebarOpenMobile(false)}
      css={[styles.overlay, isSidebarOpenMobile && styles.visible]}
    />
  );
};
