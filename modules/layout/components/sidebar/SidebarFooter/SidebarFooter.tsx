import { useSignOut } from '@modules/auth';
import IconDoor from '@public/assets/icons/door-12.svg';
import { useRouter } from 'next/router';
import { flex } from 'styles/utils.flex.styles';
import { opacity } from 'styles/utils.opacity.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './SidebarFooter.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { useRecoilState } from 'recoil';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { BlockjoyLogo } from '@shared/components';

export function SidebarFooter() {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarOpen);
  const router = useRouter();
  const signOut = useSignOut();

  const handleLogout = async () => {
    signOut();
    router.reload();
  };

  return (
    <footer css={[styles.wrapper, !isSidebarOpen && styles.wrapperCollapsed]}>
      <div css={[styles.separator(!isSidebarOpen)]} />
      <div
        css={[
          styles.copy(!isSidebarOpen),
          flex.display.flex,
          flex.align.center,
          spacing.top.medium,
        ]}
      >
        <BlockjoyLogo />
        <p
          css={[
            typo.micro,
            opacity.o30,
            spacing.left.medium,
            !isSidebarOpen && styles.tooltip,
          ]}
          className="sidebar-copy"
        >
          Dashboard created by BlockJoy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
