import ChatIcon from '@public/assets/icons/chat-12.svg';
import { opacity } from 'styles/utils.opacity.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './SidebarFooter.styles';

export function SidebarFooter() {
  return (
    <footer css={[styles.wrapper]}>
      <div css={[styles.support, typo.smaller]}>
        <ChatIcon css={[styles.icon]} />
        <span>Get Support</span>
      </div>
      <p
        css={[typo.micro, opacity.o30, styles.copy]}
        className="sidenav__copy u-o-30 t-micro"
      >
        BlockVisor is a Blockjoy product. All rights reserved.
      </p>
    </footer>
  );
}
