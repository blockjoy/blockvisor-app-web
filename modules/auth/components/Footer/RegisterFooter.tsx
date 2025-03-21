import { ROUTES } from '@shared/constants/routes';
import { footerLogin, footerLoginAccount } from './LoginFooter.styles';
import { typo } from 'styles/utils.typography.styles';
import { link, linkPrimary, linkUnderline } from 'styles/link.styles';
import { colors } from 'styles/utils.colors.styles';
import Link from 'next/link';

export function RegisterFooter() {
  return (
    <footer css={[footerLogin, typo.tiny]}>
      <div css={[footerLoginAccount]}>
        <p css={[colors.text2]}>Already have a BlockVisor account?</p>
        <Link
          href={ROUTES.LOGIN}
          css={[link, linkPrimary, linkUnderline]}
          shallow
        >
          Login here
        </Link>
      </div>
    </footer>
  );
}
