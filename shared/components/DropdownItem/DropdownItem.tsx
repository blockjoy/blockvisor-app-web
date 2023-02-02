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
  additionalStyles?: any;
  type?: 'link' | 'button' | 'plain';
};
export function DropdownItem({
  href,
  id,
  children,
  size = 'small',
  onButtonClick,
  additionalStyles,
  type = 'plain',
}: Props) {
  switch (type) {
    case 'link':
      return (
        <Link
          id={id}
          href={href!}
          css={[
            typo.tiny,
            link,
            styles.base(size),
            styles[size],
            additionalStyles && additionalStyles,
          ]}
        >
          {children}
        </Link>
      );
    case 'button':
      return (
        <button
          id={id}
          onClick={onButtonClick}
          css={[
            reset.button,
            typo.tiny,
            styles.base(size),
            styles[size],
            additionalStyles && additionalStyles,
          ]}
        >
          {children}
        </button>
      );
    default:
      return (
        <div
          css={[
            typo.tiny,
            styles.base(size),
            styles[size],
            additionalStyles && additionalStyles,
          ]}
        >
          {children}
        </div>
      );
  }
}
