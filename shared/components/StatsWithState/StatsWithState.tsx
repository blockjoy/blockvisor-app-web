import anime from 'animejs';
import { useEffect } from 'react';
import { FC } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './StatsWithState.styles';

interface Props {
  state: 'active' | 'inactive';
  value: string | number;
  id: string;
  changeOnZero: boolean;
}

export const StatsWithState: FC<Props> = ({
  state = 'default',
  value,
  id,
  changeOnZero = true,
}) => {
  const isNumericalValue = typeof value === 'number';
  const initialValue = isNumericalValue ? 0 : value;

  useEffect(() => {
    if (!isNumericalValue) return;

    anime({
      targets: `#${id} > .stats__value`,
      innerText: [0, value],
      delay: 100,
      duration: 800,
      round: true,
      easing: 'linear',
    });
  });

  const classes = [styles.base, styles[state]];

  if (changeOnZero) {
    classes.push(styles['change-on-zero']);
  }

  return (
    <div id={id} css={classes}>
      <p css={[typo.xxlarge, styles.value]}>{initialValue}</p>
      <p css={[styles.description, typo.microlabel]}>
        <slot />
      </p>
    </div>
  );
};
