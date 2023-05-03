import { useRef, useState } from 'react';
import {
  CardComponent,
  CardNumber,
  CardExpiry,
  CardCVV,
  Provider,
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
import { toast } from 'react-toastify';

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
  const [error, setError] = useState<any>(null);
  const [state, setState] = useState<any>({
    intent_id: '',
    error: '',
    firstName: '',
  });

  const urlEncode = (data: any) => {
    var str = [];
    for (var p in data) {
      if (
        data.hasOwnProperty(p) &&
        !(data[p] == undefined || data[p] == null)
      ) {
        str.push(
          encodeURIComponent(p) +
            '=' +
            (data[p] ? encodeURIComponent(data[p]) : ''),
        );
      }
    }
    return str.join('&');
  };

  const createIntent = async () => {
    return fetch('/api/billing/payments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: urlEncode({
      //   amount: 500,
      //   currency_code: 'INR',
      //   payment_method_type: 'card',
      // }),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log('error', err);
        toast.error('Error while fetching payment intent');
      });
  };

  const authorizeWith3ds = async () => {
    setLoading(true);

    const intent = await createIntent();
    console.log('INTENT', intent);
    setLoading(false);
    return;
    const additionalData = {
      billingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '123123123',
        addressLine1: ' Aarti Chowk',
        addressLine2: 'Gurdev Nagar',
        addressLine3: '',
        city: 'Ludhiana',
        state: 'Punjab',
        stateCode: 'PB',
        countryCode: 'IN',
        zip: '141001',
      },
      email: 'a@ac.com',
      mandate: {
        requireMandate: true,
        description: 'mandate_description', // It could be plan name or plan id
      },
    };
    // Call authorizeWith3ds methods through  card component's ref
    cardRef.current
      .authorizeWith3ds(intent.payment_intent, additionalData)
      .then((data: any) => {
        setLoading(false);
        setState((prevState: any) => ({
          ...prevState,
          intent_id: data.id,
          error: '',
        }));
      })
      .catch((error: any) => {
        setLoading(false);
        setState((prevState: any) => ({
          ...prevState,
          intent_id: '',
          error: 'Problem while tokenizing your card details',
        }));
        toast.error('Problem while tokenizing your card details');
      });
  };

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
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
          onClick={authorizeWith3ds}
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
