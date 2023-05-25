import React, { createContext, useContext } from 'react';

type BillingUIContext = {
  instance: any;
};

type BillingUIProvider = {
  children?: React.ReactNode;
};

const BillingUIContext = createContext<BillingUIContext>(
  {} as BillingUIContext,
);

export function useBillingUIContext() {
  return useContext(BillingUIContext);
}

export const BillingUIConsumer = BillingUIContext.Consumer;

export function BillingUIProvider({ children }: BillingUIProvider) {
  const value: BillingUIContext = {
    // instance: chargebee,
    instance: null,
  };

  return (
    <BillingUIContext.Provider value={value}>
      {children}
    </BillingUIContext.Provider>
  );
}
