import { layoutState, sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { overlayStyles } from './overlay.styles';

const Overlay = () => {
  const [layout, setLayout] = useRecoilState(layoutState);
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);

  return (
    <div
      css={[
        overlayStyles.overlay,
        Boolean(layout || (isSidebarOpen && window.innerWidth < 1200)) &&
          overlayStyles.visible,
        overlayStyles.hidden({
          isSidebarOpen: isSidebarOpen,
          isOthersOpen: !!layout,
        }),
      ]}
      onClick={() => {
        setLayout(undefined);
        setIsSidebarOpen(false);
      }}
    />
  );
};

export default Overlay;
