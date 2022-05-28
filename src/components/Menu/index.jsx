import React from "react";
import Foods from "./Foods";
import Drinks from "./Drinks";
import Total from "./Total";
import { Provider } from "./Context";
import { mains, sides, drinks } from "../data";

export default function Menu() {
  return (
    <Provider>
      <div className="menu">
        <Foods meals={mains} />
        <aside className="aside">
          <Drinks type="Sides" items={sides} />
          <Drinks type="Drinks" items={drinks} />
        </aside>
        <Total />
      </div>
    </Provider>
  );
}
