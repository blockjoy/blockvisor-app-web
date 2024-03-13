import { useRecoilValue } from 'recoil';
import { Controller, FormProvider } from 'react-hook-form';
import { billingSelectors, useBillingAddressForm } from '@modules/billing';
import {
  ButtonGroup,
  Button,
  CountrySelector,
  Input,
} from '@shared/components';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { containers } from 'styles/containers.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { form as formStyles } from 'styles/form.styles';

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
  } = useBillingAddressForm();

  const { formState } = form;
  const { isValid, isDirty } = formState;

  const hasBillingAddress = useRecoilValue(billingSelectors.hasBillingAddress);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} css={containers.mediumSmall}>
        <ul css={[reset.list]}>
          <li css={[spacing.bottom.medium, formStyles.row]}>
            <div css={formStyles.col}>
              <Input
                name="firstName"
                label="First Name"
                placeholder="First Name"
                inputSize="medium"
                labelStyles={[typo.base]}
                validationOptions={{
                  required: 'First Name is required',
                }}
              />
            </div>
            <div css={formStyles.col}>
              <Input
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                inputSize="medium"
                labelStyles={[typo.base]}
                validationOptions={{
                  required: 'Last Name is required',
                }}
              />
            </div>
          </li>
          <li css={[spacing.bottom.medium]}>
            <Input
              name="company"
              label="Company (optional)"
              placeholder="Company"
              inputSize="medium"
              labelStyles={[typo.base]}
            />
          </li>
          <li css={[spacing.bottom.medium]}>
            <Input
              name="address"
              label="Address"
              placeholder="Address"
              inputSize="medium"
              labelStyles={[typo.base]}
              validationOptions={{
                required: 'Address is required',
              }}
            />
          </li>
          <li css={[spacing.bottom.medium]}>
            <Controller
              name="country"
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
          <li css={[spacing.bottom.medium, formStyles.row]}>
            <div css={formStyles.col}>
              <Input
                name="city"
                label="City"
                placeholder="City"
                inputSize="medium"
                labelStyles={[typo.base]}
                validationOptions={{
                  required: 'City is required',
                }}
              />
            </div>
            <div css={formStyles.col}>
              <Input
                name="postal"
                label="Postal code"
                placeholder="Postal code"
                inputSize="medium"
                labelStyles={[typo.base]}
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
            disabled={!isValid || !isDirty}
          >
            {hasBillingAddress ? 'Update' : 'Add'}
          </Button>
          {!hasBillingAddress && (
            <Button onClick={handleCancel} style="outline" size="small">
              Cancel
            </Button>
          )}
        </ButtonGroup>
      </form>
    </FormProvider>
  );
};
