import { useRef, useState } from 'react';
import {
  CardComponent,
  CardNumber,
  CardExpiry,
  CardCVV,
} from '@chargebee/chargebee-js-react-wrapper';
import { Button } from '@shared/index';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './CreditCard.styles';
import {
  inputField,
  inputFieldDefault,
  inputTypesStyle,
  inputWrapper,
} from '@shared/components/Input/Input.styles';
import {
  inputLabel,
  inputLabelSize,
} from '@shared/components/Input/InputLabel.styles';
import { flex } from 'styles/utils.flex.styles';
import { usePayment } from '@modules/billing/hooks/usePayment';
import { usePaymentMethods } from '@modules/billing/hooks/usePaymentMethods';

// import './Example4.css';

const CHARGEBEE_OPTIONS = {
  // Custom classes - applied on container elements based on field's state
  classes: {
    focus: 'focus',
    invalid: 'invalid',
    empty: 'empty',
    complete: 'complete',
  },

  style: {
    // Styles for default field state
    base: {
      color: '#f7faf5',
      fontWeight: '500',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#f7faf5',
      },

      '::placeholder': {
        color: '#757575',
      },

      ':focus::placeholder': {
        color: '#757575',
      },
    },

    // Styles for invalid field state
    invalid: {
      color: '#e41029',

      ':focus': {
        color: '#e44d5f',
      },
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  },

  // locale
  locale: 'en',

  // Custom placeholders
  placeholder: {
    number: '4111 1111 1111 1111',
    expiry: 'MM / YY',
    cvv: 'CVV',
  },
};

export type CreditCardProps = {
  handleCancel: VoidFunction;
};

export const CreditCard = ({ handleCancel }: CreditCardProps) => {
  const cardRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    intent_id: '',
    error: '',
    firstName: '',
  });

  const { createIntent } = usePayment();
  const { createCard } = usePaymentMethods();

  const onSubmit = async () => {
    setLoading(true);

    const intent: any = await createIntent();

    cardRef.current
      .authorizeWith3ds(intent)
      .then((data: any) => {
        console.log('authorizeWith3ds Data', data);
        createCard(data.id);
      })
      .catch((error: any) => {
        console.log('authorizeWith3ds Error', error);
      });
  };

  const handleChange = (e: any) => {
    // TODO: include Card Holder name to Payment Source
    e.preventDefault();
  };

  const { style, classes, locale, placeholder } = CHARGEBEE_OPTIONS;

  return (
    <div css={styles.wrapper}>
      <div>
        <div css={[styles.formItem]}>
          <label css={[inputLabel, inputLabelSize.small, typo.base]}>
            Card Holder
          </label>
          <div css={[inputWrapper]}>
            <input
              name="firstName"
              css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              type="text"
              placeholder="John Doe"
              value={state.firstName}
              onChange={handleChange}
            />
          </div>
        </div>

        <CardComponent
          ref={cardRef}
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
                CVC
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
      </div>

      <div css={styles.buttons}>
        <Button
          loading={loading}
          style="secondary"
          size="small"
          type="submit"
          tabIndex={5}
          onClick={onSubmit}
        >
          Add
        </Button>
        <Button
          onClick={handleCancel}
          style="outline"
          size="small"
          tabIndex={6}
        >
          Cancel
        </Button>
      </div>

      {state.intent_id && <div className="intent_id">{state.intent_id}</div>}
    </div>
  );
};
