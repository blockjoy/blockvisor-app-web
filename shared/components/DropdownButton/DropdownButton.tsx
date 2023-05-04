import { SvgIcon } from '@shared/components';
import { ReactNode, useState } from 'react';
import { styles } from './DropdownButton.styles';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';
import IconFirewall from '@public/assets/icons/firewall.svg';

type Props = {
  isOpen: boolean;
  text: string | ReactNode;
  icon?: ReactNode;
  onClick: VoidFunction;
};

export const DropdownButton = ({
  icon = <IconFirewall />,
  onClick,
  text,
  isOpen,
}: Props) => {
  return (
    <button css={styles.button} onClick={onClick}>
      <SvgIcon size="16px">{icon}</SvgIcon>
      {text}
      <span css={[styles.icon, isOpen && styles.iconOpen]}>
        <IconArrow />
      </span>
    </button>
  );
};
