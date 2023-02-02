import { Button } from '@shared/components';
import { FC, ReactNode } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { wrapper } from 'styles/wrapper.styles';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import { styles } from './PageTitle.styles';
import { PageTitleLaunchNode } from './PageTitleLaunchNode';

interface Props {
  children?: ReactNode;
  title?: string;
  actionText?: string;
  actionOnClick?: VoidFunction;
}

export const PageTitle: FC<Props> = ({
  children,
  title,
  actionText = 'Create New',
  actionOnClick,
}) => {
  return (
    <header css={styles.base}>
      <div css={[styles.wrapper, wrapper.main]}>
        {children ? (
          <>{children}</>
        ) : (
          <>
            <h1 css={typo.large}>{title}</h1>
            {actionOnClick && (
              <div css={styles.actions}>
                <Button onClick={actionOnClick} size="small">
                  {actionText}
                </Button>
              </div>
            )}
            <PageTitleLaunchNode />
          </>
        )}
        <ProfileDropdown />
      </div>
    </header>
  );
};
