import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import {sha256} from 'crypto-hash';

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const clientCookie = Cookies.get('cliente')
  const [clientInfo, setClientInfo] = useState(clientCookie ? JSON.parse(clientCookie) : null);

  const setClient = (info) => {
    setClientInfo(info);
    Cookies.set('cliente', JSON.stringify(info), { expires: 0.5 });
  }

  return (
    <ClientContext.Provider value={{ clientInfo, setClient }}>
      {children}
    </ClientContext.Provider>
  );
};
