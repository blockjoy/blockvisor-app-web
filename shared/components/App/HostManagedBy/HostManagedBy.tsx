import { ManagedBy } from '@modules/grpc/library/blockjoy/v1/host';
import { css } from '@emotion/react';

const styles = {
  base: css`
    text-transform: capitalize;
  `,
};

type Props = {
  managedBy: ManagedBy;
};

export const HostManagedBy = ({ managedBy }: Props) => (
  <p css={styles.base}>
    {ManagedBy[managedBy].replace('MANAGED_BY_', '').toLocaleLowerCase()}
  </p>
);
