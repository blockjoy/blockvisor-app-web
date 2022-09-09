import { FC } from 'react';
import IconBack from '@public/assets/icons/arrow-left-12.svg';
import router from 'next/router';
import { Button } from '../Button/Button';

export const BackButton: FC = ({}) => {
  function handleClick() {
    router.back();
  }

  return (
    <Button style="outline" size="small" onClick={handleClick}>
      <IconBack /> Back
    </Button>
  );
};
