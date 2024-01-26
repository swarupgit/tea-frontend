import React from 'react';

const CartContext = React.createContext({
    item: [],
    totalAMount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

export default CartContext;