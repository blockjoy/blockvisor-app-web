import { OrganizationPicker } from '@shared/components';
import { ProfileDropdown } from './ProfileDropdown/ProfileDropdown';
import { FC, ReactNode } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './PageTitle.styles';
import { PageTitleLaunchNode } from './PageTitleLaunchNode';

interface Props {
  children?: ReactNode;
  title?: string;
  hasOrgPicker?: boolean;
}

export const PageTitle: FC<Props> = ({ children, title, hasOrgPicker }) => {
  return (
    <header css={styles.base}>
      <div css={[styles.wrapper, wrapper.main]}>
        {children ? (
          <>{children}</>
        ) : (
          <>
            {hasOrgPicker && <OrganizationPicker hideName />}
            <h1 css={typo.large}>{title}</h1>
          </>
        )}
        <PageTitleLaunchNode />
        <ProfileDropdown />
      </div>
    </header>
  );
};
