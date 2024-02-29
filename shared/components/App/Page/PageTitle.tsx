import { Copy, SvgIcon, OrganizationPicker } from '@shared/components';
import { ProfileDropdown } from './ProfileDropdown/ProfileDropdown';
import { ReactNode } from 'react';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './PageTitle.styles';
import { PageTitleLaunchNode } from './PageTitleLaunchNode';
import { PageTitleAdminNav } from './PageTitleAdminNav';

interface Props {
  title: string;
  childTitle?: string;
  canCopyChild?: boolean;
  icon?: ReactNode;
  onTitleClick?: VoidFunction;
  isLoading?: boolean;
  isAdmin?: boolean;
  hideOrgPicker?: boolean;
}

export const PageTitle = ({
  title,
  childTitle,
  canCopyChild,
  icon,
  onTitleClick,
  isLoading,
  isAdmin,
  hideOrgPicker,
}: Props) => {
  const Title = () => (
    <span css={styles.title}>
      {icon && (
        <SvgIcon isDefaultColor size="16px">
          {icon}
        </SvgIcon>
      )}

      <p>{title}</p>
    </span>
  );

  return (
    <header css={styles.base}>
      <div css={[styles.wrapper, wrapper.main]}>
        <div css={styles.breadcrumb}>
          {!hideOrgPicker && (
            <div css={styles.orgPicker}>
              <OrganizationPicker />
              <span css={styles.separator}>/</span>
            </div>
          )}
          {!!onTitleClick ? (
            <button onClick={onTitleClick} css={styles.button}>
              <Title />
            </button>
          ) : (
            <Title />
          )}
          {isAdmin ? (
            <>
              <span css={styles.separator}>/</span>
              <PageTitleAdminNav />
            </>
          ) : (
            childTitle && (
              <>
                <span css={styles.separator}>/</span>
                <p css={styles.childTitle}>{childTitle}</p>
                {canCopyChild && <Copy value={childTitle} hideTooltip />}
              </>
            )
          )}
        </div>
        <div css={styles.rightWrapper}>
          <PageTitleLaunchNode />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};
