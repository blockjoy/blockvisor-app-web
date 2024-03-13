import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import { Billing, billingAtoms } from '@modules/billing';
import { authAtoms } from '@modules/auth';
import { ROUTES } from '@shared/index';

type BillingProps = {
  item: Item;
  itemPrices: ItemPrice[];
};

export const BillingView = ({ item, itemPrices }: BillingProps) => {
  const router = useRouter();
  const isSuperUser = useRecoilValue(authAtoms.isSuperUser);
  const isEnabledBillingPreview = useRecoilValue(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );

  useEffect(() => {
    if (!isEnabledBillingPreview) router.push(ROUTES.NOT_FOUND);
  }, [isEnabledBillingPreview]);

  if (!isEnabledBillingPreview) return null;

  return <Billing item={item} itemPrices={itemPrices} />;
};
