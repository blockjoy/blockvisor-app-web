import { SerializedStyles } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';
import { ITheme } from 'types/theme';
import { AnimatedGraphic } from './AnimatedGraphic';
import { styles } from './EmptyColumn.styles';

type Props = {
  id?: string;
  title: string;
  description: string | React.ReactNode;
  align?: 'left' | 'center';
  hasMaxWidth?: boolean;
  additionalStyles?: SerializedStyles;
};

export function EmptyColumn({
  id,
  title,
  description,
  align = 'center',
  hasMaxWidth = true,
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
        <div
          css={[
            (theme: ITheme) => styles.description(hasMaxWidth)(theme),
            typo.small,
          ]}
        >
          {description}
        </div>
      </div>
    </article>
  );
}
