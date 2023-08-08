import { styles } from './CopyToClipboard.styles';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import CopyIcon from '@public/assets/icons/common/Copy.svg';
import { SvgIcon } from '@shared/components';

type CopyToClipboardProps = {
  value: string;
};

export const CopyToClipboard = ({ value }: CopyToClipboardProps) => {
  const handleCopy = () => copyToClipboard(value);
  return (
    <>
      <div css={styles.wrapper} onClick={handleCopy}>
        <span>$</span>
        <p css={styles.value}>{value}</p>
        <SvgIcon size="14px">
          <CopyIcon />
        </SvgIcon>
      </div>
    </>
  );
};
