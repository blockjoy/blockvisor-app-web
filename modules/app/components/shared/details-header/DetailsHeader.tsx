import { Button, DataState } from '@shared/components';
import { StateIcon } from '@shared/components/StateIcon/StateIcon';
import { FC } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './DetailsHeader.styles';

interface Props {
  title: string;
  ip: string;
  id: string;
  date: string;
}

export const DetailsHeader: FC<Props> = ({ title, ip, id, date }) => {
  return (
    <header css={styles.base}>
      <div>
        <h2 css={[styles.title]}>
          {title}{' '}
          <span css={styles.status}>
            <DataState status="consensus" />
          </span>
        </h2>
        <div css={styles.summary}>
          <small css={[typo.small]}>{id}</small>
          <small css={[typo.small, colors.text2]}>{ip}</small>
          <small css={[typo.small, colors.text2]}>{date}</small>
        </div>
      </div>
      <form css={styles.actions}>
        <Button style="secondary">Stop</Button>
        <Button style="secondary">Start</Button>
      </form>
    </header>
  );
};
