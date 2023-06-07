import { styles } from './PaymentMethodInfoForm.styles';
import { typo } from 'styles/utils.typography.styles';
import {
  inputField,
  inputFieldDefault,
  inputTypesStyle,
  inputWrapper,
} from '@shared/components/Forms/ReactHookForm/Input/Input.styles';
import {
  inputLabel,
  inputLabelSize,
} from '@shared/components/Forms/ReactHookForm/Input/InputLabel.styles';
import { flex } from 'styles/utils.flex.styles';
import { ChangeEvent } from 'react';
import { CountrySelector } from '@shared/components';

type PaymentMethodInfoFormProps = {
  billingInfo: any;
  setBillingInfo: any;
};

export type BillingInfoData = {
  address: string;
  country: string;
  city: string;
  postal: string;
};

export const PaymentMethodInfoForm = ({
  billingInfo,
  setBillingInfo,
}: PaymentMethodInfoFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBillingInfo((billingInfo: BillingInfoData) => ({
      ...billingInfo,
      [name]: value,
    }));
  };

  const handleCountryChange = (countryCode: string) => {
    setBillingInfo((billingInfo: BillingInfoData) => ({
      ...billingInfo,
      country: countryCode,
    }));
  };

  return (
    <>
      <div css={[styles.formItem]}>
        <label css={[inputLabel, inputLabelSize.small, typo.base]}>
          Address
        </label>
        <div css={[inputWrapper]}>
          <input
            name="address"
            css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
            type="text"
            placeholder="Address"
            value={billingInfo.address}
            onChange={handleChange}
          />
        </div>
      </div>
      <div css={[styles.formItem]}>
        <label css={[inputLabel, inputLabelSize.small, typo.base]}>
          Country
        </label>
        <div css={[inputWrapper]}>
          <CountrySelector
            name="country"
            value={billingInfo.country}
            labelStyles={[typo.base]}
            onChange={handleCountryChange}
          />
        </div>
      </div>
      <div css={[styles.formItem, styles.formRow]}>
        <div css={[flex.display.flex, flex.direction.column, flex.basis.b100]}>
          <label css={[inputLabel, inputLabelSize.small, typo.base]}>
            City
          </label>
          <div css={[inputWrapper]}>
            <input
              name="city"
              css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              type="text"
              placeholder="City"
              value={billingInfo.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div css={[flex.display.flex, flex.direction.column, flex.basis.b100]}>
          <label css={[inputLabel, inputLabelSize.small, typo.base]}>
            Postal code
          </label>
          <div css={[inputWrapper]}>
            <input
              name="postal"
              css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              type="text"
              placeholder="Postal code"
              value={billingInfo.postal}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
