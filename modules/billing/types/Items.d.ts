interface IItemsHook {
  items: Item[] | null;
  itemsLoadingState: LoadingState;
  itemPrices: ItemPrice[] | null;
  itemPricesLoadingState: LoadingState;
  getItem: VoidFunction;
  getItems: VoidFunction;
  getItemPrices: (params: { id: string; periodUnit?: string }) => void;
}
