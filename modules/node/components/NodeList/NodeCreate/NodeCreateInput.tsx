import { styles } from './NodeCreateInput.styles';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import IconClose from '@public/assets/icons/close-12.svg';
import { BlockchainIcon } from '@shared/components';
import { ChangeEvent, FC } from 'react';

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
  return (
    <div css={styles.inputWrapper}>
      {/* <span css={styles.blockchainIcon}>
        <BlockchainIcon />
      </span> */}
      <input
        placeholder="Launch a Node"
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
