import { styles } from './CopyToClipboard.styles';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import CopyIcon from '@public/assets/icons/common/Copy.svg';
import { SvgIcon } from '@shared/components';

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
    <button
      disabled={disabled}
      css={styles.wrapper}
      onClick={() => {
        if (!disabled) handleCopy();
      }}
    >
      <span>$</span>
      <p css={styles.value}>{value}</p>
      <SvgIcon size="14px">
        <CopyIcon />
      </SvgIcon>
    </button>
  );
};
