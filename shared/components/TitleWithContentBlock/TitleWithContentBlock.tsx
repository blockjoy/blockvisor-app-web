import { FC } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './TitleWithContentBlock.styles';

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const TitleWithContentBlock: FC<Props> = ({ children, title }) => {
  return (
    <article css={styles.base}>
      <div css={typo.uppercase}>{title}</div>
      <div css={styles.content}>{children}</div>
    </article>
  );
};
