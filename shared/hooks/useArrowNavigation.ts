import { useEffect, useRef } from 'react';

export function useArrowNavigation<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);

  const handleKeydown: EventListener = (e) => {
    if (!e) {
      return;
    }
    // prevent scrollbar from moving when pressing keys
    e.preventDefault();

    if (e instanceof KeyboardEvent && e.currentTarget instanceof Element) {
      const { key, currentTarget } = e;
      if (key === 'ArrowDown' || key === 'Tab') {
        focusNext(currentTarget);
        return;
      }

      if (key === 'ArrowUp' || key === 'Tab') {
        focusPrevious(currentTarget);
        return;
      }
    }
  };

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const items = elementRef.current.childNodes;

    items.forEach((i) => i.addEventListener('keydown', handleKeydown));

    return () => {
      items.forEach((i) => i.removeEventListener('keydown', handleKeydown));
    };
  }, []);

  return { elementRef };
}

function focusNext(target: Element) {
  const nextSibling = target.nextSibling;

  if (nextSibling) {
    console.log('next', nextSibling.firstChild);
    const nextTarget = nextSibling as HTMLElement;
    nextTarget.focus();
  }
}

function focusPrevious(focusElement: Element) {
  const previousSibling = focusElement.previousSibling;

  if (previousSibling) {
    const previousTarget = previousSibling as HTMLElement;
    previousTarget.focus();
  }
}
