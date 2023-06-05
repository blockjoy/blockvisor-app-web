import { useRecoilState } from 'recoil';
import { BILLING_API_ROUTES, billingAtoms } from '@modules/billing';
import { _item, _item_price } from 'chargebee-typescript';

export const useItems = (): IItemsHook => {
  const [items, setItems] = useRecoilState(billingAtoms.items);
  const [itemsLoadingState, setitemsLoadingState] = useRecoilState(
    billingAtoms.itemsLoadingState,
  );

  const [itemPrices, setItemPrices] = useRecoilState(billingAtoms.itemPrices);
  const [itemPricesLoadingState, setItemPricesLoadingState] = useRecoilState(
    billingAtoms.itemPricesLoadingState,
  );

  const getItems = async () => {
    setitemsLoadingState('initializing');

    try {
      const params: _item.item_list_params = {
        id: { is: 'single-node' },
      };

      const response = await fetch(BILLING_API_ROUTES.items.list, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      setItems(data);
    } catch (error) {
      console.error('Failed to fetch item prices', error);
    } finally {
      setitemsLoadingState('finished');
    }
  };

  const getItemPrices = async (params: { id: string; periodUnit?: string }) => {
    setItemPricesLoadingState('initializing');

    const { id, periodUnit } = params;

    try {
      const params: _item_price.item_price_list_params = {
        item_id: { is: id },
      };

      if (periodUnit) params['period_unit'] = { is: periodUnit };

      const response = await fetch(BILLING_API_ROUTES.items.prices.list, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      setItemPrices(data);

      return data;
    } catch (error) {
      console.error('Failed to fetch item prices', error);
    } finally {
      setItemPricesLoadingState('finished');
    }
  };

  return {
    items,
    itemsLoadingState,

    itemPrices,
    itemPricesLoadingState,

    getItems,
    getItemPrices,
  };
};
