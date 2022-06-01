import React, { useContext } from "react";
import { Context } from "./Context";

export default function Input({ name, price }) {
  const [items, updateItem, placeOrder] = useContext(Context);

  return (
    <input
      className="menu-input"
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={({ target }) => updateItem(name, target.value, price)}
      name={name}
    />
  );
}
