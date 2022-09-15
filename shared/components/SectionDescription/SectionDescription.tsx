import React, { FC } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './SectionDescription.styles';

interface Props {
  children: React.ReactNode;
}

export const SectionDescription: FC<Props> = ({ children }) => {
  return (
    <div css={styles.base}>
      <p css={[styles.text, typo.small]}>{children}</p>
    </div>
  );
};
