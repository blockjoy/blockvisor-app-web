import { styles } from './Modal.styles';
import { ReactNode } from 'react';
import { Input } from '../Input/Input';

type Props = {
  isOpen?: boolean;
  children?: ReactNode;
};
export function Modal({ isOpen }: Props) {
  if (!isOpen) {
    return null;
  }
  return (
    <div css={[styles.modal]}>
      <div css={[styles.base]}>
        <p>Hello From Modal</p>
        <div>Kurac</div>
      </div>
    </div>
  );
}
