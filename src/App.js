import React from 'react';
import { useRoutes } from "hookrouter";
import routes from "./router";
import "./App.css";

function App() {
  const routeResult = useRoutes(routes);

    return (
    <div class="container mx-auto">
      {routeResult}
    </div>
    );
  }

export default App;
