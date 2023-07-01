import { Skeleton, Copy, SvgIcon } from '@shared/components';
import { ProfileDropdown } from './ProfileDropdown/ProfileDropdown';
import { FC, ReactNode } from 'react';
import { typo } from 'styles/utils.typography.styles';
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
}

export const PageTitle: FC<Props> = ({
  title,
  childTitle,
  canCopyChild,
  icon,
  onTitleClick,
  isLoading,
}) => {
  const Title = () => (
    <span css={styles.title}>
      <SvgIcon isDefaultColor size="18px">
        {icon}
      </SvgIcon>
      <p>{title}</p>
    </span>
  );

  return (
    <header css={styles.base}>
      <div css={[styles.wrapper, wrapper.main]}>
        <div css={styles.breadcrumb}>
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
                <p>Host not found</p>
              ) : canCopyChild ? (
                <Copy value={childTitle}>{childTitle}</Copy>
              ) : (
                childTitle
              )}
            </>
          )}
        </div>
        <PageTitleLaunchNode />
        <ProfileDropdown />
      </div>
    </header>
  );
};
