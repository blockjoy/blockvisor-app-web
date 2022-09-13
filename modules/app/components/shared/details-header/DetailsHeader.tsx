import { Button } from '@shared/components';
import { CopyNode } from '@shared/components/CopyNode/CopyNode';
import { FC, ReactNode } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './DetailsHeader.styles';

interface Props {
  title: string;
  ip: string;
  id?: string;
  date?: string;
  location?: string;
  status: ReactNode;
  // status: HostState | NodeState;
  handleStop?: VoidFunction;
  handleRestart?: VoidFunction;
}

export const DetailsHeader: FC<Props> = ({
  title,
  ip,
  id,
  date,
  status,
  location,
  handleStop,
  handleRestart,
}) => {
  return (
    <header css={styles.base}>
      <div>
        <h2 css={[styles.title]}>
          {title}{' '}
          <span css={styles.status}>
            {status}
            {/* <DataState status={status} /> */}
          </span>
        </h2>
        <div css={styles.summary}>
          {id && (
            <CopyNode value={id}>
              <small
                css={[typo.small, colors.text3, typo.ellipsis, styles.copyText]}
              >
                {id}
              </small>
            </CopyNode>
          )}
          {ip && <small css={[typo.small, colors.text2]}>{ip}</small>}
          {date && <small css={[typo.small, colors.text2]}>{date}</small>}
          {location && (
            <small css={[typo.small, colors.text2]}>
              <address>{location}</address>
            </small>
          )}
        </div>
      </div>
      <form css={styles.actions}>
        <Button onClick={handleStop} style="secondary" size="small">
          Stop
        </Button>
        <Button onClick={handleRestart} style="secondary" size="small">
          Restart
        </Button>
      </form>
    </header>
  );
};
