import { useRecoilState } from 'recoil';
import { layoutAtoms } from '@modules/layout';
import { styles } from './SidebarOverlay.styles';

export const SidebarOverlay = () => {
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useRecoilState(
    layoutAtoms.isSidebarOpenMobile,
  );

  return (
    <div
      onClick={() => setIsSidebarOpenMobile(false)}
      css={[styles.overlay, isSidebarOpenMobile && styles.visible]}
    />
  );
};
