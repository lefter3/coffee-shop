import React,  { useState, useEffect, useContext } from "react";
import Foods from "./Foods";
import Extras from "./Extras";
import Total from "./Total";
import { Provider } from "./Context";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [products, setProducts] = useState({})
  const [ingredients, setIngredients] = useState([])

  const addItemToMenu = (item) => {
    for (let i=0; i < item.ingredients.length;  i++) {
      if (item.ingredients[i].amount == 0) {
        return false
      }
    }
    return true
  }
  const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }), 
    {},
  );
  const updateMenuItems = (items) => {
    console.log(items)
    let productsInStock = items.filter(el => addItemToMenu(el))
    let menuItems = productsInStock.length ? groupBy(productsInStock, 'category') : []
    setProducts(menuItems)
  }
  useEffect(() => {
    fetch('/api/products/all')
    .then(res => res.json())
    .then(res => {
      setMenuItems(res)
      updateMenuItems(res)
    })
    fetch('/api/ingredients/all')
    .then(res => res.json())
    .then(res => {
      setIngredients(res)
    })
  }, [])
  return (
    <Provider>
      <div className="menu">
        <Foods foods={products.food}/>
        <aside className="aside">

          <Extras type="Drinks" items={products.drinks} />
          <Extras type="Deserts" items={products.desert} />
        </aside>
        <Total />
      </div>
    </Provider>
  );
}
