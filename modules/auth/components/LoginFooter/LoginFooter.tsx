import {
  footerLogin,
  footerLoginLink,
  footerLoginAccount,
} from './LoginFooter.styles';
import { typo, tAlign } from 'styles/utils.typography.styles';
import { link, linkPrimary, linkUnderline } from 'styles/link.styles';
import { colors } from 'styles/utils.colors.styles';
import { ROUTES } from '@shared/constants/routes';

export function LoginFooter() {
  return (
    <footer css={[footerLogin, typo.tiny]}>
      <div css={[tAlign.right]}>
        <a
          css={[link, footerLoginLink, linkUnderline]}
          href={ROUTES.FORGOT_PASSWORD}
        >
          Forgot password?
        </a>
      </div>
      <div css={[footerLoginAccount]}>
        <p css={[colors.text2]}>Don't have a BlockVisor account?</p>
        <a href={ROUTES.REGISTER} css={[link, linkPrimary, linkUnderline]}>
          Create an Account
        </a>
      </div>
    </footer>
  );
}
