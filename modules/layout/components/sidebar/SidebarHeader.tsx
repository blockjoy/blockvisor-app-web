import { styles } from './SidebarHeader.styles';
import { OrganizationDropdown } from '@modules/organization';
import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';
import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const SidebarHeader = () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  return (
    <header css={[styles.wrapper]}>
      {layout === 'sidebar' && (
        <>
          <OrganizationDropdown />
          <LogoSmall />
        </>
      )}
    </header>
  );
};
