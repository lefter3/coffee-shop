import React from "react";
import Input from "./Input";

export default function Extras({ type, items }) {
  if (!items) return (<h2 className="extras-heading">{type}</h2>)
  return (
    <section className="extras">
      <h2 className="extras-heading">{type}</h2>
      {items.map((item) => (
        <article className="menu-item">
          <div className="extras-name">{item.name}</div>
          <Input name={item._id} price={item.price}/>
          <strong className="extras-price">${item.price}</strong>
        </article>
      ))}
    </section>
  );
}
