import { ReactNode } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { AnimatedGraphic } from './AnimatedGraphic';
import { styles } from './EmptyColumn.styles';

type Props = {
  id?: string;
  title: string;
  description: string | ReactNode;
  dataCy?: string;
};

export function EmptyColumn({ id, title, description, dataCy }: Props) {
  return (
    <article data-cy={dataCy} id={id} css={[styles.columnEmpty]}>
      <AnimatedGraphic />
      <div>
        <div css={[typo.medium]}>{title}</div>
        <div css={[styles.description, typo.small]}>{description}</div>
      </div>
    </article>
  );
}
