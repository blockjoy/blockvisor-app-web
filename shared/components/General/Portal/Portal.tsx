import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  wrapperId?: string;
  inContainer?: boolean;
} & React.PropsWithChildren;

export function Portal({
  children,
  wrapperId = 'modal',
  inContainer = false,
}: Props) {
  const [wrapper, setWrapper] = useState<Element | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);

    let created = false;
    if (!element) {
      created = true;
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', wrapperId);
      const container = inContainer
        ? document.querySelector('.portal-container')
        : document.body;
      container?.appendChild(wrapper);
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
