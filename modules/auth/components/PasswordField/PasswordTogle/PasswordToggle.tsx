import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { passwordToggle } from './PasswordToggle.styles';
import { reset } from 'styles/utils.reset.styles';
import { SvgIcon } from '@shared/components';

import IconEyeOpen from '@public/assets/icons/common/Eye.svg';
import IconEyeClosed from '@public/assets/icons/common/EyeClosed.svg';

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
      <SvgIcon>
        {activeType === 'password' ? <IconEyeOpen /> : <IconEyeClosed />}
      </SvgIcon>
    </button>
  );
}
