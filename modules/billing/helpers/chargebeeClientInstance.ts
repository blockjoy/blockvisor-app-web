let Chargebee;

if (typeof window !== 'undefined') {
  Chargebee = (window as any).Chargebee;

  Chargebee.init({
    site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE,
    api_key: process.env.NEXT_PUBLIC_CHARGEBEE_API_KEY,
  });
}

const chargebee = Chargebee ? Chargebee.getInstance() : null;

export { chargebee };
