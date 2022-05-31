import React from "react";
import Input from "./Input";

export default function Foods({ foods }) {
  console.log('food', foods)
  if (!foods || !foods.length) return (<h2 className="extras-heading">Foods</h2>)
  foods = foods.map(food => ({...food, description: food.ingredients.map(el =>el.name.charAt(0).toUpperCase() + el.name.slice(1)).join(', ')}))
  return (
    <section className="mains">
      <h2 className="extras-heading">Foods</h2>
      {foods.map((food) =>  (
        <article className="menu-item" key={food._id}>
          <h3 className="mains-name">{food.name}</h3>
          <Input name={food._id} price={food.price}/>
          <strong className="mains-price">${food.price}</strong>
          <p className="mains-description">{food.description}</p>
        </article>
      ))}
    </section>
  );
}