import { useEffect } from 'react';

export function useEscapeKey(handler: VoidFunction) {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);
}
