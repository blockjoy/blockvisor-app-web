import { styles } from './BillingAddressPreview.styles';

export type BillingAddressPreviewProps = {
  billingAddress: IBillingAddress;
};

export const BillingAddressPreview = ({
  billingAddress: {
    name,
    company,
    line1,
    city,
    country,
    state,
    postal_code,
    vat,
  },
}: BillingAddressPreviewProps) => {
  return (
    <div css={styles.address}>
      <span>{name}</span>
      <span>{company}</span>
      <span>{line1}</span>
      <span>
        {state}, {city} {postal_code}
      </span>
      <span>{country}</span>
      <span>VAT: {vat}</span>
    </div>
  );
};
