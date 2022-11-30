import { styles } from './NodeCreate.styles';

import { ChangeEvent, useEffect, useState } from 'react';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';

import { NodeCreateForm } from './NodeCreateForm';
import { NodeCreateInput } from './NodeCreateInput';
import { NodeCreateBlockchain } from './NodeCreateBlockchain';
import { useRecoilState } from 'recoil';
import { nodeWizardSelectors } from '@modules/node/store/nodeWizard';

type Blockchain = {
  id: string;
  name: string;
};

export const NodeCreate = () => {
  const { getBlockchains, blockchains, loading } = useGetBlockchains();

  const [inputValue, setInputValue] = useState<string>('');

  const [isBlockchainsOpen, setIsBlockchainsOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const [blockchain, setBlockchain] = useState<Blockchain>({
    id: '',
    name: '',
  });

  const handleCloseClicked = () => {
    setInputValue('');
    setIsBlockchainsOpen(false);

    if (isFormOpen) {
      setIsBlockchainsOpen(true);
      setIsFormOpen(false);
    }
  };

  const handleInputClicked = () => {
    setIsBlockchainsOpen(true);
  };

  const handleInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('e', event);
    if (!isBlockchainsOpen) {
      setIsBlockchainsOpen(true);
    }
    setInputValue(event.target.value);
  };

  const handleBlockchainClicked = (id: string, name: string) => {
    setIsBlockchainsOpen(false);
    setInputValue(name);
    setBlockchain({
      id: id,
      name: name,
    });
    setIsFormOpen(true);
  };

  const handleStartClicked = () => {
    console.log('create');
    setIsBlockchainsOpen(false);
    setIsFormOpen(true);
  };

  useEffect(() => {
    getBlockchains();
  }, []);

  return (
    <>
      <div
        onClick={handleCloseClicked}
        css={[
          styles.overlay,
          isBlockchainsOpen || isFormOpen ? styles.overlayVisible : null,
        ]}
      />
      <div css={styles.wrapper}>
        <NodeCreateInput
          inputValue={inputValue}
          isFormOpen={isFormOpen}
          isBlockchainsOpen={isBlockchainsOpen}
          onInputChanged={handleInputChanged}
          onInputClicked={handleInputClicked}
          onCloseClicked={handleCloseClicked}
          onStartClicked={handleStartClicked}
        />
        {isFormOpen && (
          <NodeCreateForm
            onCloseClicked={handleCloseClicked}
            blockchain={blockchain}
          />
        )}
        {isBlockchainsOpen && (
          <NodeCreateBlockchain
            inputValue={inputValue}
            onBlockchainClicked={handleBlockchainClicked}
          />
        )}
      </div>
    </>
  );
};
