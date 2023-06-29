import IconBack from '@public/assets/icons/common/ArrowLeft.svg';
import router from 'next/router';
import { Button } from '../Button/Button';

export type BackButtonProps = {
  backUrl?: string;
  style?: string;
  disabled?: boolean;
};

export const BackButton = ({ backUrl }: BackButtonProps) => {
  function handleClick() {
    if (backUrl) router.push(backUrl, undefined, { shallow: true });
    else router.back();
  }

  return (
    <Button style="outline" display="inline" size="small" onClick={handleClick}>
      <IconBack /> Back
    </Button>
  );
};
