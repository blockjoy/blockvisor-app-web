import { ApplicationError } from '@modules/auth/utils/Errors';
import { Button, Input } from '@shared/index';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './BillingAddress.styles';

export type BillingAddressForm = {
  name: string;
  company: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postal: string;
  vat: string;
};

export type BillingAddressProps = {
  handleAdding: (isAdding: boolean) => void;
  billingAddress: BillingAddressForm;
};

export const BillingAddress = ({
  handleAdding,
  billingAddress,
}: BillingAddressProps) => {
  const form = useForm<any>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setValue('name', billingAddress.name ?? '');
    form.setValue('company', billingAddress.company ?? '');
    form.setValue('address', billingAddress.address ?? '');
    form.setValue('city', billingAddress.city ?? '');
    form.setValue('country', billingAddress.country ?? '');
    form.setValue('region', billingAddress.region ?? '');
    form.setValue('postal', billingAddress.postal ?? '');
    form.setValue('vat', billingAddress.vat ?? '');
  }, []);

  const onSubmit: SubmitHandler<BillingAddressForm> = async ({
    name,
    company,
    address,
    city,
    country,
    region,
    postal,
    vat,
  }: BillingAddressForm) => {
    console.log(
      'FORM SUBMIT',
      name,
      company,
      address,
      city,
      country,
      region,
      postal,
      vat,
    );
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof ApplicationError) toast.error(error.message);
    }
  };
  const handleCancel = () => {
    handleAdding(false);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem]}>
            <Input
              name="name"
              label="Name"
              placeholder="John Doe"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={0}
              value={billingAddress.name}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="company"
              label="Company"
              placeholder="BlockJoy Inc."
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={1}
              value={billingAddress.company}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="address"
              label="Address"
              placeholder="Address"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={2}
              value={billingAddress.address}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="city"
              label="City"
              placeholder="City"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={3}
              value={billingAddress.name}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="country"
              label="Country"
              placeholder="Country"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={4}
              value={billingAddress.country}
            />
          </li>
          <li css={[styles.formItem, styles.formRow]}>
            <div>
              <Input
                name="region"
                label="Region"
                placeholder="Region"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={5}
                value={billingAddress.region}
              />
            </div>
            <div>
              <Input
                name="postal"
                label="Postal code"
                placeholder="Postal code"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={6}
                value={billingAddress.postal}
              />
            </div>
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="vat"
              label="VAT Number"
              placeholder="VAT Number"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={6}
              value={billingAddress.vat}
            />
          </li>
        </ul>
        <div css={styles.buttons}>
          <Button
            loading={loading}
            style="secondary"
            size="small"
            type="submit"
          >
            Add
          </Button>
          <Button onClick={handleCancel} style="outline" size="small">
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
