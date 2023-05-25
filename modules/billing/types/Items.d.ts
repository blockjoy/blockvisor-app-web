interface IItemsHook {
  items: any;
  itemsLoadingState: any;
  itemPrices: any;
  itemPricesLoadingState: any;
  getItems: VoidFunction;
  getItemPrices: (itemId: string) => void;
}
