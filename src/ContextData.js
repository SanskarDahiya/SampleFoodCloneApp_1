import React from 'react';

let CartValue;

export const getCartReducer = () => {
  if (!CartValue) {
    CartValue = React.createContext();
  }
  return CartValue;
};
