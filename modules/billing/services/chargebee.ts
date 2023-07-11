let Chargebee, chargebee;

if (typeof window !== 'undefined') {
  Chargebee = (window as any).Chargebee;

  if (Chargebee) {
    Chargebee.init({
      site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE,
      api_key: process.env.NEXT_PUBLIC_CHARGEBEE_API_KEY,
    });
    chargebee = Chargebee.getInstance();
  }
}

export { chargebee };
