import { MouseEventHandler } from 'react';
import IconEyeOpen from '@public/assets/icons/eye-16.svg';
import IconEyeClosed from '@public/assets/icons/eye-closed-16.svg';
import { passwordToggle } from './PasswordToggle.styles';
import { reset } from 'styles/utils.reset.styles';

type Props = {
  activeType: 'password' | 'text';
  onClick: MouseEventHandler<HTMLButtonElement>;
};
export function PasswordToggle({ activeType, onClick }: Props) {
  return (
    <button
      css={[reset.button, passwordToggle]}
      type="button"
      onClick={onClick}
    >
      {activeType === 'password' ? <IconEyeOpen /> : <IconEyeClosed />}
    </button>
  );
}
