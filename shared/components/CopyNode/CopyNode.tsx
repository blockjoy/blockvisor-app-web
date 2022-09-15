import { FC } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { styles } from './CopyNode.styles';
import CopyIcon from '@public/assets/icons/copy-12.svg';
import { colors } from 'styles/utils.colors.styles';

interface Props {
  disabled?: boolean;
  value: string;
  children: React.ReactNode;
}

export const CopyNode: FC<Props> = ({ disabled, children, value }) => {
  function handleCopy() {
    // This should trigger a toast when ready.
    value && navigator.clipboard.writeText(value);
  }

  return (
    <button
      onClick={handleCopy}
      disabled={disabled}
      css={[reset.button, styles.base, colors.text3]}
    >
      {children}
      <CopyIcon />
    </button>
  );
};
