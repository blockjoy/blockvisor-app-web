import { Layout } from '@shared/components';
import type { NextPage } from 'next';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from '@modules/client';
import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';
import { delay } from '@shared/utils/delay';

const loaderKeyframes = keyframes`
  0% { 
    translate: -100% 0;
  }
  100% {
    translate: 0 0;
  }
`;

const styles = {
  loaderRail: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 5px;
    background: rgba(0, 0, 0, 0.3);
  `,
  loaderBar: (theme: ITheme) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.colorPrimary};
    animation: ${loaderKeyframes} 25s linear;
  `,
};

const Verified: NextPage = () => {
  const [serverError, setServerError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;

      (async () => {
        console.log('token', token);

        const response: any = await apiClient.registration_confirmation(
          token?.toString()!,
        );

        console.log('verified', response);

        if (response.code === 20) {
          setServerError(
            'Error verifying your account, please contact support.',
          );
          return;
        }

        await delay(3000);

        router.push('/');
      })();
    }
  }, [router.isReady]);

  return (
    <Layout title="Email being verified.">
      <div css={styles.loaderRail}>
        <div css={styles.loaderBar}></div>
      </div>
      {serverError ? (
        <p css={[typo.small, colors.warning, spacing.bottom.medium]}>
          There was an error verifying your account, please try again.
        </p>
      ) : (
        <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
          You will be redirected to the dashboard once complete.
        </p>
      )}
    </Layout>
  );
};

export default Verified;
