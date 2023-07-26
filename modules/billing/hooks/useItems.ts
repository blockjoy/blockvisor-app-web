import { useRecoilState } from 'recoil';
import { _item_price } from 'chargebee-typescript';
import { ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  fetchBilling,
} from '@modules/billing';

interface IItemsHook {
  itemPrices: ItemPrice[] | null;
  itemPricesLoadingState: LoadingState;
  getItemPrices: (params: {
    id: string;
    periodUnit?: string;
  }) => Promise<ItemPrice[]>;
}

export const useItems = (): IItemsHook => {
  const [itemPrices, setItemPrices] = useRecoilState(billingAtoms.itemPrices);
  const [itemPricesLoadingState, setItemPricesLoadingState] = useRecoilState(
    billingAtoms.itemPricesLoadingState,
  );

  const getItemPrices = async (params: {
    id: string;
    periodUnit?: string;
  }): Promise<ItemPrice[]> => {
    setItemPricesLoadingState('initializing');

    const { id, periodUnit } = params;

    try {
      const params: _item_price.item_price_list_params = {
        item_id: { is: id },
      };

      if (periodUnit) params['period_unit'] = { is: periodUnit };

      const data = await fetchBilling(BILLING_API_ROUTES.items.prices.list, {
        params,
      });

      setItemPrices(data);

      return data;
    } catch (error) {
      console.error('Failed to fetch Item prices', error);
      return [];
    } finally {
      setItemPricesLoadingState('finished');
    }
  };

  return {
    itemPrices,
    itemPricesLoadingState,

    getItemPrices,
  };
};
