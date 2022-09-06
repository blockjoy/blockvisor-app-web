import { css } from '@emotion/react'
import { FC, PropsWithChildren } from 'react';
import { LazyImg } from '..';
import { styles } from './Avatar.styles';

interface Props extends PropsWithChildren {
  src: string;
  fullName: string;
  size: 'small' | 'medium-small' | 'medium';
  handleClick: VoidFunction;
  handleKeyup: VoidFunction;
}

export const Avatar: FC<Props> = ({
  src,
  handleClick,
  handleKeyup,
  fullName,
  size,
}) => {
  const getInitials = () => {
    const [name = '', surname = ''] = fullName.split(' ');
    return `${name?.charAt(0) ?? ''}${surname?.charAt(0) ?? ''}`;
  };

  return (
    <figure
      onClick={handleClick}
      onKeyUp={handleKeyup}
      css={[styles.base, styles[size], src && styles.withImage]}
    >
      {src && (
        <LazyImg
          width={40}
          height={40}
          css={styles.image}
          src={src}
          alt={`${fullName}'s avatar`}
        />
      )}
      <figcaption className="avatar__initials t-micro">
        {getInitials()}
      </figcaption>
    </figure>
  );
};
