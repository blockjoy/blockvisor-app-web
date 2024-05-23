import { typo } from 'styles/utils.typography.styles';
import { styles } from './DetailsView.styles';

export type DetailsViewProps = {
  headline: string;
} & React.PropsWithChildren;

export const DetailsView = ({ children, headline }: DetailsViewProps) => {
  return (
    <div css={styles.wrapper} style={{ width: '100%' }}>
      <div css={styles.headlineWrapper}>
        <h3 css={[styles.headline, typo.ellipsis]}>{headline}</h3>
      </div>
      <div css={styles.contentWrapper}>{children}</div>
    </div>
  );
};
