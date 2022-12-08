import { useSignOut } from '@modules/auth';
import IconDoor from '@public/assets/icons/door-12.svg';
import { useRouter } from 'next/router';
import { flex } from 'styles/utils.flex.styles';
import { opacity } from 'styles/utils.opacity.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './SidebarFooter.styles';
import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';
import { spacing } from 'styles/utils.spacing.styles';

export function SidebarFooter() {
  const router = useRouter();
  const signOut = useSignOut();

  const handleLogout = async () => {
    signOut();
    router.reload();
  };

  return (
    <footer css={[styles.wrapper]}>
      <div css={[styles.support, typo.smaller]}>
        <button
          onClick={handleLogout}
          css={[
            reset.button,
            styles.button,
            flex.display.flex,
            flex.align.center,
          ]}
        >
          <IconDoor css={[styles.icon]} />
          <span css={[styles.buttonText]}>Sign Out</span>
        </button>
      </div>
      <div css={[styles.separator]} />
      <div
        css={[
          styles.copy,
          flex.display.flex,
          flex.align.center,
          spacing.top.medium,
        ]}
      >
        <span css={[styles.logo]}>
          <LogoSmall />
        </span>
        <p
          css={[typo.micro, opacity.o30, styles.copy, spacing.left.medium]}
          className="sidenav__copy u-o-30 t-micro"
        >
          BlockVisor is a Blockjoy product. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
