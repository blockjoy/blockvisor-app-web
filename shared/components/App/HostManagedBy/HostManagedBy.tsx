// import { ManagedBy } from '@modules/grpc/library/blockjoy/v1/host';
import { css } from '@emotion/react';

const styles = {
  base: css`
    text-transform: capitalize;
  `,
};

type Props = {
  managedBy?: string;
};

export const HostManagedBy = ({ managedBy }: Props) => (
  <p css={styles.base}>
    {/* TODO: host managedBy is missing */}
    {/* {ManagedBy[managedBy].replace('MANAGED_BY_', '').toLocaleLowerCase()} */}
  </p>
);
