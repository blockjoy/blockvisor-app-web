import type { ReactNode } from 'react';
import { inputUtil, inputUtilLeft, inputUtilRight } from './InputUtil.styles';

type Props = {
  position: 'left' | 'right';
  children?: ReactNode;
};

export function InputUtil({ position = 'left', children }: Props) {
  return (
    <span
      css={[inputUtil, position === 'left' ? inputUtilLeft : inputUtilRight]}
    >
      {children}
    </span>
  );
}
