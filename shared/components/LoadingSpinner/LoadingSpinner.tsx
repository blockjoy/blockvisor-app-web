import { FC, useEffect } from 'react';
import { display } from 'styles/utils.display.styles';
import { styles } from './spinner.styles';
import SpinnerIcon from '@public/assets/icons/spinner.svg';
import anime from 'animejs';

interface Props {
  size: 'small' | 'medium' | 'large' | 'page';
}

export const LoadingSpinner: FC<Props> = ({ size }) => {
  useEffect(() => {
    anime({
      targets: `.spinner__element`,
      rotateZ: ['0deg', '90deg'],
      strokeDashoffset: [anime.setDashoffset, -135],
      loop: true,
      easing: 'easeInOutQuad',
      duration: 1000,
    });
  }, []);

  return (
    <span css={[styles.button, styles[size]]}>
      <span css={display.visuallyHidden}>Loading</span>
      <SpinnerIcon />
    </span>
  );
};
