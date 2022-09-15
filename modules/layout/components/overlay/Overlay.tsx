import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store';
import { overlayStyles } from './overlay.styles';

const Overlay = () => {
  const [layout, setLayout] = useRecoilState(layoutState);
  const { isSidebarOpen, isProfileOpen, isNodeAddOpen, isHostsAddOpen } =
    layout;

  const handleClick = () =>
    setLayout({
      ...layout,
      isSidebarOpen: false,
      isProfileOpen: false,
      isNodeAddOpen: false,
    });

  const isOthersOpen = isNodeAddOpen || isProfileOpen || isHostsAddOpen;

  return (
    <div
      css={[
        overlayStyles.overlay,
        (isSidebarOpen || isOthersOpen) && overlayStyles.visible,
        overlayStyles.hidden({ isOthersOpen, isSidebarOpen }),
      ]}
      onClick={handleClick}
    />
  );
};

export default Overlay;
