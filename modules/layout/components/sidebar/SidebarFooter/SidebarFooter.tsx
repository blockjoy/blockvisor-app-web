import { useRecoilValue } from 'recoil';
import { flex } from 'styles/utils.flex.styles';
import { opacity } from 'styles/utils.opacity.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './SidebarFooter.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { BlockjoyLogo } from '@shared/components';
import { layoutSelectors } from '@modules/layout';

export function SidebarFooter() {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);

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
          <br />
          Version: {process.env.NEXT_PUBLIC_SHORT_SHA || 'dev'}
        </p>
      </div>
    </footer>
  );
}
