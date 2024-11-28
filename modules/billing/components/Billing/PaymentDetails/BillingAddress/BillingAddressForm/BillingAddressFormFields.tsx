import { Controller, UseFormReturn } from 'react-hook-form';
import { Address } from '@modules/grpc/library/blockjoy/common/v1/address';
import { capitalize } from 'utils/capitalize';
import { CountrySelector, StateSelector, Input } from '@shared/components';
import { STATE_TYPE } from '@shared/index';
import { reset as resetStyles } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { form as formStyles } from 'styles/form.styles';

type Props = {
  form: UseFormReturn<Address>;
};
export const BillingAddressFormFields = ({ form }: Props) => {
  const { watch } = form;

  const selectedCountry = watch('country');

  const state = selectedCountry ? STATE_TYPE[selectedCountry] : null;
  const stateLabel = state ? capitalize(state) : null;

  return (
    <ul css={[resetStyles.list]}>
      <li css={[spacing.bottom.medium]}>
        <Input
          name="line1"
          label="Address line 1"
          placeholder="Street address"
          inputSize="medium"
          labelStyles={[typo.base]}
          validationOptions={{
            required: 'Address is required',
          }}
        />
      </li>
      <li css={[spacing.bottom.medium]}>
        <Input
          name="line2"
          label="Address line 2"
          placeholder="Apt., suite, unit number, etc. (optional)"
          inputSize="medium"
          labelStyles={[typo.base]}
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
      {stateLabel && (
        <li css={[spacing.bottom.medium]}>
          <Controller
            name="state"
            rules={{ required: 'State is required' }}
            render={({ field: { name, onChange, value } }) => (
              <StateSelector
                name={name}
                value={value}
                label={stateLabel}
                labelStyles={[typo.base]}
                onChange={onChange}
                country={selectedCountry}
              />
            )}
          />
        </li>
      )}
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
            name="postalCode"
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
  );
};
