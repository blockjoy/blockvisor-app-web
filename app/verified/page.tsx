'use client';

import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useRouter, useSearchParams } from 'next/navigation';
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

export default function Verified() {
  const [serverError, setServerError] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (!isVerified) {
      const token = params.get('token');

      (async () => {
        const response: any = await apiClient.registration_confirmation(
          token?.toString()!,
        );

        if (response.code === 20) {
          setServerError(
            'Error verifying your account, please contact support.',
          );
          return;
        }

        await delay(3000);

        setIsVerified(true);

        router.push('/');
      })();
    }
  }, []);

  return (
    <>
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
    </>
  );
}
