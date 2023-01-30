import { FC, useEffect } from 'react';
import { display } from 'styles/utils.display.styles';
import { styles } from './spinner.styles';
import SpinnerLightIcon from '@public/assets/icons/SpinnerLight.svg';
import { styles as lightSpinnerStyles } from './LightSpinner.styles';
import { styles as defaulSpinnerStyles } from './spinner.styles';

interface Props {
  size: 'small' | 'medium' | 'large' | 'page' | 'normal';
}

export const LightSpinner: FC<Props> = ({ size }) => {
  return (
    <span css={[styles.button, defaulSpinnerStyles[size]]}>
      <span css={display.visuallyHidden}>Loading</span>
      <SpinnerLightIcon css={[lightSpinnerStyles.spinner]} />
    </span>
  );
};
