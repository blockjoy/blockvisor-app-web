import { layoutState } from '@modules/layout/store/layoutAtoms';
import IconClose from '@public/assets/icons/close-12.svg';
import { useRecoilState } from 'recoil';
import { styles } from './drawer.styles';

interface Props {
  children: React.ReactNode;
  onCloseClicked?: VoidFunction;
}

export const DrawerHeader: React.FC<Props> = ({ children, onCloseClicked }) => {
  const [layout, setLayout] = useRecoilState(layoutState);

  const handleCloseClicked = () => {
    if (onCloseClicked) {
      onCloseClicked();
    } else {
      setLayout({
        ...layout,
        isNodeAddOpen: false,
        isProfileOpen: false,
      });
    }
  };

  return (
    <header css={styles.header}>
      {children}
      <button
        type="button"
        onClick={handleCloseClicked}
        css={styles.closeButton}
      >
        <IconClose />
      </button>
    </header>
  );
};
