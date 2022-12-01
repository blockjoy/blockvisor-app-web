import { styles } from './NodeCreate.styles';

import { ChangeEvent, useEffect, useState } from 'react';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';

import { NodeCreateForm } from './NodeCreateForm';
import { NodeCreateInput } from './NodeCreateInput';
import { NodeCreateBlockchain } from './NodeCreateBlockchain';

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

  const handleOverlayClicked = () => {
    setIsBlockchainsOpen(false);
    setIsFormOpen(false);
  };

  const handleCloseClicked = () => {
    setIsBlockchainsOpen(false);
    setInputValue('');

    if (isFormOpen) {
      setIsBlockchainsOpen(true);
      setIsFormOpen(false);
    }
  };

  const handleInputClicked = () => {
    setIsBlockchainsOpen(true);
  };

  const handleInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isBlockchainsOpen) {
      setIsBlockchainsOpen(true);
    }
    setInputValue(event.target.value);
  };

  const handleBlockchainClicked = (id: string, name: string) => {
    localStorage.setItem(
      'nodeCreateBlockchain',
      JSON.stringify({ label: name, value: id }),
    );
    setIsBlockchainsOpen(false);
    setInputValue(name);
    setBlockchain({
      id: id,
      name: name,
    });
    setIsFormOpen(true);
  };

  const handleStartClicked = () => {
    setIsBlockchainsOpen(false);
    setIsFormOpen(true);
  };

  useEffect(() => {
    getBlockchains();

    if (localStorage.getItem('nodeCreateBlockchain')) {
      const localStorageBlockchain = JSON.parse(
        localStorage.getItem('nodeCreateBlockchain')!,
      );

      if (localStorageBlockchain.label) {
        setInputValue(localStorageBlockchain.label);
        setBlockchain({
          id: localStorageBlockchain.value,
          name: localStorageBlockchain.label,
        });
      }
    }
  }, []);

  return (
    <>
      <div
        onClick={handleOverlayClicked}
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
