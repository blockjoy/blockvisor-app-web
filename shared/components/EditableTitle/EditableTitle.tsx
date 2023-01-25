import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { styles } from './EditableTitle.styles';
import IconPencil from '@public/assets/icons/pencil-12.svg';
import IconClose from '@public/assets/icons/close-12.svg';
import { Button } from '../Button/Button';

type Props = {
  isSaving?: boolean;
  initialValue: string;
  onSaveClicked: (value: string) => void;
  canUpdate: boolean;
};

export const EditableTitle: FC<Props> = ({
  isSaving,
  initialValue,
  onSaveClicked,
  canUpdate
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [characterCount, setCharacterCount] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = useRef<string>('');

  const handleEditToggled = () => {
    if (isEditMode && inputRef.current) {
      inputRef.current.value = initialValue;
      inputValue.current = initialValue;
      setCharacterCount(initialValue?.length + 1);
    }

    setIsEditMode(!isEditMode);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    inputValue.current = value;
    setCharacterCount(value?.length + 1);
    setIsValid(value?.length > 0);
  };

  const handleSaveClicked = () => {
    setIsEditMode(false);
    onSaveClicked(inputValue.current);
  };

  useEffect(() => {
    inputValue.current = initialValue;
    setCharacterCount(initialValue?.length + 1);
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
        placeholder=""
        size={characterCount}
        css={[styles.input, isEditMode && styles.inputEditable]}
        defaultValue={initialValue}
        onChange={handleChange}
      />

      {canUpdate && (<Button
        style="icon"
        onClick={handleEditToggled}
        tooltip={isEditMode ? 'Cancel' : 'Edit Name'}
      >
        <span css={styles.iconWrapper}>
          {isEditMode ? <IconClose /> : <IconPencil />}
        </span>
      </Button>)}

      {isEditMode && canUpdate && (
        <>
          <Button
            disabled={isSaving || !isValid}
            loading={isSaving}
            onClick={handleSaveClicked}
            size="small"
            style="secondary"
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};
