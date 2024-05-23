import { css } from '@emotion/react';
import type { InputHTMLAttributes } from 'react';
import {
  inputLabel,
  inputLabelSize,
  inputLabelDisabled,
} from './InputLabel.styles';
import { SerializedStyles } from '@emotion/serialize';

type Props = {
  name: string;
  labelSize?: InputSize;
  additionalStyles?: SerializedStyles[];
} & InputHTMLAttributes<HTMLLabelElement> &
  React.PropsWithChildren;

export function InputLabel({
  name,
  children,
  labelSize = 'medium',
  disabled,
  additionalStyles,
}: Props) {
  const labelStyles = [inputLabel, inputLabelSize[labelSize]];

  if (disabled) {
    labelStyles.push(inputLabelDisabled);
  }

  if (additionalStyles) {
    labelStyles.push(...additionalStyles);
  }

  return (
    <label htmlFor={name} css={labelStyles}>
      {children}
    </label>
  );
}
