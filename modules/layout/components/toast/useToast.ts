import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import { toastAtoms } from './atoms';
import { v4 as uuidv4 } from 'uuid';

type ToastParams = {
  type: string;
  content: string | ReactNode;
};

export type ToastItem = {
  id?: string;
  type: string;
  content: string | ReactNode;
  isSuccess?: boolean;
  isMqtt?: boolean;
};

export const useToast = () => {
  const [toastList, setToastList] = useRecoilState(toastAtoms.toastListAtom);

  const createToast = (t: ToastItem) => {
    const toastListCopy = [...toastList];
    toastListCopy.push({
      ...t,
      id: uuidv4(),
    });
    setToastList(toastListCopy);
  };

  const success = ({ type, content }: ToastParams) => {
    createToast({
      type,
      content,
      isSuccess: true,
    });
  };

  const error = ({ type, content }: ToastParams) => {
    createToast({
      type,
      content,
    });
  };

  const mqtt = ({ type, content }: ToastParams) => {
    createToast({
      type,
      content,
      isSuccess: true,
      isMqtt: true,
    });
  };

  return {
    success,
    error,
    mqtt,
  };
};
