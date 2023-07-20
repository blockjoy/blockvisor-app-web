import { useRecoilValue } from 'recoil';
import { Controller, FormProvider } from 'react-hook-form';
import { billingSelectors, useBillingAddressForm } from '@modules/billing';
import { Button, CountrySelector, Input } from '@shared/components';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './BillingAddressForm.styles';
import { ButtonGroup } from '@shared/components/Buttons/ButtonGroup/ButtonGroup';

type BillingAddressFormProps = {
  handleCancel: () => void;
};

export const BillingAddressForm = ({
  handleCancel,
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
  } = useBillingAddressForm();

  const { formState } = form;
  const { isValid } = formState;

  const hasBillingAddress = useRecoilValue(billingSelectors.hasBillingAddress);

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
                tabIndex={2}
                {...lastNameController.field}
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
              tabIndex={3}
              {...companyController.field}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              label="Address"
              placeholder="Address"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={4}
              {...addressController.field}
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
                  tabIndex={5}
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
                tabIndex={6}
                {...cityController.field}
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
            tabIndex={8}
            disabled={!isValid}
          >
            {hasBillingAddress ? 'Update' : 'Add'}
          </Button>
          {!hasBillingAddress && (
            <Button
              onClick={handleCancel}
              style="outline"
              size="small"
              tabIndex={9}
            >
              Cancel
            </Button>
          )}
        </ButtonGroup>
      </form>
    </FormProvider>
  );
};
