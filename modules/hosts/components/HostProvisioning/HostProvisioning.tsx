import { Button, CodeBlock } from '@shared/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { css } from '@emotion/react';
import { useHosts } from '@modules/hosts/hooks/useHosts';
import {
  PageHeader,
  PageSection,
  TableSkeleton,
} from '@modules/app/components/shared';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';

export const styles = {
  base: css``,
  action: css`
    width: 100%;
  `,
  steps: css`
    border-top: 1px solid var(--color-overlay-background-1);
  `,
  step: css`
    padding-bottom: 28px;
  `,
  title: css`
    ${typo.small};
    ${colors.primary};
    padding-bottom: 8px;
  `,
  stepDescription: css`
    ${typo.small};
    ${colors.text3};
    padding-bottom: 12px;
  `,
};

export const HostInstall = () => {
  const router = useRouter();

  const { id: hostAddKey } = router.query;

  // const { hostAddKey } = useHosts();

  const [isLoading, setIsLoading] = useState(true);

  const onViewHostsClicked = () => {
    router.push('/hosts');
  };

  useEffect(() => {
    (async () => {
      await delay(env.loadingDuration);
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
            <h2 css={typo.base}>Great news, your host is being provisioned.</h2>
            <p
              css={[
                typo.small,
                colors.text3,
                spacing.top.small,
                spacing.bottom.large,
              ]}
            >
              Please follow the steps below to complete the installation
              process.
            </p>

            <section css={styles.step}>
              <h3 css={styles.title}>Step 1: Setup your key</h3>
              <p css={styles.stepDescription}>
                Run the following command containing your key.
              </p>
              <CodeBlock
                language="bash"
                code={`curl http://bvs.sh/ | bash -s -- ${hostAddKey}`}
              />
            </section>

            <section css={styles.step}>
              <h3 css={styles.title}>Step 2: Manage your host</h3>
              <p css={styles.stepDescription}>
                Once your key has been set up, you will be able to view your
                provisioned host via the Hosts tab.
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
