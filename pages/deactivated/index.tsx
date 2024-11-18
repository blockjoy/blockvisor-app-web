import { css } from '@emotion/react';
import { useIdentityRepository } from '@modules/auth';
import { userClient } from '@modules/grpc';
import { Layout } from '@shared/components';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { ITheme } from 'types/theme';

const styles = {
  p: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    line-height: 1.4;
    margin-bottom: 30px;
  `,
  a: (theme: ITheme) => css`
    color: ${theme.colorPrimary};

    :hover {
      text-decoration: underline;
    }
  `,
};

const Deactivated: NextPage = () => {
  const repository = useIdentityRepository();
  useEffect(() => {
    (async () => {
      try {
        await userClient.deleteUser(repository?.getIdentity()?.userId!);
        repository?.deleteIdentity();
      } catch (err) {
        console.log('error deleting account', err);
      }
    })();
  }, []);

  return (
    <Layout title="Account Deactivated">
      <p css={styles.p}>
        Thank you for using BlockJoy.
        <br />
        Your account has been deactivated.
      </p>
      <a css={styles.a} href="https://blockjoy.com" target="_blank">
        Visit BlockJoy.com
      </a>
    </Layout>
  );
};

export default Deactivated;
