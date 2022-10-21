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
    width: 100%;
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
    animation: ${loaderKeyframes} 25s;
  `,
};

const Verified: NextPage = () => {
  const [serverError, setServerError] = useState<string>('');
  const { query } = useRouter();
  useEffect(() => {
    (async () => {
      const { token } = query;

      const response: any = await apiClient.registration_confirmation(
        token?.toString()!,
      );

      if (response.code === 20) {
        setServerError('Error verifying your account, please contact support.');
      }

      console.log('verified', response);

      console.log(query.token);
    })();
  }, []);

  return (
    <Layout title="Email being verified.">
      <div css={styles.loaderRail}>
        <div css={styles.loaderBar}></div>
      </div>
      <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
        You will be redirected to the dashboard once complete.
      </p>
    </Layout>
  );
};

export default Verified;
