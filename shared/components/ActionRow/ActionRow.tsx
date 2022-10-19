import { ReactNode } from 'react';
import { fluid, typo } from 'styles/utils.typography.styles';
import { styles } from './ActionRow.styles';

type Props = {
  title: ReactNode;
  description: ReactNode;
  action: ReactNode;
};
export function ActionRow({ title, description, action }: Props) {
  return (
    <div css={[styles.actionRow]}>
      <div>
        <h3 css={[fluid.large]}>{title}</h3>
        <p css={[typo.small, styles.description]}>{description}</p>
      </div>

      <div css={[styles.action]}>{action}</div>
    </div>
  );
}
