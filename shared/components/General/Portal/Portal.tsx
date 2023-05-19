import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children?: ReactNode;
  wrapperId?: string;
};
export function Portal({ children, wrapperId = 'modal' }: Props) {
  const [wrapper, setWrapper] = useState<Element | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);

    let created = false;
    if (!element) {
      created = true;
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', wrapperId);
      document.body.appendChild(wrapper);
      element = wrapper;
    }

    setWrapper(element);

    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapper === null) return null;

  return createPortal(children, wrapper);
}
