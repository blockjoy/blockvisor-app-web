import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { billingAtoms, CardComponent } from '@modules/billing';
import { typo } from 'styles/utils.typography.styles';
import { flex } from 'styles/utils.flex.styles';
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
import { spacing } from 'styles/utils.spacing.styles';
import { form as formStyles } from 'styles/form.styles';

export const CreditCardFormFields = () => {
  const [cardHolder, setCardHolder] = useRecoilState(billingAtoms.cardHolder);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCardHolder((cardHolder) => ({
      ...cardHolder,
      [name]: value,
    }));
  };

  return (
    <>
      <div css={[spacing.bottom.medium, formStyles.row]}>
        <div css={[flex.display.flex, flex.direction.column, flex.basis.b100]}>
          <label css={[inputLabel, inputLabelSize.small, typo.base]}>
            First name
          </label>
          <div css={[inputWrapper]}>
            <input
              name="firstName"
              css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              type="text"
              placeholder="First name"
              value={cardHolder.firstName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div css={[flex.display.flex, flex.direction.column, flex.basis.b100]}>
          <label css={[inputLabel, inputLabelSize.small, typo.base]}>
            Last name
          </label>
          <div css={[inputWrapper]}>
            <input
              name="lastName"
              css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              type="text"
              placeholder="Last name"
              value={cardHolder.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <CardComponent />
    </>
  );
};
