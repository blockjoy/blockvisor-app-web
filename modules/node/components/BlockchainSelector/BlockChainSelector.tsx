import anime from 'animejs';
import { ChangeEventHandler, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import { Input, Skeleton, SkeletonGrid } from '@shared/components';
import { styles } from './BlockChainSelector.styles';
import { display } from 'styles/utils.display.styles';
import { BlockchainList } from '../BlockchainList/BlockchainList';
import { BlockchainSelectorFooter } from './BlockchainSelectorFooter';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { useSearchBlockchains } from '@modules/node/hooks/useSearchBlockchains';

type BlockchainForm = {
  blockchain: string;
};

export function BlockchainSelector() {
  const { getBlockchains, loading } = useGetBlockchains();
  const { searchBlockchains, blockchains } = useSearchBlockchains();
  const form = useForm<BlockchainForm>();

  const animateEntry = () =>
    anime({
      targets: `#js-auth-layout`,
      opacity: [0, 1],
      translateY: [8, 0],
      easing: 'easeInOutQuad',
      duration: 400,
    });

  useEffect(() => {
    getBlockchains();
  }, []);

  useEffect(() => {
    animateEntry();
  }, []);

  const mapped = blockchains.map((b) => ({
    id: b.id ?? '',
    name: b.name ?? '',
  }));

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchTerm = e.target.value;
    searchBlockchains(searchTerm);
  };

  return (
    <div>
      <div css={[styles.inputWrapper]}>
        <FormProvider {...form}>
          <form>
            <Input
              labelStyles={[display.visuallyHidden]}
              inputStyles={[styles.searchInput]}
              name="blockchain"
              onChange={handleSearch}
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
      {loading ? (
        <SkeletonGrid padding="30px 12px 30px 12px">
          <Skeleton width="725px" height="50px" />
          <Skeleton width="725px" height="50px" />
          <Skeleton width="725px" height="50px" />
          <Skeleton width="725px" height="50px" />
        </SkeletonGrid>
      ) : (
        <BlockchainList blockchains={mapped} />
      )}
      <BlockchainSelectorFooter />
    </div>
  );
}
