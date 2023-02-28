import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { styles } from './EditableTitle.styles';
import IconPencil from '@public/assets/icons/pencil-12.svg';
import IconClose from '@public/assets/icons/close-12.svg';
import { Button } from '../Button/Button';
import { css } from '@emotion/react';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import { escapeHtml } from '@shared/utils/escapeHtml';

type Props = {
  isLoading?: boolean;
  isSaving?: boolean;
  initialValue: string;
  onSaveClicked: (value: string) => void;
  onEditClicked: VoidFunction;
  canUpdate: boolean;
};

export const EditableTitle: FC<Props> = ({
  isLoading,
  isSaving,
  initialValue,
  onSaveClicked,
  onEditClicked,
  canUpdate,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [characterCount, setCharacterCount] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = useRef<string>('');

  const handleEditToggled = () => {
    onEditClicked();

    if (isEditMode && inputRef.current) {
      inputRef.current.value = initialValue;
      inputValue.current = initialValue;
      setCharacterCount(escapeHtml(initialValue)?.length + 1);
    }

    setIsEditMode(!isEditMode);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    inputValue.current = value;
    setCharacterCount(escapeHtml(value)?.length + 1);
    setIsValid(value?.length > 0);
    setIsDirty(escapeHtml(value) !== escapeHtml(initialValue));
  };

  const handleSaveClicked = () => {
    onSaveClicked(inputValue.current);
  };

  useEffect(() => {
    inputValue.current = initialValue;
    setCharacterCount(escapeHtml(initialValue)?.length + 1);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      inputRef?.current?.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    if (isSaving === false) {
      setIsEditMode(false);
    }
  }, [isSaving]);

  return (
    <div css={styles.wrapper}>
      {isEditMode ? (
        <input
          autoComplete={'off'}
          spellCheck={false}
          ref={inputRef}
          disabled={!isEditMode}
          placeholder=""
          size={characterCount}
          css={[styles.input, isEditMode && styles.inputEditable]}
          defaultValue={escapeHtml(initialValue)}
          onChange={handleChange}
        />
      ) : (
        <span css={styles.span}>{escapeHtml(initialValue)}</span>
      )}

      {canUpdate && !isLoading && initialValue?.length && (
        <Button
          style="icon"
          onClick={handleEditToggled}
          tooltip={isEditMode ? 'Cancel' : 'Edit Name'}
        >
          <span css={styles.iconWrapper}>
            <SvgIcon size="24px">
              {isEditMode ? <IconClose /> : <IconPencil />}
            </SvgIcon>
          </span>
        </Button>
      )}

      {isEditMode && canUpdate && (
        <>
          <Button
            disabled={isSaving || !isValid || !isDirty}
            loading={isSaving !== null}
            onClick={handleSaveClicked}
            size="small"
            style="secondary"
            customCss={[
              css`
                min-width: 84px;
              `,
            ]}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};
