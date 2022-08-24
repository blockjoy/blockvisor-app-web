import type { InputHTMLAttributes, ReactNode } from 'react';
import { InputSize } from './Input';
import {
  inputLabel,
  inputLabelSize,
  inputLabelDisabled,
} from './InputLabel.styles';

type Props = {
  name: string;
  children?: ReactNode;
  labelSize?: InputSize;
} & InputHTMLAttributes<HTMLLabelElement>;

export function InputLabel({
  name,
  children,
  labelSize = 'medium',
  disabled,
}: Props) {
  const labelStyles = [inputLabel, inputLabelSize[labelSize]];

  if (disabled) {
    labelStyles.push(inputLabelDisabled);
  }

  return (
    <label htmlFor={name} css={labelStyles}>
      {children}
    </label>
  );
}
