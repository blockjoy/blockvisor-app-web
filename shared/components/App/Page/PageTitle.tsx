import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { usePathname } from 'next/navigation';
import { layoutSelectors } from '@modules/layout';
import { Copy, SvgIcon, OrganizationPicker } from '@shared/components';
import { ProfileDropdown } from './ProfileDropdown/ProfileDropdown';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './PageTitle.styles';
import { PageTitleLaunchNode } from './PageTitleLaunchNode';
import { PageTitleAdminNav } from './PageTitleAdminNav';

interface Props {
  title: string;
  childTitle?: string;
  canCopyChild?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
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
  label,
  onTitleClick,
  isLoading,
  isAdmin,
  hideOrgPicker,
}: Props) => {
  const pathname = usePathname();
  const adminFullWidth = useRecoilValue(layoutSelectors.adminFullWidth);

  const isFullWidth = pathname === '/admin' && adminFullWidth;

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
      <div css={[styles.wrapper, isFullWidth ? wrapper.full : wrapper.main]}>
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
          {label ? label : null}
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
                {canCopyChild && (
                  <span css={styles.copyWrapper}>
                    <Copy value={childTitle} hideTooltip />
                  </span>
                )}
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
