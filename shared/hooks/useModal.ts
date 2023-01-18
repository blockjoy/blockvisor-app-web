import { useMemo } from 'react';

export function useModal() {
  const classList = useMemo(
    () => document.getElementsByTagName('html')[0].classList,
    [],
  );

  const openModal = () => {
    classList.add('scroll-locked');
  };

  const closeModal = () => {
    classList.remove('scroll-locked');
  };
  return { openModal, closeModal };
}
