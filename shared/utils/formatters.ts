import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const plain = (value: number) => value;

const formatDate = (timestamp: number | Date): string => {
  let date = null;

  if (typeof timestamp === 'number') {
    date = new Date(timestamp * 1000);
  } else {
    date = timestamp;
  }
  return format(date, 'P', { locale: enUS });
};

const formatBytes = (bytes: number) => {
  const gb = bytes / Math.pow(1024, 3);
  if (gb < 1024) return `${gb.toFixed(0)} GB`;

  const tb = gb / 1024;
  return `${tb.toFixed(0)} TB`;
};

const formatCurrency = (number: number) =>
  Number(number / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const formatters = {
  plain,
  formatBytes,
  formatDate,
  formatCurrency,
};
