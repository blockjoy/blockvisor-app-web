import { styles } from './NodeCreateInput.styles';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import IconClose from '@public/assets/icons/close-12.svg';
import { BlockchainIcon } from '@shared/components';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

type Props = {
  onInputChanged: (args0: ChangeEvent<HTMLInputElement>) => void;
  onInputMouseEnter: VoidFunction;
  onInputMouseLeave: VoidFunction;
  inputValue: string;
  isBlockchainsOpen: boolean;
};

export const NodeCreateInput: FC<Props> = ({
  onInputChanged,
  onInputMouseEnter,
  onInputMouseLeave,
  isBlockchainsOpen,
  inputValue,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (isBlockchainsOpen && inputRef && inputRef?.current) {
      inputRef.current.focus();
      setIsFocused(true);
    } else {
      inputRef.current?.blur();
      setIsFocused(false);
    }
  }, [isBlockchainsOpen]);

  return (
    <div css={styles.inputWrapper}>
      {/* <span css={styles.blockchainIcon}>
        <BlockchainIcon />
      </span> */}
      <input
        ref={inputRef}
        placeholder={isFocused ? 'Find a Protocol' : 'Launch a Node'}
        onMouseEnter={onInputMouseEnter}
        onMouseLeave={onInputMouseLeave}
        onChange={onInputChanged}
        spellCheck={false}
        value={inputValue}
        css={[
          styles.blockchainInput,
          isBlockchainsOpen && styles.blockchainInputOpen,
        ]}
      />

      {/* {isBlockchainsOpen ? (
        <button onClick={onCloseClicked} css={styles.closeButton}>
          <IconClose />
        </button>
      ) : ( */}
      <span css={styles.createButton}>
        <IconRocket />
      </span>
      {/* )} */}
    </div>
  );
};
