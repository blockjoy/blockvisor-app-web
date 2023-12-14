import { SvgIcon } from '@shared/components';
import { styles } from './AdminIconButton.styles';

type Props = {
  icon: React.ReactNode;
  isDisabled?: boolean;
  onClick: VoidFunction;
};

export const AdminIconButton = ({ icon, isDisabled, onClick }: Props) => {
  return (
    <button disabled={isDisabled} onClick={onClick} css={styles.button}>
      <SvgIcon size="14px" isDefaultColor>
        {icon}
      </SvgIcon>
    </button>
  );
};
