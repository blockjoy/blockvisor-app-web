import CopyIcon from '@public/assets/icons/common/Copy.svg';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import { Button, SvgIcon } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { MouseEvent } from 'react';

interface CopyButtonProps {
  disabled?: boolean;
  value: string;
  hideTooltip?: boolean;
}

export const Copy = ({ disabled, value, hideTooltip }: CopyButtonProps) => {
  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    copyToClipboard(value);
  };

  return (
    <span css={spacing.left.small}>
      <Button
        tooltip={!hideTooltip ? 'Copy' : undefined}
        style="icon"
        size="small"
        onClick={handleCopy}
        disabled={disabled}
      >
        <SvgIcon size="14px">
          <CopyIcon />
        </SvgIcon>
      </Button>
    </span>
  );
};
