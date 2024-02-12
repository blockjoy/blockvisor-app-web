import { useEffect, RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: VoidFunction,
  isActive: boolean = true,
) {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      isActive &&
      ref?.current &&
      !ref.current.contains(event.target as Node)
    ) {
      handler();
    }
  };
  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [ref, handler, isActive]);
}
