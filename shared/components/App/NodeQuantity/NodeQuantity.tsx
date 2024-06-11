import { ChangeEvent } from 'react';
import { FormError } from '@shared/components';
import { styles } from './NodeQuantity.styles';

type Props = {
  isValid?: boolean;
  quantity: number;
  onChange: (quantity: number | null) => void;
};

export const NodeQuantity = ({ isValid, quantity, onChange }: Props) => {
  const handleTextboxChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, validity } = e.target;
    if (validity.valid) {
      if (value === '') {
        onChange(null);
      } else if (+value <= 50) {
        onChange(+value);
      }
    }
  };

  const handleSliderChanged = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(+e.target.value);

  return (
    <div css={styles.outerWrapper}>
      <div css={styles.wrapper}>
        <input
          css={[styles.textbox, !isValid && styles.textboxError]}
          type="tel"
          pattern="[0-9]*"
          value={quantity}
          placeholder="0"
          onInput={handleTextboxChanged}
        />
        <input
          css={styles.slider}
          type="range"
          min="1"
          max="50"
          value={quantity === null ? '1' : quantity}
          onInput={handleSliderChanged}
          className="slider"
        />
      </div>
      <FormError isVisible={!isValid}>
        Quantity is more than available IP's on host
      </FormError>
    </div>
  );
};
