import { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { env } from '@shared/constants/env';

const stripePromise = loadStripe(env.stripeKey!);

export const useStripeSetup = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance!);
    };

    initializeStripe();
  }, []);

  return { stripe };
};
