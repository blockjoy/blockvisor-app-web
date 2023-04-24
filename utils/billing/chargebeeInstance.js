import { ChargeBee } from 'chargebee-typescript';

let chargebee = new ChargeBee();

chargebee.configure({
  site: process.env.CHARGEBEE_SITE,
  api_key: process.env.CHARGEBEE_API_KEY,
});

export { chargebee };
