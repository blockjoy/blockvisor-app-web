import { MqttClient } from 'mqtt';
import React, { createContext, useContext } from 'react';
import { useMqtt } from '@modules/mqtt';

type MqttUIContext = {
  client: MqttClient | null;
};

type MqttUIProvider = {
  children?: React.ReactNode;
};

const MqttUIContext = createContext<MqttUIContext>({} as MqttUIContext);

export function useMqttUIContext() {
  return useContext(MqttUIContext);
}

export const MqttUIConsumer = MqttUIContext.Consumer;

export function MqttUIProvider({ children }: MqttUIProvider) {
  const { client } = useMqtt();

  const value: MqttUIContext = {
    client,
  };

  return (
    <MqttUIContext.Provider value={value}>{children}</MqttUIContext.Provider>
  );
}
