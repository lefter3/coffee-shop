import React from "react";
import Home from "./components/Home";
import Products from "./components/Products";

const routes = {
  "/": () => <Home />,
  "/products": () => <Products />,
};

export default routes;