import { authAtoms } from '@modules/auth/store/authAtoms';
import { Layout } from '@shared/components';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';

const Login: NextPage = () => {
  const [auth] = useRecoilState(authAtoms.user);

  /*   useEffect(() => {
    if (auth) {
      Router.push('/dashboard');
    }
  }, []); */
  return (
    <Layout title="We have Sent a Link to Your Email Address.">
      <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
        Check your e-mail and start using BlockVisor!
      </p>
    </Layout>
  );
};

export default Login;
