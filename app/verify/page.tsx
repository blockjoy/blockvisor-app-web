'use client';

import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';

export default function Verify() {
  return (
    <p css={[typo.small, colors.text3, spacing.bottom.medium]}>
      Check your e-mail and start using BlockVisor!
    </p>
  );
}
