import { useEffect } from 'react';

interface UsePageVisibilityProps {
  onVisible?: VoidFunction;
  onHidden?: VoidFunction;
}

export const usePageVisibility = ({
  onVisible,
  onHidden,
}: UsePageVisibilityProps) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        onVisible?.();
      } else if (document.visibilityState === 'hidden') {
        onHidden?.();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onVisible, onHidden]);
};
