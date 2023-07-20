import { useRecoilState } from 'recoil';
import { _item, _item_price } from 'chargebee-typescript';
import { Item, ItemPrice } from 'chargebee-typescript/lib/resources';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  fetchBilling,
} from '@modules/billing';

interface IItemsHook {
  items: Item[] | null;
  itemsLoadingState: LoadingState;
  itemPrices: ItemPrice[] | null;
  itemPricesLoadingState: LoadingState;
  getItem: VoidFunction;
  getItems: VoidFunction;
  getItemPrices: (params: {
    id: string;
    periodUnit?: string;
  }) => Promise<ItemPrice[]>;
}

export const useItems = (): IItemsHook => {
  const [items, setItems] = useRecoilState(billingAtoms.items);
  const [itemsLoadingState, setItemsLoadingState] = useRecoilState(
    billingAtoms.itemsLoadingState,
  );

  const [itemPrices, setItemPrices] = useRecoilState(billingAtoms.itemPrices);
  const [itemPricesLoadingState, setItemPricesLoadingState] = useRecoilState(
    billingAtoms.itemPricesLoadingState,
  );

  const getItem = async () => {
    setItemsLoadingState('initializing');

    try {
      const data = await fetchBilling(BILLING_API_ROUTES.items.get, {
        id: 'standard',
      });

      setItems(data);
    } catch (error) {
      console.error('Failed to fetch Item', error);
    } finally {
      setItemsLoadingState('finished');
    }
  };

  const getItems = async () => {
    setItemsLoadingState('initializing');

    try {
      const params: _item.item_list_params = {
        id: { is: 'standard' },
      };

      const data = await fetchBilling(BILLING_API_ROUTES.items.list, {
        params,
      });

      setItems(data);
    } catch (error) {
      console.error('Failed to fetch Items', error);
    } finally {
      setItemsLoadingState('finished');
    }
  };

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
    items,
    itemsLoadingState,

    itemPrices,
    itemPricesLoadingState,

    getItem,
    getItems,
    getItemPrices,
  };
};
