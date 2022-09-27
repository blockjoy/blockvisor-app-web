import { styles } from './SidebarLeft.styles';
import IconBlockvisor from '@public/assets/icons/blockvisor-20.svg';

export const SidebarLeft = () => {
  return (
    <main css={[styles.wrapper]}>
      <button css={[styles.button]}>
        <IconBlockvisor css={[styles.icon]} />
      </button>
    </main>
  );
};
