import { styles } from './AdminDropdownHeader.styles';
import { SvgIcon } from '@shared/components';
import IconClose from '@public/assets/icons/common/Close.svg';

type Props = {
  children: React.ReactNode;
  onClose: VoidFunction;
};

export const AdminDropdownHeader = ({ children, onClose }: Props) => {
  return (
    <header css={styles.header}>
      <h2 css={styles.h2}>{children}</h2>
      <button css={styles.button} onClick={onClose}>
        <SvgIcon>
          <IconClose />
        </SvgIcon>
      </button>
    </header>
  );
};
