import anime from 'animejs';
import { FC, useEffect } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './TitleWithValue.styles';

interface Props {
  id: string;
  value: number;
  title: string;
  unit: string;
}

const animeOptions = {
  delay: 100,
  duration: 800,
  round: 100,
};

export const TitleWithValue: FC<Props> = ({ id, value, title, unit }) => {
  const isNumericalValue = typeof value === 'number';

  const initialValue = isNumericalValue ? 0 : value;

  useEffect(() => {
    anime({
      targets: `#${id} .title-with-value__field`,
      innerText: [0, value],
      easing: 'linear',
      ...animeOptions,
    });
  }, []);

  return (
    <div id={id} css={styles.base}>
      <div css={[typo.uppercase, typo.microlabel, styles.title]}>{title}</div>
      <div css={styles.value}>
        <output css={[typo.xlarge]} className="title-with-value__field">
          {initialValue}
        </output>
        {unit && <small css={typo.label}>{unit}</small>}
      </div>
    </div>
  );
};
