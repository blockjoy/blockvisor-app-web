import type { NextPage } from 'next';
import { NewPasswordForm } from '@modules/auth';
import { Button, Layout } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';

const SetNewPassword: NextPage = () => {
  return (
    <Layout title="Set a New Password">
      <p
        css={[typo.small, colors.text3, spacing.bottom.medium]}
        className="t-small t-color-text-3 s-bottom--medium forgot-password__description"
      >
        Set up your new password and makes sure you store it in a safe place.
      </p>
      <div css={[spacing.bottom.mediumSmall]}>
        <NewPasswordForm />
      </div>
      <Button href={ROUTES.LOGIN} display="block" size="small" style="ghost">
        Cancel
      </Button>
    </Layout>
  );
};

export default SetNewPassword;
