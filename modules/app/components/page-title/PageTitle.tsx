import { layoutState } from '@modules/layout/store/layoutAtoms';
import { Button } from '@shared/components';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { typo } from 'styles/utils.typography.styles';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './PageTitle.styles';

interface Props {
  title: string;
}

export const PageTitle: FC<Props> = ({ title }) => {
  const setLayout = useSetRecoilState(layoutState);

  return (
    <header css={styles.base}>
      <div css={[wrapper.main, styles.actions]}>
        <h1 css={typo.large}>{title}</h1>
        <Button onClick={() => setLayout('organisation')} size="small">
          Create new
        </Button>
      </div>
    </header>
  );
};
