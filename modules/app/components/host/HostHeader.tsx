import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { appState } from '@modules/app/store';
import { HostStatus } from './HostStatus';
import { hostStyles } from './host.styles';
import { Skeleton } from '../shared';
import { Button } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

export const HostHeader = () => {
  const router = useRouter();
  const { activeHost, hostsLoading } = useRecoilValue(appState);
  return (
    <>
      <Button
        onClick={() => router.push('/hosts')}
        customCss={[spacing.bottom.large, spacing.top.micro]}
        size="small"
        style="outline"
      >
        Back
      </Button>
      <header css={hostStyles.header}>
        <span css={hostStyles.headerTitle}>
          {!hostsLoading ? (
            <>
              <span css={hostStyles.headerTitleText}>{activeHost?.name}</span>
              <HostStatus status={activeHost?.status} />
            </>
          ) : (
            <Skeleton width="260px" />
          )}
        </span>
        <span css={hostStyles.actions}>
          <Button style="secondary" size="small" type="button">
            Stop
          </Button>
          <Button disabled style="secondary" size="small" type="button">
            Start
          </Button>
        </span>
      </header>
      <footer css={hostStyles.headerLower}>
        {!hostsLoading ? (
          <>
            <span>{activeHost.ip}</span>
            <span>{activeHost.location}</span>
          </>
        ) : (
          <Skeleton />
        )}
      </footer>
    </>
  );
};
