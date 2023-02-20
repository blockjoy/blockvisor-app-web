import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { OrganizationPicker } from '@shared/components';
import { FC, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { typo } from 'styles/utils.typography.styles';
import { wrapper } from 'styles/wrapper.styles';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import { styles } from './PageTitle.styles';
import { PageTitleLaunchNode } from './PageTitleLaunchNode';

interface Props {
  children?: ReactNode;
  title?: string;
  hasOrgPicker?: boolean;
}

export const PageTitle: FC<Props> = ({ children, title, hasOrgPicker }) => {
  const isSidebarOpen = useRecoilValue(sidebarOpen);

  return (
    <header css={styles.base}>
      <div css={[styles.wrapper, wrapper.main]}>
        {children ? (
          <>{children}</>
        ) : (
          <>
            {hasOrgPicker && !isSidebarOpen && <OrganizationPicker hideName />}
            <h1 css={typo.large}>{title}</h1>
            <PageTitleLaunchNode />
          </>
        )}
        <ProfileDropdown />
      </div>
    </header>
  );
};
