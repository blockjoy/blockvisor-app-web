import { FC } from 'react';
import { typo } from 'styles/utils.typography.styles';

interface Props {
  label?: string;
  value?: string;
}

export const StatsWithLabel: FC<Props> = ({ label, value }) => {
  return (
    <>
      <div css={[typo.microlabel, typo.capitalize]}>{label}</div>
      <output css={[typo.medium]}>{value}</output>
    </>
  );
};
