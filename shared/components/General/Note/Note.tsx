import { SvgIcon } from '@shared/components';
import { styles } from './Note.styles';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { SerializedStylesAll } from 'types/theme';
import { PropsWithChildren } from 'react';

type Props = {
  type?: NoteType;
  title?: string;
  additionalStyles?: SerializedStylesAll;
} & PropsWithChildren;

export const Note = ({
  children,
  type = 'info',
  title,
  additionalStyles,
}: Props) => {
  return (
    <div css={[styles.wrapper(type), additionalStyles && additionalStyles]}>
      <SvgIcon size="16px">
        <IconInfo />
      </SvgIcon>
      <div>
        <h4 css={styles.title}>{title}</h4>
        <div css={styles.content}>{children}</div>
      </div>
    </div>
  );
};
