import { styles } from './SidebarHeader.styles';
// import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';
import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { OrganizationPicker } from '@shared/components/OrganizationPicker/OrganizationPicker';

export const SidebarHeader = () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  return (
    <header css={[styles.wrapper]}>
      {layout === 'sidebar' && (
        <>
          <OrganizationPicker />
          {/* <div css={styles.logo}>
            <LogoSmall />
          </div> */}
        </>
      )}
    </header>
  );
};
