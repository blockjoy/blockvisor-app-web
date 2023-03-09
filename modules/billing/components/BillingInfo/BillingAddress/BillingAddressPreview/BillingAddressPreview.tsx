import { styles } from './BillingAddressPreview.styles';

export type BillingAddressPreviewProps = {
  billingAddress: BillingAddressForm;
};

export const BillingAddressPreview = ({
  billingAddress: {
    name,
    company,
    address,
    city,
    country,
    region,
    postal,
    vat,
  },
}: BillingAddressPreviewProps) => {
  return (
    <div css={styles.address}>
      <span>{name}</span>
      <span>{company}</span>
      <span>{address}</span>
      <span>
        {region}, {city} {postal}
      </span>
      <span>{country}</span>
      <span>VAT: {vat}</span>
    </div>
  );
};
