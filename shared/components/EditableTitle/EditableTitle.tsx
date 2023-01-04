import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { styles } from './EditableTitle.styles';
import IconPencil from '@public/assets/icons/pencil-12.svg';
import IconClose from '@public/assets/icons/close-12.svg';
import { Button } from '../Button/Button';

type Props = {
  isSaving?: boolean;
  initialValue: string;
  onSaveClicked: (value: string) => void;
};

export const EditableTitle: FC<Props> = ({
  isSaving,
  initialValue,
  onSaveClicked,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [characterCount, setCharacterCount] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = useRef<string>('');

  const handleEditToggled = () => {
    if (isEditMode && inputRef.current) {
      inputRef.current.value = initialValue;
      inputValue.current = initialValue;
      setCharacterCount(initialValue?.length);
    }

    setIsEditMode(!isEditMode);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputValue.current = e.target.value;
    setCharacterCount(e.target.value?.length);
  };

  const handleSaveClicked = () => {
    setIsEditMode(false);
    onSaveClicked(inputValue.current);
  };

  useEffect(() => {
    inputValue.current = initialValue;
    setCharacterCount(initialValue?.length);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      inputRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div css={styles.wrapper}>
      <input
        autoComplete={'off'}
        spellCheck={false}
        ref={inputRef}
        disabled={!isEditMode}
        placeholder="Organization Name"
        size={characterCount}
        css={[styles.input, isEditMode && styles.inputEditable]}
        defaultValue={initialValue}
        onChange={handleChange}
      />
      <button onClick={handleEditToggled} css={styles.editToggle}>
        {isEditMode ? <IconClose /> : <IconPencil />}
      </button>

      {isEditMode && (
        <>
          <Button
            disabled={isSaving}
            loading={isSaving}
            onClick={handleSaveClicked}
            size="medium"
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};
