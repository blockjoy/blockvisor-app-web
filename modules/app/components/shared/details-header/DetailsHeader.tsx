import { Button, DataState } from '@shared/components';
import { CopyNode } from '@shared/components/CopyNode/CopyNode';
import { StateIcon } from '@shared/components/StateIcon/StateIcon';
import { FC } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './DetailsHeader.styles';

interface Props {
  title: string;
  ip: string;
  id?: string;
  date?: string;
  location?: string;
  status: HostState | NodeState;
}

export const DetailsHeader: FC<Props> = ({
  title,
  ip,
  id,
  date,
  status,
  location,
}) => {
  return (
    <header css={styles.base}>
      <div>
        <h2 css={[styles.title]}>
          {title}{' '}
          <span css={styles.status}>
            <DataState status={status} />
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
        <Button disabled={true} style="secondary" size="small">
          Stop
        </Button>
        <Button style="secondary" size="small">
          Start
        </Button>
      </form>
    </header>
  );
};
