import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
  Amount,
  Currency,
} from '@modules/grpc/library/blockjoy/common/v1/currency';

type FormatAmountType = 'amount';
type FormatDateType = 'date' | 'time';
type FormatSizeType = 'bytes';

export const CURRENCIES = {
  [Currency.CURRENCY_UNSPECIFIED]: '',
  [Currency.CURRENCY_USD]: '$',
  [Currency.UNRECOGNIZED]: 'Unknown',
};

const formatAmount = (amount: Amount, type?: FormatAmountType): string => {
  const formattedAmount = amount?.value?.toFixed(2);

  switch (type) {
    case 'amount':
      return `${CURRENCIES[amount.currency]}${formattedAmount}`;
    default:
      return formattedAmount;
  }
};

const formatCurrency = (number: number) =>
  Number(number / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const formatDate = (date: Date, type?: FormatDateType): string => {
  let formattedDate: Intl.DateTimeFormat;

  switch (type) {
    case 'date':
      formattedDate = new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'narrow',
        day: 'numeric',
      });
      break;
    case 'time':
      formattedDate = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
      break;
    default:
      formattedDate = new Intl.DateTimeFormat();
  }

  return formattedDate.format(date);
};

const formatSize = (value: number, type?: FormatSizeType): string => {
  switch (type) {
    case 'bytes': {
      const gb = value / Math.pow(1024, 3);
      if (gb < 1024) return `${gb.toFixed(0)} GB`;

      const tb = gb / 1024;
      return `${tb.toFixed(0)} TB`;
    }
    default:
      return value.toString();
  }
};

const formatTimestamp = (timestamp: number | Date): string => {
  let date = null;

  if (typeof timestamp === 'number') {
    date = new Date(timestamp * 1000);
  } else {
    date = timestamp;
  }
  return format(date, 'P', { locale: enUS });
};

export const formatters = {
  formatAmount,
  formatCurrency,
  formatDate,
  formatSize,
  formatTimestamp,
};
