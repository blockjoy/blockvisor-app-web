import React, { useContext, useState, useCallback, createContext } from 'react';
import { isEqual, isFunction } from 'lodash';

type HostUIContext = {};

type HostUIProvider = {
  children?: React.ReactNode;
};

const HostUIContext = createContext<HostUIContext>({} as HostUIContext);

export function useHostUIContext() {
  return useContext(HostUIContext);
}

export const HostUIConsumer = HostUIContext.Consumer;

export function HostUIProvider({ children }: HostUIProvider) {
  const value: HostUIContext = {};

  return (
    <HostUIContext.Provider value={value}>{children}</HostUIContext.Provider>
  );
}
