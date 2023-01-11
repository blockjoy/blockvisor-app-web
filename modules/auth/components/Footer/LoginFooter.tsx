import {
  footerLogin,
  footerLoginLink,
  footerLoginAccount,
} from './LoginFooter.styles';
import { typo, tAlign } from 'styles/utils.typography.styles';
import { link, linkPrimary, linkUnderline } from 'styles/link.styles';
import { colors } from 'styles/utils.colors.styles';
import Link from 'next/link';
import { ROUTES } from '@shared/constants/routes';

export function LoginFooter() {
  return (
    <footer css={[footerLogin, typo.tiny]}>
      <div css={[tAlign.right]}>
        <Link
          href={ROUTES.FORGOT_PASSWORD}
          css={[link, footerLoginLink, linkUnderline]}
        >
          Forgot password?
        </Link>
      </div>
      <div css={[footerLoginAccount]}>
        <p css={[colors.text2]}>Don't have a BlockVisor account?</p>
        <Link href={ROUTES.REGISTER} css={[link, linkPrimary, linkUnderline]}>
          Create an Account
        </Link>
      </div>
    </footer>
  );
}
