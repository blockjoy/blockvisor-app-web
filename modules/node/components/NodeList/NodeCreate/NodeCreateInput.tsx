import { styles } from './NodeCreateInput.styles';
import IconBuild from '@public/assets/icons/build-16.svg';
import IconClose from '@public/assets/icons/close-12.svg';
import { BlockchainIcon } from '@shared/components';
import { ChangeEvent, FC } from 'react';

type Props = {
  onInputChanged: (args0: ChangeEvent<HTMLInputElement>) => void;
  onInputClicked: VoidFunction;
  onCloseClicked: VoidFunction;
  onStartClicked: VoidFunction;
  inputValue: string;
  isBlockchainsOpen: boolean;
  isFormOpen: boolean;
};

export const NodeCreateInput: FC<Props> = ({
  onInputChanged,
  onInputClicked,
  onCloseClicked,
  onStartClicked,
  isBlockchainsOpen,
  isFormOpen,
  inputValue,
}) => {
  return (
    <div css={styles.inputWrapper}>
      {/* <span css={styles.blockchainIcon}>
        <BlockchainIcon />
      </span> */}
      <input
        placeholder="Select Blockchain"
        onClick={onInputClicked}
        onChange={onInputChanged}
        spellCheck={false}
        value={inputValue}
        css={[
          styles.blockchainInput,
          (isBlockchainsOpen || isFormOpen) && styles.blockchainInputOpen,
        ]}
      />

      {isBlockchainsOpen ? (
        <button onClick={onCloseClicked} css={styles.closeButton}>
          <IconClose />
        </button>
      ) : (
        <button
          disabled={!inputValue}
          onClick={onStartClicked}
          css={styles.createButton}
        >
          <IconBuild />
        </button>
      )}
    </div>
  );
};
