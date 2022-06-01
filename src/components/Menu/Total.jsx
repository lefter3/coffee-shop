import React, { useContext } from "react";
import { Context } from "./Context";

export default function Total() {
  const [items, updateItems, placeOrder] = useContext(Context);
  // console.log(items)
  let products = Object.keys(items)
  let totalPrice = 0
  products.forEach(product => {
    totalPrice += items[product].price * items[product].amount
  })
  return (
    <div className="total">
      <span className="total-title">Total:</span>
      <span className="total-price">${totalPrice}</span>
      <div className="w-full">
      <button
        className="submit text-white font-bold py-2 px-4 rounded-full float-right"
        onClick={(e) => placeOrder()}
      >Save</button>
    </div>
    </div>
  );
}
