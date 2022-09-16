import { SerializedStyles } from '@emotion/serialize';
import { FC, PropsWithChildren } from 'react';
import { containers } from 'styles/containers.styles';
import { styles } from './ActionTitleHeader.styles';

interface Props extends PropsWithChildren {
  elementClasses?: SerializedStyles[];
  title?: JSX.Element;
  util?: React.FC;
  action?: React.FC;
}

export const ActionTitleHeader: FC<Props> = ({
  elementClasses,
  children,
  title,
  util,
  action,
}) => {
  let classes = [styles.base];

  if (elementClasses) {
    classes = [styles.base, ...elementClasses];
  }

  return (
    <header className="test" css={classes}>
      <div css={[styles.inner]}>
        <div css={styles.main}>
          <>{title}</>
          <>{action}</>
        </div>
        {children}
      </div>
      <>{util}</>
    </header>
  );
};
