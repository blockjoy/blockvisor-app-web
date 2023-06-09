import { reset } from 'styles/utils.reset.styles';
import { styles } from './Copy.styles';
import { colors } from 'styles/utils.colors.styles';
import CopyIcon from '@public/assets/icons/common/Copy.svg';
import { copyToClipboard } from '@shared/utils/copyToClipboard';

interface CopyButtonProps {
  disabled?: boolean;
  value: string;
  children?: React.ReactNode;
}

export const Copy = ({ disabled, children, value }: CopyButtonProps) => {
  const handleCopy = () => copyToClipboard(value);

  return (
    <button
      onClick={handleCopy}
      disabled={disabled}
      css={[reset.button, styles.base, colors.text3]}
    >
      {children && <p css={styles.text}>{children}</p>}
      <CopyIcon />
    </button>
  );
};
