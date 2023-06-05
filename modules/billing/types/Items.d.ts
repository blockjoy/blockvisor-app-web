interface IItemsHook {
  items: any;
  itemsLoadingState: any;
  itemPrices: any;
  itemPricesLoadingState: any;
  getItems: VoidFunction;
  getItemPrices: (params: { id: string; periodUnit?: string }) => void;
}
