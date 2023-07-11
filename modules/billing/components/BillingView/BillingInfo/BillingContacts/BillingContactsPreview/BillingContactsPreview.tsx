import { styles } from './BillingContactsPreview.styles';

export type BillingContactsPreviewProps = {
  billingContact: IBillingContact;
};

export const BillingContactsPreview = ({
  billingContact: { name, email },
}: BillingContactsPreviewProps) => {
  return (
    <div css={styles.wrapper}>
      <span>{name}</span>
      <span>{email}</span>
    </div>
  );
};
