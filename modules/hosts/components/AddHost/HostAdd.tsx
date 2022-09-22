import { Button } from '@shared/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './hostAdd.styles';
import { HostAddConfirm } from './HostAddConfirm';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useHosts } from '@modules/hosts/hooks/useHosts';
import {
  PageHeader,
  PageSection,
  TableSkeleton,
} from '@modules/app/components/shared';
import { delay } from '@shared/utils/delay';

export const HostAdd = () => {
  const router = useRouter();

  const { hostAddKey } = useHosts();

  const [isLoading, setIsLoading] = useState(true);

  const onViewHostsClicked = () => {
    router.push('hosts');
  };

  useEffect(() => {
    (async () => {
      await delay(500);
      setIsLoading(false);
    })();
  }, []);

  return (
    <PageSection>
      <>
        <PageHeader>Host Install</PageHeader>

        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <h2 css={typo.base}>
              Great news, your host is ready to be provisioned.
            </h2>
            <p
              css={[
                typo.small,
                colors.text3,
                spacing.top.small,
                spacing.bottom.large,
              ]}
            >
              Please follow the steps below to complete the creation process.
            </p>

            <section css={styles.step}>
              <h3 css={styles.title}>Step 1: Download BlockJoy</h3>
              <p css={styles.stepDescription}>
                If you don’t have it already, you can download BlockJoy from
                this link.
              </p>
              <Button size="small" style="outline">
                Download
              </Button>
            </section>

            <section css={styles.step}>
              <h3 css={styles.title}>Step 2: Set up your keys</h3>
              <p css={styles.stepDescription}>
                Your key can be found below, please store it in a safe place as
                necessary.
              </p>

              <span>{hostAddKey}</span>
            </section>

            <section css={styles.step}>
              <h3 css={styles.title}>Step 3: Manage your host</h3>
              <p css={styles.stepDescription}>
                Once your key has been set up in BlockJoy, you will be able to
                view your provisioned host via the Hosts tab.
              </p>
              <Button onClick={onViewHostsClicked} size="small" style="outline">
                View Hosts
              </Button>
            </section>
          </>
        )}
      </>
    </PageSection>
  );
};
