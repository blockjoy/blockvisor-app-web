import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import IconEyeOpen from '@public/assets/icons/common/Eye.svg';
import IconEyeClosed from '@public/assets/icons/common/EyeClosed.svg';
import { passwordToggle } from './PasswordToggle.styles';
import { reset } from 'styles/utils.reset.styles';

type Props = {
  activeType: 'password' | 'text';
  onClick: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function PasswordToggle({ activeType, onClick, ...rest }: Props) {
  return (
    <button
      {...rest}
      css={[reset.button, passwordToggle]}
      type="button"
      onClick={onClick}
    >
      {activeType === 'password' ? <IconEyeOpen /> : <IconEyeClosed />}
    </button>
  );
}
