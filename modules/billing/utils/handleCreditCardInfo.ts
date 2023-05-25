export const handleCreditCardInfo = (cardNumber: string) => {
  const cardNumberValue = cardNumber.replace(/ /g, '');

  let cardType;
  switch (true) {
    case /^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumberValue):
      cardType = 'Visa';
      break;
    case /^5[1-5][0-9]{14}$/.test(cardNumberValue):
      cardType = 'Mastercard';
      break;
    case /^3[47][0-9]{13}$/.test(cardNumberValue):
      cardType = 'American Express';
      break;
    case /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cardNumberValue):
      cardType = 'Discover';
      break;
    case /^(?:2131|1800|35\d{3})\d{11}$/.test(cardNumberValue):
      cardType = 'JCB';
      break;
    case /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cardNumberValue):
      cardType = 'Diners Club';
      break;
    case /^(62|88)\d{14,17}$/.test(cardNumberValue):
      cardType = 'UnionPay';
      break;
    default:
      cardType = 'Credit Card';
      break;
  }

  const cardEnding = cardNumberValue.slice(-4);

  return { cardType, cardEnding };
};
