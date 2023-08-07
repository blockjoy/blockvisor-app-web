import CopyIcon from '@public/assets/icons/common/Copy.svg';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import { Button, SvgIcon } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

interface CopyButtonProps {
  disabled?: boolean;
  value: string;
}

export const Copy = ({ disabled, value }: CopyButtonProps) => {
  const handleCopy = () => copyToClipboard(value);

  return (
    <Button
      style="outline"
      size="small"
      onClick={handleCopy}
      disabled={disabled}
      css={spacing.left.small}
    >
      Copy <CopyIcon />
    </Button>
  );
};
