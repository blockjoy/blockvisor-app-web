import { KeyboardEventHandler, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { display } from 'styles/utils.display.styles';
import { styles } from './GroupEdit.styles';

type Props = {
  value?: string;
  handleConfirm: VoidFunction;
};

export function GroupEdit({ value, handleConfirm }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  useClickOutside<HTMLInputElement>(inputRef, handleConfirm);

  const handleChange: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!['Enter'].includes(e.key)) {
      return;
    }

    handleConfirm();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div css={[styles.base]}>
      <span css={[styles.icon]}>
        <Image
          src="/assets/icons/folder-12.svg"
          layout="fixed"
          width={12}
          height={12}
        />
      </span>
      <label htmlFor="new-group" css={[display.visuallyHidden]}>
        Add new group
      </label>
      <input
        value={value}
        onKeyDown={handleChange}
        ref={inputRef}
        id="new-group"
        type="text"
        css={[styles.input]}
        placeholder="Group name"
      />
    </div>
  );
}
