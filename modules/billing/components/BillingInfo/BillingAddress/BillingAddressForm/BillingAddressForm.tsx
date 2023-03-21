import { FormProvider } from 'react-hook-form';
import { useBillingAddressForm } from '@modules/billing';
import { Button, Input } from '@shared/components';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './BillingAddressForm.styles';

export type BillingAddressFormProps = {
  actions: BillingAddressActions;
  billingAddress: IBillingAddress | null;
};

export const BillingAddressForm = ({
  actions,
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
  } = useBillingAddressForm(billingAddress, actions);

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
              ref={null}
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
              ref={null}
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
              ref={null}
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
              ref={null}
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
              ref={null}
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
                ref={null}
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
                ref={null}
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
              ref={null}
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
            onClick={() => actions.cancel()}
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
