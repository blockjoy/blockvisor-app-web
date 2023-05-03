interface IInvoice {
  id: string;
  object: string;
  account_country: string;
  account_name: string;
  account_tax_ids: any;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  amount_shipping: number;
  application: any;
  application_fee_amount: any;
  attempt_count: number;
  attempted: any;
  auto_advance: any;
  automatic_tax: {
    enabled: any;
    status: any;
  };
  billing_reason: string;
  charge: any;
  collection_method: string;
  created: number;
  currency: string;
  custom_fields: any;
  customer: string;
  customer_address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
  customer_email: string;
  customer_name: string;
  customer_phone: any;
  customer_shipping: any;
  customer_tax_exempt: string;
  customer_tax_ids: {
    type: string;
    value: string;
  }[];
  default_payment_method: any;
  default_source: any;
  default_tax_rates: any;
  description: any;
  discount: any;
  discounts: any;
  due_date: any;
  ending_balance: any;
  footer: any;
  from_invoice: any;
  hosted_invoice_url: any;
  invoice_pdf: any;
  last_finalization_error: any;
  latest_revision: any;
  lines: {
    object: string;
    data: {
      id: string;
      object: string;
      amount: number;
      amount_excluding_tax: number;
      currency: string;
      description: string;
      discount_amounts: any;
      discountable: any;
      discounts: any;
      invoice_item: string;
      livemode: any;
      metadata: any;
      period: {
        end: number;
        start: number;
      };
      price: {
        id: string;
        object: string;
        active: any;
        billing_scheme: string;
        created: number;
        currency: string;
        custom_unit_amount: any;
        livemode: any;
        lookup_key: any;
        metadata: any;
        nickname: any;
        product: string;
        recurring: any;
        tax_behavior: string;
        tiers_mode: any;
        transform_quantity: any;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
      };
      proration: any;
      proration_details: {
        credited_items: any;
      };
      quantity: number;
      subscription: any;
      tax_amounts: any;
      tax_rates: any;
      type: string;
      unit_amount_excluding_tax: string;
    }[];

    has_more: any;
    url: string;
  };
  livemode: any;
  metadata: any;
  next_payment_attempt: any;
  number: any;
  on_behalf_of: any;
  paid: any;
  paid_out_of_band: any;
  payment_intent: any;
  payment_settings: {
    default_mandate: any;
    payment_method_options: any;
    payment_method_types: any;
  };
  period_end: number;
  period_start: number;
  post_payment_credit_notes_amount: number;
  pre_payment_credit_notes_amount: number;
  quote: any;
  receipt_number: any;
  redaction: any;
  rendering_options: any;
  shipping_cost: any;
  shipping_details: any;
  starting_balance: number;
  statement_descriptor: any;
  status: string;
  status_transitions: {
    finalized_at: any;
    marked_uncollectible_at: any;
    paid_at: any;
    voided_at: any;
  };
  subscription: any;
  subtotal: number;
  subtotal_excluding_tax: number;
  tax: any;
  test_clock: any;
  total: number;
  total_discount_amounts: any;
  total_excluding_tax: number;
  total_tax_amounts: any;
  transfer_data: any;
  webhooks_delivered_at: any;
}

interface IInvoiceHook {
  invoice: any | null;
  invoices: any[];
  invoiceLoadingState: LoadingState;
  invoicesLoadingState: LoadingState;
  getInvoice: (invoiceId: RouterId) => void;
  getInvoices: VoidFunction;
  unloadInvoice: VoidFunction;
}
