import {
  BillingAmount,
  Currency,
  Period,
} from '@modules/grpc/library/blockjoy/common/v1/currency';
import { formatters } from '@shared/utils/formatters';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { styles } from './AdminListEditCost.styles';

type Props = {
  id: string;
  defaultValue?: number;
  onUpdate: (id: string, cost: BillingAmount) => Promise<void>;
};

export const AdminListEditCost = ({ id, defaultValue, onUpdate }: Props) => {
  const [value, setValue] = useState<string>(
    !defaultValue ? '' : formatters.formatCurrency(+defaultValue),
  );

  const [placeholder, setPlaceholder] = useState('');

  const [isValid, setIsValid] = useState(true);

  const handleKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const amountMinorUnits =
        parseFloat(value.replaceAll('$', '').replaceAll(',', '')) * 100;

      try {
        await onUpdate(id, {
          period: Period.PERIOD_MONTHLY,
          amount: {
            currency: Currency.CURRENCY_USD,
            amountMinorUnits,
          },
        });
        setValue(formatters.formatCurrency(amountMinorUnits));
        toast.success('Node Updated');
      } catch (err) {
        setValue(formatters.formatCurrency(amountMinorUnits));
        toast.error('Error Updating');
      }
    }
  };

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    setIsValid(!isNaN(+e.target.value));
    setValue(e.target.value);
  };

  const handleFocus = () => setPlaceholder('Add cost');

  const handleBlur = () => {
    if (!value && defaultValue) {
      setValue(formatters.formatCurrency(+defaultValue!));
    }
    setPlaceholder('');
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => e.stopPropagation();

  return (
    <input
      css={[styles.input, !isValid && styles.inputInvalid]}
      type="text"
      value={value}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      onInput={handleInput}
    />
  );
};
