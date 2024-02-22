let Chargebee, cbInstance: any;

if (typeof window !== 'undefined') {
  Chargebee = (window as any).Chargebee;

  if (Chargebee) {
    cbInstance = Chargebee.init({
      site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE,
      api_key: process.env.NEXT_PUBLIC_CHARGEBEE_API_KEY,
    });
  }
}

export { cbInstance };
