import { styles } from './CopyToClipboard.styles';
import { Copy } from '../Copy/Copy';

type CopyToClipboardProps = {
  value: string;
};

export const CopyToClipboard = ({ value }: CopyToClipboardProps) => {
  return (
    <>
      <div css={styles.wrapper}>
        <span>$</span>
        <p css={styles.value}>{value}</p>
        <Copy value={value} />
      </div>
    </>
  );
};
