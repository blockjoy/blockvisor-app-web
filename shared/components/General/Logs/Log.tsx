import { DateTime } from '@shared/components';
import { styles } from './Log.styles';

type LogProps = { date?: Date } & React.PropsWithChildren;

export const Log = ({ children, date }: LogProps) => {
  return (
    <div css={styles.wrapper}>
      {date && (
        <span css={styles.time}>
          <DateTime date={date} />
        </span>
      )}
      {children}
    </div>
  );
};
