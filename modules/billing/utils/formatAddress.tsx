import { Address } from '@modules/grpc/library/blockjoy/common/v1/address';

export const formatAddress = (address: Address) => (
  <>
    {address.line1}
    {address.line2 && (
      <>
        <br />
        {address.line2}
      </>
    )}
    <br />
    {address.city}, {address.state} {address.postalCode} {address.country}
  </>
);
