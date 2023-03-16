import { FormProvider } from 'react-hook-form';
import { useBillingAddressForm } from '@modules/billing/';
import { Button, Input } from '@shared/components';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './BillingAddressForm.styles';

export type BillingAddressFormProps = {
  handleCancel: VoidFunction;
  billingAddress: BillingAddressForm;
};

export const BillingAddressForm = ({
  handleCancel,
  billingAddress,
}: BillingAddressFormProps) => {
  const {
    loading,
    form,

    onSubmit,

    nameController,
    companyController,
    addressController,
    cityController,
    countryController,
    regionController,
    postalController,
    vatController,
  } = useBillingAddressForm(billingAddress);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem]}>
            <Input
              label="Name"
              placeholder="Name"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={1}
              {...nameController.field}
              validationOptions={{
                required: 'Name is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              label="Company (optional)"
              placeholder="Company"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={2}
              {...companyController.field}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              label="Address"
              placeholder="Address"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={3}
              {...addressController.field}
              validationOptions={{
                required: 'Address is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              label="City"
              placeholder="City"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={4}
              {...cityController.field}
              validationOptions={{
                required: 'City is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              label="Country"
              placeholder="Country"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={5}
              {...countryController.field}
              validationOptions={{
                required: 'Country is required',
              }}
            />
          </li>
          <li css={[styles.formItem, styles.formRow]}>
            <div>
              <Input
                label="Region"
                placeholder="Region"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={6}
                {...regionController.field}
              />
            </div>
            <div>
              <Input
                label="Postal code"
                placeholder="Postal code"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={7}
                {...postalController.field}
                validationOptions={{
                  required: 'Postal code is required',
                }}
              />
            </div>
          </li>
          <li css={[styles.formItem]}>
            <Input
              label="VAT Number"
              placeholder="VAT Number"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={8}
              {...vatController.field}
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
