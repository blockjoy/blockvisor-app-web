import { MouseEventHandler, ReactNode } from 'react';
import Link from 'next/link';
import { styles } from './DropdownItem.styles';
import { link } from 'styles/link.styles';
import { typo } from 'styles/utils.typography.styles';
import { reset } from 'styles/utils.reset.styles';

type Props = {
  href?: string;
  children?: ReactNode;
  size?: 'large' | 'small';
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
};
export function DropdownItem({
  href,
  children,
  size = 'small',
  onButtonClick,
}: Props) {
  if (href) {
    <Link href={href} passHref>
      <a css={[typo.tiny, link, styles.base, styles[size]]}>{children}</a>
    </Link>;
  }

  return (
    <button
      onClick={onButtonClick}
      css={[reset.button, typo.tiny, styles.base, styles[size]]}
    >
      {children}
    </button>
  );
}
