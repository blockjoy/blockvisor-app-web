import { styles } from './SidebarHeader.styles';
import { OrganizationDropdown } from '@modules/organizations';
import IconBlockvisor from '@public/assets/icons/blockvisor-20.svg';
import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const SidebarHeader = () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  return (
    <header css={[styles.wrapper]}>
      {layout === 'sidebar' && (
        <>
          <OrganizationDropdown />
          <IconBlockvisor />
        </>
      )}
    </header>
  );
};
