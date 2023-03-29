import { atom } from 'recoil';
import { ToastItem } from './useToast';

const toastListAtom = atom<ToastItem[]>({
  key: 'toastList',
  default: [],
});

export const toastAtoms = {
  toastListAtom,
};
