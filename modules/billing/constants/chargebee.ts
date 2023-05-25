export const CHARGEBEE_OPTIONS = {
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
