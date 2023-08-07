import CopyIcon from '@public/assets/icons/common/Copy.svg';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import { Button, SvgIcon } from '@shared/components';

interface CopyButtonProps {
  disabled?: boolean;
  value: string;
}

export const Copy = ({ disabled, value }: CopyButtonProps) => {
  const handleCopy = () => copyToClipboard(value);

  return (
    <Button size="small" onClick={handleCopy} disabled={disabled}>
      Copy <CopyIcon />
    </Button>
  );
};
