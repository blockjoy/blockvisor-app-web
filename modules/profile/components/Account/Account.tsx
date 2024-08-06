import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword';
import { ProfileDeleteAccount } from './ProfileDeleteAccount/ProfileDeleteAccount';

export const Account = () => {
  return (
    <>
      <ProfileChangePassword />
      <header css={[colors.text3, typo.medium, spacing.top.large]}>
        Danger Zone
      </header>
      <ProfileDeleteAccount />
    </>
  );
};
