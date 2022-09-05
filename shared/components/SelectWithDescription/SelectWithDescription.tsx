import { ReactNode } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './SelectWithDescription.styles';

type Props = {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function SelectWithDescription({ title, description, action }: Props) {
  return (
    <div css={[styles.base]}>
      <div>
        {title}
        <small css={[typo.small, styles.description]}>{description}</small>
      </div>
      {action}
    </div>
  );
}
