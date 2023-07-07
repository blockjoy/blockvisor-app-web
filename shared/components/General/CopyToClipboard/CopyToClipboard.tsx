import { styles } from './CopyToClipboard.styles';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import CopyIcon from '@public/assets/icons/common/Copy.svg';

type CopyToClipboardProps = {
  value: string;
  disabled?: boolean;
};

export const CopyToClipboard = ({
  value,
  disabled = false,
}: CopyToClipboardProps) => {
  const handleCopy = () => copyToClipboard(value);
  return (
    <>
      <div
        css={[styles.wrapper, disabled && styles.disabled]}
        onClick={() => {
          if (!disabled) handleCopy();
        }}
      >
        <span>$</span>
        <p css={styles.value}>{value}</p>
        <CopyIcon />
      </div>
    </>
  );
};
