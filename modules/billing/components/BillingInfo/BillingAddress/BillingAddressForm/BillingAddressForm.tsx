import { Controller, FormProvider } from 'react-hook-form';
import { useBillingAddressForm } from '@modules/billing';
import { Button, CountrySelector, Input } from '@shared/components';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './BillingAddressForm.styles';
import { CustomerBillingAddress } from 'chargebee-typescript/lib/resources';
import { ButtonGroup } from '@shared/components/Buttons/ButtonGroup/ButtonGroup';

export type BillingAddressFormProps = {
  actions: BillingAddressActions;
  billingAddress: CustomerBillingAddress | null;
};

export const BillingAddressForm = ({
  actions,
  billingAddress,
}: BillingAddressFormProps) => {
  const {
    loading,
    form,

    onSubmit,

    firstNameController,
    lastNameController,
    companyController,
    addressController,
    cityController,
    countryController,
    postalController,
  } = useBillingAddressForm(billingAddress, actions);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem, styles.formRow]}>
            <div css={styles.formCol}>
              <Input
                label="First Name"
                placeholder="First Name"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={1}
                {...firstNameController.field}
                ref={null}
                validationOptions={{
                  required: 'First Name is required',
                }}
              />
            </div>
            <div css={styles.formCol}>
              <Input
                label="Last Name"
                placeholder="Last Name"
                inputSize="medium"
                labelStyles={[typo.base]}
                tabIndex={1}
                {...lastNameController.field}
                ref={null}
                validationOptions={{
                  required: 'Last Name is required',
                }}
              />
            </div>
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
            <Controller
              {...countryController.field}
              rules={{ required: 'Country is required' }}
              render={({ field: { name, onChange, value } }) => (
                <CountrySelector
                  name={name}
                  value={value}
                  label="Country"
                  labelStyles={[typo.base]}
                  onChange={onChange}
                />
              )}
            />
          </li>
          <li css={[styles.formItem, styles.formRow]}>
            <div css={styles.formCol}>
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
            </div>
            <div css={styles.formCol}>
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
        </ul>
        <ButtonGroup>
          <Button
            loading={loading}
            style="secondary"
            size="small"
            type="submit"
            tabIndex={9}
          >
            {billingAddress ? 'Update' : 'Add'}
          </Button>
          <Button
            onClick={() => actions.cancel()}
            style="outline"
            size="small"
            tabIndex={10}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </FormProvider>
  );
};
