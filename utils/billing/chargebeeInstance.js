import { ChargeBee } from 'chargebee-typescript';

let chargebee = new ChargeBee();

chargebee.configure({
  site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE,
  api_key: process.env.NEXT_PUBLIC_CHARGEBEE_API_KEY,
});

export { chargebee };
