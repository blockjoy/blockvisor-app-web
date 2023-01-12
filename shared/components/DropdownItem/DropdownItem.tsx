import { MouseEventHandler, ReactNode } from 'react';
import Link from 'next/link';
import { styles } from './DropdownItem.styles';
import { link } from 'styles/link.styles';
import { typo } from 'styles/utils.typography.styles';
import { reset } from 'styles/utils.reset.styles';

type Props = {
  id?: string;
  href?: string;
  children?: ReactNode;
  size?: 'large' | 'medium' | 'small';
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
};
export function DropdownItem({
  href,
  id,
  children,
  size = 'small',
  onButtonClick,
}: Props) {
  if (href) {
    return (
      <Link
        id={id}
        href={href}
        css={[typo.tiny, link, styles.base, styles[size]]}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      onClick={onButtonClick}
      css={[reset.button, typo.tiny, styles.base, styles[size]]}
    >
      {children}
    </button>
  );
}
