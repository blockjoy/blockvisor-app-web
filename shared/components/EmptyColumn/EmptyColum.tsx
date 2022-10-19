import { typo } from 'styles/utils.typography.styles';
import { AnimatedGraphic } from './AnimatedGraphic';
import { styles } from './EmptyColumn.styles';

type Props = {
  title: string;
  description: string;
};

export function EmptyColumn({ title, description }: Props) {
  return (
    <article css={[styles.columnEmpty]}>
      <AnimatedGraphic />
      <div>
        <div css={[typo.medium]}>{title}</div>
        <div css={[styles.description, typo.small]}>{description}</div>
      </div>
    </article>
  );
}
