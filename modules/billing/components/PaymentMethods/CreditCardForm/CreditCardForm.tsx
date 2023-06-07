import { ChangeEvent, forwardRef, Ref } from 'react';
import { SetterOrUpdater } from 'recoil';
import {
  CardComponent,
  CardNumber,
  CardExpiry,
  CardCVV,
} from '@chargebee/chargebee-js-react-wrapper';
import { typo } from 'styles/utils.typography.styles';
import { flex } from 'styles/utils.flex.styles';
import { styles } from './CreditCardForm.styles';
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
import { CHARGEBEE_OPTIONS } from '@modules/billing';

export type CreditCardFormProps = {
  cardHolder: CardHolder;
  setCardHolder: SetterOrUpdater<CardHolder>;
};

export type CardHolder = {
  firstName: string;
  lastName: string;
};

export const CreditCardForm = forwardRef(
  ({ cardHolder, setCardHolder }: CreditCardFormProps, ref: Ref<any>) => {
    const { style, classes, locale, placeholder } = CHARGEBEE_OPTIONS;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setCardHolder((cardHolder: CardHolder) => ({
        ...cardHolder,
        [name]: value,
      }));
    };

    return (
      <>
        <div css={[styles.formItem, styles.formRow]}>
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

        <CardComponent
          ref={ref}
          className="fieldset field"
          styles={style}
          classes={classes}
          locale={locale}
          placeholder={placeholder}
        >
          <div css={[styles.formItem]}>
            <label css={[inputLabel, inputLabelSize.small, typo.base]}>
              Card number
            </label>
            <div css={[inputWrapper]}>
              <CardNumber
                css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              />
            </div>
          </div>
          <div css={[styles.formItem, styles.formRow]}>
            <div
              css={[flex.display.flex, flex.direction.column, flex.basis.b100]}
            >
              <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                Expiry
              </label>
              <div css={[inputWrapper]}>
                <CardExpiry
                  css={[
                    inputField,
                    inputTypesStyle['medium'],
                    inputFieldDefault,
                  ]}
                />
              </div>
            </div>
            <div
              css={[flex.display.flex, flex.direction.column, flex.basis.b100]}
            >
              <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                CVV
              </label>
              <div css={[inputWrapper]}>
                <CardCVV
                  css={[
                    inputField,
                    inputTypesStyle['medium'],
                    inputFieldDefault,
                  ]}
                />
              </div>
            </div>
          </div>
        </CardComponent>
      </>
    );
  },
);
