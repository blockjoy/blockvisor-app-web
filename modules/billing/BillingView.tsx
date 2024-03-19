import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { Billing, billingSelectors } from '@modules/billing';
import { ROUTES } from '@shared/index';

type BillingProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const BillingView = ({ item, itemPrices }: BillingProps) => {
  const router = useRouter();
  const isEnabledBillingPreview = useRecoilValue(
    billingSelectors.isEnabledBillingPreview,
  );

  useEffect(() => {
    if (!isEnabledBillingPreview) router.push(ROUTES.NOT_FOUND);
  }, [isEnabledBillingPreview]);

  if (!isEnabledBillingPreview) return null;

  return <Billing item={item} itemPrices={itemPrices} />;
};
