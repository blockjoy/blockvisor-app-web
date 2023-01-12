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
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { BlockjoyLogo } from '@shared/components';

export function SidebarFooter() {
  const [layout, setLayout] = useRecoilState(layoutState);
  const router = useRouter();
  const signOut = useSignOut();

  const handleLogout = async () => {
    signOut();
    router.reload();
  };

  return (
    <footer
      css={[styles.wrapper, layout !== 'sidebar' && styles.wrapperCollapsed]}
    >
      <div css={[styles.support, typo.smaller]}>
        <button
          onClick={handleLogout}
          css={[
            reset.button,
            styles.button(layout !== 'sidebar'),
            flex.display.flex,
            flex.align.center,
          ]}
        >
          <IconDoor css={[styles.icon]} />
          <span
            className="signout-text"
            css={[styles.buttonText, layout !== 'sidebar' && styles.tooltip]}
          >
            Sign Out
          </span>
        </button>
      </div>
      <div css={[styles.separator(layout !== 'sidebar')]} />
      <div
        css={[
          styles.copy(layout !== 'sidebar'),
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
            layout !== 'sidebar' && styles.tooltip,
          ]}
          className="sidebar-copy"
        >
          Dashboard created by BlockJoy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
