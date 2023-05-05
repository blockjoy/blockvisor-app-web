import { CustomerBillingAddress } from 'chargebee-typescript/lib/resources';
import { styles } from './BillingAddressPreview.styles';
import { BillingAddress as InvoiceBillingAddress } from 'chargebee-typescript/lib/resources/invoice';

export type BillingAddressPreviewProps = {
  billingAddress: CustomerBillingAddress | InvoiceBillingAddress;
};

export const BillingAddressPreview = ({
  billingAddress: { first_name, company, line1, city, country, state, zip },
}: BillingAddressPreviewProps) => {
  return (
    <div css={styles.address}>
      <span>{first_name}</span>
      <span>{company}</span>
      <span>{line1}</span>
      <span>
        {state}, {city} {zip}
      </span>
      <span>{country}</span>
    </div>
  );
};
