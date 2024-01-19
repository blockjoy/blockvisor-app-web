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
  size?: 'small' | 'medium' | 'large';
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  additionalStyles?:
    | ((theme: ITheme) => SerializedStyles)[]
    | SerializedStyles[];
  type?: 'link' | 'button' | 'plain';
  isDisabled?: boolean;
  isAccessible?: boolean;
  tabIndex?: number;
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
  isAccessible,
  tabIndex,
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
            styles.base(size, isAccessible),
            styles[size],
            additionalStyles && additionalStyles,
          ]}
          {...(tabIndex && { tabIndex })}
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
            styles.base(size, isAccessible),
            styles[size],
            additionalStyles && additionalStyles,
          ]}
          {...(tabIndex && { tabIndex })}
        >
          {children}
        </button>
      );
    default:
      return (
        <div
          css={[
            typo.tiny,
            styles.base(size, isAccessible),
            styles[size],
            additionalStyles && additionalStyles,
          ]}
          {...(tabIndex && { tabIndex })}
        >
          {children}
        </div>
      );
  }
};
