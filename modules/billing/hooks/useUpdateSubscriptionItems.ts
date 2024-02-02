import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';
import { _subscription } from 'chargebee-typescript';
import { Subscription } from 'chargebee-typescript/lib/resources';
import { SubscriptionItem } from 'chargebee-typescript/lib/resources/subscription';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import {
  BILLING_API_ROUTES,
  billingAtoms,
  billingSelectors,
  useSubscription,
  fetchBilling,
  usePromoCode,
  updateSubscriptionMetadata,
} from '@modules/billing';

export enum UpdateSubscriptionAction {
  ADD_NODE = 'ADD_NODE',
  REMOVE_NODE = 'REMOVE_NODE',
  ADD_HOST = 'ADD_HOST',
  REMOVE_HOST = 'REMOVE_HOST',
}

type UpdateSubscriptionPayload = {
  node?: Node;
  host?: Host;
};

interface IUpdateSubscriptionHook {
  subscriptionLoadingState: LoadingState;
  updateSubscriptionItems: (action: {
    type: UpdateSubscriptionAction;
    payload: UpdateSubscriptionPayload;
  }) => Promise<void>;
}

export const useUpdateSubscriptionItems = (): IUpdateSubscriptionHook => {
  const { mutate } = useSWRConfig();
  const setSubscription = useSetRecoilState(billingSelectors.subscription);
  const selectedItemPrice = useRecoilValue(billingSelectors.selectedItemPrice);
  const [subscriptionLoadingState, setSubscriptionLoadingState] =
    useRecoilState(billingAtoms.subscriptionLoadingState);

  const { provideSubscription } = useSubscription();
  const { promoCode, resetPromoCode } = usePromoCode();

  const updateSubscriptionItems = async (action: {
    type: UpdateSubscriptionAction;
    payload: UpdateSubscriptionPayload;
  }) => {
    setSubscriptionLoadingState('initializing');
    const subscription = await provideSubscription();

    const { type, payload } = action;

    const params: _subscription.update_for_items_params = {};
    const subscriptionItems: _subscription.subscription_items_update_for_items_params[] =
      [];

    let itemPriceID: string = '';
    let subscriptionItem: SubscriptionItem | undefined;

    switch (type) {
      case UpdateSubscriptionAction.ADD_NODE:
        itemPriceID = selectedItemPrice ? selectedItemPrice?.id : '';
        subscriptionItem = subscription?.subscription_items?.find(
          (subItem: SubscriptionItem) => subItem.item_price_id === itemPriceID,
        );

        let newSubscriptionItem: _subscription.subscription_items_update_for_items_params =
          {
            item_price_id: itemPriceID,
            quantity: subscriptionItem ? subscriptionItem?.quantity! + 1 : 1,
          };

        subscriptionItems?.push(newSubscriptionItem!);

        params.prorate = true;
        break;

      case UpdateSubscriptionAction.REMOVE_NODE:
        const subscriptionMetadataItems =
          subscription?.meta_data?.subscriptionItems ?? [];

        itemPriceID =
          subscriptionMetadataItems?.find(
            (item: any) => item.id === payload.node?.id,
          )?.itemPriceID ?? '';

        subscriptionItem = subscription?.subscription_items?.find(
          (subItem: SubscriptionItem) => subItem.item_price_id === itemPriceID,
        );

        if (subscriptionItem?.quantity! > 1) {
          let newSubscriptionItem: _subscription.subscription_items_update_for_items_params =
            {
              item_price_id: itemPriceID,
              quantity: subscriptionItem?.quantity! - 1,
            };

          subscriptionItems?.push(newSubscriptionItem!);
        } else {
          subscriptionItems.push(
            ...subscription?.subscription_items?.filter(
              (
                subItem: _subscription.subscription_items_update_for_items_params,
              ) => subItem.item_price_id !== subscriptionItem?.item_price_id!,
            )!,
          );

          params.replace_items_list = true;
        }

        params.prorate = false;
        break;
      case UpdateSubscriptionAction.ADD_HOST:
        break;
      case UpdateSubscriptionAction.REMOVE_HOST:
        break;
      default:
        break;
    }

    params.subscription_items = subscriptionItems;

    params.meta_data = updateSubscriptionMetadata(type, {
      metadata: subscription?.meta_data,
      resource: payload.node,
      itemPriceID,
    });

    if (promoCode) {
      const promoCodeValue = promoCode.couponCode
        ? promoCode.couponCode?.code
        : promoCode.coupon?.id;

      if (promoCodeValue) {
        params.coupon_ids = [promoCodeValue];
        if (!subscription?.coupons) params.replace_coupon_list = true;
      }
    }

    try {
      const data: Subscription = await fetchBilling(
        BILLING_API_ROUTES.subscriptions.update,
        {
          id: subscription?.id!,
          params,
        },
      );

      if (
        UpdateSubscriptionAction.ADD_NODE ||
        UpdateSubscriptionAction.ADD_HOST
      )
        mutate(`${BILLING_API_ROUTES.invoices.list}_${subscription?.id}`);

      console.log('%cUpdateSubscriptionItems', 'color: #bff589', {
        type,
        subscription,
        params,
        data,
      });

      setSubscription(data);
      resetPromoCode();
    } catch (error: any) {
      console.log('UpdateSubscription Error', error);
      throw error;
    } finally {
      setSubscriptionLoadingState('finished');
    }
  };

  return {
    subscriptionLoadingState,

    updateSubscriptionItems,
  };
};
