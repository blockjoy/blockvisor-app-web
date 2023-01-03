import { styles } from './SidebarHeader.styles';
import { OrganizationPicker } from '@shared/components';
import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';
import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const SidebarHeader = () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  return (
    <header css={[styles.wrapper]}>
      {layout === 'sidebar' && (
        <>
          <OrganizationPicker />
          <div css={styles.logo}>
            <LogoSmall />
          </div>
        </>
      )}
    </header>
  );
};
