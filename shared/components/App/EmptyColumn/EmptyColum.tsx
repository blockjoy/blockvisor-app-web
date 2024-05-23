import { typo } from 'styles/utils.typography.styles';
import { AnimatedGraphic } from './AnimatedGraphic';
import { styles } from './EmptyColumn.styles';

type Props = {
  id?: string;
  title: string;
  description: string | React.ReactNode;
  align?: 'left' | 'center';
  additionalStyles?: any;
};

export function EmptyColumn({
  id,
  title,
  description,
  align = 'center',
  additionalStyles,
}: Props) {
  return (
    <article
      id={id}
      css={[
        styles.columnEmpty,
        styles.columnAlign(align),
        additionalStyles && additionalStyles,
      ]}
    >
      <AnimatedGraphic />
      <div>
        <div css={[typo.medium]}>{title}</div>
        <div css={[styles.description, typo.small]}>{description}</div>
      </div>
    </article>
  );
}
