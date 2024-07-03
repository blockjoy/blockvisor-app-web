import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { CountrySelector } from '@shared/components';
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
import { spacing } from 'styles/utils.spacing.styles';
import { form as formStyles } from 'styles/form.styles';

export const BillingDetailsForm = () => {
  const [cardAddress, setCardAddress] = useRecoilState(
    billingAtoms.cardAddress,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardAddress((address) => ({
      ...address,
      [name]: value,
    }));
  };

  const handleCountryChange = (countryCode: string) => {
    setCardAddress((address) => ({
      ...address,
      country: countryCode,
    }));
  };

  return (
    <>
      <div css={[spacing.bottom.medium]}>
        <label css={[inputLabel, inputLabelSize.small, typo.base]}>
          Address
        </label>
        <div css={[inputWrapper]}>
          <input
            name="line1"
            css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
            type="text"
            placeholder="Address"
            value={cardAddress?.line1 ?? ''}
            onChange={handleChange}
          />
        </div>
      </div>
      <div css={[spacing.bottom.medium]}>
        <label css={[inputLabel, inputLabelSize.small, typo.base]}>
          Country
        </label>
        <div css={[inputWrapper]}>
          <CountrySelector
            name="country"
            value={cardAddress?.country ?? ''}
            labelStyles={[typo.base]}
            onChange={handleCountryChange}
          />
        </div>
      </div>
      <div css={[spacing.bottom.medium, formStyles.row]}>
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
              value={cardAddress?.city ?? ''}
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
              name="postal_code"
              css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              type="text"
              placeholder="Postal code"
              value={cardAddress?.postal_code ?? ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
