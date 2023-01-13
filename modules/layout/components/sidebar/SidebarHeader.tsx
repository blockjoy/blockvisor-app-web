import { styles } from './SidebarHeader.styles';
import { OrganizationPicker } from '@shared/components';
// import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';
import { useRecoilValue } from 'recoil';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';

export const SidebarHeader = () => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);

  return (
    <header css={[styles.wrapper]}>
      {isSidebarOpen && (
        <>
          <OrganizationPicker />
        </>
      )}
    </header>
  );
};
