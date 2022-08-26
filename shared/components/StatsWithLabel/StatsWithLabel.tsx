import { FC } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './StatsWithLabel.styles';

interface Props {
  label?: string;
  value?: string;
}

export const StatsWithLabel: FC<Props> = ({ label, value }) => {
  return (
    <>
      <div css={[styles.label, typo.microlabel, typo.capitalize]}>{label}</div>
      <output css={[styles.value, typo.medium]}>{value}</output>
    </>
  );
};
