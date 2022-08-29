import { SerializedStyles } from '@emotion/react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import {
  inputLabel,
  inputLabelSize,
  inputLabelDisabled,
} from './InputLabel.styles';

type Props = {
  name: string;
  children?: ReactNode;
  labelSize?: InputSize;
  additionalStyles?: SerializedStyles[];
} & InputHTMLAttributes<HTMLLabelElement>;

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
