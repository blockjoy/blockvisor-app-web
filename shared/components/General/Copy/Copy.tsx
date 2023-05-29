import { reset } from 'styles/utils.reset.styles';
import { styles } from './Copy.styles';
import { colors } from 'styles/utils.colors.styles';
import { toast } from 'react-toastify';
import CopyIcon from '@public/assets/icons/copy-12.svg';

interface CopyButtonProps {
  disabled?: boolean;
  value: string;
  children?: React.ReactNode;
}
const isClipboardApiSupported = () => !!(navigator && navigator.clipboard);

export const Copy = ({ disabled, children, value }: CopyButtonProps) => {
  const fallbackCopyToClipboard = (str: string) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  function handleCopy() {
    if (isClipboardApiSupported()) {
      navigator.clipboard.writeText(value);
      toast.success('Copied');
    } else {
      fallbackCopyToClipboard(value);
      toast.success('Copied');
    }
  }

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
