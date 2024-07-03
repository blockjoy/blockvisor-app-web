import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { css } from '@emotion/react';
import { billingAtoms, CARD_ELEMENT_OPTIONS } from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import {
  inputLabel,
  inputLabelSize,
} from '@shared/components/Forms/ReactHookForm/Input/InputLabel.styles';
import { typo } from 'styles/utils.typography.styles';
import {
  inputField,
  inputFieldDefault,
  inputTypesStyle,
} from '@shared/components/Forms/ReactHookForm/Input/Input.styles';
import { flex } from 'styles/utils.flex.styles';
import { form as formStyles } from 'styles/form.styles';

const focused = css`
  outline: 0;
  border-color: var(--color-text-5-o30);
  color: var(--color-text-5);
`;

export const CardComponent = () => {
  const [focusedElement, setFocusedElement] =
    useState<'number' | 'expiry' | 'cvc' | null>(null);

  const [isValidNumber, setIsValidNumber] = useState(false);
  const [isValidCVC, setIsValidCVC] = useState(false);
  const [isValidExpiry, setIsValidExpiry] = useState(false);

  const setIsValidCard = useSetRecoilState(billingAtoms.isValidCard);

  useEffect(() => {
    setIsValidCard(isValidNumber && isValidCVC && isValidExpiry);
  }, [isValidNumber, isValidCVC, isValidExpiry]);

  return (
    <>
      <div css={[spacing.bottom.medium]}>
        <label css={[inputLabel, inputLabelSize.small, typo.base]}>
          Card number
        </label>
        <CardNumberElement
          options={{ ...CARD_ELEMENT_OPTIONS, showIcon: true }}
          css={[
            inputField,
            inputTypesStyle['medium'],
            inputFieldDefault,
            focusedElement === 'number' && focused,
          ]}
          onFocus={() => setFocusedElement('number')}
          onBlur={() => setFocusedElement(null)}
          onChange={(value) => setIsValidNumber(value.complete)}
        />
      </div>
      <div css={[spacing.bottom.medium, formStyles.row]}>
        <div css={[flex.display.flex, flex.direction.column, flex.basis.b100]}>
          <label css={[inputLabel, inputLabelSize.small, typo.base]}>
            Expiration date
          </label>
          <CardExpiryElement
            options={CARD_ELEMENT_OPTIONS}
            css={[
              inputField,
              inputTypesStyle['medium'],
              inputFieldDefault,
              focusedElement === 'expiry' && focused,
            ]}
            onFocus={() => setFocusedElement('expiry')}
            onBlur={() => setFocusedElement(null)}
            onChange={(value) => setIsValidExpiry(value.complete)}
          />
        </div>
        <div css={[flex.display.flex, flex.direction.column, flex.basis.b100]}>
          <label css={[inputLabel, inputLabelSize.small, typo.base]}>CVC</label>
          <CardCvcElement
            options={CARD_ELEMENT_OPTIONS}
            css={[
              inputField,
              inputTypesStyle['medium'],
              inputFieldDefault,
              focusedElement === 'cvc' && focused,
            ]}
            onFocus={() => setFocusedElement('cvc')}
            onBlur={() => setFocusedElement(null)}
            onChange={(value) => setIsValidCVC(value.complete)}
          />
        </div>
      </div>
    </>
  );
};
