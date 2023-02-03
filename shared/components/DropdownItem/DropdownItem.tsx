import { MouseEventHandler, ReactNode } from 'react';
import Link from 'next/link';
import { styles } from './DropdownItem.styles';
import { link } from 'styles/link.styles';
import { typo } from 'styles/utils.typography.styles';
import { reset } from 'styles/utils.reset.styles';
import { SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';

type Props = {
  id?: string;
  href?: string;
  children?: ReactNode;
  size?: 'large' | 'medium' | 'small';
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  additionalStyles?:
    | ((theme: ITheme) => SerializedStyles)[]
    | SerializedStyles[];
  type?: 'link' | 'button' | 'plain';
  dataCy?: string;
};
export function DropdownItem({
  href,
  id,
  children,
  size = 'small',
  onButtonClick,
  additionalStyles,
  type = 'plain',
  dataCy,
}: Props) {
  switch (type) {
    case 'link':
      return (
        <Link
          id={id}
          data-cy={dataCy}
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
          data-cy={dataCy}
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
          data-cy={dataCy}
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
