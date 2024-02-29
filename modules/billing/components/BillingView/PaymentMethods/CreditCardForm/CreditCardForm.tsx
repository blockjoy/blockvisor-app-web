import { ChangeEvent, forwardRef, Ref } from 'react';
import { SetterOrUpdater } from 'recoil';
import ChargebeeComponents from '@chargebee/chargebee-js-react-wrapper/dist/components/ComponentGroup';
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
import { CardComponent } from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { form as formStyles } from 'styles/form.styles';

export type CreditCardFormProps = {
  cardHolder: CardHolder;
  setCardHolder: SetterOrUpdater<CardHolder>;
};

export type CardHolder = {
  firstName: string;
  lastName: string;
};

export const CreditCardForm = forwardRef(
  (
    { cardHolder, setCardHolder }: CreditCardFormProps,
    ref: Ref<ChargebeeComponents>,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setCardHolder((cardHolder: CardHolder) => ({
        ...cardHolder,
        [name]: value,
      }));
    };

    return (
      <>
        <div css={[spacing.bottom.medium, formStyles.row]}>
          <div
            css={[flex.display.flex, flex.direction.column, flex.basis.b100]}
          >
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
          <div
            css={[flex.display.flex, flex.direction.column, flex.basis.b100]}
          >
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
        <CardComponent ref={ref} />
      </>
    );
  },
);
