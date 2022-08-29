import type { NextPage } from 'next';
import { ForgotPasswordForm } from '@modules/auth';
import { Button, Layout } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';

const Register: NextPage = () => {
  return (
    <Layout title="Forgot Your Password?">
      <p
        css={[typo.small, colors.text3, spacing.bottom.medium]}
        className="t-small t-color-text-3 s-bottom--medium forgot-password__description"
      >
        No worries, just enter your registration e-mail address and we will send
        you a link to reset your password.
      </p>
      <div css={[spacing.bottom.mediumSmall]}>
        <ForgotPasswordForm />
      </div>
      <Button href={ROUTES.LOGIN} display="block" size="small" style="ghost">
        Cancel
      </Button>
    </Layout>
  );
};

export default Register;
