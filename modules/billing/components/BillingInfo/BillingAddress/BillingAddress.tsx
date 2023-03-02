import { useBillingAddress } from '@modules/billing/';
import { Button, Input } from '@shared/index';
import { FormProvider } from 'react-hook-form';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './BillingAddress.styles';

export type BillingAddressProps = {
  handleAdding: (isAdding: boolean) => void;
  billingAddress: BillingAddressForm;
};

export const BillingAddress = ({
  handleAdding,
  billingAddress,
}: BillingAddressProps) => {
  const {
    loading,
    form,

    onSubmit,

    name,
    handleNameChange,

    company,
    handleCompanyChange,

    address,
    handleAddressChange,

    city,
    handleCityChange,

    country,
    handleCountryChange,

    region,
    handleRegionChange,

    postal,
    handlePostalChange,

    vat,
    handleVatChange,
  } = useBillingAddress(billingAddress);

  const handleCancel = () => handleAdding(false);

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
              tabIndex={1}
              value={name}
              onChange={handleNameChange}
              validationOptions={{
                required: 'Name is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="company"
              label="Company (optional)"
              placeholder="BlockJoy Inc."
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={2}
              value={company}
              onChange={handleCompanyChange}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="address"
              label="Address"
              placeholder="Address"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={3}
              value={address}
              onChange={handleAddressChange}
              validationOptions={{
                required: 'Address is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="city"
              label="City"
              placeholder="City"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={4}
              value={city}
              onChange={handleCityChange}
              validationOptions={{
                required: 'City is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="country"
              label="Country"
              placeholder="Country"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={5}
              value={country}
              onChange={handleCountryChange}
              validationOptions={{
                required: 'Country is required',
              }}
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
                tabIndex={6}
                value={region}
                onChange={handleRegionChange}
              />
            </div>
            <div>
              <Input
                name="postal"
                label="Postal code"
                placeholder="Postal code"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={7}
                value={postal}
                onChange={handlePostalChange}
                validationOptions={{
                  required: 'Postal code is required',
                }}
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
              tabIndex={8}
              value={vat}
              onChange={handleVatChange}
            />
          </li>
        </ul>
        <div css={styles.buttons}>
          <Button
            loading={loading}
            style="secondary"
            size="small"
            type="submit"
            tabIndex={9}
          >
            Add
          </Button>
          <Button
            onClick={handleCancel}
            style="outline"
            size="small"
            tabIndex={10}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
