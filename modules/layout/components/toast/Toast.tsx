import { useRecoilValue, useRecoilState } from 'recoil';
import { ToastItem } from './useToast';
import { toastAtoms } from './atoms';
import { styles } from './Toast.styles';
import { FC, useEffect } from 'react';

const ToastListItem: FC<ToastItem> = ({ id, content, isSuccess }) => {
  const [toastList, setToastList] = useRecoilState(toastAtoms.toastListAtom);

  useEffect(() => {
    setTimeout(() => {
      // console.log('timeout id', id);
      // console.log('timeout toastList', toastList);

      const newToastList = toastList.filter((t) => t.id !== id);
      setToastList(newToastList);
    }, 3000);
  }, []);

  return (
    <div
      css={[styles.toast, isSuccess ? styles.toastSuccess : styles.toastError]}
    >
      {content}
    </div>
  );
};

export const Toast = () => {
  const toastList = useRecoilValue(toastAtoms.toastListAtom);

  // console.log('toastList', toastList);

  return (
    <div css={styles.wrapper}>
      {toastList.map((t: ToastItem) => (
        <ToastListItem
          key={t.id}
          id={t.id}
          type={t.type}
          content={t.content}
          isSuccess={t.isSuccess}
        />
      ))}
    </div>
  );
};
