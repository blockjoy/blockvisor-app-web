import { MouseEventHandler, ReactNode } from 'react';
import Link from 'next/link';
import { styles } from './DropdownItem.styles';
import { link } from 'styles/link.styles';
import { typo } from 'styles/utils.typography.styles';
import { reset } from 'styles/utils.reset.styles';
import { SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';

type DropdownItemProps = {
  id?: string;
  href?: string;
  children?: ReactNode;
  size?: 'large' | 'medium' | 'small';
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  additionalStyles?:
    | ((theme: ITheme) => SerializedStyles)[]
    | SerializedStyles[];
  type?: 'link' | 'button' | 'plain';
  isDisabled?: boolean;
};
export const DropdownItem = ({
  href,
  id,
  children,
  size = 'small',
  onButtonClick,
  additionalStyles,
  type = 'plain',
  isDisabled,
}: DropdownItemProps) => {
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
          disabled={isDisabled}
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
};
