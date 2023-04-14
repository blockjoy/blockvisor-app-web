import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toastAtoms } from './atoms';
import { v4 as uuidv4 } from 'uuid';

type ToastParams = {
  type?: string;
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

  const latestToastList = useRef<ToastItem[]>(toastList);

  const createToast = (t: ToastItem) => {
    const toastListCopy = [...latestToastList.current];
    toastListCopy.push({
      ...t,
      id: uuidv4(),
    });
    setToastList(toastListCopy);
  };

  const success = ({ type = 'node', content }: ToastParams) => {
    createToast({
      type,
      content,
      isSuccess: true,
    });
  };

  const error = ({ type = 'node', content }: ToastParams) => {
    createToast({
      type,
      content,
    });
  };

  const mqtt = ({ type = 'node', content }: ToastParams) => {
    createToast({
      type,
      content,
      isSuccess: true,
      isMqtt: true,
    });
  };

  useEffect(() => {
    latestToastList.current = toastList;
  }, [toastList?.length]);

  return {
    success,
    error,
    mqtt,
    toastList,
  };
};
