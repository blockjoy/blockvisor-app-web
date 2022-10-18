import { ReactNode } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './PageTitle.styles';

type Props = {
  title: string;
  action?: ReactNode;
};

export function PageTitle({ title, action }: Props) {
  return (
    <header css={styles.base}>
      <div css={[wrapper.main, styles.actions]}>
        <h1 css={typo.large}>{title}</h1>
        {action}
      </div>
    </header>
  );
}
