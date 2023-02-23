import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { styles } from './SidebarOverlay.styles';

export const SidebarOverlay = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);

  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      css={[styles.overlay, isSidebarOpen && styles.visible]}
    />
  );
};
