import Graphic from '@public/assets/graphics/art-1.svg';
import anime from 'animejs';
import { useEffect } from 'react';
import { styles } from './AnimatedGraphic.styles';

type Props = {
  id?: string;
  loopingAnimation?: boolean;
  rotationAnimation?: boolean;
};
export function AnimatedGraphic({
  id = 'js-dashboard-graphic',
  loopingAnimation = true,
  rotationAnimation = true,
}: Props) {
  useEffect(() => {
    loopingAnimation &&
      anime({
        targets: `#${id} > g:not(.star)`,
        rotateY: function (_: any, i: number) {
          return i % 2 === 0 ? [0, 180] : [0, 90];
        },
        opacity: function (_: any, i: number) {
          return i % 2 === 0 ? 1 : [1, 0];
        },
        loop: true,
        direction: 'alternate',
        delay: (_, i) => 5000 + 150 * (i + 1),
        duration: 2500,
      });

    rotationAnimation &&
      anime({
        targets: `#${id} > .star`,
        rotateZ: function (_: any, i: number) {
          return i % 2 === 0 ? [0, 90] : [0, -90];
        },
        loop: true,
        easing: 'linear',
        duration: 1500,
      });
  }, []);

  return (
    <figure css={[styles.figure]}>
      <Graphic id={id} />
    </figure>
  );
}
