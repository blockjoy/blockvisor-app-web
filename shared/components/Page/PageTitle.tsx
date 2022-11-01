import { layoutState } from '@modules/layout/store/layoutAtoms';
import { Button } from '@shared/components';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { typo } from 'styles/utils.typography.styles';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './PageTitle.styles';

interface Props {
  title: string;
  actionText?: string;
  actionOnClick: VoidFunction;
}

export const PageTitle: FC<Props> = ({
  title,
  actionText = 'Create New',
  actionOnClick,
}) => {
  return (
    <header css={styles.base}>
      <div css={[wrapper.main, styles.actions]}>
        <h1 css={typo.large}>{title}</h1>
        <Button onClick={actionOnClick} size="small">
          {actionText}
        </Button>
      </div>
    </header>
  );
};
