import { nodeAtoms } from '@modules/node';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

export function useModal() {
  const [isActive, setIsActive] = useRecoilState(nodeAtoms.nodeWizardActive);
  const classList = useMemo(
    () => document.getElementsByTagName('html')[0].classList,
    [],
  );

  const openModal = () => {
    classList.add('scroll-locked');
    setIsActive(true);
  };

  const closeModal = () => {
    classList.remove('scroll-locked');
    setIsActive(false);
  };
  return { isActive, openModal, closeModal };
}
