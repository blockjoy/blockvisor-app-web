import { ReactNode } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { AnimatedGraphic } from './AnimatedGraphic';
import { styles } from './EmptyColumn.styles';

type Props = {
  id?: string;
  title: string;
  description: string | ReactNode;
};

export function EmptyColumn({ id, title, description }: Props) {
  return (
    <article id={id} css={[styles.columnEmpty]}>
      <AnimatedGraphic />
      <div>
        <div css={[typo.medium]}>{title}</div>
        <div css={[styles.description, typo.small]}>{description}</div>
      </div>
    </article>
  );
}
