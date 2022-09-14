import { layoutState } from '@modules/layout/store';
import { useRecoilState } from 'recoil';
import { overlayStyles } from './overlay.styles';

const Overlay = () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  return (
    <div
      css={[overlayStyles.overlay, Boolean(layout) && overlayStyles.visible]}
      onClick={() => setLayout(undefined)}
    />
  );
};

export default Overlay;
