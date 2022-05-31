import React, { useState } from "react";

export const Context = React.createContext();

export const Provider = props => {
  const [items, setItems] = useState([]);
  const updateItem = (product, count, price) => {
    const amount = Number.isNaN(Number(count)) ? 0 : Number(count);
    let item = {}
    item[product] = {price: price, amount: amount}
    setItems({ ...items, [product]:{price: price, amount: amount} });
  };

  const placeOrder = () => {
    let products = Object.keys(items)
    let order = {}//products.map(el => ({[el]: items[el].amount}))
    products.forEach(product => {
      order[product] = items[product].amount
    })
    console.log(order)
    return fetch('/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order) 
    });
  }

  return (
    <Context.Provider value={[items, updateItem, placeOrder]}>
      {props.children}
    </Context.Provider>
  );
};
