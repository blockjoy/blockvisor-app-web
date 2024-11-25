import { CSSProperties } from 'react';

export const getItemStyle = (
  isDragged: boolean,
  willEndDragging: boolean,
  shiftY: number,
): CSSProperties => {
  const style: CSSProperties = {
    transition: `all .3s ease`,
  };
  if (isDragged) {
    style.zIndex = 1;
    if (!willEndDragging) {
      style.transition = undefined;
    }
  } else {
    style.transform = `translateY(${shiftY}px)`;
  }
  return style;
};
