import { _subscription } from 'chargebee-typescript';
import {
  Coupon,
  CouponCode,
  ItemPrice,
} from 'chargebee-typescript/lib/resources';

export enum CreditCardTypes {
  visa = 'Visa',
  mastercard = 'MasterCard',
  american_express = 'American Express',
  discover = 'Discover',
  jcb = 'JCB',
  diners_club = "Diner's Club",
  bancontact = 'Bancontact',
  other = 'Other',
  not_applicable = 'HM',
}

export enum SubscriptionStatus {
  future = 'future',
  in_trial = 'in_trial',
  active = 'active',
  non_renewing = 'non_renewing',
  paused = 'paused',
  cancelled = 'cancelled',
}

export enum InvoiceStatus {
  paid = 'paid',
  posted = 'posted',
  payment_due = 'payment_due',
  not_paid = 'not_paid',
  voided = 'voided',
  pending = 'pending',
}

export type ItemPriceSimple = Pick<
  ItemPrice,
  'id' | 'item_id' | 'price' | 'currency_code' | 'period_unit'
>;

export type PromoCode = {
  coupon: Coupon | null;
  couponCode: CouponCode | null;
};

export type ExtendedCreateWithItemsParams =
  _subscription.create_with_items_params & {
    cf_organization_id?: string;
  };
