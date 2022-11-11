import anime from 'animejs';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import { Input } from '@shared/components';
import { styles } from './BlockChainSelector.styles';
import { display } from 'styles/utils.display.styles';
import { BlockchainList } from '../BlockchainList/BlockchainList';
import { BlockchainSelectorFooter } from './BlockchainSelectorFooter';

type BlockchainForm = {
  blockchain: string;
};

export function BlockchainSelector() {
  const animateEntry = () =>
    anime({
      targets: `#js-auth-layout`,
      opacity: [0, 1],
      translateY: [8, 0],
      easing: 'easeInOutQuad',
      duration: 400,
    });

  useEffect(() => {
    animateEntry();
  }, []);

  const form = useForm<BlockchainForm>();
  return (
    <div>
      <div css={[styles.inputWrapper]}>
        <FormProvider {...form}>
          <form>
            <Input
              labelStyles={[display.visuallyHidden]}
              inputStyles={[styles.searchInput]}
              name="blockchain"
              placeholder="Search..."
              inputSize="large"
              leftIcon={
                <Image
                  src="/assets/icons/search-12.svg"
                  width={12}
                  height={12}
                />
              }
            />
          </form>
        </FormProvider>
      </div>
      <BlockchainList
        blockchains={['Ethereum 2.0', 'Avalanche', 'Solana', 'Algorand']}
      />
      <BlockchainSelectorFooter />
    </div>
  );
}
