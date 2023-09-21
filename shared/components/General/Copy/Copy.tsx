import CopyIcon from '@public/assets/icons/common/Copy.svg';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import { Button, SvgIcon } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

interface CopyButtonProps {
  disabled?: boolean;
  value: string;
  hideTooltip?: boolean;
}

export const Copy = ({ disabled, value, hideTooltip }: CopyButtonProps) => {
  const handleCopy = () => copyToClipboard(value);

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
