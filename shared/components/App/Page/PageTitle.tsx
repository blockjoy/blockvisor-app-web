import {
  Skeleton,
  Copy,
  SvgIcon,
  OrganizationPicker,
} from '@shared/components';
import { ProfileDropdown } from './ProfileDropdown/ProfileDropdown';
import { FC, ReactNode } from 'react';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './PageTitle.styles';
import { PageTitleLaunchNode } from './PageTitleLaunchNode';

interface Props {
  title: string;
  childTitle?: string;
  canCopyChild?: boolean;
  icon?: ReactNode;
  onTitleClick?: VoidFunction;
  isLoading?: boolean;
  hideOrgPicker?: boolean;
}

export const PageTitle: FC<Props> = ({
  title,
  childTitle,
  canCopyChild,
  icon,
  onTitleClick,
  isLoading,
  hideOrgPicker,
}) => {
  const Title = () => (
    <span css={styles.title}>
      <SvgIcon isDefaultColor size="16px">
        {icon}
      </SvgIcon>
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
          {childTitle && (
            <>
              <span css={styles.separator}>/</span>
              {isLoading && !childTitle ? (
                <Skeleton width="80px" />
              ) : !isLoading && !childTitle ? (
                <p css={styles.childTitle}>Host not found</p>
              ) : (
                <p css={styles.childTitle}>{childTitle}</p>
              )}
            </>
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
