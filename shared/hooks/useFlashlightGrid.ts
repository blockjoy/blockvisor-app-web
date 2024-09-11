import { RefObject, useEffect } from 'react';

export const useFlashlightGrid = <T extends {}>(
  items?: T,
  listRef?: RefObject<HTMLUListElement>,
  cardsRef?: RefObject<HTMLLIElement[]>,
) => {
  useEffect(() => {
    const wrapper = listRef?.current;
    if (!wrapper) return;

    const handleMouseMove = (event: MouseEvent) => {
      cardsRef?.current?.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty('--xPos', `${x}px`);
        card.style.setProperty('--yPos', `${y}px`);
      });
    };

    if (wrapper) {
      wrapper.addEventListener('mousemove', handleMouseMove);
      return () => wrapper.removeEventListener('mousemove', handleMouseMove);
    }
  }, [items]);
};
