import { getName } from 'country-list';
import { CustomerBillingAddress } from 'chargebee-typescript/lib/resources';
import { BillingAddress as InvoiceBillingAddress } from 'chargebee-typescript/lib/resources/invoice';

export type BillingAddressPreviewProps = {
  type?: 'simple' | 'default';
  billingAddress: CustomerBillingAddress | InvoiceBillingAddress;
};

export const BillingAddressPreview = ({
  type = 'default',
  billingAddress: { first_name, last_name, company, line1, city, country, zip },
}: BillingAddressPreviewProps) => {
  return (
    <div>
      {type === 'default' && (
        <p>
          {first_name} {last_name}
        </p>
      )}
      {line1 && (
        <>
          {company && <p>{company}</p>}
          <p>{line1}</p>
          <p>
            {city}, {zip}
          </p>
          {country && <p>{getName(country)}</p>}
        </>
      )}
    </div>
  );
};
