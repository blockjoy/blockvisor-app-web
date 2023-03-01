import { styles } from './BillingPreview.styles';

export type BillingPreviewProps = {
  billingAddress: BillingAddressForm;
};

export const BillingPreview = ({
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
}: BillingPreviewProps) => {
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
